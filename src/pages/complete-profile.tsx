import React, {ChangeEventHandler, MouseEventHandler, useState} from "react";
import {Avatar, Box, Button, FormControl, Input, Link, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {api} from "../utils/api";
import {useRouter} from "next/router";
import Footer from "../components/footer/footer";

export default function Profile() {
  const completeProfileMutation = api.profile.completeProfile.useMutation();
  const router = useRouter();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleFirstnameChange: ChangeEventHandler<HTMLInputElement> = (
      event
  ) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange: ChangeEventHandler<HTMLInputElement> = (
      event
  ) => {
    setLastname(event.target.value);
  };

  const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = (
      event
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    completeProfileMutation.mutate({firstname, lastname, phoneNumber});
    void router.push("/trips");
  };

  return (
      <Box className="grid h-full w-full grid-rows-layout">
        <form className="px-4 py-5" onSubmit={e => e.preventDefault()}>
          <FormControl>
            <Box className="flex justify-end">
              <Button
                  colorScheme="teal"
                  size="md"
                  className="h-[2.5rem] w-[7.188rem]"
                  onClick={handleSubmit}
                  type="submit"
              >
                Speichern
              </Button>
            </Box>

            <Box className="mx-auto mt-[5.25rem] flex max-w-xs text-center">
              <Text as="b" fontSize="1.5rem" className="leading-none">
                Bitte vervollständige Deine Profildaten
              </Text>
            </Box>
            <Box className="mt-[3.563rem] mb-[2.875rem] flex flex-col text-center">
              <Avatar size="2xl" name="" src="" className="mx-auto"/>
              <Link
                  as={NextLink}
                  color="teal.500"
                  href="#"
                  className="mt-4 no-underline"
              >
                Bild bearbeiten
              </Link>
            </Box>

            <Box className="flex flex-col gap-5 ">
              <Input
                  placeholder="Vorname"
                  className="text-start "
                  onChange={handleFirstnameChange}
              />
              <Input
                  placeholder="Nachname"
                  className="text-start"
                  onChange={handleLastnameChange}
              />
              <Input
                  placeholder="Telefonnummer"
                  className="text-start"
                  onChange={handlePhoneNumberChange}
              />
            </Box>
          </FormControl>
        </form>

        <Box>
          <Footer/>
        </Box>
      </Box>
  );
}
