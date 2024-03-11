import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<main
			className={`font-sans ${inter.variable} min-h-screen bg-gradient-to-b from-[#3f0101] to-[#2c2d35] text-white`}
		>
			<Header></Header>
			<Component {...pageProps} />
			<SpeedInsights />
			<Analytics/>
			<Footer></Footer>
		</main>
	);
};

export default api.withTRPC(MyApp);
