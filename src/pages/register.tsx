import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Register() {
  return (
    <div className="container h-[100%] w-[100%]">
      <div
        className="container mx-auto 
      flex h-[100%] w-[100%]"
      >
        <Image
          src={logo}
          alt=""
          className="mx-auto my-[79px] h-[128px] w-[128px]"
        />
      </div>
      <div className="container  justify-center text-center">
        <p className="text-4xl font-extrabold"> Willkommen</p>
        <p className="text-2xl font-extrabold">bei</p>
        <p className="text-2xl font-extrabold">SUS-Fahrgemeinschaften</p>
      </div>
      <div className="container block m-5 mx-auto w-56 justify-center">
        <Input placeholder="E-Mail" className="my-2" />
        <Input placeholder="Passwort" className="my-2" />
        <Input placeholder="Passwort wiederholen" className="my-2" />
        <Button colorScheme="teal" size="md" className="w-[170px] mx-7" > Anmelden</Button>

      </div>

    </div>
  );
}
