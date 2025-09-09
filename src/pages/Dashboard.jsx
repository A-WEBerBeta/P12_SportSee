/**
 * Page utilisateur : /user/:id
 *
 * Rôle :
 * - Récupère les infos utilisateur (prénom + keyData) via userScoreService.
 * - Construit les 4 cartes stats à partir de 'keyData' avec 'makeStatItems(...)'.
 * - Affiche les 4 graphiques Recharts (activité, sessions moyennes, performance, score).
 *
 * Données :
 * - La source (mocks ou API) est gérée par les services selon 'VITE_IS_PROD'.
 * - L'Id utilisateur provient de 'VITE_USER_ID' (env Vite).
 *
 * Remontées d'état :
 * - 'firstName' pour le header.
 * - 'statCardsDatas' (liste déjà prête pour <StatCard />).
 */

import { useEffect, useState } from "react";
import ErrorBanner from "../components/ErrorBanner";
import Header from "../components/Header";
import RechartsActivity from "../components/RechartsActivity";
import RechartsAverageSessions from "../components/RechartsAverageSessions";
import RechartsPerformance from "../components/RechartsPerformance";
import RechartsScore from "../components/RechartsScore";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import UserScoreService from "../services/userScoreService";
import { checkKeyData } from "../utils/checks";
import { makeStatItems } from "../utils/statCards";
import "./Dashboard.css";

export default function User() {
  // Id lu depuis les variables d'environnement Vite
  const id = import.meta.env.VITE_USER_ID;
  const userId = Number(id);

  // Liste d'items prêts pour <StatCard /> (icon/label/value/unit)
  const [statCardsDatas, setStatCardsDatas] = useState([]);
  // Prénom affiché dans le header
  const [firstName, setFirstName] = useState("");
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    // À chaque changement d'utilisateur, on refetch les infos "profil"
    // NOTE : getData(false) => renvoie la donnée BRUTE (API: data.data ; mocks: l'objet)
    const userScoreService = new UserScoreService(userId);
    userScoreService
      .getData(false)
      .then((user) => {
        const msg = checkKeyData(user?.keyData);
        if (msg) {
          setStatsError(msg);
          setStatCardsDatas([]);
          return;
        } else {
          setStatsError("");
          // Transforme user.keyData -> 4 items prêts pour <StatCard />
          setStatCardsDatas(makeStatItems(user.keyData));
          // Prénom pour l'accueil
          setFirstName(user.userInfos.firstName);
        }
      })
      .catch(() =>
        setStatsError("Statistiques : impossible de récupérer les données.")
      );
  }, [userId]); // Met à jour la page quand l'Id change

  return (
    <div>
      <Header />
      <div className="user-layout">
        <Sidebar />
        <main className="user-content">
          <h1>
            Bonjour <span className="user-name">{firstName}</span>
          </h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

          <div className="user-main">
            <div className="user-graphs">
              <RechartsActivity key={`activity-${userId}`} userId={userId} />
              <div className="user-subcharts">
                <div className="user-chart">
                  <RechartsAverageSessions
                    key={`avg-${userId}`}
                    userId={userId}
                  />
                </div>
                <div className="user-chart">
                  <RechartsPerformance key={`perf-${userId}`} userId={userId} />
                </div>
                <div className="user-chart">
                  <RechartsScore key={`score-${userId}`} userId={userId} />
                </div>
              </div>
            </div>
            <div className="user-stats">
              {statsError && <ErrorBanner message={statsError} />}
              {statCardsDatas.map((item, index) => (
                <StatCard
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  unit={item.unit}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
