import React, { useState, useEffect } from "react";
import { User, Send } from "lucide-react";
import { Message } from "../types";

interface ChatViewProps {
  chatId: string;
  ws: WebSocket | null;
}

export const ChatView: React.FC<ChatViewProps> = ({ chatId, ws }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatInfo, setChatInfo] = useState<{ name: string; status: string }>({ 
    name: "Select a chat", 
    status: "" 
  });

  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
        
  //       if (data.type === 'new_message' && data.chatId === chatId) {
  //         const message: Message = {
  //           id: Date.now().toString(),
  //           text: data.message,
  //           time: new Date(data.timestamp).toLocaleTimeString([], { 
  //             hour: '2-digit', 
  //             minute: '2-digit' 
  //           }),
  //           sender: 'them'
  //         };
  //         setMessages(prev => [...prev, message]);
  //       }
  //     };
  //   }
  // }, [ws, chatId]);

  useEffect(() => {
    const loadChat = async () => {
      // Simulating API call to load chat data
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (chatId) {
        setChatInfo({
          name: `Chat ${chatId}`,
          status: "Online"
        });

        setMessages([
          {
            id: "1",
            text: "Hey, how are you?",
            time: "10:30 AM",
            sender: "them"
          },
          {
            id: "2",
            text: "I'm good! How about you?",
            time: "10:31 AM",
            sender: "me"
          }
        ]);
      }
    };

    loadChat();
  }, [chatId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h2 className="font-semibold">{chatInfo.name}</h2>
          <p className="text-sm text-gray-500">{chatInfo.status}</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[70%] ${
                  message.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{message.text}</p>
                <span
                  className={`text-xs ${
                    message.sender === "me" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};