import z from "zod"
import { MESSAGES } from "../constants/messages"


const userInputCodeSchema = z.object({
    digit_1: z.coerce.number(MESSAGES(0).INVALID_NUMBER).nonnegative(),
    digit_2: z.coerce.number(MESSAGES(0).INVALID_NUMBER).nonnegative(),
    digit_3: z.coerce.number(MESSAGES(0).INVALID_NUMBER).nonnegative(),
    digit_4: z.coerce.number(MESSAGES(0).INVALID_NUMBER).nonnegative()
})
export type UserInputCodeSchema = z.infer<typeof userInputCodeSchema>
export default userInputCodeSchema;