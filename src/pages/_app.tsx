import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
		<main className={`font-sans ${inter.variable} bg-gradient-to-b from-[#3f0101] to-[#2c2d35]`}>
			<Header></Header>
			<Component {...pageProps} />
			<SpeedInsights />
			<Footer></Footer>
		</main>
	);
};

export default api.withTRPC(MyApp);
