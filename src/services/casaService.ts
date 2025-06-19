import type { ApiResponse, PaginatedResponse } from "../shared/types";
import type {
  Casa,
  CreateCasaRequest,
  CreateCasaResponse,
  CategoriaInmueble,
  Ubicacion,
  EstadoPublicacion,
} from "../shared/types";

// Mock data for testing without backend
const mockCasas: Casa[] = [
  {
    id: "casa-1",
    nombre: "Casa de Lujo en Zona Rosa",
    descripcion:
      "Hermosa casa de lujo ubicada en la exclusiva Zona Rosa de Bogotá. Cuenta con acabados de primera calidad, jardín privado y garaje para 2 vehículos.",
    categoriaInmueble: {
      id: "categoria-1",
      nombre: "Casa",
      descripcion: "Casas tradicionales",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 4,
    cantidadBanos: 3,
    precio: 850000000,
    ubicacion: {
      id: "ubicacion-1",
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      descripcionCiudad: "Capital de Colombia",
      descripcionDepartamento: "Departamento central de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-19",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-15T10:00:00.000Z",
    vendedorId: "vendedor-1",
    area: 350,
    imagenes: [
      "https://example.com/casa1-1.jpg",
      "https://example.com/casa1-2.jpg",
    ],
    createdAt: "2024-06-15T10:00:00.000Z",
    updatedAt: "2024-06-15T10:00:00.000Z",
  },
  {
    id: "casa-2",
    nombre: "Apartamento Moderno Centro",
    descripcion:
      "Moderno apartamento en el centro de Medellín con vista panorámica de la ciudad. Incluye gimnasio, piscina y zona social.",
    categoriaInmueble: {
      id: "categoria-2",
      nombre: "Apartamento",
      descripcion: "Apartamentos urbanos",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 2,
    cantidadBanos: 2,
    precio: 420000000,
    ubicacion: {
      id: "ubicacion-2",
      ciudad: "Medellín",
      departamento: "Antioquia",
      descripcionCiudad: "Ciudad de la eterna primavera",
      descripcionDepartamento: "Departamento del noroeste de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-20",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-16T14:30:00.000Z",
    vendedorId: "vendedor-2",
    area: 95,
    imagenes: ["https://example.com/apto1-1.jpg"],
    createdAt: "2024-06-16T14:30:00.000Z",
    updatedAt: "2024-06-16T14:30:00.000Z",
  },
  {
    id: "casa-3",
    nombre: "Penthouse Exclusivo Cartagena",
    descripcion:
      "Espectacular penthouse frente al mar en Cartagena. Terraza privada de 100m² con jacuzzi y vista al mar Caribe.",
    categoriaInmueble: {
      id: "categoria-3",
      nombre: "Penthouse",
      descripcion: "Penthouses de lujo",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 3,
    cantidadBanos: 4,
    precio: 1200000000,
    ubicacion: {
      id: "ubicacion-3",
      ciudad: "Cartagena",
      departamento: "Bolívar",
      descripcionCiudad: "Ciudad histórica del Caribe",
      descripcionDepartamento: "Departamento del norte de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-25",
    estadoPublicacion: "PUBLICACION_PAUSADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-17T09:15:00.000Z",
    vendedorId: "vendedor-3",
    area: 180,
    imagenes: [
      "https://example.com/pent1-1.jpg",
      "https://example.com/pent1-2.jpg",
      "https://example.com/pent1-3.jpg",
    ],
    createdAt: "2024-06-17T09:15:00.000Z",
    updatedAt: "2024-06-17T09:15:00.000Z",
  },
];

// Mock function to get current user (in real app, this would come from auth context)
const getCurrentUserId = (): string => {
  // For now, return a mock vendor ID
  return "vendedor-1";
};

class CasaService {
  async createCasa(
    data: CreateCasaRequest
  ): Promise<ApiResponse<CreateCasaResponse>> {
    try {
      // Simular validación de backend

      // 1. Verificar que el nombre no existe para el mismo vendedor
      const currentUserId = getCurrentUserId();
      const existingCasa = mockCasas.find(
        (casa) =>
          casa.nombre.toLowerCase() === data.nombre.toLowerCase() &&
          casa.vendedorId === currentUserId
      );

      if (existingCasa) {
        return {
          success: false,
          message: "Ya tienes una propiedad publicada con este nombre.",
        };
      }

      // 2. Validar fecha de publicación (no puede exceder un mes)
      const fechaPublicacion = new Date(data.fechaPublicacionActiva);
      const today = new Date();
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      if (fechaPublicacion < today || fechaPublicacion > oneMonthFromNow) {
        return {
          success: false,
          message:
            "La fecha de publicación debe estar entre hoy y un mes desde ahora.",
        };
      }

      // 3. Obtener categoría y ubicación (en real app, estas vendrían de la DB)
      const mockCategoria: CategoriaInmueble = {
        id: data.categoriaInmuebleId,
        nombre: "Casa",
        descripcion: "Casas tradicionales",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      };

      const mockUbicacion: Ubicacion = {
        id: data.ubicacionId,
        ciudad: "Ciudad Mock",
        departamento: "Departamento Mock",
        descripcionCiudad: "Descripción ciudad",
        descripcionDepartamento: "Descripción departamento",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      };

      // 4. Crear nueva casa
      const newCasa: Casa = {
        id: `casa-${Date.now()}`,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoriaInmueble: mockCategoria,
        cantidadCuartos: data.cantidadCuartos,
        cantidadBanos: data.cantidadBanos,
        precio: data.precio,
        ubicacion: mockUbicacion,
        fechaPublicacionActiva: data.fechaPublicacionActiva,
        estadoPublicacion: data.estadoPublicacion,
        fechaPublicacion: new Date().toISOString(),
        vendedorId: currentUserId,
        area: data.area,
        imagenes: data.imagenes || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Agregar a mock data
      mockCasas.push(newCasa);

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return {
        success: true,
        data: newCasa,
        message: "Casa publicada exitosamente",
      };
    } catch (error) {
      console.error("Error creating casa:", error);
      return {
        success: false,
        message: "Error interno del servidor. Por favor, intenta nuevamente.",
      };
    }
  }

  async getCasas(
    page: number = 1,
    limit: number = 10,
    vendedorId?: string
  ): Promise<ApiResponse<PaginatedResponse<Casa>>> {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Filtrar por vendedor si se especifica
      let filteredCasas = mockCasas;
      if (vendedorId) {
        filteredCasas = mockCasas.filter(
          (casa) => casa.vendedorId === vendedorId
        );
      }

      // Calcular paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCasas = filteredCasas.slice(startIndex, endIndex);

      const totalPages = Math.ceil(filteredCasas.length / limit);

      return {
        success: true,
        data: {
          data: paginatedCasas,
          pagination: {
            page,
            limit,
            total: filteredCasas.length,
            totalPages,
          },
        },
        message: "Casas obtenidas exitosamente",
      };
    } catch (error) {
      console.error("Error fetching casas:", error);
      return {
        success: false,
        message: "Error al obtener las casas. Por favor, intenta nuevamente.",
      };
    }
  }

  async deleteCasa(id: string): Promise<ApiResponse<void>> {
    try {
      const currentUserId = getCurrentUserId();
      const casaIndex = mockCasas.findIndex(
        (casa) => casa.id === id && casa.vendedorId === currentUserId
      );

      if (casaIndex === -1) {
        return {
          success: false,
          message: "Casa no encontrada o no tienes permisos para eliminarla.",
        };
      }

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Eliminar de mock data
      mockCasas.splice(casaIndex, 1);

      return {
        success: true,
        message: "Casa eliminada exitosamente",
      };
    } catch (error) {
      console.error("Error deleting casa:", error);
      return {
        success: false,
        message: "Error al eliminar la casa. Por favor, intenta nuevamente.",
      };
    }
  }

  async updateEstadoCasa(
    id: string,
    nuevoEstado: EstadoPublicacion
  ): Promise<ApiResponse<Casa>> {
    try {
      const currentUserId = getCurrentUserId();
      const casaIndex = mockCasas.findIndex(
        (casa) => casa.id === id && casa.vendedorId === currentUserId
      );

      if (casaIndex === -1) {
        return {
          success: false,
          message: "Casa no encontrada o no tienes permisos para modificarla.",
        };
      }

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Actualizar estado
      mockCasas[casaIndex].estadoPublicacion = nuevoEstado;
      mockCasas[casaIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        data: mockCasas[casaIndex],
        message: "Estado de la casa actualizado exitosamente",
      };
    } catch (error) {
      console.error("Error updating casa status:", error);
      return {
        success: false,
        message:
          "Error al actualizar el estado. Por favor, intenta nuevamente.",
      };
    }
  }
}

export const casaService = new CasaService();
