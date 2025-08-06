import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Habbit Management App",
    description: "A simple and effective app to help you build, track, and manage your habits and daily tasks for a better life.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`h-full ${poppins.variable}`}>
            <body className="antialiased h-full">{children}</body>
        </html>
    );
}
