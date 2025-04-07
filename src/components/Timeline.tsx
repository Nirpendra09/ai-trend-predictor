"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
  year: number;
  event: string;
  category: "milestone" | "trend" | "prediction" | "impact";
  description: string;
  impact?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  // Color variations for timeline events based on category
  const categoryColors = {
    milestone: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      icon: "🏆",
    },
    trend: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      icon: "📈",
    },
    prediction: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-600",
      icon: "🔮",
    },
    impact: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-600",
      icon: "💫",
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative">
        {/* Timeline line with gradient */}
        <div className="absolute h-full w-1.5 bg-gradient-to-b from-blue-400 via-purple-400 to-indigo-400 left-1/2 transform -translate-x-1/2 rounded-full" />

        {/* Events */}
        <div className="space-y-12">
          {sortedEvents.map((event, index) => {
            const color = categoryColors[event.category];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Event content */}
                <div className="w-5/12">
                  <motion.div
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className={`p-4 ${color.bg} rounded-lg shadow-lg border ${color.border} transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.1 }}
                        className={`w-8 h-8 ${color.text} bg-white rounded-full flex items-center justify-center font-bold shadow-sm`}
                      >
                        {event.year}
                      </motion.div>
                      <div className={`h-0.5 flex-grow ${color.border}`} />
                      <span
                        className="text-xl"
                        role="img"
                        aria-label={event.category}
                      >
                        {color.icon}
                      </span>
                    </div>
                    <h3 className={`font-semibold mb-2 ${color.text}`}>
                      {event.event}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-2">
                      {event.description}
                    </p>
                    {event.impact && (
                      <div
                        className={`mt-2 p-2 rounded-md bg-white/50 text-sm ${color.text}`}
                      >
                        <span className="font-medium">Impact: </span>
                        {event.impact}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Timeline dot with pulse effect */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                    className="relative"
                  >
                    <div
                      className={`w-5 h-5 ${color.bg} rounded-full border-4 border-white shadow-md z-10 relative`}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 ${color.bg} rounded-full opacity-50`}
                    />
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
