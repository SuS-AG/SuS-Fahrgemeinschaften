import React, {
  ChangeEventHandler,
  FormEventHandler,
  HtmlHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  FormControl,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";
import { NextPage } from "next";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Edit: NextPage = ({}) => {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const { status: sessionStatus } = useSession();
  const { isLoading, data } = api.profile.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!data || isLoading) return;
    setVorname(data?.firstname ?? "");
    setNachname(data?.lastname ?? "");
    setTelefonnummer(data?.phoneNumber ?? "");
    setEmail(data?.email ?? "");
  }, [data, isLoading]);

  useEffect(() => {
    console.log(vorname);
  }, [vorname]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data || isLoading) {
    return (
      <Box className="flex h-screen w-[100%] items-center justify-center">
        <Spinner color="teal.500" size="xl" />
      </Box>
    );
  }

  const fullname = (data.firstname as string) + " " + (data.lastname as string);

  const changeVorname: ChangeEventHandler<HTMLInputElement> = (event) => {
    setVorname(event.target.value);
  };

  const changeNachname: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNachname(event.target.value);
    console.log(nachname);
  };

  const changeTelefonnummer: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTelefonnummer(event.target.value);
    console.log(telefonnummer);
  };

  const changeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const safeData: MouseEventHandler<HTMLButtonElement> = () => {
    console.log("test");
  };

  const handleBackClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> &
    FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="h-[100%] w-[100%] px-4 py-5">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box className="flex flex-row items-center justify-between">
            <Button
              className="h-[2.5rem] w-[7.188rem]"
              colorScheme="teal"
              onClick={handleBackClick}
            >
              {" "}
              Abbrechen{" "}
            </Button>
            <h1 className="font-bold">Profil bearbeiten</h1>
            <Button
              className="h-[2.5rem] w-[7.188rem]"
              colorScheme="teal"
              onClick={onOpen}
              onSubmit={handleSubmit}
            >
              Speichern
            </Button>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Box className="mt-[3.563rem] mb-[2.875rem] flex flex-col text-center">
            <Avatar size="2xl" name={fullname} src="" className="mx-auto" />
            <Link
              as={NextLink}
              color="teal.500"
              href="/complete-profile"
              className="mt-4 no-underline"
            >
              Bild bearbeiten
            </Link>
          </Box>

          <Box className="flex flex-col gap-5 ">
            <Input
              placeholder="Vorname"
              value={vorname}
              className="text-start "
              onChange={changeVorname}
            />
            <Input
              placeholder="Nachname"
              value={nachname}
              className="text-start"
              onChange={changeNachname}
            />
            <Input
              placeholder="Telefonnummer"
              value={telefonnummer}
              className="text-start"
              onChange={changeTelefonnummer}
            />
            <Input
              placeholder="E-Mail"
              value={email}
              className="text-start "
              onChange={changeEmail}
            />
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Edit;
