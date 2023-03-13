import { type NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";
import { Spinner, Text, Button, Icon, Avatar, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { MdAccountCircle } from "react-icons/md";
import { useMemo } from "react";

const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status: sessionStatus } = useSession();
  const { isLoading, data } = api.profile.me.useQuery();

  const editPageLink = useMemo(() => {
    return `/profiles/${id}/edit`
  }, [id])

  if (isLoading || !data) {
    return (
      <Box className="flex h-screen w-[100%] items-center justify-center">
        <Spinner color="teal.500" size="xl" />
      </Box>
    );
  }
  const fullname = ((data.firstname as string) + " " + data.lastname) as string;

  return (
    <Box className="h-[100%] w-[100%] px-4 py-5">
      <Box className="flex flex-row items-center justify-between">
        <Button
          className="h-[2.5rem] w-[7.188rem]"
          colorScheme="teal"
          as={NextLink}
          href={"test"}
        >
          {" "}
          <ChevronLeftIcon /> Zurück
        </Button>
        <h1 className="font-bold">Mein Profil</h1>
        <Button
          className="h-[2.5rem] w-[7.188rem]"
          colorScheme="teal"
          as={NextLink}
          href={editPageLink}
        >
          Bearbeiten
        </Button>
      </Box>
      <Box className="flex flex-col mt-[3.563rem] mb-[2.875rem]">
        <Avatar size="2xl" name={fullname} src="" className="mx-auto" />
      </Box>
      <Box className="flex flex-col gap-5 px-[2.188rem] py-[2.5rem]">
        <span className="flex items-center gap-[1.875rem]">
          <Icon as={MdAccountCircle} boxSize={"1.5rem"} />
          <Text as={"b"}>
            {data.firstname} {data.lastname}
          </Text>
        </span>
        <span className="flex items-center gap-[1.875rem]">
          <Icon as={EmailIcon} boxSize={"1.5rem"} />
          <Text as={"b"}>{data.email}</Text>
        </span>
        <span className="flex items-center gap-[1.875rem]">
          <Icon as={PhoneIcon} boxSize={"1.5rem"} />
          <Text as={"b"}>{data.phoneNumber}</Text>
        </span>
        <h2 className="flex justify-center py-[2rem] font-bold">Verlauf</h2>
      </Box>
    </Box>
  );
};

export default Profile;
