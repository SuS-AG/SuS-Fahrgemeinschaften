"use client";
import {type NextPage} from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {api} from "../utils/api";
import TripCard from "../components/trip-card/trip-card";

const Home: NextPage = () => {
  return (
    <>
        <TripCard/>

    </>
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
  
      <TripCard/>
    </div>
  );
};
