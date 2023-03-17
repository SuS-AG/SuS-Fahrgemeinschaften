import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Box, Button, FormControl } from "@chakra-ui/react";
import { Icon, Spinner } from "@chakra-ui/react";
import {
  MdAirlineSeatReclineExtra,
  MdCalendarToday,
  MdChevronLeft,
  MdDirectionsCar,
  MdFmdGood,
  MdOutlineEuro,
} from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { api } from "../../../utils/api";
import { type NextPage } from "next";
import format from "date-fns/format";
import { de } from "date-fns/locale";
import BottomNavigation from "../../../components/bottom-navigation/bottomnavigation";
import { InvalidateQueryFilters } from "@tanstack/react-query";

const Trip: NextPage = () => {
  const router = useRouter();
  const tripID = useMemo(() => {
    return router.query.id;
  }, [router.query]);

  const trpcCtx = api.useContext();
  const addPassengerToTripMutation = api.trip.addPassengerToTrip.useMutation({
    onSuccess: async () => {
      trpcCtx.invalidate(undefined, [
        "trip",
        "getById",
        tripID,
      ] as InvalidateQueryFilters);
    },
  });

  const { status: sessionStatus, data: userData } = useSession();
  const { isLoading, data } = api.trip.getById.useQuery({
    id: tripID as string,
  });
  const availableSeats = useMemo(() => {
    if (!data) return 0;
    return data.seats - data.passengers.length;
  }, [data]);

  if (isLoading || !data) {
    return (
      <Box className="flex h-screen w-[100%] items-center justify-center">
        <Spinner color="teal.500" size="xl" />
      </Box>
    );
  }

  const handleRequestButtonClick = () => {
    addPassengerToTripMutation.mutate({
      tripId: tripID as string,
      passengerId: userData?.user?.id!,
    });
  };

  const handleBackButtonClick = () => {
    router.push("/trips");
  };

  return (
    <Box className="grid h-full w-full grid-rows-layout">
      <Box className="px-4 py-5">
        <Box className="mb-[6rem] grid grid-cols-[repeat(3,33%)] items-center justify-between">
          <Button
            className="h-[2.5rem] w-[7.188rem] font-semibold "
            colorScheme="teal"
            onClick={handleBackButtonClick}
          >
            <Icon as={MdChevronLeft} className=""></Icon>
            Zurück
          </Button>
          <h1 className="text-center font-bold">Fahrt</h1>
        </Box>

        <form>
          <FormControl>
            <Box className="mb-5 flex flex-col items-center justify-center">
              <Box>
                <Icon as={MdCalendarToday} className="text-[1.5rem]"></Icon>
              </Box>
              <Box>Datum</Box>
              <Box className="text-xl font-semibold">
                {format(data.departureTime, "EEEE, dd.MM.yyyy", { locale: de })}
              </Box>
            </Box>

            <Box className="mb-5 flex flex-row items-center justify-center gap-10">
              <Box className="flex flex-col items-center justify-center">
                <Box>
                  <Icon as={MdDirectionsCar} className="text-[1.5rem]"></Icon>
                </Box>
                <Box>Hinfahrt</Box>
                <Box className="text-xl font-semibold">
                  {format(data.departureTime, "HH:mm")}
                </Box>
              </Box>
              <Box className="flex flex-col items-center justify-center">
                <Box>
                  <Icon as={MdDirectionsCar} className="text-[1.5rem]"></Icon>
                </Box>
                <Box>Ankunft ca.</Box>
                <Box className="text-xl font-semibold">
                  {format(data.arrivalTime, "HH:mm")}
                </Box>
              </Box>
            </Box>

            <Box className="mb-5 flex flex-row items-center justify-center gap-10">
              <Box className="flex flex-col items-center justify-center">
                <Box>
                  <Icon as={MdOutlineEuro} className="text-[1.5rem]"></Icon>
                </Box>
                <Box>Preis / Fahrt</Box>
                <Box className="text-xl font-semibold">{data.price} €</Box>
              </Box>
              <Box className="flex flex-col items-center justify-center">
                <Box>
                  <Icon
                    as={MdAirlineSeatReclineExtra}
                    className="text-[1.5rem]"
                  ></Icon>
                </Box>
                <Box>Sitzplätze</Box>
                <Box
                  className={`text-xl font-semibold ${
                    availableSeats < 1 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {availableSeats} / {data.seats}
                </Box>
              </Box>
            </Box>

            <Box className="mb-5 flex flex-col items-center justify-center text-center">
              <Box>
                <Icon as={MdFmdGood} className="text-[1.5rem]"></Icon>
              </Box>
              <Box>Treffpunkt</Box>
              <Box className="max-w-[15rem] text-xl font-semibold">
                {data.departureLocation}
              </Box>
            </Box>
            <Box className="mb-[5rem] flex flex-col items-center justify-center">
              <Box>
                <Icon as={MdFmdGood} className="text-[1.5rem]"></Icon>
              </Box>
              <Box className="">Ankunftsort</Box>
              <Box className="text-xl font-semibold">
                {data.arrivalLocation}
              </Box>
            </Box>

            <Box className="flex items-center justify-center">
              <Button
                className="h-[2.5rem] w-[13.313rem] font-semibold"
                colorScheme="green"
                onClick={handleRequestButtonClick}
              >
                Anfragen
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
      <Box>
        <BottomNavigation />
      </Box>
    </Box>
  );
};

export default Trip;
