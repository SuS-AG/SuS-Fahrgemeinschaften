/* eslint-disable react/no-children-prop */
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftAddon, Icon } from "@chakra-ui/react";
import TripCard from "../../components/trip-card/trip-card";
import BottomNavigation from "../../components/bottom-navigation/bottomnavigation";
import React from "react";
import { sub } from "date-fns";

function search() {
  return (
    <Box className="grid h-full grid-rows-layout">
      <Box className="h-full overflow-scroll">
        <Box className="m-5">
          <Box className="flex flex-col gap-3">
            <TripCard
              trip={{
                id: "1",
                departureTime: sub(new Date(), { hours: 10 }),
                arrivalTime: new Date(),
                departureLocation: "Haps",
                arrivalLocation: "Evian",
                price: 80,
                seats: 3,
                driver: {
                  firstname: "Max",
                  lastname: "Susmann",
                  phoneNumber: "015786769652",
                  id: "88",
                  email: "lakatos.p@gmx.de",
                },
                passengers: [],
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <BottomNavigation />
      </Box>
    </Box>
  );
}

export default search;
