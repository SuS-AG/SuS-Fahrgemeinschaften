import {z} from "zod";

export const userType = z.object({
  id: z.string(),
  email: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type UserType = z.infer<typeof userType>;

export default UserType;