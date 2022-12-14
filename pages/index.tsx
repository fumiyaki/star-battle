import type { NextPage } from "next";
import Head from "next/head";
import Top from "../src/components/pages/Top";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Github Star Wars</title>
        <meta name="description" content="Github Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Top />
    </>
  );
};

export default Home;
