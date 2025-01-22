import { SearchResult } from '../types';

export const searchUsers = async (query: string): Promise<SearchResult[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulated search results
  return [
    { id: "4", name: "Alice Johnson", email: "alice@example.com" },
    { id: "5", name: "Bob Wilson", email: "bob@example.com" },
    { id: "6", name: "Carol Brown", email: "carol@example.com" },
  ].filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
};