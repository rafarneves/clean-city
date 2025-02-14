import { z } from "zod"

export const actionSchema = z.object({
  name: z.string().min(1, "o título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
  date: z.date().nullable().refine(val => val !== null, "Data é obrigatória"),
  hour: z.string().min(1, "A hora é obrigatória"),
  address: z.object({
    address: z.string().min(1, "O endereço é obrigatório"),
  })
})