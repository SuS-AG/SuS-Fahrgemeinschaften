import React, {useMemo} from "react";
import {Avatar, Box, Button, Card, CardBody, CardHeader, Heading, Icon, Text,} from "@chakra-ui/react";
import {IoCalendarOutline, IoChevronForward, IoTimeOutline} from "react-icons/io5";
import {MdAirlineSeatReclineExtra} from "react-icons/md";
import NextLink from "next/link";
import type TripType from "../../types/tripType";
import {format, formatDuration, intervalToDuration} from "date-fns";

export interface TripCardProps {
  trip: TripType;
}

const TripCard: React.FC<TripCardProps> = ({trip}) => {
  const requestLink = useMemo(() => {
    return `/trips/${trip.id}`;
  }, [trip]);

  return (
      <Box>
        <Card>
          <CardHeader>
            <Box className="flex justify-between">
              <Box className={'flex items-center gap-2'}>
                <Avatar size="md" name={`${trip.driver.firstname ?? ""} ${trip.driver.lastname ?? ""}`}/>
                <Heading size="md">
                  {trip.driver.firstname} {trip.driver.lastname}
                </Heading>
              </Box>
              <Box className="flex justify-between">
                <Box className={'flex items-center'}>
                  <Icon as={MdAirlineSeatReclineExtra} className={'text-xl'}/>
                  <Text fontSize={'lg'}>{trip.seats - trip.passengers.length}/{trip.seats}</Text>
                </Box>
              </Box>
            </Box>
          </CardHeader>
          <CardBody>
            <Box className={'flex flex-col gap-1 px-4'}>
              <Box className="flex justify-between">
                <Text>
                  <>
                    {trip.departureLocation} - {format(trip.departureTime, "HH:mm")}
                  </>
                </Text>
                <Icon as={IoChevronForward}/>
                <Text>
                  <>
                    {trip.arrivalLocation} - {format(trip.arrivalTime, "HH:mm")}
                  </>
                </Text>
              </Box>
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Icon as={IoTimeOutline}/>
                  <Text>
                    {formatDuration(
                        intervalToDuration({
                          start: trip.departureTime,
                          end: trip.arrivalTime,
                        }),
                        {
                          format: ["hours", "minutes"],
                        }
                    )}
                  </Text>
                </Box>
                <Box className="flex items-center">
                  <Icon as={IoCalendarOutline}/>
                  <Text>{format(trip.departureTime, "dd.MM.yyyy")}</Text>
                </Box>
              </Box>
              <Box className="flex justify-end mt-2">
                <Button as={NextLink} href={requestLink} colorScheme="teal">
                  Anfragen
                </Button>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Box>
  );
};

export default TripCard;
