import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Avatar,
  Box,
  Heading,
  Icon,
  Link,
  Button,
} from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import NextLink from "next/link";
import TripType from "../../types/tripType";
import { format, formatDuration, intervalToDuration, sub } from "date-fns";

export interface TripCardProps {
  trip: TripType;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const requestLink = useMemo(() => {
    return `/trips/${trip.id}`;
  }, [trip]);

  return (
    <>
      <Box>
        <Card>
          <CardHeader>
            <Box className="flex items-center justify-start gap-2">
              <Avatar size="md" name="" src="" className="" />
              <Heading size="md">
                {trip.driver.firstname} {trip.driver.lastname}
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Box className="flex justify-around">
              <Text>
                <>
                  {trip.departureLocation} -{" "}
                  {format(trip.departureTime, "HH:mm")}{" "}
                </>
              </Text>
              <Icon as={IoChevronForward} />
              <Text>
                <>
                  {trip.arrivalLocation} - {format(trip.arrivalTime, "HH:mm")}
                </>
              </Text>
            </Box>
            <Box className="flex justify-between px-16">
              <Box
                className="flex items-center
              "
              >
                <Icon as={IoTimeOutline} />
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
                <Icon as={IoCalendarOutline} />
                <Text>{format(trip.departureTime, "dd.MM.yyyy")}</Text>
              </Box>
            </Box>
            <Box className="flex px-16">
              <Text>
                <Icon as={MdAirlineSeatReclineExtra} /> 3/4
              </Text>
            </Box>
            <Box className="flex justify-end">
              <Button as={NextLink} href={requestLink} colorScheme="teal">
                Anfragen
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default TripCard;
