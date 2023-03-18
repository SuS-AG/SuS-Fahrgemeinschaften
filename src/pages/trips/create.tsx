import type {ChangeEventHandler, FormEventHandler, MouseEventHandler} from 'react';
import React, {useCallback, useState} from 'react';
import type {NextPage} from "next";
import {Box, Button, Icon, Input, InputGroup, InputLeftElement, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {
  MdAirlineSeatReclineNormal,
  MdCalendarToday,
  MdChevronLeft,
  MdDirectionsCar,
  MdDirectionsCarFilled,
  MdFmdGood,
  MdOutlineEuro
} from "react-icons/md";
import {format, parse} from 'date-fns';
import BottomNavigation from "../../components/bottomNavigation/bottomNavigation";
import {api} from "../../utils/api";
import {de} from "date-fns/locale";

const validateForm = (
    tripDate: Date | null,
    tripStartTime: string,
    tripEndTime: string | null,
    price: number | undefined,
    seats: number | undefined,
    meetingPlace: string | undefined,
    arrivalPlace: string | undefined,
) => {
  return tripDate
      && tripStartTime
      && tripEndTime
      && price
      && seats
      && meetingPlace
      && arrivalPlace;
}

const Create: NextPage = () => {
  const createTripMutation = api.trip.create.useMutation();

  const [tripDate, setTripDate] = useState<Date | null>(new Date(Date.now()));
  const [tripStartTime, setTripStartTime] = useState<string>(format(new Date(Date.now()), 'HH:mm'));
  const [tripEndTime, setTripEndTime] = useState<string | null>(null);
  const [price, setPrice] = useState<number>();
  const [seats, setSeats] = useState<number>();
  const [meetingPlace, setMeetingPlace] = useState<string>();
  const [arrivalPlace, setArrivalPlace] = useState<string>();

  const router = useRouter();

  const handleFormSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
  }, []);

  const handleBackButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    router.back();
  }, [router]);

  const handleTripDateChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTripDate(e.currentTarget.valueAsDate);
  }, [setTripDate])

  const handleTripStartTimeChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTripStartTime(e.currentTarget.value);
  }, [setTripStartTime])

  const handleTripEndTimeChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTripEndTime(e.currentTarget.value);
  }, [setTripEndTime])

  const handlePriceChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const price = e.currentTarget.valueAsNumber;

    setPrice(Math.round(price * 100) / 100);
  }, [setPrice])

  const handleSeatsChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setSeats(Math.round(e.currentTarget.valueAsNumber));
  }, [setSeats])

  const handleMeetingPlaceChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setMeetingPlace(e.currentTarget.value);
  }, [setMeetingPlace])

  const handleArrivalPlaceChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setArrivalPlace(e.currentTarget.value);
  }, [setArrivalPlace]);

  const handleSubmitButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (!validateForm(tripDate, tripStartTime, tripEndTime, price, seats, meetingPlace, arrivalPlace)) return;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked in validateForm
    const departureDateTime = parse(tripStartTime, 'HH:mm', tripDate!, {locale: de});
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked in validateForm
    const arrivalDateTime = parse(tripEndTime!, 'HH:mm', tripDate!, {locale: de});

    createTripMutation.mutate({
      departureTime: departureDateTime,
      arrivalTime: arrivalDateTime,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked in validateForm
      price: price!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked in validateForm
      seats: seats!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked in validateForm
      departureLocation: meetingPlace!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked in validateForm
      arrivalLocation: arrivalPlace!,
    }, {
      onSuccess: () => {
        void router.push('/trips');
      }
    })
  }, [router, arrivalPlace, createTripMutation, meetingPlace, price, seats, tripDate, tripEndTime, tripStartTime]);

  return (
      <Box className={'grid grid-rows-layout h-full'}>
        <Box className={'px-4 py-5'}>
          <Box className="grid grid-cols-[repeat(3,33%)] items-center justify-between">
            <Button
                className="h-[2.5rem] w-[7.188rem] font-semibold "
                colorScheme="teal"
                onClick={handleBackButtonClick}
            >
              <Icon as={MdChevronLeft}></Icon>
              Zurück
            </Button>
            <h1 className="text-center font-bold">Fahrt</h1>
          </Box> <Box className={'p-5'}>
          <form onSubmit={handleFormSubmit} className={'flex gap-6 flex-col'}>
            <Box className={'flex flex-col items-center gap-1'}>
              <Icon as={MdCalendarToday}/>
              <Text>Datum</Text>
              <Input
                  type={'date'}
                  placeholder={'24.12.2022'}
                  value={tripDate ? format(tripDate, 'yyyy-MM-dd') : undefined}
                  onChange={handleTripDateChange}
              />
            </Box>
            <Box className={'flex flex-col gap-6'}>
              <Box className={'flex justify-around'}>
                <Box className={'flex flex-col items-center gap-1'}>
                  <Icon as={MdDirectionsCar} className={'text-[1.5rem]'}/>
                  <Text>Hinfahrt</Text>
                  <Input
                      type={'time'}
                      className={'max-w-[6.25rem]'}
                      placeholder={'7:00 Uhr'}
                      value={tripStartTime}
                      onChange={handleTripStartTimeChange}
                  />
                </Box>
                <Box className={'flex flex-col items-center gap-1'}>
                  <Icon as={MdDirectionsCarFilled} className={'text-[1.5rem]'}/>
                  <Text>Ankunft ca.</Text>
                  <Input
                      type={'time'}
                      className={'max-w-[6.25rem]'}
                      placeholder={'7:50 Uhr'}
                      value={tripEndTime ?? undefined}
                      onChange={handleTripEndTimeChange}
                  />
                </Box>
              </Box>
              <Box className={'flex justify-around'}>
                <Box className={'flex flex-col items-center gap-1'}>
                  <Icon as={MdOutlineEuro} className={'text-[1.5rem]'}/>
                  <Text>Preis / Person</Text>
                  <InputGroup>
                    <InputLeftElement>
                      €
                    </InputLeftElement>
                    <Input
                        type={'number'}
                        className={'max-w-[6.25rem]'}
                        placeholder={'4.00'}
                        value={price}
                        onChange={handlePriceChange}
                    />
                  </InputGroup>
                </Box>
                <Box className={'flex flex-col items-center gap-1'}>
                  <Icon as={MdAirlineSeatReclineNormal} className={'text-[1.5rem]'}/>
                  <Text>Sitzplätze</Text>
                  <Input
                      type={'number'}
                      className={'max-w-[6.25rem]'}
                      placeholder={'3'}
                      value={seats}
                      onChange={handleSeatsChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={'flex flex-col items-center gap-1'}>
              <Icon as={MdFmdGood} className={'text-[1.5rem]'}/>
              <Text>Treffpunkt</Text>
              <Input
                  type={'text'}
                  placeholder={'REWE Parkplatz Hof'}
                  value={meetingPlace}
                  onChange={handleMeetingPlaceChange}
              />
            </Box>
            <Box className={'flex flex-col items-center gap-1'}>
              <Icon as={MdFmdGood} className={'text-[1.5rem]'}/>
              <Text>Ankuftsort</Text>
              <Input
                  type={'text'}
                  placeholder={'Staatliche Berufsschule 1 Bayreuth'}
                  value={arrivalPlace}
                  onChange={handleArrivalPlaceChange}
              />
            </Box>
            <Button
                onClick={handleSubmitButtonClick}
                colorScheme={'green'}
            >
              Erstellen
            </Button>
          </form>
        </Box>
        </Box>
        <Box>
          <BottomNavigation/>
        </Box>
      </Box>
  )
}

export default Create;