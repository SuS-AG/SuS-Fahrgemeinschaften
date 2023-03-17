import {z} from "zod";
import {userType} from "./userType";

export const tripType = z.object({
  id: z.string(),
  departureTime: z.date(),
  arrivalTime: z.date(),
  departureLocation: z.string(),
  arrivalLocation: z.string(),
  price: z.number(),
  seats: z.number(),
  driver: userType,
  passengers: z.array(userType),
});

type TripType = z.infer<typeof tripType>;

export default TripType;