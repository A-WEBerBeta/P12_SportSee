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

import { useEffect, useState } from "react";
import "./RechartsActivity.css";

export default function RechartsActivity() {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const userActivityService1 = new UserActivityService(
      import.meta.env.VITE_USER_ID
    );
    // const userActivityService2 = new UserActivityService(18)
    userActivityService1.getData().then((activityData_) => {
      // setTimeout(() => {
      // }, 3000);
      setActivityData(activityData_);
    });
  }, []);

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
          <ResponsiveContainer width="100%" height={242}>
            <BarChart
              data={activityData}
              margin={{ top: 50, right: 0, left: 0, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 14 }}
                tickMargin={16}
              />
              <YAxis
                dataKey="kilogram"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14 }}
                tickCount={3}
                domain={["dataMin - 1", "dataMax + 2"]}
                allowDecimals={false}
                tickMargin={36}
              />
              <YAxis
                yAxisId="calories"
                dataKey="calories"
                hide={true}
                domain={[0, "dataMax + 20"]}
              />
              <Tooltip
                content={<CustomTooltipActivity />}
                offset={20}
                wrapperStyle={{ marginTop: -20 }}
                cursor={{ fill: "rgba(196, 196, 196, 0.5", width: 56 }}
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
                yAxisId="calories"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
