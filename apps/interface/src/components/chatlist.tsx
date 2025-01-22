import React, { useState, useEffect } from "react";
import { User, MessageSquare, MoreVertical, Search } from "lucide-react";
import { searchUsers } from "../api/searchUsers";
import { ChatPreview, SearchResult } from "../types";

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<ChatPreview[]>([
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "Let's meet tomorrow",
      time: "9:45 AM",
    },
    {
      id: "3",
      name: "Team Group",
      lastMessage: "New project updates",
      time: "Yesterday",
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  useEffect(() => {
    const search = async () => {
      if (searchQuery.length >= 2) {
        const results = await searchUsers(searchQuery);
        setSearchResults(results);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const addNewChat = (result: SearchResult) => {
    const newChat: ChatPreview = {
      id: result.id,
      name: result.name,
      lastMessage: "Start a conversation",
      time: "Just now",
    };

    setChats(prev => [newChat, ...prev]);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    onChatSelect(chatId);
  };

  return (
    <div className="h-screen border-r relative">
      <div className="p-4 border-b flex flex-col gap-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-8 h-8 text-gray-600" />
            <span className="font-semibold">Chats</span>
          </div>
          <MoreVertical className="text-gray-600" />
        </div>
        <div className="relative">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="bg-transparent flex-1 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute w-full bg-white mt-2 rounded-lg shadow-lg border z-50">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addNewChat(result)}
                >
                  <div className="font-semibold">{result.name}</div>
                  <div className="text-sm text-gray-500">{result.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-[calc(100vh-136px)] overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 cursor-pointer border-b transition-colors duration-150
              ${selectedChatId === chat.id 
                ? 'bg-blue-50 hover:bg-blue-100 border-l-4 border-l-blue-500' 
                : 'hover:bg-gray-100'
              }`}
            onClick={() => handleChatSelect(chat.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center
                ${selectedChatId === chat.id ? 'bg-blue-100' : 'bg-gray-200'}`}>
                <MessageSquare className={`w-6 h-6 
                  ${selectedChatId === chat.id ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className={`font-semibold 
                    ${selectedChatId === chat.id ? 'text-blue-700' : ''}`}>
                    {chat.name}
                  </span>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};