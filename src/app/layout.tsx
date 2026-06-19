import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif, Fraunces } from "next/font/google";
import ThemeProvider from "../components/theme/ThemeProvider";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

// Loader monogram font.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
  style: "italic",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Ashik — Full-stack Developer",
  description:
    "Personal website of Ashik — backend by profession, full-stack by passion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${fraunces.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
