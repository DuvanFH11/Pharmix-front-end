import z from "zod";
import { MESSAGES } from "../constants/messages";

const productStoreSchema = z.object({
    name: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    brand: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    description: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(250, MESSAGES(250).MAX_LENGTH),
    invima_registration: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    unit: z.string().min(1, MESSAGES(1).MIN_LENGTH).max(2, MESSAGES(2).MAX_LENGTH).toUpperCase().uppercase(),

    unit_price: z.coerce.number().positive({ message: MESSAGES(0).POSITIVE_NUMBER }),
    package_price: z.coerce.number().positive({ message: MESSAGES(0).POSITIVE_NUMBER }),
    strength: z.coerce.number().positive({ message: MESSAGES(0).POSITIVE_NUMBER }).multipleOf(0.01, { message: MESSAGES(4).MAX_DECIMAL }),
})

export type ProductStoreSchema = z.output<typeof productStoreSchema>
export default productStoreSchema;
