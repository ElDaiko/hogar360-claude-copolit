import { z } from "zod";

// Esquema para crear casa
export const createCasaSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-.,]+$/,
      "El nombre contiene caracteres inválidos"
    ),

  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),

  categoriaInmuebleId: z.string().min(1, "Debe seleccionar una categoría"),

  cantidadCuartos: z
    .number()
    .int("La cantidad de cuartos debe ser un número entero")
    .min(1, "Debe tener al menos 1 cuarto")
    .max(20, "No puede tener más de 20 cuartos"),

  cantidadBanos: z
    .number()
    .int("La cantidad de baños debe ser un número entero")
    .min(1, "Debe tener al menos 1 baño")
    .max(15, "No puede tener más de 15 baños"),

  precio: z
    .number()
    .min(100000, "El precio mínimo es $100,000")
    .max(50000000000, "El precio máximo es $50,000,000,000"),

  ubicacionId: z.string().min(1, "Debe seleccionar una ubicación"),

  fechaPublicacionActiva: z.string().refine((date) => {
    const inputDate = new Date(date);
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    return inputDate >= today && inputDate <= oneMonthFromNow;
  }, "La fecha de publicación debe estar entre hoy y un mes desde ahora"),

  estadoPublicacion: z.enum(
    [
      "PUBLICADA",
      "PUBLICACION_PAUSADA",
      "TRANSACCION_CURSO",
      "TRANSACCION_FINALIZADA",
    ],
    {
      errorMap: () => ({ message: "Estado de publicación inválido" }),
    }
  ),

  area: z
    .number()
    .positive("El área debe ser un número positivo")
    .max(10000, "El área no puede exceder 10,000 m²")
    .optional(),

  imagenes: z
    .array(z.string().url("URL de imagen inválida"))
    .max(10, "No puede tener más de 10 imágenes")
    .optional(),
});

export type CreateCasaFormData = z.infer<typeof createCasaSchema>;

// Esquema para búsqueda/filtros de casas
export const casaFiltersSchema = z.object({
  ubicacion: z.string().optional(),
  categoriaId: z.string().optional(),
  cantidadCuartos: z.number().int().min(1).optional(),
  cantidadBanos: z.number().int().min(1).optional(),
  precioMinimo: z.number().positive().optional(),
  precioMaximo: z.number().positive().optional(),
  ordenarPor: z.enum(["precio", "fecha", "ubicacion"]).optional(),
  ordenarDireccion: z.enum(["asc", "desc"]).optional(),
});

export type CasaFiltersFormData = z.infer<typeof casaFiltersSchema>;
