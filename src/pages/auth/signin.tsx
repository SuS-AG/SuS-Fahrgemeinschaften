import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import {Box, FormControl, Input, Link, Text, Button} from "@chakra-ui/react";
import Footer from "../../components/footer/footer";
import type {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";
import { useCallback, useState} from "react";
import {signIn} from "next-auth/react";
import NextLink from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.currentTarget.value;
    setEmail(value);
  }, [setEmail]);

  const handlePasswordChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.currentTarget.value;
    setPassword(value);
  }, [setPassword]);

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement> & FormEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault()
    if (!email || !password) return;
    await signIn('credentials', {
      password,
      email,
      redirect: true,
      callbackUrl: '/'
    })
  }, [email, password])

  return (
    <Box className="h-full w-full grid grid-rows-layout">
     <Box>
     <Box className="mx-auto flex">
        <Image
          src={logo as string}
          alt=""
          className="mx-auto my-[4.938rem] h-[8rem] w-[8rem]"
        />
      </Box>
      <Box className="justify-center text-center">
        <Text className="text-4xl font-extrabold"> Login</Text>
      </Box>

      <Box className=" m-5 mx-auto  w-56 justify-center content-center">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              type="email"
              placeholder="E-Mail"
              className="my-2"
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              type="password"
              placeholder="Passwort"
              className="my-2"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button
              type="submit"
              colorScheme="teal"
              size="md"
              className="mx-7 w-[10.625rem]"
              onClick={handleSubmit}
              onSubmit={handleSubmit}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
      <Box className=" mx-auto justify-center text-center text-xs">
        <Text>
          Hast Du noch kein Konto? Erstelle {" "}
          <Link as={NextLink} color="teal.500" href="/register">
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
