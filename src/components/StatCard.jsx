import PropTypes from "prop-types";
import "./StatCard.css";

export default function StatCard({ icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <img src={icon} alt={label} />
      </div>
      <div className="stat-card__info">
        <p className="stat-card__value">
          {value.toLocaleString("en-US")}
          {unit}
        </p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );
}

// Schéma des props
StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};
