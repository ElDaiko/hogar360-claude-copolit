import { z } from "zod";

export const createUbicacionSchema = z.object({
  ciudad: z
    .string()
    .min(1, "El nombre de la ciudad es obligatorio")
    .max(50, "El nombre de la ciudad no puede exceder 50 caracteres")
    .trim(),
  departamento: z
    .string()
    .min(1, "El nombre del departamento es obligatorio")
    .max(50, "El nombre del departamento no puede exceder 50 caracteres")
    .trim(),
  descripcionCiudad: z
    .string()
    .min(1, "La descripción de la ciudad es obligatoria")
    .max(120, "La descripción de la ciudad no puede exceder 120 caracteres")
    .trim(),
  descripcionDepartamento: z
    .string()
    .min(1, "La descripción del departamento es obligatoria")
    .max(120, "La descripción del departamento no puede exceder 120 caracteres")
    .trim(),
});

export const updateUbicacionSchema = createUbicacionSchema;

export type CreateUbicacionForm = z.infer<typeof createUbicacionSchema>;
export type UpdateUbicacionForm = z.infer<typeof updateUbicacionSchema>;
