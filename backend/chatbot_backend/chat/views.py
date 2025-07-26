from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation, Message, User
from .serializers import MessageSerializer, ConversationSerializer
from django.utils import timezone

# Dummy AI response generator
def generate_ai_response(user_message):
    return f"AI Response to: '{user_message}'"

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
        user_msg = Message.objects.create(
            conversation=conversation,
            sender='user',
            content=message_text,
        )

        # Generate and save AI response
        ai_reply = generate_ai_response(message_text)
        ai_msg = Message.objects.create(
            conversation=conversation,
            sender='ai',
            content=ai_reply,
        )

        # Return updated conversation
        serialized = ConversationSerializer(conversation)
        return Response(serialized.data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
