/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Link, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IoCar,
  IoCarOutline,
  IoPersonCircle,
  IoPersonCircleOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";

export default function BottomNavigation() {

const router = useRouter();
const [currentSite, setCurrentSite] =useState<'search-trip'| 'create-trip'| 'profiles'>()
useEffect(()=>{
if(router.pathname.startsWith('/trips/create')){
  setCurrentSite('create-trip')
}
else if(router.pathname.startsWith('/trips')){
  setCurrentSite('search-trip')
}
else if (router.pathname.startsWith('/profiles')){
  setCurrentSite('profiles')
}
},[router.pathname])

  return (
    <Box className="flex h-full w-full flex-row justify-between bg-cyan-900">
      <Link as={NextLink} href="/trips" className="py-[2.156rem] pl-[4.313rem]">
        <Icon as={currentSite === 'search-trip'? IoSearchOutline:IoSearch} color="white" boxSize={`1.5rem`} />
      </Link>
      <Link as={NextLink} href="/trips/create" className="py-[2.156rem]">
      <Icon as={currentSite === 'create-trip'? IoCarOutline:IoCar} color="white" boxSize={`1.5rem`} />
      </Link>
      <Link
        as={NextLink}
        href="/profiles/me"
        className="py-[2.156rem] pr-[4.313rem]"
      >
      <Icon as={currentSite === 'profiles'? IoPersonCircleOutline:IoPersonCircle} color="white" boxSize={`1.5rem`} />
      </Link>
    </Box>
  );
}
