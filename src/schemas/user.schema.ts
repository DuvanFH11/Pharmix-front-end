import z from "zod";
import { MESSAGES } from "../constants/messages";

const loginSchema = z.object({
    email: z.email(MESSAGES(0).INVALID_EMAIL),
    password: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH)
})

export const registerSchema = loginSchema.extend({
    name: z.string().min(10, MESSAGES(20).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
})

export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;