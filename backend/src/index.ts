import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { initSocket } from "./sockets/socket";
import { startSpeedSimulation } from "./services/speed.service";
import speedRoutes from "./routes/speed.routes";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// start simulator
startSpeedSimulation();

// speed routes
app.use("/api/speed", speedRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});