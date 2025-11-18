import { z } from "zod";

export const paymentSchema = z.object({
  cardName: z.string().min(2, "Insira o nome no cartão"),
  cardNumber: z
    .string()
    .min(16, "Número do cartão inválido")
    .max(19, "Número do cartão inválido"),
  cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, "Mês inválido")
    .min(1, "Mês obrigatório"),
  year: z
    .string()
    .regex(/^\d{2,4}$/, "Ano inválido")
    .min(2, "Ano obrigatório"),
});
export type PaymentFormData = z.infer<typeof paymentSchema>;
