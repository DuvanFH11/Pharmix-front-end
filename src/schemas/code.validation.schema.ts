import z from "zod"
import { MESSAGES } from "../constants/messages"


const userInputCodeSchema = z.object({
    code: z.string(MESSAGES(0).INVALID_NUMBER).min(4, MESSAGES(4).MIN_LENGTH).max(4, MESSAGES(4).MAX_LENGTH).regex(/^\d{4}$/, MESSAGES(0).INVALID_NUMBER),
})
export type UserInputCodeSchema = z.infer<typeof userInputCodeSchema>
export default userInputCodeSchema;