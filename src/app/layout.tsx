import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const basePath = process.env.GITHUB_PAGES === 'true' ? '/mockit' : '';

export const metadata: Metadata = {
  title: "Mockit - Beautiful Screenshot Mockups",
  description: "Create stunning device mockups for your screenshots in seconds",
  icons: {
    icon: `${basePath}/logo.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased animated-bg min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
