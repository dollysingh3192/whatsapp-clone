import React, { useState, useEffect } from "react";
import { User, Send, MessageSquare, MoreVertical, Search } from "lucide-react";

interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}
const chats: ChatPreview[] = [
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
];

export const ChatList = () => {
  return (
    <div className="h-screen border-r">
      <div className="p-4 border-b flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <User className="w-8 h-8 text-gray-600" />
          <span className="font-semibold">Chats</span>
        </div>
        <div className="flex items-center gap-2">
          <Search className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          <MoreVertical className="text-gray-600" />
        </div>
      </div>
      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-gray-100 cursor-pointer border-b"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="flex text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChatView = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-3 bg-white">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h2 className="font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
              <p>Hey, how are you?</p>
              <span className="text-xs text-gray-500">10:30 AM</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
              <p>I'm good! How about you?</p>
              <span className="text-xs text-blue-100">10:31 AM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Chat() {
  return (
    <div className="flex h-screen">
      <div className="text-center">
        <div className="w-1/3 min-w-[320px]">
          <ChatList />
        </div>
      </div>
      <div className="flex-1">
        <ChatView />
      </div>
    </div>
  );
}
