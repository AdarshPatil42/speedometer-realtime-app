import { getIO } from "../sockets/socket";

const generateSpeed = (): number => {
    // simulate speed between 0–120 km/h
    return Math.floor(Math.random() * 120);
};

export const startSpeedSimulation = () => {
    setInterval(() => {
        const speed = generateSpeed();

        console.log(`Speed generated: ${speed}`);

        const io = getIO();
        io.emit("speed_update", {
            speed,
            timestamp: new Date(),
        });
    }, 1000);
};