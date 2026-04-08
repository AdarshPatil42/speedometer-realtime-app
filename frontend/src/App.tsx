import { useEffect } from "react";
import { connectSocket } from "./services/socket";

function App() {
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div>
      <h1>Speedometer App</h1>
    </div>
  );
}

export default App;
