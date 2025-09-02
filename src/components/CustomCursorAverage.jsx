import PropTypes from "prop-types";

export default function CustomCursorAverage({ points, width = 79, height }) {
  const { x } = points[0];

  return (
    <rect x={x} y={0} width={width} height={height} fill="rgba(0,0,0,0.1)" />
  );
}

// Schéma des props
CustomCursorAverage.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number.isRequired,
};
