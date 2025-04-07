import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Trend Predictor | Discover Future Trends",
  description:
    "Explore future trends, analyze market potential, and discover growth opportunities with AI-powered predictions and insights.",
  keywords: [
    "AI",
    "trends",
    "predictions",
    "market analysis",
    "future insights",
    "trend forecasting",
  ],
  authors: [{ name: "AI Trend Predictor" }],
  openGraph: {
    title: "AI Trend Predictor | Discover Future Trends",
    description:
      "Explore future trends, analyze market potential, and discover growth opportunities with AI-powered predictions and insights.",
    type: "website",
    siteName: "AI Trend Predictor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Trend Predictor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Trend Predictor | Discover Future Trends",
    description:
      "Explore future trends, analyze market potential, and discover growth opportunities with AI-powered predictions and insights.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  themeColor: "#4F46E5",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
