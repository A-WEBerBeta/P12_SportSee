import "./CustomTooltipAverage.css";

export default function CustomTooltipAverage({ active, payload }) {
  if (active && payload && payload.length) {
    return <div className="tooltip-average">{`${payload[0].value} min`}</div>;
  }

  return null;
}
