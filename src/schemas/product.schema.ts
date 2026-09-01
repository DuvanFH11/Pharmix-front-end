import z from "zod";
import { MESSAGES } from "../constants/messages";

const storeProduct = z.object({
    name: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    brand: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    description: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(250, MESSAGES(250).MAX_LENGTH),
    unit_price: z.number().positive(MESSAGES(0).POSITIVE_NUMBER).multipleOf(0.01, MESSAGES(2).MAX_DECIMAL),
    package_price: z.number().positive(MESSAGES(0).POSITIVE_NUMBER).multipleOf(0.01, MESSAGES(2).MAX_DECIMAL),
    invima_registration: z.string().min(5, MESSAGES(5).MIN_LENGTH).max(50, MESSAGES(50).MAX_LENGTH),
    strength: z.number().positive(MESSAGES(0).POSITIVE_NUMBER).multipleOf(0.0001, MESSAGES(4).MAX_DECIMAL),
    unit: z.string().min(1, MESSAGES(1).MIN_LENGTH).max(2, MESSAGES(2).MAX_LENGTH),
    is_active: z.boolean()
})

export type StoreProduct = z.infer<typeof storeProduct>
export default storeProduct;
