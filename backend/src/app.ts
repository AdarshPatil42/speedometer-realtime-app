import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());

// health check route
app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "OK" });
});

export default app;