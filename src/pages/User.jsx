import { useParams } from "react-router-dom";
import CaloriesIcon from "../assets/calories-icon.svg";
import CarbsIcon from "../assets/carbs-icon.svg";
import FatIcon from "../assets/fat-icon.svg";
import ProteinIcon from "../assets/protein-icon.svg";
import Header from "../components/Header";
import RechartsActivity from "../components/RechartsActivity";
import RechartsAverageSessions from "../components/RechartsAverageSessions";
import RechartsPerformance from "../components/RechartsPerformance";
import RechartsScore from "../components/RechartsScore";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import userMainData from "../mocks/userMock";
import "./User.css";

export default function User() {
  const { id } = useParams();
  const user = userMainData.find((user) => user.id == id) ?? null;

  if (!user) {
    return <p>Utilisateur introuvable</p>;
  }

  const { firstName } = user.userInfos;
  const statCardsDatas = [
    {
      icon: CaloriesIcon,
      label: "Calories",
      value: user.keyData.calorieCount,
      unit: "kCal",
    },
    {
      icon: ProteinIcon,
      label: "Protéines",
      value: user.keyData.proteinCount,
      unit: "g",
    },
    {
      icon: CarbsIcon,
      label: "Glucides",
      value: user.keyData.carbohydrateCount,
      unit: "g",
    },
    {
      icon: FatIcon,
      label: "Lipides",
      value: user.keyData.lipidCount,
      unit: "g",
    },
  ];

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
              <RechartsActivity />
              <div className="user-subcharts">
                <div className="user-chart">
                  <RechartsAverageSessions />
                </div>
                <div className="user-chart">
                  <RechartsPerformance />
                </div>
                <div className="user-chart">
                  <RechartsScore />
                </div>
              </div>
            </div>
            <div className="user-stats">
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
