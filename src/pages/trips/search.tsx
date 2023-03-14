/* eslint-disable react/no-children-prop */
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftAddon, Icon } from "@chakra-ui/react";
import TripCard from "../../components/trip-card/trip-card";
import BottomNavigation from "../../components/bottom-navigation/bottomnavigation";
import React from "react";

function search() {
  return (
    <Box className="grid grid-rows-layout h-full">
      <Box className="h-full overflow-scroll">
        <Box className="m-5">
          <Box className="m-5">
            <InputGroup>
              <InputLeftAddon children={<SearchIcon />} />
              <Input type="text" placeholder="Suche" />
            </InputGroup>
          </Box>
          <Box className="flex flex-col gap-3">
            {/* Karten dienen als filler: */}
            <TripCard />
            <TripCard />
            <TripCard />
            <TripCard />
            <TripCard />
            <TripCard />
          </Box>
        </Box>
      </Box>

      <Box>
        <BottomNavigation/>
      </Box>
    </Box>
  );
}

export default search;
