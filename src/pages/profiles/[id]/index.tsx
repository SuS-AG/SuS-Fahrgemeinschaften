import {type NextPage} from "next";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {api} from "../../../utils/api";
import {Avatar, Box, Button, Icon, Spinner, Text} from "@chakra-ui/react";
import {ChevronLeftIcon, EmailIcon, PhoneIcon} from "@chakra-ui/icons";
import {MdAccountCircle} from "react-icons/md";
import {useMemo} from "react";
import BottomNavigation from "../../../components/bottomNavigation/bottomNavigation";

const Profile: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const {status: sessionStatus} = useSession();
  const {isLoading, data} = api.profile.me.useQuery();

  const editPageLink = useMemo(() => {
    return `/profiles/${id as string}/edit`;
  }, [id]);

  const cancelEditPageLink = useMemo(() => {
    return `/trips`;
  }, []);

  const fullname = useMemo(() => {
    return `${data?.firstname || ""} ${data?.lastname || ""}`
  }, [data]);

  if (isLoading || !data) {
    return (
        <Box className="flex h-screen w-[100%] items-center justify-center">
          <Spinner color="teal.500" size="xl"/>
        </Box>
    );
  }

  return (
      <Box className="grid h-full w-full grid-rows-layout">
        <Box className="px-4 py-5">
          <Box className="flex flex-row items-center justify-between">
            <Button
                className="h-[2.5rem] w-[7.188rem]"
                colorScheme="teal"
                as={NextLink}
                href={cancelEditPageLink}
            >
              <ChevronLeftIcon/> Zurück
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
          <Box className="mt-[3.563rem] mb-[2.875rem] flex flex-col">
            <Avatar size="2xl" name={fullname} src="" className="mx-auto"/>
          </Box>
          <Box className="flex flex-col gap-5 px-[2.188rem] py-[2.5rem]">
          <span className="flex items-center gap-[1.875rem]">
            <Icon as={MdAccountCircle} boxSize={"1.5rem"}/>
            <Text as={"b"}>
              {data.firstname} {data.lastname}
            </Text>
          </span>
            <span className="flex items-center gap-[1.875rem]">
            <Icon as={EmailIcon} boxSize={"1.5rem"}/>
            <Text as={"b"}>{data.email}</Text>
          </span>
            <span className="flex items-center gap-[1.875rem]">
            <Icon as={PhoneIcon} boxSize={"1.5rem"}/>
            <Text as={"b"}>{data.phoneNumber}</Text>
          </span>
          </Box>
        </Box>
        <Box>
          <BottomNavigation/>
        </Box>
      </Box>
  );
};

export default Profile;
