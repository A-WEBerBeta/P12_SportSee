import PropTypes from "prop-types";
import "./CustomTooltipAverage.css";

export default function CustomTooltipAverage({ active, payload }) {
  if (active && payload && payload.length) {
    return <div className="tooltip-average">{`${payload[0].value} min`}</div>;
  }

  return null;
}

// Schéma des props
CustomTooltipAverage.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      dataKey: PropTypes.string,
      payload: PropTypes.shape({
        day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sessionLength: PropTypes.number,
      }),
    })
  ),
};
