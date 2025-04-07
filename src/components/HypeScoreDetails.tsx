"use client";

import { motion } from "framer-motion";
import { TrendPrediction } from "@/utils/ai";

interface HypeScoreDetailsProps {
  prediction: TrendPrediction;
}

export default function HypeScoreDetails({
  prediction,
}: HypeScoreDetailsProps) {
  const { hypeScore, hypeScoreInterpretation } = prediction;

  // Get color based on hype score
  const getColor = (score: number) => {
    if (score >= 80)
      return {
        text: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      };
    if (score >= 60)
      return {
        text: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
      };
    if (score >= 40)
      return {
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
      };
    if (score >= 20)
      return {
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      };
    return {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    };
  };

  const colors = getColor(hypeScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-6"
    >
      <div className={`${colors.bg} p-4 rounded-lg border ${colors.border}`}>
        <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>
          What This Hype Score Means
        </h3>
        <p className="text-gray-700">{hypeScoreInterpretation.meaning}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Market Impact
        </h3>
        <p className="text-gray-700">{hypeScoreInterpretation.impact}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Opportunities
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {hypeScoreInterpretation.opportunities.map((opportunity, index) => (
              <li key={index} className="text-gray-700">
                {opportunity}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-700 mb-2">
            Challenges
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {hypeScoreInterpretation.challenges.map((challenge, index) => (
              <li key={index} className="text-gray-700">
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Recommendations
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {hypeScoreInterpretation.recommendations.map(
            (recommendation, index) => (
              <li key={index} className="text-gray-700">
                {recommendation}
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
}
