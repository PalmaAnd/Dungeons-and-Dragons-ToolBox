import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css"; // Make sure this import is present

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
        <html lang="en" className="light">
            <body
                className={`${geist.variable} font-sans antialiased min-h-screen bg-background`}
            >
                <div className="relative flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <div className="container px-4 py-8">{children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
