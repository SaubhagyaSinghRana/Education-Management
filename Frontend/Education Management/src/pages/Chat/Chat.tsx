// import { useEffect, useState } from "react";
// import { socket } from "../../services/socket";

// interface Message {
//   _id: string;
//   senderId: string;
//   receiverId: string;
//   message: string;
//   createdAt: string;
// }

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) return;

//     socket.connect();

//     socket.emit("joinChat", userId);

//     const receiveMessage = (newMessage: Message) => {
//       setMessages((prev) => [...prev, newMessage]);
//     };

//     socket.on("receiveMessage", receiveMessage);

//     return () => {
//       socket.off("receiveMessage", receiveMessage);
//       socket.disconnect();
//     };
//   }, [userId]);

//   const sendMessage = () => {
//     if (!message.trim() || !userId) return;

//     // Temporary receiver ID
//     // Next step me selected user se dynamically lenge
//     const receiverId = "RECEIVER_USER_ID";

//     socket.emit("sendMessage", {
//       senderId: userId,
//       receiverId,
//       message,
//     });

//     setMessage("");
//   };

//   return (
//     <div className="flex h-[calc(100vh-80px)] border rounded-lg overflow-hidden">

//       {/* Users */}
//       <div className="w-1/3 border-r p-4">
//         <h2 className="text-xl font-semibold mb-4">
//           Chats
//         </h2>

//         <div className="p-3 rounded-md bg-gray-100 cursor-pointer">
//           Teacher
//         </div>
//       </div>

//       {/* Chat */}
//       <div className="flex-1 flex flex-col">

//         <div className="border-b p-4">
//           <h2 className="font-semibold">
//             Teacher
//           </h2>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-2">

//           {messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`flex ${
//                 msg.senderId === userId
//                   ? "justify-end"
//                   : "justify-start"
//               }`}
//             >
//               <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
//                 {msg.message}
//               </div>
//             </div>
//           ))}

//         </div>

//         {/* Input */}
//         <div className="border-t p-4 flex gap-2">

//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 sendMessage();
//               }
//             }}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-md px-3 py-2"
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-5 py-2 rounded-md"
//           >
//             Send
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;