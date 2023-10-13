import React from "react";
import Head from "next/head";
import Link from "next/link";

const Home = () => {
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  return (
    <>
      <Head>
        <title>MineUp</title>
      </Head>
      <div>
        <Link href="/about">About Page</Link>
        <button
          onClick={() => {
            postData("http://localhost:3000/auth/login/", {
              username: "reszi.",
              password: "12345678aA",
            }).then((res) => {
              console.log(res.user);
            });
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Home;
