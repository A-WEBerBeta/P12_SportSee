/**
 * LineChart : Durée moyenne des sessions (minutes)
 *
 * Sources des datas :
 * - via UserAverageSessionsService (toggle mockes/API selon VITE_IS_PROD)
 *
 * Comportement :
 * - Refetch automatique quand 'userId' change (dépendances de l'effet).
 * - Axe X : jours 1..7 convertis en L/M/M/J/V/S/D (FR).
 * - Tooltip custom (affiche "x min") et cursor custom semi-transparent, largeur fixe pour coller à la maquette.
 * - Dégradé de ligne (plus clair à gauche, plus opaque à droite).
 *
 * Notes :
 * - 'ResponsiveContainer' gère la taille; les props 'width'/'height' du LineChart sont ignorées.
 * - 'YAxis' caché (hide = true) avec un domaine élargi
 */

/**
 * @param {{ userId: number }} props - Identifiant utilisateur (route /user/:id).
 * @returns {JSX.Element}
 */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import UserAverageSessionsService from "../services/userAverageSessionsService.js";
import CustomCursorAverage from "./CustomCursorAverage.jsx";
import CustomTooltipAverage from "./CustomTooltipAverage.jsx";
import "./RechartsAverageSessions.css";

export default function RechartsAverageSessions({ userId }) {
  const [averageSessionsData, setAverageSessionsData] = useState(null);

  useEffect(() => {
    // Refetch à chaque changement d'utilisateur
    // Le service gère lui-même mock vs API via VITE_IS_PROD
    const userAverageSessionsService = new UserAverageSessionsService(userId);
    userAverageSessionsService.getData().then((averageSessionsData_) => {
      setAverageSessionsData(averageSessionsData_);
    });
  }, [userId]); // <-- Ne pas enlever : sinon les charts ne suitent pas l'URL

  return (
    <>
      {averageSessionsData ? (
        <div className="session-chart-container">
          <h2 className="session-title">Durée moyenne des sessions</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={averageSessionsData}
              margin={{
                top: 50,
                right: -15,
                left: -15,
                bottom: 16,
              }}
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#FFFFFF", opacity: 0.5, fontSize: 12 }}
                tickMargin={18}
                // Map 1..7 -> L M M J V S D (FR)
                tickFormatter={(day) => {
                  const labels = {
                    1: "L",
                    2: "M",
                    3: "M",
                    4: "J",
                    5: "V",
                    6: "S",
                    7: "D",
                  };
                  return labels[day] || "";
                }}
              />

              {/* Y caché : domaine élargi pour lisibilité (+- 10min)  */}
              <YAxis hide={true} domain={["dataMin - 10", "dataMax + 10"]} />

              {/* Tooltip :
                - contenu minimaliste (x min)
                - curseur overlay custom (largeur fixe / alignement maquette) */}
              <Tooltip
                content={<CustomTooltipAverage />}
                cursor={<CustomCursorAverage height={263} width={79} />}
              />

              {/* Dégradé horizontal de la ligne  */}
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,1)" />
                </linearGradient>
              </defs>
              <Line
                type="natural"
                dataKey="sessionLength"
                stroke="url(#lineGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#FFFFFF",
                  strokeWidth: 8,
                  stroke: "rgba(255,255,255,0.3)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        // TODO : remplacer par un loader si besoin
        <p>Loading...</p>
      )}
    </>
  );
}

// Schéma des props
RechartsAverageSessions.propTypes = {
  userId: PropTypes.number.isRequired,
};
