export interface TrendPrediction {
  shortTerm: {
    points: string[];
    highlights?: string[];
  };
  midTerm: {
    points: string[];
    highlights?: string[];
  };
  longTerm: {
    points: string[];
    highlights?: string[];
  };
  keywords: string[];
  hypeScore: number;
  timeline: {
    year: number;
    event: string;
    category: "milestone" | "trend" | "prediction" | "impact";
    description: string;
    impact?: string;
  }[];
  hypeScoreInterpretation: {
    meaning: string;
    impact: string;
    opportunities: string[];
    challenges: string[];
    recommendations: string[];
  };
}

export async function generateTrendPrediction(
  topic: string,
  domain?: string
): Promise<TrendPrediction> {
  const response = await fetch("/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic, domain }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate trend prediction");
  }

  return response.json();
}
