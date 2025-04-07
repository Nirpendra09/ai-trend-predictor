"use client";

import { motion } from "framer-motion";

interface KeywordCloudProps {
  keywords: string[];
}

export default function KeywordCloud({ keywords }: KeywordCloudProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {keywords.map((keyword, index) => (
          <motion.div
            key={keyword}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
          >
            {keyword}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
