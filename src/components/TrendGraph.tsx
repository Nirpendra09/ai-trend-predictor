"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import HypeScoreDetails from "./HypeScoreDetails";
import { TrendPrediction } from "@/utils/ai";

interface TrendGraphProps {
  prediction: TrendPrediction;
}

export default function TrendGraph({ prediction }: TrendGraphProps) {
  const { hypeScore } = prediction;

  // Get hype level description based on score
  const getHypeLevel = (score: number) => {
    if (score >= 80)
      return { level: "Very High", color: "text-red-600", bg: "bg-red-50" };
    if (score >= 60)
      return { level: "High", color: "text-orange-600", bg: "bg-orange-50" };
    if (score >= 40)
      return {
        level: "Moderate",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    if (score >= 20)
      return { level: "Low", color: "text-green-600", bg: "bg-green-50" };
    return { level: "Very Low", color: "text-blue-600", bg: "bg-blue-50" };
  };

  const hypeLevel = getHypeLevel(hypeScore);

  // Generate trend data showing current interest and projected growth
  const data = Array.from({ length: 12 }, (_, i) => {
    const baseValue = (hypeScore / 100) * 80; // Max value based on hype score
    const month = new Date(2024, i, 1).toLocaleString("default", {
      month: "short",
    });

    // Calculate interest score (current trend)
    const interestScore = Math.max(
      0,
      Math.min(100, baseValue + (Math.random() * 20 - 10))
    );

    // Calculate projected growth (future potential)
    const growthScore = Math.max(
      0,
      Math.min(100, interestScore * (1 + i * 0.05) + (Math.random() * 10 - 5))
    );

    return {
      month,
      "Current Interest": Math.round(interestScore),
      "Projected Growth": Math.round(growthScore),
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Interest & Growth Metrics
          </h3>
          <p className="text-sm text-gray-500">
            Shows current interest levels and projected growth over time
          </p>
        </div>
        <div className={`${hypeLevel.bg} p-4 rounded-lg space-y-2`}>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-600">
              Hype Score
            </span>
            <span className={`text-lg font-bold ${hypeLevel.color}`}>
              {hypeScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                hypeScore >= 80
                  ? "bg-red-500"
                  : hypeScore >= 60
                  ? "bg-orange-500"
                  : hypeScore >= 40
                  ? "bg-yellow-500"
                  : hypeScore >= 20
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${hypeScore}%` }}
            />
          </div>
          <p className={`text-xs ${hypeLevel.color} font-medium`}>
            {hypeLevel.level} Hype Level -{" "}
            {hypeScore >= 80
              ? "Trending significantly with high momentum"
              : hypeScore >= 60
              ? "Strong interest and growing rapidly"
              : hypeScore >= 40
              ? "Steady interest with potential for growth"
              : hypeScore >= 20
              ? "Emerging trend with moderate interest"
              : "Early stage with limited current interest"}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#666" }}
              axisLine={{ stroke: "#666" }}
            />
            <YAxis
              tick={{ fill: "#666" }}
              axisLine={{ stroke: "#666" }}
              label={{
                value: "Interest Level",
                angle: -90,
                position: "insideLeft",
                fill: "#666",
                offset: 0,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="Current Interest"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "#2563eb" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Projected Growth"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ fill: "#16a34a" }}
              activeDot={{ r: 8 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <HypeScoreDetails prediction={prediction} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700">
            Current Interest
          </h4>
          <p className="text-xs text-blue-600">
            Shows the present trend level based on available data
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-green-700">
            Projected Growth
          </h4>
          <p className="text-xs text-green-600">
            Estimated future trend based on hype score and current interest
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700">
            What is a Hype Score?
          </h4>
          <p className="text-xs text-gray-600">
            A measure (0-100) of current buzz and future potential. Considers
            factors like media attention, market interest, and growth
            trajectory.
          </p>
        </div>
      </div>
    </div>
  );
}
