from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.db import connection

from .models import Conversation, Message, User
from .serializers import ConversationSerializer
from .llm import call_groq_llm  # <-- Import the Groq LLM wrapper

# Build conversation history in chat format for Groq
def build_message_history(conversation):
    messages = []
    for msg in conversation.messages.all():
        messages.append({
            "role": msg.sender,
            "content": msg.content
        })
    return messages

# Business logic: query your database based on user question
def query_database(user_message):
    """
    You can expand this function to match order IDs, user names, SKUs, etc.
    For now, if 'order' is mentioned, return 5 order statuses from the DB.
    """
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

        # Save user message
        Message.objects.create(
            conversation=conversation,
            sender='user',
            content=message_text
        )

        # Build full message history
        history = build_message_history(conversation)

        # If message is vague, ask clarifying question
        if "order" in message_text.lower() and not any(char.isdigit() for char in message_text):
            ai_reply = "Could you please provide your order ID so I can check the status?"
        else:
            # Query database for relevant context
            db_result = query_database(message_text)

            # Append DB result as a system message to LLM
            history.append({
                "role": "system",
                "content": f"Relevant database information:\n{db_result}"
            })

            # Call Groq LLM to generate a helpful reply
            ai_reply = call_groq_llm(history)

        # Save AI response
        Message.objects.create(
            conversation=conversation,
            sender='ai',
            content=ai_reply
        )

        # Return full updated conversation
        serialized = ConversationSerializer(conversation)
        return Response(serialized.data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
