import { API_URL } from '../constants';
import { Message } from '../types';

export const getMessages = async (chatId: string, currentUserId: string | undefined): Promise<Message[]> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/v1/message/${chatId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  const data = await response.json();
  console.log("🚀 ~ getMessages ~ data:", data)
  
  // Transform the API response to match our Message type
  return data.map((msg: any) => ({
    id: msg.id,
    text: msg.content,
    time: new Date(msg.sentAt).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    }),
    sender: msg.senderId === currentUserId ? 'me' : 'them'
  }));
};