import prisma from "../config/prisma";
import { getIO } from "../sockets/socket";

const generateSpeed = (): number => {
    return Math.floor(Math.random() * 120);
};

export const startSpeedSimulation = () => {
    setInterval(async () => {
        try {
            const speed = generateSpeed();

            // save to DB
            const savedData = await prisma.speedData.create({
                data: {
                    speed,
                },
            });

            console.log(`Speed saved: ${savedData.speed}`);

            // emit to clients
            const io = getIO();
            io.emit("speed_update", {
                speed: savedData.speed,
                timestamp: savedData.createdAt,
            });
        } catch (error) {
            console.error("Error in speed simulation:", error);
        }
    }, 1000);
};