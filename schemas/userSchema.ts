import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  birthDate: z.date().nullable().refine(val => val !== null, "Data de nascimento é obrigatória"),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  passwordConfirmation: z.string(),
  address: z.string().min(1, "Endereço é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
}).refine(data => data.password === data.passwordConfirmation, {
    message: "As senhas devem ser iguais",
    path: ["confirmaSenha"],
})