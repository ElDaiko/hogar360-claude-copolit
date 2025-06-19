import type { ApiResponse } from "../shared/types";
import type { Ubicacion } from "../shared/types";
// TODO: Uncomment when backend is implemented
// import { getAuthHeaders } from "../shared/utils/authUtils";

// Mock data for testing without backend
const mockUbicaciones: Ubicacion[] = [
  {
    id: "1",
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    descripcionCiudad:
      "Capital de Colombia, centro económico y político del país con gran oferta cultural y laboral.",
    descripcionDepartamento:
      "Departamento central de Colombia, conocido por su desarrollo industrial y turístico.",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "2",
    ciudad: "Medellín",
    departamento: "Antioquia",
    descripcionCiudad:
      "Ciudad de la eterna primavera, reconocida por su innovación, cultura paisa y clima templado.",
    descripcionDepartamento:
      "Departamento del noroeste colombiano, famoso por su café, flores y desarrollo empresarial.",
    createdAt: "2024-01-15T10:05:00.000Z",
    updatedAt: "2024-01-15T10:05:00.000Z",
  },
  {
    id: "3",
    ciudad: "Cali",
    departamento: "Valle del Cauca",
    descripcionCiudad:
      "Capital mundial de la salsa, ciudad con gran diversidad cultural y centro económico del suroccidente.",
    descripcionDepartamento:
      "Departamento del suroccidente colombiano, conocido por su agricultura y puerto de Buenaventura.",
    createdAt: "2024-01-15T10:10:00.000Z",
    updatedAt: "2024-01-15T10:10:00.000Z",
  },
  {
    id: "4",
    ciudad: "Barranquilla",
    departamento: "Atlántico",
    descripcionCiudad:
      "Puerta de oro de Colombia, famosa por su carnaval y como importante puerto del Caribe.",
    descripcionDepartamento:
      "Departamento del Caribe colombiano, reconocido por su cultura costeña y desarrollo portuario.",
    createdAt: "2024-01-15T10:15:00.000Z",
    updatedAt: "2024-01-15T10:15:00.000Z",
  },
  {
    id: "5",
    ciudad: "Cartagena",
    departamento: "Bolívar",
    descripcionCiudad:
      "Ciudad heroica y patrimonio de la humanidad, destino turístico con arquitectura colonial única.",
    descripcionDepartamento:
      "Departamento del Caribe con gran riqueza histórica, cultural y turística.",
    createdAt: "2024-01-15T10:20:00.000Z",
    updatedAt: "2024-01-15T10:20:00.000Z",
  },
  {
    id: "6",
    ciudad: "Bucaramanga",
    departamento: "Santander",
    descripcionCiudad:
      "Ciudad bonita de Colombia, reconocida por su calidad de vida y desarrollo urbano planificado.",
    descripcionDepartamento:
      "Departamento del noreste colombiano, conocido por su industria petrolera y cultura santandereana.",
    createdAt: "2024-01-15T10:25:00.000Z",
    updatedAt: "2024-01-15T10:25:00.000Z",
  },
  {
    id: "7",
    ciudad: "Pereira",
    departamento: "Risaralda",
    descripcionCiudad:
      "Perla del Otún, ciudad del Eje Cafetero conocida por su hospitalidad y cultura cafetera.",
    descripcionDepartamento:
      "Departamento del Eje Cafetero, famoso por su café de alta calidad y paisajes montañosos.",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z",
  },
  {
    id: "8",
    ciudad: "Santa Marta",
    departamento: "Magdalena",
    descripcionCiudad:
      "La perla del Caribe, ciudad turística con playas, historia y la Sierra Nevada.",
    descripcionDepartamento:
      "Departamento del Caribe con diversidad geográfica, desde playas hasta montañas nevadas.",
    createdAt: "2024-01-15T10:35:00.000Z",
    updatedAt: "2024-01-15T10:35:00.000Z",
  },
];

export interface CreateUbicacionRequest {
  ciudad: string;
  departamento: string;
  descripcionCiudad: string;
  descripcionDepartamento: string;
}

export interface UpdateUbicacionRequest {
  ciudad: string;
  departamento: string;
  descripcionCiudad: string;
  descripcionDepartamento: string;
}

