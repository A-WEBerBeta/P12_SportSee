/**
 * Tooltip de l'activité (BarChart) : affiche {kg, kCal} pour le jour survolé
 *
 * Comportement :
 * - Recharts appelle ce composant avec 'active' (bool) et 'payload'
 * - Quand 'active' est false ou que 'payload' est vide, le tooltip ne s'affiche pas -> 'null' (rendu vide)
 * - Récupération des valeurs : par index 'payload[0]' (kg) et 'payload[1]' (calories)
 *
 * @param {{
 * active?: boolean,
 * payload?: Array<{
 *  value?: number,
 *  dataKey?: string,
 *  payload?: {kilogram?: number, calories?: number }
 * }>
 * }} props
 * @returns {JSX.Element|null}
 */

import PropTypes from "prop-types";
import "./CustomTooltipActivity.css";

export default function CustomTooltipActivity({ active, payload }) {
  // Affiche uniqueùent si le tooltip est actif ET si on a bien 2 entrées (kg et cal)
  if (active && payload && payload.length === 2) {
    // Récupération par index (ordre des séries : 0 -> kilogram, 1 -> calories)
    const poids = payload[0].value;
    const calories = payload[1].value;

    return (
      <div className="custom-tooltip">
        <p className="tooltip-line">{poids}kg</p>
        <p className="tooltip-line">{calories}kCal</p>
      </div>
    );
  }

  // Pas de données actives -> ne rien afficher
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
