import { Server } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();
console.log('CLIENT_URL:', process.env.CLIENT_URL);

const io = new Server({
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExits = onlineUser.find((user) => user.userId === userId);
    if (!userExits) {
        onlineUser.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log(`User added: ${userId}`);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
        } else {
            console.log(`User with ID ${receiverId} is not online`);
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeUser(socket.id);
    });
});

const PORT = process.env.PORT || 4000;
io.listen(PORT, () => {
    console.log(`Socket server is running on port ${PORT}`);
});