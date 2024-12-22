import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

import localFont from "next/font/local";
const geistSans = localFont({
	src: "../../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "../../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Todos NextJS Supabase",
	description: "",
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
				<div className="flex h-screen flex-col">
					<div className="flex-grow">{children}</div>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
