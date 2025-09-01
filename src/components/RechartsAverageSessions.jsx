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
    const userAverageSessionsService1 = new UserAverageSessionsService(userId);
    userAverageSessionsService1.getData().then((averageSessionsData_) => {
      setAverageSessionsData(averageSessionsData_);
    });
  }, [userId]);

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
              <YAxis hide={true} domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip
                content={<CustomTooltipAverage />}
                cursor={<CustomCursorAverage height={263} width={79} />}
              />
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
        <p>Loading...</p>
      )}
    </>
  );
}
