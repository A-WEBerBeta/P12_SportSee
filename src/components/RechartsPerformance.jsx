/**
 * RadarChart : Performance par type (intensité, vitesse, force, endurance, énergie & cardio)
 *
 * Datas :
 * - Récupérées via UserPerformanceService (mock ou API selon VITE_IS_PROD).
 * - Le service formate les points sous la forme { subject: string, value: number }.
 *
 * Comportement :
 * - Refetch auto quand 'userId' change.
 * - Grille polaire sans lignes radiales, axes stylés pour correspondre à la maquette.
 * Domaine radial étendu de +20 pour éviter que l'aire touche les bords.
 */

/**
 * @param {{ userId: number }} props - Identifiant utilisateur (route /user/:id).
 * @returns {JSX.Element}
 */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import UserPerformanceService from "../services/userPerformanceService";
import "./RechartsPerformance.css";

export default function RechartsPerformance({ userId }) {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Refetch à chaque changement d'utilisateur
    // Le service gère lui-même mock vs API via VITE_IS_PROD
    const userPerformanceService = new UserPerformanceService(userId);
    userPerformanceService.getData().then((performanceData_) => {
      setPerformanceData(performanceData_);
    });
  }, [userId]); // <-- Ne pas enlever : sinon les charts ne suitent pas l'URL

  return (
    <>
      {performanceData ? (
        <div className="performance-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="75%" data={performanceData}>
              {/* Grille polaire : uniquement les cercles (pas de rayons) */}
              <PolarGrid
                radialLines={false}
                stroke="#FFFFFF"
                polarRadius={[0, 10, 22, 45, 65, 85]} // cercles multiples pour effet gradué
              />

              {/* Axe angulaire : libellés (subject) autour de radar  */}
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#FFFFFF", fontSize: 12 }}
                stroke="#FFFFFF"
                tickLine={false}
                axisLine={false}
                tickSize={5}
              />

              {/* Axe radial : pas de ticks visibles, domaine élargi pour lisibilité */}
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                domain={[0, "dataMax + 20"]} // +20 pour éviter que l'aire touche le bord
              />

              {/* Aire radar : contour et remplissage rouge translucide */}
              <Radar
                dataKey="value"
                stroke="#FF0101"
                fill="#FF0101"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        // TODO : remplacer par loader si besoin
        <p>Loading...</p>
      )}
    </>
  );
}

// Schéma des props
RechartsPerformance.propTypes = {
  userId: PropTypes.number.isRequired,
};
