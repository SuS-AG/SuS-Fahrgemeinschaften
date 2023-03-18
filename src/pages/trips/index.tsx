import {Box} from "@chakra-ui/react";
import TripCard from "../../components/tripCard/tripCard";
import BottomNavigation from "../../components/bottomNavigation/bottomnavigation";
import React from "react";
import {api} from "../../utils/api";
import type {NextPage} from "next";

const Search: NextPage = () => {
  const {
    isLoading: tripsLoading,
    isError: tripsError,
    data: tripsData
  } = api.trip.getAllTrips.useQuery();

  if (tripsLoading) {
    return <div>
      Loading...
    </div>
  }

  if (tripsError || !tripsData) {
    return <div>
      There was an Error while loading the Trips.
    </div>
  }

  return (
      <Box className="grid h-full grid-rows-layout">
        <Box className="h-full overflow-scroll">
          <Box className="m-5">
            <Box className="flex flex-col gap-3">
              {
                tripsData?.map((trip) => {
                  return (
                      <TripCard
                          key={trip.id}
                          trip={trip}
                      />
                  )
                })
              }
            </Box>
          </Box>
        </Box>
        <Box>
          <BottomNavigation/>
        </Box>
      </Box>
  );
}

export default Search;
