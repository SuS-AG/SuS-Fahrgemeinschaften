import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Avatar,
  Box,
  Heading,
  Icon,
  Button,
} from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
function TripCard() {
  return (
    <>
      <Box>
        <Card>
          <CardHeader>
            <Box className="flex items-center justify-start gap-2">
              <Avatar size="md" name="" src="" className="" />
              <Heading size="md">Name Fahrer</Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Box className="flex justify-around">
              <Text>
                Start place - Start Time <Icon as={IoChevronForward} />
                Arrival place - Arrival Time
              </Text>
            </Box>
            <Box className="flex justify-around">
              <Text>
                <Icon as={IoTimeOutline} /> 8:00
              </Text>
              <Text>
                <Icon as={IoCalendarOutline} /> 01.01.1010
              </Text>
            </Box>
            <Box className="flex px-16">
              <Text>
                <Icon as={MdAirlineSeatReclineExtra} /> 3/4
              </Text>
            </Box>
            <Box className="flex justify-end">
              <Button colorScheme="teal"> Anfragen</Button>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

export default TripCard;