export interface GetUbicacionesResponse {
  data: Ubicacion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchUbicacionesRequest {
  query?: string; // Texto de búsqueda para ciudad o departamento
  orderBy?: "ciudad" | "departamento";
  orderDirection?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface SearchUbicacionesResponse {
  data: Ubicacion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  searchQuery?: string;
}

class UbicacionService {
  async createUbicacion(
    data: CreateUbicacionRequest
  ): Promise<ApiResponse<Ubicacion>> {
    try {
      // Simulate backend call with mock data
      // Check if departamento already exists
      const existingDepartamento = mockUbicaciones.find(
        (ubicacion) =>
          ubicacion.departamento.toLowerCase() ===
          data.departamento.toLowerCase()
      );

      if (existingDepartamento) {
        return {
          success: false,
          message: "Ya existe una ubicación con este departamento.",
        };
      }

      // Create new ubicacion
      const newUbicacion: Ubicacion = {
        id: (mockUbicaciones.length + 1).toString(),
        ciudad: data.ciudad,
        departamento: data.departamento,
        descripcionCiudad: data.descripcionCiudad,
        descripcionDepartamento: data.descripcionDepartamento,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mock data
      mockUbicaciones.push(newUbicacion);

      return {
        success: true,
        data: newUbicacion,
        message: "Ubicación creada exitosamente",
      };
    } catch (error) {
      console.error("Error creating ubicacion:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al crear la ubicación",
      };
    }
  }
  async getUbicaciones(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<GetUbicacionesResponse>> {
    try {
      // For now, use mock data since backend might not be available
      // TODO: Replace with real API call when backend is ready
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = mockUbicaciones.slice(startIndex, endIndex);

      const mockResponse: GetUbicacionesResponse = {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: mockUbicaciones.length,
          totalPages: Math.ceil(mockUbicaciones.length / limit),
        },
      };

      return {
        success: true,
        data: mockResponse,
        message: "Ubicaciones obtenidas exitosamente",
      };      // Uncomment this when backend is ready:
      /*
      // Remember to uncomment the getAuthHeaders import at the top
      const response = await fetch(
        `${this.baseUrl}?page=${page}&limit=${limit}`,        {
          method: "GET",
          headers: {
            ...getAuthHeaders(),
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al obtener las ubicaciones");
      }

      return {
        success: true,
        data: result,
        message: "Ubicaciones obtenidas exitosamente",
      };
      */
    } catch (error) {
      console.error("Error fetching ubicaciones:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al obtener las ubicaciones",
      };
    }
  }
  async getUbicacion(id: string): Promise<ApiResponse<Ubicacion>> {
    try {
      // Simulate backend call with mock data
      const ubicacion = mockUbicaciones.find((u) => u.id === id);

      if (!ubicacion) {
        return {
          success: false,
          message: "Ubicación no encontrada",
        };
      }

      return {
        success: true,
        data: ubicacion,
        message: "Ubicación obtenida exitosamente",
      };
    } catch (error) {
      console.error("Error fetching ubicacion:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al obtener la ubicación",
      };
    }
  }
  async updateUbicacion(
    id: string,
    data: UpdateUbicacionRequest
  ): Promise<ApiResponse<Ubicacion>> {
    try {
      // Simulate backend call with mock data
      const index = mockUbicaciones.findIndex(
        (ubicacion) => ubicacion.id === id
      );

      if (index === -1) {
        return {
          success: false,
          message: "Ubicación no encontrada",
        };
      }

      // Check if departamento already exists in another ubicacion
      const existingDepartamento = mockUbicaciones.find(
        (ubicacion) =>
          ubicacion.id !== id &&
          ubicacion.departamento.toLowerCase() ===
            data.departamento.toLowerCase()
      );

      if (existingDepartamento) {
        return {
          success: false,
          message: "Ya existe una ubicación con este departamento.",
        };
      }

      // Update ubicacion
      const updatedUbicacion: Ubicacion = {
        ...mockUbicaciones[index],
        ciudad: data.ciudad,
        departamento: data.departamento,
        descripcionCiudad: data.descripcionCiudad,
        descripcionDepartamento: data.descripcionDepartamento,
        updatedAt: new Date().toISOString(),
      };

      mockUbicaciones[index] = updatedUbicacion;

      return {
        success: true,
        data: updatedUbicacion,
        message: "Ubicación actualizada exitosamente",
      };
    } catch (error) {
      console.error("Error updating ubicacion:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al actualizar la ubicación",
      };
    }
  }
  async deleteUbicacion(id: string): Promise<ApiResponse<void>> {
    try {
      // Simulate backend call with mock data
      const index = mockUbicaciones.findIndex(
        (ubicacion) => ubicacion.id === id
      );

      if (index === -1) {
        return {
          success: false,
          message: "Ubicación no encontrada",
        };
      }

      // Remove from mock data
      mockUbicaciones.splice(index, 1);

      return {
        success: true,
        message: "Ubicación eliminada exitosamente",
      };
    } catch (error) {
      console.error("Error deleting ubicacion:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al eliminar la ubicación",
      };
    }
  }

  // Helper function to normalize text for search (remove accents, convert to lowercase)
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  async searchUbicaciones(
    params: SearchUbicacionesRequest = {}
  ): Promise<ApiResponse<SearchUbicacionesResponse>> {
    try {
      const {
        query = "",
        orderBy = "ciudad",
        orderDirection = "asc",
        page = 1,
        limit = 10,
      } = params;

      // Filter ubicaciones based on search query
      let filteredUbicaciones = [...mockUbicaciones];

      if (query.trim()) {
        const normalizedQuery = this.normalizeText(query.trim());
        filteredUbicaciones = mockUbicaciones.filter((ubicacion) => {
          const normalizedCiudad = this.normalizeText(ubicacion.ciudad);
          const normalizedDepartamento = this.normalizeText(
            ubicacion.departamento
          );

          return (
            normalizedCiudad.includes(normalizedQuery) ||
            normalizedDepartamento.includes(normalizedQuery)
          );
        });
      }

      // Sort results
      filteredUbicaciones.sort((a, b) => {
        const aValue = orderBy === "ciudad" ? a.ciudad : a.departamento;
        const bValue = orderBy === "ciudad" ? b.ciudad : b.departamento;

        const comparison = aValue.localeCompare(bValue, "es", {
          sensitivity: "base",
        });
        return orderDirection === "asc" ? comparison : -comparison;
      });

      // Apply pagination
      const total = filteredUbicaciones.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredUbicaciones.slice(startIndex, endIndex);

      const response: SearchUbicacionesResponse = {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        searchQuery: query.trim() || undefined,
      };

      return {
        success: true,
        data: response,
        message: "Búsqueda realizada exitosamente",
      };
    } catch (error) {
      console.error("Error searching ubicaciones:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al buscar ubicaciones",
      };
    }
  }
}

export const ubicacionService = new UbicacionService();
