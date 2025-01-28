import React, { useState } from "react";
import { ChatList } from "../components/chatlist";
import { ChatView } from "../components/chatview";
import { useSocket } from "../hooks/useSocket";

export default function Chat({ username }: { username: string | null }) {
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
      <div className="w-1/3 min-w-[320px]">
        <ChatList onChatSelect={setSelectedChatId} ws={socket} username={username} />
      </div>
      <div className="flex-1">
        <ChatView chatId={selectedChatId} ws={socket} />
      </div>
    </div>
  );
}
