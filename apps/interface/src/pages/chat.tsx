import React, { useState } from "react";
import { ChatList } from "../components/chatlist";
import { ChatView } from "../components/chatview";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  return (
    <div className="flex h-screen">
      <div className="w-1/3 min-w-[320px]">
        <ChatList onChatSelect={setSelectedChatId} />
      </div>
      <div className="flex-1">
        <ChatView chatId={selectedChatId} />
      </div>
    </div>
  );
}