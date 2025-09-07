/**
 * RadialBarChart : Score utilisateur 0..100%
 *
 * Datas :
 * - Récupérées via UserScoreService (mock ou API selon VITE_IS_PROD).
 * - Le service renvoie un tableau d'un seul slice : [{ name: "score", value: percent, fill? }] où 'percent' [0, 100].
 *
 * Comportement :
 * - Refetch auto quand 'userId' change.
 * - Domaine angulaire explicite [0, 100] via PolarAngleAxis pour que 30 -> 30% du cercle.
 * - Fond blanc au centre rendu via le conteneur '.score-center' (CSS).
 */

/** @typedef {{ name: string, value: number, fill?: string }} ScoreSlice */

/**
 * @param {{ userId: number }} props - Identifiant utilisateur (route /user/:id).
 * @returns {JSX.Element}
 */

import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UserScoreService from "../services/userScoreService";
import "./RechartsScore.css";

export default function RechartsScore({ userId }) {
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    // Refetch à chaque changement d'utilisateur
    // Le service gère lui-même mock vs API via VITE_IS_PROD
    const userScoreService = new UserScoreService(userId);
    userScoreService.getData().then((scoreData_) => {
      setScoreData(scoreData_);
    });
  }, [userId]); // <-- Ne pas enlever : sinon les charts ne suitent pas l'URL

  // Valeur en % affichée au centre (sécurisée si data absente)
  const percent = scoreData?.[0]?.value ?? 0;

  return (
    <>
      {scoreData ? (
        <div className="score-chart-container">
          <h2 className="score-title">Score</h2>

          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%" // diam "trou" central
              outerRadius="80%" // épaisseur de l'anneau
              barSize={10}
              startAngle={90}
              endAngle={450}
              data={scoreData}
            >
              {/* Domaine explicite 0..100 pour un slice fidèle au pourcentage */}
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

              {/* Une seule entrée : le score. Le fond gris du "reste" est gérée par 'background' */}
              <RadialBar
                background={{ fill: "#FBFBFB" }}
                dataKey="value"
                cornerRadius={10}
                clockWise
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="score-center">
            <p className="score-value">{percent}%</p>
            <p className="score-text">
              de votre <br />
              objectif
            </p>
          </div>
        </div>
      ) : (
        // TODO : remplacer par un loader si besoin
        <p>Loading...</p>
      )}
    </>
  );
}

// Schéma des props
RechartsScore.propTypes = {
  userId: PropTypes.number.isRequired,
};
