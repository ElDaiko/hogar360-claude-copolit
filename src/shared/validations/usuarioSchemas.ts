import { z } from "zod";

// Esquema para crear usuario vendedor
export const createUsuarioVendedorSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),

  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios"
    ),

  documentoIdentidad: z
    .string()
    .min(6, "El documento debe tener al menos 6 dígitos")
    .max(15, "El documento no puede exceder 15 dígitos")
    .regex(/^\d+$/, "El documento de identidad debe ser únicamente numérico"),

  celular: z
    .string()
    .min(10, "El celular debe tener al menos 10 caracteres")
    .max(13, "El celular no puede exceder 13 caracteres")
    .regex(
      /^(\+\d{1,3})?\d{10}$/,
      "Formato de celular inválido. Ejemplo: +573005698325 o 3005698325"
    ),

  fechaNacimiento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, "El usuario debe ser mayor de edad (18 años)"),

  correo: z
    .string()
    .email("Debe ser un email válido")
    .max(100, "El email no puede exceder 100 caracteres"),

  clave: z
    .string()
    .min(8, "La clave debe tener al menos 8 caracteres")
    .max(50, "La clave no puede exceder 50 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La clave debe contener al menos: 1 minúscula, 1 mayúscula y 1 número"
    ),
});

export type CreateUsuarioVendedorFormData = z.infer<
  typeof createUsuarioVendedorSchema
>;
