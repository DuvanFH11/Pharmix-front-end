import z from "zod";
import { MESSAGES } from "../constants/messages";

export const roleSchema = z.object({
    code: z.string().min(3, MESSAGES(3).MIN_LENGTH).max(6, MESSAGES(6).MAX_LENGTH).toUpperCase().uppercase(),
    name: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    description: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(250, MESSAGES(250).MAX_LENGTH)
})

export type RoleSchema = z.infer<typeof roleSchema>;

