import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [message, setMessage] = useState("No message found");
  const [username, setUsername] = useState("reszi");
  const [password, setPassword] = useState("");
  const [minRAM, setMinRAM] = useState("1024");
  const [maxRAM, setMaxRAM] = useState("2048");
  const [version, setVersion] = useState("1.7.10");

  React.useEffect(() => {
    window.ipc.on("logIn", (message) => {
      console.log(message);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-javascript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width="256px"
          height="256px"
        />
      </div>
      <div>
        <button
          onClick={() => {
            window.ipc.send("logIn", {
              username,
              password,
              minRAM,
              maxRAM,
              version,
            });
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
}
