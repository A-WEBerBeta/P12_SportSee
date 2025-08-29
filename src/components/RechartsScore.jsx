import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

import { useEffect, useState } from "react";
import UserScoreService from "../services/userScoreService";
import "./RechartsScore.css";

export default function RechartsScore() {
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const userScoreService1 = new UserScoreService(
      import.meta.env.VITE_USER_ID
    );
    userScoreService1.getData().then((scoreData_) => {
      setScoreData(scoreData_);
    });
  }, []);

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
              innerRadius="65%"
              outerRadius="80%"
              barSize={10}
              startAngle={90}
              endAngle={450}
              data={scoreData}
            >
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
        <p>Loading...</p>
      )}
    </>
  );
}
