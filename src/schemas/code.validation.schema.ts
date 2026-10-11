import { MESSAGES } from "../constants/messages"
import { z } from "zod";

// 1. Configuramos el validador base usando 'invalid_type_error' en lugar de 'required_error'
const singleDigitSchema = z
    .string({ invalid_type_error: MESSAGES(0).INVALID_NUMBER })
    .trim()
    .min(1, { message: MESSAGES(0).INVALID_NUMBER }) // 👈 Frena si el input está vacío
    // Validamos con Regex que sea estrictamente un dígito entre 0 y 9 (incluye el 0 y bloquea negativos)
    .regex(/^[0-9]$/, { message: MESSAGES(0).POSITIVE_NUMBER })
    .transform(Number); // 👈 Lo convierte a número entero al final si pasa todo

// 2. Construimos tu esquema limpio sin necesidad de usar .pipe()
export const userInputCodeSchema = z.object({
    digit_1: singleDigitSchema,
    digit_2: singleDigitSchema,
    digit_3: singleDigitSchema,
    digit_4: singleDigitSchema,
});
export type UserInputCodeSchema = z.infer<typeof userInputCodeSchema>
export default userInputCodeSchema;