import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import {Box, Button, FormControl, Input, Link, Text} from "@chakra-ui/react";
import Footer from "../components/footer/footer";
import type {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";
import {useCallback, useState} from "react";
import NextLink from "next/link";
import {api} from "../utils/api";
import {useRouter} from "next/router";
import type {NextPage} from "next";

const Register: NextPage = () => {
  const {
    isError, isSuccess, isLoading, ...registerMutation
  } = api.register.register.useMutation();

  const router = useRouter();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordRepeat, setPasswordRepeat] = useState<string>();

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.target.value;
    if (value === undefined) return;
    setEmail(value);
  }, [setEmail]);

  const handlePasswordChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.currentTarget.value;
    if (value === undefined) return;
    setPassword(value);
  }, [setPassword]);

  const handlePasswordRepeatChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const value = e.currentTarget.value;
    if (value === undefined) return;
    setPasswordRepeat(value);
  }, [setPasswordRepeat])

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement> & FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    if (password !== passwordRepeat) return;
    if (!email || !password) return;

    registerMutation
        .mutate(
            {
              email,
              password
            },
            {
              onSuccess: () => void router.push('/auth/signin'),
              onError: () => void router.reload()
            });
  }, [password, passwordRepeat, email, registerMutation, router])

  return (<Box className=" grid h-full w-full grid-rows-layout">
    <Box>
      <Box
          className=" mx-auto flex"
      >
        <Image
            src={logo as string}
            alt=""
            className="mx-auto my-[4.938rem] h-[8rem] w-[8rem]"
        />
      </Box>
      <Box className="justify-center text-center">
        <Text fontSize="4xl" fontWeight={"extrabold"}>
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
        <form>
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
          <Link as={NextLink} color="teal.500" href="/auth/signin">
            hier{" "}
          </Link>
          an.
        </Text></Box>
    </Box>

    <Box>
      <Footer/>
    </Box>
  </Box>);
}

export default Register;