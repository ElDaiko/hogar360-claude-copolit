import { z } from "zod";
import { VALIDATION_RULES } from "../constants";

// Login form schema
export const loginSchema = z.object({
  correo: z
    .string()
    .min(1, "El correo es requerido")
    .email("Ingrese un email válido"),
  clave: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(
      VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`
    ),
});

// Register vendedor schema
export const registerVendedorSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es requerido")
      .max(
        VALIDATION_RULES.NOMBRE_MAX_LENGTH,
        `El nombre no puede exceder ${VALIDATION_RULES.NOMBRE_MAX_LENGTH} caracteres`
      )
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras"
      ),
    apellido: z
      .string()
      .min(1, "El apellido es requerido")
      .max(
        VALIDATION_RULES.NOMBRE_MAX_LENGTH,
        `El apellido no puede exceder ${VALIDATION_RULES.NOMBRE_MAX_LENGTH} caracteres`
      )
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El apellido solo puede contener letras"
      ),
    documentoIdentidad: z
      .string()
      .min(1, "El documento de identidad es requerido")
      .regex(/^\d+$/, "El documento de identidad debe ser numérico"),
    celular: z
      .string()
      .min(1, "El celular es requerido")
      .max(
        VALIDATION_RULES.TELEFONO_MAX_LENGTH,
        `El celular no puede exceder ${VALIDATION_RULES.TELEFONO_MAX_LENGTH} caracteres`
      )
      .regex(/^[+]?[\d\s\-()]+$/, "Formato de celular inválido"),
    fechaNacimiento: z
      .string()
      .min(1, "La fecha de nacimiento es requerida")
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        return age > 18 || (age === 18 && monthDiff >= 0);
      }, "Debe ser mayor de edad"),
    correo: z
      .string()
      .min(1, "El correo es requerido")
      .email("Ingrese un email válido"),
    clave: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(
        VALIDATION_RULES.PASSWORD_MIN_LENGTH,
        `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`
      ),
    confirmarClave: z.string().min(1, "Confirme la contraseña"),
  })
  .refine((data) => data.clave === data.confirmarClave, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarClave"],
  });

// Type inference
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterVendedorFormData = z.infer<typeof registerVendedorSchema>;
