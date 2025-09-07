/**
 * BarChart : Activité quotidienne (poids & calories)
 *
 * Sources de data :
 *  - via UserActivityService (toggle mocks/API selon valeur VITE_IS_PROD dans .env).
 *
 * Comportement :
 * - Refetch automatique quand 'userId' change (dépendances de l'effet)
 * - Deux séries : 'kilogram' (axe principal, à droite) et 'calories' (axe secondaire caché)
 * - Tooltip custom pour afficher {kg, kCal}.
 */

/**
 * @param {{ userId: number }} props - Identifiant utilisateur (depuis /user/:id).
 * @returns {JSX.Element}
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import UserActivityService from "../services/userActivityService";
import CustomTooltipActivity from "./CustomTooltipActivity.jsx";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./RechartsActivity.css";

export default function RechartsActivity({ userId }) {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    // Refetch à chaque changement d'utilisateur
    // Le service gère lui-même mock vs API via VITE_IS_PROD
    const userActivityService = new UserActivityService(userId);
    userActivityService.getData().then((activityData_) => {
      setActivityData(activityData_);
    });
  }, [userId]); // <-- Ne pas enlever : sinon les charts ne suitent pas l'URL

  return (
    <>
      {activityData ? (
        <div className="activity-chart-container">
          <div className="activity-header">
            <h2 className="activity-title">Activité quotidienne</h2>
            <div className="activity-legend">
              <div className="legend-item">
                <span className="legend-dot weight" />
                Poids (kg)
              </div>
              <div className="legend-item">
                <span className="legend-dot calories" />
                Calories brûlées (kCal)
              </div>
            </div>
          </div>

          {/* ResponsiveContainer gère largeur/hauteur en % du parent */}
          <ResponsiveContainer width="100%" height={242}>
            <BarChart
              data={activityData}
              margin={{ top: 50, right: 0, left: 0, bottom: 5 }}
              barGap={8} // écart horizontal entre les 2 barres de la même catégorie.
            >
              {/* Grille: pointillés horizontaux uniquement */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              {/* XAxis : 'day' est normalisé côté service  */}
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 14 }}
                tickMargin={16}
              />

              {/* Y principal (kg), affiché à droite comme maquette Figma  */}
              <YAxis
                dataKey="kilogram"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14 }}
                tickCount={3}
                domain={["dataMin - 1", "dataMax + 2"]} // marge visuelle dépendante des datas.
                allowDecimals={false}
                tickMargin={36}
              />

              {/* Y secondaire (calories), caché, juste pour échelle cohérente de la barre rouge */}
              <YAxis
                yAxisId="calories"
                dataKey="calories"
                hide={true}
                domain={[0, "dataMax + 20"]}
              />

              {/* Tooltip : contenu custom + overlay gris auto-centré géré par Recharts  */}
              <Tooltip
                content={<CustomTooltipActivity />}
                offset={20}
                wrapperStyle={{ marginTop: -20 }}
                cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
              />

              <Bar
                dataKey="kilogram"
                name="Poids (kg)"
                fill="#282D30"
                radius={[3, 3, 0, 0]}
                barSize={7}
              />

              <Bar
                dataKey="calories"
                name="Calories brûlées (kCal)"
                fill="#E60000"
                radius={[3, 3, 0, 0]}
                barSize={7}
                yAxisId="calories" // lie barre rouge à l'axe sec caché
              />
            </BarChart>
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
RechartsActivity.propTypes = {
  userId: PropTypes.number.isRequired,
};
