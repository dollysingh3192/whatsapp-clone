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