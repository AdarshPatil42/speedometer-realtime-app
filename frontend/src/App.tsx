import { useEffect, useState } from "react";
import { connectSocket } from "./services/socket";
import Speedometer from "./components/Speedometer";

interface SpeedData {
  speed: number;
  timestamp: string;
}

function App() {
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    const socket = connectSocket();

    socket.on("speed_update", (data: SpeedData) => {
      setSpeed(data.speed);
    });

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
