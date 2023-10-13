import React from "react";
import Head from "next/head";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Head>
        <title>MineUp</title>
      </Head>
      <div>
        <Link href="/home">
          <a>Home Page</a>
        </Link>
      </div>
    </>
  );
};

export default About;
