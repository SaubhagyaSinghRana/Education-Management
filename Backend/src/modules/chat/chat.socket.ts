import { Server, Socket } from "socket.io";
import { Chat } from "./chat.model";

export const onlineUsers = new Set<string>();
export const registerChatSocket = (io: Server) => {

  io.on("connection", (socket: Socket) => {
    console.log("Chat user connected:", socket.id);

    socket.on("joinChat", (userId: string) => {
      
      socket.join(userId);
       onlineUsers.add(userId);
    console.log("Online Users Set initialized:", onlineUsers);

  
       io.emit("userOnline", userId);


      console.log(`User ${userId} is online`);
    });

    socket.on(
      "sendMessage",
      async ({
        senderId,
        receiverId,
        message,
      }: {
        senderId: string;
        receiverId: string;
        message: string;
      }) => {
        console.log("SEND MESSAGE EVENT:", {
          senderId,
          receiverId,
          message,
        });

        try {
          if (!message.trim()) return;

          const newMessage = await Chat.create({
            senderId,
            receiverId,
            message: message.trim(),
          });

          io.to(receiverId).emit("receiveMessage", newMessage);

          io.to(senderId).emit("receiveMessage", newMessage);
        } catch (error) {
          console.error("Message error:", error);
        }
      }
    );

    socket.on("disconnect", () => {
        const userId = socket.data.userId;
        if (userId) {
    onlineUsers.delete(userId);

    io.emit("userOffline", userId);
        }

      console.log("Chat user disconnected:", socket.id);
    });
  });
};