import { API_URL } from '../constants';
import { Message } from '../types';

export const sendMessage = async (
  chatId: string,
  message: string,
  sentAt: string
): Promise<Message> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/api/v1/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: message,
      chatId,
      sentAt
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};