import { z } from "zod";
export const addressSchema = z.object({
  receiver: z.string().min(2, "Insira um nome"),
  address: z.string().min(5, "Insira um endereço"),
  city: z.string().min(2, "Insira uma cidade"),
  zip: z
    .string()
    .min(8, "CEP inválido")
    .max(9, "CEP inválido")
    .regex(/^\d{5}-?\d{3}$/, "CEP deve seguir o formato 00000-000"),
  number: z.string().min(1, "Informe o número"),
  complement: z.string().optional().nullable(),
});
export type AddressFormData = z.infer<typeof addressSchema>;
