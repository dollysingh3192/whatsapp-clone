import { API_URL } from '../constants';
import { Chat } from '../types';

export const createChat = async (userId: string): Promise<Chat> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/v1/user/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create chat');
  }

  return response.json();
};