import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { Curtain } from "@/components/cortain";

// Use system fonts as fallback to avoid Google Fonts fetch issues
const fontClassName = "font-sans";

export const metadata: Metadata = {
  title: "EL MEHDI ELFERRY - Portfolio",
  description: "Software Engineer and Full-stack Web Developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontClassName} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Curtain>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </Curtain>
        </ThemeProvider>
      </body>
    </html>
  );
}
