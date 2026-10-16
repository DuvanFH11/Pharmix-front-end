import z from "zod";
import { MESSAGES } from "../constants/messages";

export const userPasswordSchema = z.object({
    password: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH)
})

export const userLoginSchema = userPasswordSchema.extend({
    email: z.email(MESSAGES(0).INVALID_EMAIL),
})
export const userEditSchema = userLoginSchema.extend({
    name: z.string().min(10, MESSAGES(10).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    password: z.string().optional()
})

export const userStoreSchema = userEditSchema.extend({
    user_role: z.number(MESSAGES(0).INVALID_NUMBER).min(1, "Debes seleccionar un rol"),
    user_job_title: z.number(MESSAGES(0).INVALID_NUMBER).min(1, "Debes seleccionar un cargo"),
})

export const userChangePassSchema = userPasswordSchema.extend({
    confirm_pass: z.string().min(1, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH)
}).refine((data) => data.password === data.confirm_pass, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_pass"]
})


export type UserStoreSchema = z.infer<typeof userStoreSchema>;
export type UserLoginSchema = z.infer<typeof userLoginSchema>;
export type UserEditSchema = z.infer<typeof userEditSchema>;
export type UserChangePasSchema = z.infer<typeof userPasswordSchema>
export type UserChangePassSchema = z.infer<typeof userChangePassSchema>