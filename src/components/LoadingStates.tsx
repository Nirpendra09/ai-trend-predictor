import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const shimmerStyle = {
  backgroundImage:
    "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
  backgroundSize: "800px 100%",
  animation: "shimmer 2s infinite linear",
} as const;

const loadingMessages = [
  "Analyzing market trends...",
  "Processing historical data...",
  "Evaluating growth patterns...",
  "Calculating market potential...",
  "Identifying key opportunities...",
  "Generating predictions...",
  "Assessing market dynamics...",
  "Computing trend trajectories...",
] as const;

export function LoadingStates() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-medium text-blue-600"
        >
          {loadingMessages[messageIndex]}
        </motion.div>
        <div className="mt-4 flex justify-center space-x-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
            }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
            className="w-2 h-2 bg-indigo-600 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
            className="w-2 h-2 bg-purple-600 rounded-full"
          />
        </div>
      </motion.div>

      {/* Prediction Cards Loading */}
      <div className="grid md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg" style={shimmerStyle} />
              <div className="h-6 w-32 rounded" style={shimmerStyle} />
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-gray-200" />
                  <div className="h-4 w-full rounded" style={shimmerStyle} />
                </div>
              ))}
              <div className="mt-4 p-3 rounded-lg border border-gray-100">
                <div className="h-4 w-32 mb-2 rounded" style={shimmerStyle} />
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-full mt-2 rounded"
                    style={shimmerStyle}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graph Loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      >
        <div className="h-[300px] rounded-lg" style={shimmerStyle} />
      </motion.div>

      {/* Keywords Loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      >
        <div className="h-6 w-40 mb-4 rounded" style={shimmerStyle} />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 rounded-full"
              style={shimmerStyle}
            />
          ))}
        </div>
      </motion.div>

      {/* Timeline Loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      >
        <div className="h-6 w-32 mb-4 rounded" style={shimmerStyle} />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-4 mt-1 rounded-full" style={shimmerStyle} />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 rounded" style={shimmerStyle} />
                <div className="h-4 w-full rounded" style={shimmerStyle} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
