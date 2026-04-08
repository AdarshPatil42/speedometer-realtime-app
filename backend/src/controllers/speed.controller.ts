import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getLatestSpeed = async (req: Request, res: Response) => {
    try {
        const latest = await prisma.speedData.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!latest) {
            return res.status(404).json({ message: "No data found" });
        }

        res.json({
            speed: latest.speed,
            timestamp: latest.createdAt,
        });
    } catch (error) {
        console.error("Error fetching latest speed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};