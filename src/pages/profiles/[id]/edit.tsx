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
import Footer from "../../../components/footer/footer";

const Edit: NextPage = ({}) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const editProfileMutation = api.profile.editProfile.useMutation();

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
    setFirstname(data?.firstname ?? "");
    setLastname(data?.lastname ?? "");
    setPhoneNumber(data?.phoneNumber ?? "");
    setEmail(data?.email ?? "");
  }, [data, isLoading]);

  useEffect(() => {}, [firstname]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data || isLoading) {
    return (
      <Box className="flex h-screen w-[100%] items-center justify-center">
        <Spinner color="teal.500" size="xl" />
      </Box>
    );
  }

  const fullname = (data.firstname as string) + " " + (data.lastname as string);

  const handleFirstnameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLastname(event.target.value);
  };

  const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };

  // const safeData: MouseEventHandler<HTMLButtonElement> = () => {
  // };

  const handleBackClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> &
    FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleModalSavebuttonClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    editProfileMutation.mutate({
      firstname, lastname, phonenumber: phoneNumber, email
    });
    onClose();
    router.push({pathname: "/profiles/[id]", query: {id: data.id}} );
  };

  return (
    <Box className="grid h-full w-full grid-rows-layout">
      <form className="px-4 py-5">
        <FormControl>
          <Box className="flex flex-row items-center justify-between">
            <Button
              className="h-[2.5rem] w-[7.188rem]"
              colorScheme="teal"
              onClick={handleBackClick}
            >
              Abbrechen
            </Button>
            <h1 className="font-bold">Profil bearbeiten</h1>
            <Button
              className="h-[2.5rem] w-[7.188rem]"
              colorScheme="teal"
              onClick={onOpen}
            >
              Speichern
            </Button>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent maxW="80%">
              <ModalHeader>Speichern?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Sollen die Änderungen übernommen werden?</ModalBody>

              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={onClose}>
                  Verwerfen
                </Button>
                <Button colorScheme="green" onClick={handleModalSavebuttonClick}>
                  Übernehmen
                </Button>
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
              value={firstname}
              className="text-start "
              onChange={handleFirstnameChange}
            />
            <Input
              placeholder="Nachname"
              value={lastname}
              className="text-start"
              onChange={handleLastnameChange}
            />
            <Input
              placeholder="Telefonnummer"
              value={phoneNumber}
              className="text-start"
              onChange={handlePhoneNumberChange}
            />
            <Input
              placeholder="E-Mail"
              value={email}
              className="text-start "
              onChange={handleEmailChange}
            />
          </Box>
        </FormControl>
      </form>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Edit;
