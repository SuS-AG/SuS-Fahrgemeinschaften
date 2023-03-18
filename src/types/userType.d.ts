import {z} from "zod";

export const userType = z.object({
  id: z.string(),
  email: z.string().nullable(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  phoneNumber: z.string().nullable(),
});

type UserType = z.infer<typeof userType>;

export default UserType;