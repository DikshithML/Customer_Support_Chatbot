from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.db import connection

from .models import Conversation, Message, User
from .serializers import ConversationSerializer
from .llm import call_groq_llm  # Groq LLM wrapper

# Build conversation history for Groq
def build_message_history(conversation):
    return [
        {"role": msg.sender, "content": msg.content}
        for msg in conversation.messages.all()
    ]

# Business logic: query DB based on message content
def query_database(user_message):
    if "order" in user_message.lower():
        with connection.cursor() as cursor:
            cursor.execute("SELECT order_id, status FROM orders LIMIT 5")
            rows = cursor.fetchall()
            if rows:
                return "\n".join([f"Order {row[0]}: {row[1]}" for row in rows])
    return "No matching data found."

@api_view(['POST'])
def chat_view(request):
    try:
        user_email = request.data.get("email")
        message_text = request.data.get("message")
        conversation_id = request.data.get("conversation_id", None)

        if not user_email or not message_text:
            return Response({"error": "email and message are required"}, status=400)

        # Get or create user
        user, _ = User.objects.get_or_create(email=user_email)

        # Get or create conversation
        if conversation_id:
            try:
                conversation = Conversation.objects.get(id=conversation_id, user=user)
            except Conversation.DoesNotExist:
                return Response({"error": "Invalid conversation ID"}, status=404)
        else:
            conversation = Conversation.objects.create(user=user, started_at=timezone.now())

        # Save user's message
        Message.objects.create(
            conversation=conversation,
            sender='user',
            content=message_text
        )

        # Build full message history
        history = build_message_history(conversation)

        # Clarifying question if vague
        if "order" in message_text.lower() and not any(char.isdigit() for char in message_text):
            ai_reply = "Could you please provide your order ID so I can check the status?"
        else:
            # Query DB and enrich history
            db_result = query_database(message_text)
            history.append({
                "role": "system",
                "content": f"Relevant database information:\n{db_result}"
            })
            ai_reply = call_groq_llm(history)

        # Save AI's reply
        Message.objects.create(
            conversation=conversation,
            sender='ai',
            content=ai_reply
        )

        # Return full conversation
        serialized = ConversationSerializer(conversation)
        return Response(serialized.data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
