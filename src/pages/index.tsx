import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>D&D Toolbox</title>
        <meta name="description" content="Tools for Dungeons and Dragons" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      {/* <Header></Header> */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#3f0101] to-[#2c2d35]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(0,63%,26%)]">Dungeons and Dragons</span>{" "}
            - Toolbox
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/players"
            >
              <h3 className="text-2xl font-bold">Player - ToolBox →</h3>
              <div className="text-lg">
                Everything you as a player could need to play a game.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/dungeon_master"
            >
              <h3 className="text-2xl font-bold">DM - ToolBox →</h3>
              <div className="text-lg">Everything you need to run a game.</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
