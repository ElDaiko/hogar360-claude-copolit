import type {
  CategoriaInmueble,
  CreateCategoriaInmueble,
  ApiResponse,
} from "../shared/types";

// Mock data for categories
const mockCategorias: CategoriaInmueble[] = [
  {
    id: "1",
    nombre: "Apartamento",
    descripcion:
      "Apartamentos residenciales en edificios o complejos habitacionales",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "2",
    nombre: "Casa",
    descripcion:
      "Casas unifamiliares independientes con jardín y espacios exteriores",
    createdAt: new Date("2024-01-16").toISOString(),
    updatedAt: new Date("2024-01-16").toISOString(),
  },
  {
    id: "3",
    nombre: "Penthouse",
    descripcion:
      "Apartamentos de lujo ubicados en los últimos pisos con vistas panorámicas",
    createdAt: new Date("2024-01-17").toISOString(),
    updatedAt: new Date("2024-01-17").toISOString(),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate new ID
const generateId = () => Date.now().toString();

export const categoriaService = {
  // Create new category - HU#1
  createCategoria: async (
    data: CreateCategoriaInmueble
  ): Promise<ApiResponse<CategoriaInmueble>> => {
    await delay(1000);

    try {
      // Check if name already exists - HU#1 requirement
      const existingCategoria = mockCategorias.find(
        (cat) => cat.nombre.toLowerCase() === data.nombre.toLowerCase()
      );

      if (existingCategoria) {
        return {
          success: false,
          message: "Error de validación",
          errors: ["Ya existe una categoría con este nombre"],
        };
      }

      // Create new category
      const newCategoria: CategoriaInmueble = {
        id: generateId(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mock data
      mockCategorias.push(newCategoria);

      return {
        success: true,
        data: newCategoria,
        message: "Categoría creada exitosamente",
      };
    } catch {
      return {
        success: false,
        message: "Error al crear la categoría",
        errors: ["Error interno del servidor"],
      };
    }
  },
  // Get all categories (for display purposes)
  getCategorias: async (): Promise<ApiResponse<CategoriaInmueble[]>> => {
    await delay(500);

    try {
      return {
        success: true,
        data: [...mockCategorias],
      };
    } catch {
      return {
        success: false,
        message: "Error al obtener las categorías",
        errors: ["Error interno del servidor"],
      };
    }
  },

  // Delete category
  deleteCategoria: async (id: string): Promise<ApiResponse<boolean>> => {
    await delay(800);

    try {
      const index = mockCategorias.findIndex((cat) => cat.id === id);

      if (index === -1) {
        return {
          success: false,
          message: "Categoría no encontrada",
          errors: ["La categoría especificada no existe"],
        };
      }

      // Remove from mock data
      mockCategorias.splice(index, 1);

      return {
        success: true,
        data: true,
        message: "Categoría eliminada exitosamente",
      };
    } catch {
      return {
        success: false,
        message: "Error al eliminar la categoría",
        errors: ["Error interno del servidor"],
      };
    }
  },
};
