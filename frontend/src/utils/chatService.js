// utils/chatService.js
export const sendMessageToBackend = async (message, sessionId = null) => {
  const res = await fetch("http://localhost:8000/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  return await res.json();
};
