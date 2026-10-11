import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../../services/socket";
import { Bot, Send, X } from "lucide-react";
import AIChat from "./AIChat";

interface ChatUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  timestamp?: string;
}

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [aiChat, setAiChat] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Get chat users
  useEffect(() => {
    if (!token) return;

    const getUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/chat/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Users response:", res.data);
        setUsers(res.data.data.users);
      } catch (error) {
        console.error("Users error:", error);
      }
    };

    getUsers();
  }, [token]);

  // Socket connection
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    const handleConnect = () => {
      console.log("SOCKET CONNECTED:", socket.id);

      socket.emit("joinChat", userId);

      console.log("JOIN CHAT:", userId);
    };

    const receiveMessage = (newMessage: Message) => {
      if (
        newMessage.senderId === selectedUser?._id ||
        newMessage.receiverId === selectedUser?._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    // User online
    const handleUserOnline = (onlineUserId: string) => {
      setOnlineUsers((prev) =>
        prev.includes(onlineUserId)
          ? prev
          : [...prev, onlineUserId]
      );
    };

    // User offline
    const handleUserOffline = (offlineUserId: string) => {
      setOnlineUsers((prev) =>
        prev.filter((id) => id !== offlineUserId)
      );
    };

    const handleConnectError = (error: Error) => {
      console.error("SOCKET ERROR:", error.message);
    };

    socket.on("connect", handleConnect);
    socket.on("receiveMessage", receiveMessage);
    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receiveMessage", receiveMessage);
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
      socket.off("connect_error", handleConnectError);

      socket.disconnect();
    };
  }, [userId, selectedUser]);

  // Select user
  const selectUser = async (user: ChatUser) => {
    setAiChat(false);

    setSelectedUser(user);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data.data);
    } catch (error) {
      console.error("Messages error:", error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Send message
  const sendMessage = () => {
    if (!message.trim() || !selectedUser || !userId) return;

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: selectedUser._id,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    setMessage("");
  };

  return (
    <>
      {/* Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed
            right-3
            bottom-3
            z-50
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-blue-600
            text-xl
            text-white
            shadow-lg
            transition
            hover:bg-blue-700
            sm:right-5
            sm:bottom-5
            sm:h-14
            sm:w-14
          "
        >
          💬
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div
          className="
            fixed
            right-5
            bottom-5
            z-50
            flex
            h-125
            w-175
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            max-sm:right-2
            max-sm:bottom-2
            max-sm:h-[80vh]
            max-sm:w-[calc(100vw-1rem)]
          "
        >
          {/* Users */}
          <div
            className="
              flex
              w-36
              min-w-36
              flex-col
              border-r
              border-slate-200
              bg-white
              sm:w-56
              sm:min-w-56
            "
          >
            {/* Users Header */}
          <div
  className="
    flex
    h-14
    shrink-0
    items-center
    border-b
    border-slate-200
    bg-gray-400
    px-3
    font-semibold
    text-slate-800
    sm:px-4
  "
>
 
              Users
            </div>

            {/* User List */}
            <div className="min-h-0 flex-1 overflow-y-auto bg-white">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => selectUser(user)}
                  className={`w-full border-b border-slate-100 px-2 py-3 text-left transition hover:bg-slate-50 sm:px-4 ${selectedUser?._id === user._id
                      ? "bg-blue-50"
                      : "bg-white"
                    }`}
                >
                  <div className="truncate text-sm font-medium text-slate-800">
                    {user.name}
                  </div>

                  <div className="truncate text-xs capitalize text-slate-500">
                    {user.role}
                  </div>

                  <div className="mt-1 text-xs">
                    {onlineUsers.includes(user._id) ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400">
                        <span className="h-2 w-2 rounded-full bg-gray-300" />
                        Offline
                      </span>
                    )}
                  </div>
                </button>
              ))}

              {/* AI Chat */}
              <button
                onClick={() => setAiChat(true)}
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  border-t
                  border-slate-200
                  bg-white
                  px-3
                  py-3
                  text-left
                  transition
                  hover:bg-slate-50
                  sm:px-4
                "
              >
                <Bot
                  size={20}
                  className="shrink-0 text-blue-600"
                />

                <span className="truncate text-sm font-medium text-slate-700">
                  Chat Bot
                </span>
              </button>
            </div>
          </div>

          {/* Chat */}
          <div className="flex min-w-0 flex-1 flex-col bg-white">
            {aiChat ? (
              <AIChat />
            ) : (
              <>
                {/* Header */}
               <div
  className="
    flex
    h-14
    shrink-0
    items-center
    justify-between
    border-b
    border-slate-200
    bg-gray-400
    px-3
    sm:px-4
  "
>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                      {selectedUser
                        ? selectedUser.name
                        : "Select a user"}
                    </h2>

                    {selectedUser && (
                      <p className="mt-0.5 text-xs">
                        {onlineUsers.includes(selectedUser._id) ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400">
                            <span className="h-2 w-2 rounded-full bg-gray-300" />
                            Offline
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-slate-500
                      transition
                      hover:bg-slate-100
                      hover:text-red-500
                    "
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Messages */}
                <div
                  className="
                    min-h-0
                    flex-1
                    space-y-3
                    overflow-y-auto
                    bg-white
                    p-2
                    sm:p-4
                  "
                >
                  {!selectedUser && (
                    <div className="flex h-full items-center justify-center text-center text-xs text-slate-400 sm:text-sm">
                      Select a user to start chat
                    </div>
                  )}

                  {selectedUser &&
                    messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex min-w-0 ${msg.senderId === userId
                            ? "justify-end"
                            : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[85%] wrap-break-word rounded-2xl px-3 py-2 text-sm shadow-sm sm:max-w-[70%] ${msg.senderId === userId
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-800"
                            }`}
                        >
                          <div>{msg.message}</div>

                          <div
                            className={`mt-1 text-right text-[9px] sm:text-[10px] ${msg.senderId === userId
                                ? "text-blue-100"
                                : "text-slate-400"
                              }`}
                          >
                            {formatTime(
                              msg.timestamp || msg.createdAt
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Input */}
                {selectedUser && (
                  <div
                    className="
                      flex
                      shrink-0
                      gap-2
                      border-t
                      border-slate-200
                      bg-white
                      p-2
                      sm:p-3
                    "
                  >
                    <input
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
                      placeholder="Type message..."
                      className="
                        min-w-0
                        flex-1
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                      "
                    />

                    <button
                      onClick={sendMessage}
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-600
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-700
                      "
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;