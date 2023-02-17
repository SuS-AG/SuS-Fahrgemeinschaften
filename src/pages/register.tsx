/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import { Box, FormControl, Input, Link, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Footer from "../components/footer/footer";
import type {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";
import { useCallback, useState} from "react";
import NextLink from "next/link";
import {api} from "../utils/api";

export default function Register() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordRepeat, setPasswordRepeat] = useState<string>();
  const registerMutation = api.register.register.useMutation();

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.target.value;
    if (value === undefined) return;
    setEmail(value);
  }, [setEmail]);

  const handlePasswordChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.target.value;
    if (value === undefined) return;
    setPassword(value);
  }, [setPassword]);

  const handlePasswordRepeatChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.target.value;
    if (value === undefined) return;
    setPasswordRepeat(value);
  }, [setPasswordRepeat])

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement> & FormEventHandler<HTMLFormElement>>((e) => {
    if (password !== passwordRepeat) return;
    if (!email || !password) return;
    registerMutation
      .mutate({email, password})
    // TODO: Redirect user
  }, [registerMutation, email, password, passwordRepeat])
  
  return (
    <Box className=" grid h-full w-full grid-rows-layout">
      <Box>
        <Box
          className=" mx-auto 
      flex "
        >
          <Image
            src={logo}
            alt=""
            className="mx-auto my-[4.938rem] h-[8rem] w-[8rem]"
          />
        </Box>
        <Box className="justify-center text-center">
          <Text fontSize="4xl" fontWeight={"extrabold"}>
            {" "}
            Willkommen
          </Text>
          <Text fontSize="2xl" fontWeight={"extrabold"}>
            bei
          </Text>
          <Text fontSize="2xl" fontWeight={"extrabold"}>
            SUS-Fahrgemeinschaften
          </Text>
        </Box>

        <Box className="m-5 mx-auto block w-56 justify-center">
          <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              type="email"
              placeholder="E-Mail"
              className="my-2"
              onChange={handleEmailChange}
            />
            <Input
              type="password"
              placeholder="Passwort"
              className="my-2"
              onChange={handlePasswordChange}
            />
            <Input
              type="password"
              placeholder="Passwort wiederholen"
              className="my-2"
              onChange={handlePasswordRepeatChange}
            />
            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              className="mx-7 w-[10.625rem]"
              onClick={handleSubmit}
            >
              Anmelden
            </Button>
          </FormControl>
        </form>
      </Box>
      <Box className=" mx-auto justify-center text-center text-xs">
          <Text>
            Hast Du bereits ein Konto? Melde dich{" "}
            <Link as={NextLink} color="teal.500" href="#">
            hier{" "}
          </Link>
          an.
        </Text></Box>
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
