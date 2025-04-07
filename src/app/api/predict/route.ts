import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TrendPrediction } from "@/utils/ai";

// Check for API key at the route level
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error(
    "The GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set. Please add it to your .env.local file."
  );
}

export async function POST(request: Request) {
  try {
    const { topic, domain } = await request.json();

    if (!topic || !domain) {
      return NextResponse.json(
        { error: "Topic and domain are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `You are a JSON generator analyzing trends. Return ONLY a valid JSON object (no explanations, no markdown, no comments, no extra text).

Required JSON structure:
{
  "shortTerm": {
    "points": [
      "First specific point about immediate developments",
      "Second specific point about immediate developments",
      "Third specific point about immediate developments"
    ],
    "highlights": [
      "First key metric or highlight",
      "Second key metric or highlight"
    ]
  },
  "midTerm": {
    "points": [
      "First point about medium-term developments",
      "Second point about medium-term developments",
      "Third point about medium-term developments"
    ],
    "highlights": [
      "First key metric or highlight",
      "Second key metric or highlight"
    ]
  },
  "longTerm": {
    "points": [
      "First point about long-term impact",
      "Second point about long-term impact",
      "Third point about long-term impact"
    ],
    "highlights": [
      "First key metric or highlight",
      "Second key metric or highlight"
    ]
  },
  "keywords": [
    "keyword1",
    "keyword2",
    "keyword3",
    "keyword4",
    "keyword5"
  ],
  "hypeScore": 75,
  "hypeScoreInterpretation": {
    "meaning": "Detailed interpretation of the score",
    "impact": "How this affects the market",
    "opportunities": [
      "First opportunity",
      "Second opportunity",
      "Third opportunity"
    ],
    "challenges": [
      "First challenge",
      "Second challenge",
      "Third challenge"
    ],
    "recommendations": [
      "First recommendation",
      "Second recommendation",
      "Third recommendation"
    ]
  }
}

Analyze the trend "${topic}" in the ${domain} domain and fill in the JSON structure above with relevant predictions and insights. Ensure:
1. Short-term covers next 1-2 years
2. Mid-term covers 2-5 years
3. Long-term covers 5+ years
4. All points are specific and actionable
5. Highlights include metrics where possible
6. Keywords are relevant and specific
7. Hype score (0-100) reflects current momentum
8. Interpretation is detailed and domain-specific

IMPORTANT: Return ONLY the JSON object. No other text, no explanations, no markdown formatting, no comments. The response must start with { and end with }.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Aggressive cleaning of the response text
    const cleanText = (text: string): string => {
      // Remove any non-JSON content before the first { and after the last }
      const firstBrace = text.indexOf("{");
      const lastBrace = text.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("Invalid JSON structure: Missing braces");
      }

      text = text.slice(firstBrace, lastBrace + 1);

      // Remove markdown code blocks
      text = text.replace(/```json\s*/g, "").replace(/```\s*/g, "");

      // Remove comments
      text = text.replace(/\/\*[\s\S]*?\*\//g, ""); // Multi-line comments
      text = text.replace(/\/\/.*/g, ""); // Single-line comments

      // Remove extra whitespace and line breaks
      text = text.replace(/\s+/g, " ").trim();

      // Validate JSON structure
      if (!text.startsWith("{") || !text.endsWith("}")) {
        throw new Error(
          "Invalid JSON structure: Must start with { and end with }"
        );
      }

      return text;
    };

    const validatePrediction = (
      prediction: any
    ): prediction is TrendPrediction => {
      if (!prediction || typeof prediction !== "object") return false;

      // Check required sections
      const requiredSections = ["shortTerm", "midTerm", "longTerm"];
      for (const section of requiredSections) {
        if (!prediction[section]?.points?.length) return false;
      }

      // Check hype score
      if (
        typeof prediction.hypeScore !== "number" ||
        prediction.hypeScore < 0 ||
        prediction.hypeScore > 100
      )
        return false;

      // Check keywords
      if (
        !Array.isArray(prediction.keywords) ||
        prediction.keywords.length === 0
      )
        return false;

      // Check hype score interpretation
      const interpretation = prediction.hypeScoreInterpretation;
      if (
        !interpretation?.meaning ||
        !interpretation?.impact ||
        !Array.isArray(interpretation?.opportunities) ||
        !Array.isArray(interpretation?.challenges) ||
        !Array.isArray(interpretation?.recommendations)
      )
        return false;

      return true;
    };

    try {
      // Clean and parse the text
      const cleanedText = cleanText(text);
      const prediction = JSON.parse(cleanedText);

      // Validate the prediction structure
      if (!validatePrediction(prediction)) {
        throw new Error("Invalid prediction structure");
      }

      // Get current year for timeline
      const currentYear = new Date().getFullYear();

      // Generate timeline
      const timeline = [
        {
          year: currentYear - 2,
          event: "Early Adoption Phase",
          category: "milestone" as const,
          description: `Initial emergence of ${topic} in the market with early adopters and pioneering implementations.`,
          impact: "Set the foundation for future growth and market acceptance",
        },
        {
          year: currentYear - 1,
          event: "Market Validation",
          category: "trend" as const,
          description: `Growing acceptance of ${topic} with increased investment and market validation from major players.`,
          impact: "Established credibility and attracted mainstream attention",
        },
        {
          year: currentYear,
          event: "Current State Analysis",
          category: "trend" as const,
          description: `${topic} shows significant market presence with established use cases and proven benefits.`,
          impact:
            "Driving innovation and creating new opportunities across industries",
        },
        {
          year: currentYear + 1,
          event: "Near-Term Projection",
          category: "prediction" as const,
          description: `Expected evolution of ${topic} with enhanced capabilities and broader adoption.`,
          impact:
            "Potential to reshape existing business models and create new value propositions",
        },
        {
          year: currentYear + 2,
          event: "Future Outlook",
          category: "prediction" as const,
          description: `Anticipated maturation of ${topic} with advanced features and widespread implementation.`,
          impact:
            "Could fundamentally transform industry practices and user experiences",
        },
        {
          year: currentYear + 3,
          event: "Long-Term Impact",
          category: "impact" as const,
          description: `Projected long-term effects of ${topic} on industry standards and market dynamics.`,
          impact:
            "May lead to paradigm shifts in how businesses operate and compete",
        },
      ];

      // Add timeline to prediction
      prediction.timeline = timeline;

      return NextResponse.json(prediction);
    } catch (error) {
      console.error("Error processing prediction:", error);
      console.error("Raw text:", text);
      return NextResponse.json(
        { error: "Failed to process prediction data" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in prediction route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
