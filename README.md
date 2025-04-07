# AI Trend Predictor

A modern web application that uses AI to predict and analyze trends across various domains. Built with Next.js, Tailwind CSS, and Google's Generative AI.

## Features

- 🔍 Search any topic and get AI-powered predictions
- 📈 Interactive trend graphs and visualizations
- ⏳ Timeline view of past and predicted events
- 🏷️ Related keywords and topics
- 📊 Hype score analysis
- 🎯 Domain-specific predictions

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Recharts for data visualization
- Google Generative AI (Gemini)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-trend-predictor.git
cd ai-trend-predictor
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your API keys:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `GOOGLE_GENERATIVE_AI_API_KEY`: Required for AI predictions (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Project Structure

```
src/
├── app/
│   └── page.tsx           # Main page component
├── components/
│   ├── SearchInput.tsx    # Search input with domain selection
│   ├── Timeline.tsx       # Timeline visualization
│   ├── TrendGraph.tsx     # Trend graph using Recharts
│   └── KeywordCloud.tsx   # Related keywords display
└── utils/
    └── ai.ts             # AI integration utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Generative AI](https://ai.google.dev)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)
