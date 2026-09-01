import z from "zod";
import { MESSAGES } from "../constants/messages";

const userLoginSchema = z.object({
    email: z.email(MESSAGES(0).INVALID_EMAIL),
    password: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH)
})

export const userStoreSchema = userLoginSchema.extend({
    name: z.string().min(10, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    appointment: z.number(MESSAGES(0).INVALID_NUMBER),
    role: z.number(MESSAGES(0).INVALID_NUMBER),
})

export type UserStoreSchema = z.infer<typeof userStoreSchema>
export type UserLoginSchema = z.infer<typeof userLoginSchema>;

export default userLoginSchema;