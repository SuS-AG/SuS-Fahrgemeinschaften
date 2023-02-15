/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Footer from "../components/footer/footer";

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
          className="mx-auto my-[4.938rem] h-[8rem] w-[8rem]"
        />
      </div>
      <div className="container  justify-center text-center">
        <p className="text-4xl font-extrabold"> Willkommen</p>
        <p className="text-2xl font-extrabold">bei</p>
        <p className="text-2xl font-extrabold">SUS-Fahrgemeinschaften</p>
      </div>
      <div className="container m-5 mx-auto block w-56 justify-center">
        <Input placeholder="E-Mail" className="my-2" />
        <Input placeholder="Passwort" className="my-2" />
        <Input placeholder="Passwort wiederholen" className="my-2" />
        <Button colorScheme="teal" size="md" className="mx-7 w-[10.625rem]">
          Anmelden
        </Button>
      </div>
      <div className="container mx-auto h-[100%] w-[100%] justify-center text-center text-xs">
        <p>
          Hast Du bereits ein Konto? Melde dich{" "}
          <a href="" className="text-blue-500 underline">
            hier
          </a>{" "}
          an.
        </p>
      </div>
      <Footer />
    </div>
  );
}
