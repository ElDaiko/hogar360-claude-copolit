import { z } from "zod";

// Schema for creating a new category - HU#1 requirements
export const createCategoriaSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .trim(),
  descripcion: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(90, "La descripción no puede tener más de 90 caracteres")
    .trim(),
});

// Export type from schema
export type CreateCategoriaForm = z.infer<typeof createCategoriaSchema>;
