import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useState
} from "react";
import { Box, Button, FormControl } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { Text } from "@chakra-ui/react";

export default function Profile() {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");

  const changeVorname: ChangeEventHandler<HTMLInputElement> = (event) => {
    setVorname(event.target.value);
    console.log(vorname);
  };

  const changeNachname: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNachname(event.target.value);
    console.log(nachname);
  };

  const changeTelefonnummer: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTelefonnummer(event.target.value);
    console.log(telefonnummer);
  };

  const safeData: MouseEventHandler<HTMLButtonElement> = () => {
    console.log("test");
  };

  return (
    <Box className="h-[100%] w-[100%] px-4 py-5">
      <form>
        <FormControl>
          <Box className="flex justify-end">
            <Button
              colorScheme="teal"
              size="md"
              className="h-[2.5rem] w-[7.188rem]"
              onClick={safeData}
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
            <Avatar size="2xl" name="" src="" className="mx-auto" />
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
              className="text-start "
              onChange={changeVorname}
            />
            <Input
              placeholder="Nachname"
              className="text-start"
              onChange={changeNachname}
            />
            <Input
              placeholder="Telefonnummer"
              className="text-start"
              onChange={changeTelefonnummer}
            />
          </Box>
        </FormControl>
      </form>
    </Box>
  );
}
