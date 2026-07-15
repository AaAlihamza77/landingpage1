import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoXverse AI | Dental Clinic Operating System",
  description:
    "Help your dental clinic recover revenue, reduce no-shows, retain more patients, and make every enquiry count.",
  metadataBase: new URL("https://autoxverse.ai"),
  openGraph: {
    title: "AutoXverse AI | Dental Clinic Operating System",
    description: "More bookings, fewer no-shows, and better patient retention for modern dental clinics.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
