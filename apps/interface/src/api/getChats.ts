//Get chats from the database with headers and token

import { API_URL } from '../constants';
import { Chat } from '../types';

export const getChats = async (): Promise<Chat[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/v1/user/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get chat');
  }

  return response.json();
};