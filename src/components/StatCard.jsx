/**
 * Card statique avec icône, valeur et unité.
 *
 * Accessibilité :
 * - L'attribut 'alt' de l'image reprend 'label' (lisible par les lecteurs d'écran).
 *
 * Formatage :
 * - 'toLocaleString("en-US")' formate la valeur selon l'anglais US (ex: 1,950).
 *
 * @param {{
 *  icon: string,
 *  label: string,
 *  value: number,
 *  unit: string
 * }} props
 * @returns {JSX.Element}
 */

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
