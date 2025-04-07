"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchInput from "@/components/SearchInput";
import Timeline from "@/components/Timeline";
import TrendGraph from "@/components/TrendGraph";
import KeywordCloud from "@/components/KeywordCloud";
import { Header } from "@/components/Header";
import { LoadingStates } from "@/components/LoadingStates";
import { PredictionCard } from "@/components/PredictionCard";
import { generateTrendPrediction, type TrendPrediction } from "@/utils/ai";
import "@/styles/animations.css";

const predictionCards = [
  {
    title: "Short-term",
    color: "blue" as const,
    slideDirection: "left" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
  },
  {
    title: "Mid-term",
    color: "indigo" as const,
    slideDirection: "up" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    title: "Long-term",
    color: "purple" as const,
    slideDirection: "right" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
] as const;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<TrendPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (topic: string, domain: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateTrendPrediction(topic, domain);
      setPrediction(result);
    } catch (error) {
      console.error("Error generating prediction:", error);
      setError("Failed to generate prediction. Please try again.");
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      <Header isScrolled={isScrolled} />

      {/* Search Section */}
      <motion.section
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-32 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.div
            className="absolute -top-32 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm"
            >
              <p className="text-red-600 text-center">{error}</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Loading State */}
      {isLoading && <LoadingStates />}

      {/* Results Section */}
      {prediction && !isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
          {/* Predictions */}
          <div className="grid md:grid-cols-3 gap-6">
            {predictionCards.map((card, index) => {
              const data =
                prediction[
                  card.title === "Short-term"
                    ? "shortTerm"
                    : card.title === "Mid-term"
                    ? "midTerm"
                    : "longTerm"
                ];
              return (
                <PredictionCard
                  key={card.title}
                  {...card}
                  data={data}
                  index={index}
                />
              );
            })}
          </div>

          {/* Trend Graph */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.8,
              delay: 0.3,
            }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <TrendGraph prediction={prediction} />
          </motion.div>

          {/* Keywords */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.8,
              delay: 0.4,
            }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Related Topics
            </h2>
            <KeywordCloud keywords={prediction.keywords} />
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.8,
              delay: 0.5,
            }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Timeline
            </h2>
            <Timeline events={prediction.timeline} />
          </motion.div>
        </div>
      )}
    </main>
  );
}
