"use client";
import React from "react";
import {type NextPage} from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <div>
      <h1>TESTING</h1>
      <p>User State: {session.status}</p>
      <p>User ID: {session.data?.user?.id}</p>
      <p>User E-Mail: {session.data?.user?.email}</p>

      <div className={'flex justify-around'}>
        <Link href={'/auth/signin'}>Sign In</Link>
        <Link href={'/register'}>Register</Link>
      </div>
    </div>
  );
};

export default Home;
