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

export default function RechartsPerformance() {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const userPerformanceService1 = new UserPerformanceService(
      import.meta.env.VITE_USER_ID
    );
    userPerformanceService1.getData().then((performanceData_) => {
      setPerformanceData(performanceData_);
    });
  }, []);

  return (
    <>
      {performanceData ? (
        <div className="performance-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="75%" data={performanceData}>
              <PolarGrid
                radialLines={false}
                stroke="#FFFFFF"
                polarRadius={[0, 10, 22, 45, 65, 85]}
              />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#FFFFFF", fontSize: 12 }}
                stroke="#FFFFFF"
                tickLine={false}
                axisLine={false}
                tickSize={5}
              />
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                domain={[0, "dataMax + 20"]}
              />
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
        <p>Loading...</p>
      )}
    </>
  );
}
