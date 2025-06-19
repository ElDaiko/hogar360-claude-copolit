import type { ApiResponse, PaginatedResponse } from "../shared/types";
import type {
  Casa,
  CreateCasaRequest,
  CreateCasaResponse,
  CategoriaInmueble,
  Ubicacion,
  EstadoPublicacion,
  PropertyFilters,
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
    imagenes: [],
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
    imagenes: [],
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
    imagenes: [],
    createdAt: "2024-06-17T09:15:00.000Z",
    updatedAt: "2024-06-17T09:15:00.000Z",
  },
  {
    id: "casa-4",
    nombre: "Casa Familiar en Cali",
    descripcion:
      "Amplia casa familiar en conjunto cerrado con zonas verdes, parqueadero y salón comunal.",
    categoriaInmueble: {
      id: "categoria-1",
      nombre: "Casa",
      descripcion: "Casas tradicionales",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 4,
    cantidadBanos: 3,
    precio: 650000000,
    ubicacion: {
      id: "ubicacion-4",
      ciudad: "Cali",
      departamento: "Valle del Cauca",
      descripcionCiudad: "Capital del departamento del Valle del Cauca",
      descripcionDepartamento: "Departamento del suroeste de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-22",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-18T08:00:00.000Z",
    vendedorId: "vendedor-2",
    area: 280,
    imagenes: [],
    createdAt: "2024-06-18T08:00:00.000Z",
    updatedAt: "2024-06-18T08:00:00.000Z",
  },
  {
    id: "casa-5",
    nombre: "Apartamento Estudiantes Barranquilla",
    descripcion:
      "Cómodo apartamento cerca a universidades, ideal para estudiantes o profesionales jóvenes.",
    categoriaInmueble: {
      id: "categoria-2",
      nombre: "Apartamento",
      descripcion: "Apartamentos urbanos",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 1,
    cantidadBanos: 1,
    precio: 280000000,
    ubicacion: {
      id: "ubicacion-5",
      ciudad: "Barranquilla",
      departamento: "Atlántico",
      descripcionCiudad: "Puerta de Oro de Colombia",
      descripcionDepartamento: "Departamento del norte de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-21",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-18T11:30:00.000Z",
    vendedorId: "vendedor-4",
    area: 55,
    imagenes: [],
    createdAt: "2024-06-18T11:30:00.000Z",
    updatedAt: "2024-06-18T11:30:00.000Z",
  },
  {
    id: "casa-6",
    nombre: "Local Comercial Zona Rosa",
    descripcion:
      "Excelente local comercial en la Zona Rosa de Bogotá, ideal para restaurante o tienda.",
    categoriaInmueble: {
      id: "categoria-5",
      nombre: "Local Comercial",
      descripcion: "Locales para negocios",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 0,
    cantidadBanos: 2,
    precio: 800000000,
    ubicacion: {
      id: "ubicacion-1",
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      descripcionCiudad: "Capital de Colombia",
      descripcionDepartamento: "Departamento central de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-25",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-18T16:45:00.000Z",
    vendedorId: "vendedor-1",
    area: 120,
    imagenes: [],
    createdAt: "2024-06-18T16:45:00.000Z",
    updatedAt: "2024-06-18T16:45:00.000Z",
  },
  {
    id: "casa-7",
    nombre: "Oficina Ejecutiva El Poblado",
    descripcion:
      "Moderna oficina en El Poblado, Medellín. Completamente amoblada con vista panorámica.",
    categoriaInmueble: {
      id: "categoria-4",
      nombre: "Oficina",
      descripcion: "Espacios para oficinas",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 0,
    cantidadBanos: 1,
    precio: 450000000,
    ubicacion: {
      id: "ubicacion-2",
      ciudad: "Medellín",
      departamento: "Antioquia",
      descripcionCiudad: "Ciudad de la eterna primavera",
      descripcionDepartamento: "Departamento del noroeste de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-23",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-18T13:20:00.000Z",
    vendedorId: "vendedor-3",
    area: 80,
    imagenes: [],
    createdAt: "2024-06-18T13:20:00.000Z",
    updatedAt: "2024-06-18T13:20:00.000Z",
  },
  {
    id: "casa-8",
    nombre: "Casa Campestre Chía",
    descripcion:
      "Hermosa casa campestre en Chía con jardín, BBQ y vista a los cerros orientales.",
    categoriaInmueble: {
      id: "categoria-1",
      nombre: "Casa",
      descripcion: "Casas tradicionales",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 5,
    cantidadBanos: 4,
    precio: 950000000,
    ubicacion: {
      id: "ubicacion-6",
      ciudad: "Chía",
      departamento: "Cundinamarca",
      descripcionCiudad: "Municipio sabana de Bogotá",
      descripcionDepartamento: "Departamento central de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2024-06-24",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2024-06-18T15:10:00.000Z",
    vendedorId: "vendedor-5",
    area: 400,
    imagenes: [],
    createdAt: "2024-06-18T15:10:00.000Z",
    updatedAt: "2024-06-18T15:10:00.000Z",
  },
  {
    id: "casa-9",
    nombre: "Apartamento Loft Centro Histórico",
    descripcion:
      "Elegante loft en el centro histórico de Cartagena, completamente restaurado con acabados modernos y aire colonial.",
    categoriaInmueble: {
      id: "categoria-2",
      nombre: "Apartamento",
      descripcion: "Apartamentos urbanos",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 2,
    cantidadBanos: 2,
    precio: 780000000,
    ubicacion: {
      id: "ubicacion-3",
      ciudad: "Cartagena",
      departamento: "Bolívar",
      descripcionCiudad: "Ciudad histórica del Caribe",
      descripcionDepartamento: "Departamento del norte de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-20",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T10:00:00.000Z",
    vendedorId: "vendedor-2",
    area: 110,
    imagenes: [],
    createdAt: "2025-06-18T10:00:00.000Z",
    updatedAt: "2025-06-18T10:00:00.000Z",
  },
  {
    id: "casa-10",
    nombre: "Casa Moderna Santa Marta",
    descripcion:
      "Casa moderna de 3 niveles cerca a la playa en Santa Marta. Piscina privada, terraza y garaje cubierto.",
    categoriaInmueble: {
      id: "categoria-1",
      nombre: "Casa",
      descripcion: "Casas tradicionales",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 4,
    cantidadBanos: 3,
    precio: 720000000,
    ubicacion: {
      id: "ubicacion-7",
      ciudad: "Santa Marta",
      departamento: "Magdalena",
      descripcionCiudad: "Perla del Caribe colombiano",
      descripcionDepartamento: "Departamento del norte de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-21",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T12:30:00.000Z",
    vendedorId: "vendedor-3",
    area: 320,
    imagenes: [],
    createdAt: "2025-06-18T12:30:00.000Z",
    updatedAt: "2025-06-18T12:30:00.000Z",
  },
  {
    id: "casa-11",
    nombre: "Apartamento Ejecutivo Bucaramanga",
    descripcion:
      "Moderno apartamento ejecutivo en el centro financiero de Bucaramanga. Ideal para profesionales.",
    categoriaInmueble: {
      id: "categoria-2",
      nombre: "Apartamento",
      descripcion: "Apartamentos urbanos",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 3,
    cantidadBanos: 2,
    precio: 380000000,
    ubicacion: {
      id: "ubicacion-8",
      ciudad: "Bucaramanga",
      departamento: "Santander",
      descripcionCiudad: "Ciudad bonita de Colombia",
      descripcionDepartamento: "Departamento del oriente de Colombia",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-22",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T14:15:00.000Z",
    vendedorId: "vendedor-1",
    area: 85,
    imagenes: [],
    createdAt: "2025-06-18T14:15:00.000Z",
    updatedAt: "2025-06-18T14:15:00.000Z",
  },
  {
    id: "casa-12",
    nombre: "Penthouse Exclusivo Pereira",
    descripcion:
      "Impresionante penthouse con vista panorámica de la ciudad cafetera. Acabados de lujo y espacios amplios.",
    categoriaInmueble: {
      id: "categoria-3",
      nombre: "Penthouse",
      descripcion: "Penthouses de lujo",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 4,
    cantidadBanos: 5,
    precio: 1100000000,
    ubicacion: {
      id: "ubicacion-9",
      ciudad: "Pereira",
      departamento: "Risaralda",
      descripcionCiudad: "Corazón del eje cafetero",
      descripcionDepartamento: "Departamento del eje cafetero",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-25",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T16:00:00.000Z",
    vendedorId: "vendedor-4",
    area: 200,
    imagenes: [],
    createdAt: "2025-06-18T16:00:00.000Z",
    updatedAt: "2025-06-18T16:00:00.000Z",
  },
  {
    id: "casa-13",
    nombre: "Casa Familiar Villavicencio",
    descripcion:
      "Espaciosa casa familiar en conjunto cerrado con piscina, zona BBQ y áreas verdes. Perfecta para familias grandes.",
    categoriaInmueble: {
      id: "categoria-1",
      nombre: "Casa",
      descripcion: "Casas tradicionales",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 5,
    cantidadBanos: 4,
    precio: 580000000,
    ubicacion: {
      id: "ubicacion-10",
      ciudad: "Villavicencio",
      departamento: "Meta",
      descripcionCiudad: "Puerta de entrada a los llanos",
      descripcionDepartamento: "Departamento de los llanos orientales",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-23",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T09:45:00.000Z",
    vendedorId: "vendedor-5",
    area: 380,
    imagenes: [],
    createdAt: "2025-06-18T09:45:00.000Z",
    updatedAt: "2025-06-18T09:45:00.000Z",
  },
  {
    id: "casa-14",
    nombre: "Local Comercial Armenia",
    descripcion:
      "Excelente local comercial en el centro de Armenia, ideal para cualquier tipo de negocio. Muy buena ubicación.",
    categoriaInmueble: {
      id: "categoria-5",
      nombre: "Local Comercial",
      descripcion: "Locales para negocios",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 0,
    cantidadBanos: 1,
    precio: 320000000,
    ubicacion: {
      id: "ubicacion-11",
      ciudad: "Armenia",
      departamento: "Quindío",
      descripcionCiudad: "Ciudad milagro",
      descripcionDepartamento: "Departamento del eje cafetero",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-24",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T11:20:00.000Z",
    vendedorId: "vendedor-2",
    area: 90,
    imagenes: [],
    createdAt: "2025-06-18T11:20:00.000Z",
    updatedAt: "2025-06-18T11:20:00.000Z",
  },
  {
    id: "casa-15",
    nombre: "Apartamento Estudiantil Manizales",
    descripcion:
      "Cómodo apartamento cerca a universidades en Manizales. Perfecto para estudiantes con todos los servicios incluidos.",
    categoriaInmueble: {
      id: "categoria-2",
      nombre: "Apartamento",
      descripcion: "Apartamentos urbanos",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    cantidadCuartos: 2,
    cantidadBanos: 1,
    precio: 250000000,
    ubicacion: {
      id: "ubicacion-12",
      ciudad: "Manizales",
      departamento: "Caldas",
      descripcionCiudad: "Capital del departamento de Caldas",
      descripcionDepartamento: "Departamento del eje cafetero",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    fechaPublicacionActiva: "2025-06-26",
    estadoPublicacion: "PUBLICADA" as EstadoPublicacion,
    fechaPublicacion: "2025-06-18T17:30:00.000Z",
    vendedorId: "vendedor-3",
    area: 60,
    imagenes: [],
    createdAt: "2025-06-18T17:30:00.000Z",
    updatedAt: "2025-06-18T17:30:00.000Z",
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

  // Public method to list all available houses with filters
  async listarCasasPublicas(
    page: number = 1,
    limit: number = 12,
    filters?: PropertyFilters
  ): Promise<ApiResponse<PaginatedResponse<Casa>>> {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 600));

      const today = new Date().toISOString().split("T")[0];

      // Filtrar casas: solo publicadas y con fecha de publicación activa mayor a hoy
      let casasFiltradas = mockCasas.filter(
        (casa) =>
          casa.estadoPublicacion === "PUBLICADA" &&
          casa.fechaPublicacionActiva >= today
      );

      // Aplicar filtros adicionales
      if (filters) {
        if (filters.categoriaId) {
          casasFiltradas = casasFiltradas.filter(
            (casa) => casa.categoriaInmueble.id === filters.categoriaId
          );
        }

        if (filters.ubicacion) {
          const ubicacionLower = filters.ubicacion.toLowerCase();
          casasFiltradas = casasFiltradas.filter(
            (casa) =>
              casa.ubicacion.ciudad.toLowerCase().includes(ubicacionLower) ||
              casa.ubicacion.departamento.toLowerCase().includes(ubicacionLower)
          );
        }

        if (filters.cantidadCuartos) {
          casasFiltradas = casasFiltradas.filter(
            (casa) => casa.cantidadCuartos >= filters.cantidadCuartos!
          );
        }

        if (filters.cantidadBanos) {
          casasFiltradas = casasFiltradas.filter(
            (casa) => casa.cantidadBanos >= filters.cantidadBanos!
          );
        }

        if (filters.precioMinimo) {
          casasFiltradas = casasFiltradas.filter(
            (casa) => casa.precio >= filters.precioMinimo!
          );
        }

        if (filters.precioMaximo) {
          casasFiltradas = casasFiltradas.filter(
            (casa) => casa.precio <= filters.precioMaximo!
          );
        }

        // Aplicar ordenamiento
        if (filters.ordenarPor) {
          casasFiltradas.sort((a, b) => {
            let comparison = 0;

            switch (filters.ordenarPor) {
              case "precio":
                comparison = a.precio - b.precio;
                break;
              case "fecha":
                comparison =
                  new Date(a.fechaPublicacion).getTime() -
                  new Date(b.fechaPublicacion).getTime();
                break;
              case "ubicacion":
                comparison = a.ubicacion.ciudad.localeCompare(
                  b.ubicacion.ciudad
                );
                break;
              default:
                comparison = 0;
            }

            return filters.ordenarDireccion === "desc"
              ? -comparison
              : comparison;
          });
        }
      }

      // Aplicar paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const casasPaginadas = casasFiltradas.slice(startIndex, endIndex);

      const totalPages = Math.ceil(casasFiltradas.length / limit);

      return {
        success: true,
        data: {
          data: casasPaginadas,
          pagination: {
            page,
            limit,
            total: casasFiltradas.length,
            totalPages,
          },
        },
        message: "Casas obtenidas exitosamente",
      };
    } catch (error) {
      console.error("Error listing public houses:", error);
      return {
        success: false,
        message: "Error al obtener las casas. Por favor, intenta nuevamente.",
      };
    }
  }
}

export const casaService = new CasaService();
