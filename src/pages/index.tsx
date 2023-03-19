"use client";
import React from "react";
import {type NextPage} from "next";
import {getSession, useSession} from "next-auth/react";
import Link from "next/link";
import type {GetServerSideProps} from "next";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user?.id) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/trips',
      }
    }
  } else {
    return {
      redirect: {
        statusCode: 302,
        destination: '/auth/signin',
      }
    }
  }
}

export default Home;
