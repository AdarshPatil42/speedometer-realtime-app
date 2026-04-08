import GaugeComponent from "react-gauge-component";

interface Props {
  speed: number;
}

const Speedometer = ({ speed }: Props) => {
  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      {/* <GaugeComponent
        value={speed}
        minValue={0}
        maxValue={120}
        arc={{
          subArcs: [
            { limit: 40, color: "#00FF00" },
            { limit: 80, color: "#FFA500" },
            { limit: 120, color: "#FF0000" },
          ],
        }}
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${value} km/h`,
            style: { fontSize: "24px" },
          },
        }}
      /> */}

      <GaugeComponent
        value={speed}
        minValue={0}
        maxValue={120}
        type="radial" // ✅ valid type
        arc={{
          subArcs: [
            { limit: 40, color: "#00FF00" },
            { limit: 80, color: "#FFA500" },
            { limit: 120, color: "#FF0000" },
          ],
        }}
        pointer={{
          color: "#03498b",
          length: 0.8,
          width: 10,
        }}
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${value} km/h`,
            style: { fontSize: "24px" },
          },
        }}
      />
    </div>
  );
};

export default Speedometer;
