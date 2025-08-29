export default function CustomCursorAverage({ points, width, height }) {
  const { x } = points[0];

  return (
    <rect
      x={x}
      y={0}
      width={width || 79}
      height={height}
      fill="rgba(0,0,0,0.1)"
    />
  );
}
