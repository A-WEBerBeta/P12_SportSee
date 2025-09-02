import PropTypes from "prop-types";
import "./CustomTooltipActivity.css";

export default function CustomTooltipActivity({ active, payload }) {
  if (active && payload && payload.length === 2) {
    const poids = payload[0].value;
    const calories = payload[1].value;

    return (
      <div className="custom-tooltip">
        <p className="tooltip-line">{poids}kg</p>
        <p className="tooltip-line">{calories}kCal</p>
      </div>
    );
  }

  return null;
}

// Schéma des props
CustomTooltipActivity.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      dataKey: PropTypes.string,
      payload: PropTypes.shape({
        kilogram: PropTypes.number,
        calories: PropTypes.number,
      }),
    })
  ),
};
