"use client";
import {type NextPage} from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {api} from "../utils/api";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const session = useSession();

  return (
      <Box className={'grid grid-rows-layout h-full'}>
        <Box className='h-full'>
          <p>
            {session.status}
          </p>
          <p>
            {session.data?.user?.email}
          </p>
        </Box>
        <Box>
        </Box>
      </Box>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: me } = api.profile.me.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
        {me && <span> - <>{me.firstname}</></span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn(undefined, {redirect: true})}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
