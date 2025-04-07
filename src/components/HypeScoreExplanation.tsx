"use client";

import { motion } from "framer-motion";

interface HypeScoreExplanationProps {
  score: number;
}

export default function HypeScoreExplanation({
  score,
}: HypeScoreExplanationProps) {
  const levels = [
    {
      range: "80-100",
      level: "Very High",
      color: "text-red-600",
      bg: "bg-red-50",
      description: "Topic is at peak popularity with:",
      examples: [
        "Major media coverage",
        "High investment activity",
        "Widespread adoption",
        "Significant market impact",
      ],
    },
    {
      range: "60-79",
      level: "High",
      color: "text-orange-600",
      bg: "bg-orange-50",
      description: "Topic shows strong momentum with:",
      examples: [
        "Growing media attention",
        "Increasing investment interest",
        "Early mainstream adoption",
        "Notable market potential",
      ],
    },
    {
      range: "40-59",
      level: "Moderate",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      description: "Topic has steady presence with:",
      examples: [
        "Regular media mentions",
        "Stable market interest",
        "Growing user base",
        "Proven use cases",
      ],
    },
    {
      range: "20-39",
      level: "Low",
      color: "text-green-600",
      bg: "bg-green-50",
      description: "Topic is emerging with:",
      examples: [
        "Occasional media coverage",
        "Early-stage development",
        "Niche user interest",
        "Potential for growth",
      ],
    },
    {
      range: "0-19",
      level: "Very Low",
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Topic is in early stages with:",
      examples: [
        "Limited media coverage",
        "Experimental phase",
        "Small user base",
        "Unproven market fit",
      ],
    },
  ];

  // Find the current level based on score
  const currentLevel =
    levels.find((level) => {
      const [min] = level.range.split("-").map(Number);
      return score >= min;
    }) || levels[levels.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Understanding Hype Score Levels
      </h3>

      <div className="space-y-6">
        {levels.map((level) => (
          <div
            key={level.range}
            className={`${
              level.range === currentLevel.range
                ? level.bg +
                  " border-l-4 border-" +
                  level.color.replace("text-", "")
                : ""
            } p-4 rounded-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-medium ${level.color}`}>
                {level.level} ({level.range})
              </h4>
              {level.range === currentLevel.range && (
                <span className="text-sm bg-white px-3 py-1 rounded-full border border-current">
                  Current Level
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{level.description}</p>
            <ul className="text-sm text-gray-500 list-disc list-inside">
              {level.examples.map((example, i) => (
                <li key={i}>{example}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          How is the Hype Score Calculated?
        </h4>
        <p className="text-sm text-gray-600">
          The hype score is calculated by analyzing multiple factors including:
          media coverage, market trends, investment activity, user adoption
          rates, and growth trajectory. The AI considers both current momentum
          and future potential to generate this comprehensive score.
        </p>
      </div>
    </motion.div>
  );
}
