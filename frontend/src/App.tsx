import { useEffect, useState } from "react";
import { connectSocket } from "./services/socket";
import { fetchLatestSpeed } from "./services/api";
import Speedometer from "./components/Speedometer";

interface SpeedData {
  speed: number;
  timestamp: string;
}

function App() {
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    const socket = connectSocket();

    // socket data
    socket.on("speed_update", (data: SpeedData) => {
      setSpeed(data.speed);
    });

    // fallback on disconnect
    socket.on("disconnect", async () => {
      console.log("Socket disconnected, using fallback API");

      const latest = await fetchLatestSpeed();
      if (latest) {
        setSpeed(latest.speed);
      }
    });

    // initial load (important)
    const loadInitial = async () => {
      const latest = await fetchLatestSpeed();
      if (latest) {
        setSpeed(latest.speed);
      }
    };

    loadInitial();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Speedometer App</h1>
      <Speedometer speed={speed} />
    </div>
  );
}

export default App;
