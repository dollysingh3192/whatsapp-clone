export interface ChatPreview {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
  }
  
  export interface SearchResult {
    id: string;
    name: string;
    email: string;
  }
  
  export interface Message {
    id: string;
    text: string;
    time: string;
    sender: string;
  }

  export interface Chat {
    id: string;
    participants: { userId: string }[];
    createdAt: string;
    createdBy: string
    lastMessageAt: string;
    name: string;
    isGroup: boolean;
    // Add other fields as needed
  }