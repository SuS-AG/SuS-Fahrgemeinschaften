/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import { Box, FormControl, Input, Link, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Footer from "../../components/footer/footer";

export default function Signin() {
  return (
    <Box className=" h-full w-full grid grid-rows-layout">
     <Box>
     <Box
        className=" mx-auto 
      flex"
      >
        <Image
          src={logo}
          alt=""
          className="mx-auto my-[4.938rem] h-[8rem] w-[8rem]"
        />
      </Box>
      <Box className="justify-center text-center">
        <Text className="text-4xl font-extrabold"> Login</Text>
      </Box>

      <Box className=" m-5 mx-auto  w-56 justify-center content-center">
        <form action="">
          <FormControl>
            <Input type="email" placeholder="E-Mail" className="my-2" />
            <Input type="password" placeholder="Passwort" className="my-2" />

            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              className="mx-7 w-[10.625rem]"
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
      <Box className=" mx-auto justify-center text-center text-xs">
        <Text>
          Hast Du noch kein Konto? Erstelle {" "}
          <Link color="teal.500" href="#">
            hier{" "}
          </Link>
          eins.
        </Text>
      </Box>
     </Box>
     
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
