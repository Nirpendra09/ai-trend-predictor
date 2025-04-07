"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SearchInputProps {
  onSearch: (topic: string, domain: string) => void;
  isLoading: boolean;
}

const domains = [
  "Technology",
  "Health",
  "Finance",
  "Education",
  "Environment",
  "Entertainment",
];

export default function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [topic, setTopic] = useState("");
  const [domain, setDomain] = useState("Technology");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSearch(topic.trim(), domain);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Explore Future Trends
        </h2>
        <p className="text-gray-600">
          Enter a topic to discover its growth potential and market trajectory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., AI, electric vehicles, remote work)"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow-sm transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
          </div>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow-sm transition-all duration-200 bg-white text-gray-800 cursor-pointer hover:border-gray-300"
            disabled={isLoading}
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-medium text-lg shadow-lg transition-all duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:-translate-y-0.5"
          }`}
        >
          {isLoading ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            "Predict Trend"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
