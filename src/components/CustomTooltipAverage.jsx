/**
 * Tooltip des sessions moyennes (LineChart)
 * - Affiche "<valeur> min" pour le point survolé.
 * - 'active' et 'payload' sont fournis par Recharts.
 * - Retourne 'null' quand le tooltip est inactif ou sans données (comportement normal).
 *
 * @param {{
 *  active?: boolean,
 *  payload?: Array<{
 *    value?: number,
 *    dataKey?: string,
 *    payload?: { day?: number|string, sessionLength?: number }
 * }>
 * }} props
 * @returns {JSX.Element|null}
 */

import PropTypes from "prop-types";
import "./CustomTooltipAverage.css";

export default function CustomTooltipAverage({ active, payload }) {
  // Afficher uniquement si le tooltip est actif et qu'on a au moins une entrée
  if (active && payload && payload.length) {
    // On prend la 1ère série (ici 'sessionLength' et on ajoute "min")
    return <div className="tooltip-average">{`${payload[0].value} min`}</div>;
  }

  // Pas d'affichage si inactif / pas de data
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
