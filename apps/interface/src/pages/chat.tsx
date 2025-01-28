import React, { useState } from "react";
import { ChatList } from "../components/chatlist";
import { ChatView } from "../components/chatview";
import { Settings } from "../components/settings";
import { useSocket } from "../hooks/useSocket";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  const { socket, loading, error } = useSocket();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      <div style={{ width: 64 }} className='flex h-100 px-3 border-r'>
        <Settings />
      </div>
      <div className="w-1/3 min-w-[320px]">
        <ChatList onChatSelect={setSelectedChatId} />
      </div>
      <div className="flex-1">
        <ChatView chatId={selectedChatId} />
      </div>
    </div>
  );
}
