import React, { useEffect, useState } from "react";
import { ChatList } from "../components/chatlist";
import { ChatView } from "../components/chatview";
import { Settings } from "../components/settings";
import { useSocket } from "../hooks/useSocket";
import { setUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/v1/user/me`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // setUsername(data.username);
            dispatch(setUser(data));
          } else {
            // Handle token error, e.g., clear localStorage
            localStorage.removeItem("token");
            navigate('/signin');
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Handle network or other errors
        }
      }
    };

    fetchUser();
  }, []);

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
        <ChatList onChatSelect={setSelectedChatId} ws={socket} />
      </div>
      <div className="flex-1">
        <ChatView chatId={selectedChatId} ws={socket} />
      </div>
    </div>
  );
}
