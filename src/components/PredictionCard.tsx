import { motion, type Variants } from "framer-motion";
import type { ReactElement } from "react";
import type { TrendPrediction } from "@/utils/ai";

export type PredictionCardProps = {
  title: string;
  color: "blue" | "indigo" | "purple";
  data:
    | TrendPrediction["shortTerm"]
    | TrendPrediction["midTerm"]
    | TrendPrediction["longTerm"];
  slideDirection: "left" | "right" | "up";
  icon: ReactElement;
  index: number;
};

const cardVariants: Variants = {
  hidden: (direction: "left" | "right" | "up") => ({
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? 50 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
} as const;

export function PredictionCard({
  title,
  color,
  data,
  slideDirection,
  icon,
  index,
}: PredictionCardProps) {
  return (
    <motion.div
      key={title}
      custom={slideDirection}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        delay: index * 0.2,
      }}
      className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className={`p-2 bg-${color}-100 rounded-lg`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-${color}-600`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {icon}
          </svg>
        </span>
        <h2 className={`text-xl font-semibold text-${color}-600`}>{title}</h2>
      </div>
      <div className="space-y-3">
        {data.points.map((point, pointIndex) => (
          <motion.div
            key={pointIndex}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.2 + pointIndex * 0.1,
              ease: "easeOut",
            }}
          >
            <span
              className={`mt-1.5 h-2 w-2 bg-${color}-400 rounded-full flex-shrink-0`}
            />
            <p className="text-gray-600 leading-relaxed">{point}</p>
          </motion.div>
        ))}
        {data.highlights && data.highlights.length > 0 && (
          <motion.div
            className={`mt-4 p-3 bg-${color}-50 rounded-lg border border-${color}-100`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.2 + 0.3,
              ease: "easeOut",
            }}
          >
            <p className={`text-sm font-medium text-${color}-800 mb-2`}>
              Key Highlights:
            </p>
            {data.highlights.map((highlight, highlightIndex) => (
              <motion.p
                key={highlightIndex}
                className={`text-sm text-${color}-600`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.2 + highlightIndex * 0.1 + 0.4,
                  ease: "easeOut",
                }}
              >
                {highlight}
              </motion.p>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
