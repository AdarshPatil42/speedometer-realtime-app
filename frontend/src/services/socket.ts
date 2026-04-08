import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    socket = io(baseUrl);

    socket.on("connect", () => {
        console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });

    return socket;
};

export const getSocket = (): Socket => {
    if (!socket) {
        throw new Error("Socket not initialized");
    }
    return socket;
};