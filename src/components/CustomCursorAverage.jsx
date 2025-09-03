/**
 * Curseur overlay pour le LineChart "Durée moyenne des sessions"
 *
 * Comportement :
 * - Recharts fournit 'points[0].x' (abscisse du point actif).
 * - On dessine un <rect> semi-transparent par-dessus le graphique.
 * - Alignement à gauche du point actif.
 *
 *  * @param {{
 *   points: Array<{ x: number, y: number }>,
 *   width?: number,
 *   height: number
 * }} props
 * @returns {JSX.Element|null}
 */

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
  width: PropTypes.number, // optionnel car par défaut 79
  height: PropTypes.number.isRequired,
};
