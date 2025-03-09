import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SkipToContent } from "@/components/skip-to-content";
import SpinningD20 from "@/components/spinning-d20"; // Import the new component
import "./globals.css";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "D&D Toolbox",
    description: "Your ultimate companion for Dungeons and Dragons adventures",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geist.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
            >
                <ThemeProvider defaultTheme="system">
                    <SkipToContent />
                    <SpinningD20 />
                    <div className="relative flex min-h-screen flex-col">
                        <Navbar />
                        <main id="main-content" className="flex-1">
                            <div className="container">{children}</div>
                        </main>
                        <footer className="py-6 border-t">
                            <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                                <p className="text-center md:text-left text-sm">
                                    © {new Date().getFullYear()} D&D Toolbox -
                                    Palma Andre All rights reserved.
                                </p>
                                <p className="text-center md:text-right text-sm text-muted-foreground">
                                    Made with <span aria-label="love">❤️</span>{" "}
                                    for D&D enthusiasts
                                </p>
                            </div>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
