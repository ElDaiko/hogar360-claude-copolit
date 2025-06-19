import type { ApiResponse } from "../shared/types";
import type {
  User,
  CreateUsuarioVendedorRequest,
  CreateUsuarioVendedorResponse,
} from "../shared/types";

// Mock data for testing without backend
const mockUsuarios: User[] = [
  {
    id: "admin-1",
    nombre: "Administrador",
    apellido: "Sistema",
    documentoIdentidad: "12345678",
    celular: "+573001234567",
    fechaNacimiento: "1990-01-01",
    correo: "admin@hogar360.com",
    rol: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  // Usuarios vendedores por defecto
  {
    id: "vendedor-1",
    nombre: "Carlos",
    apellido: "Rodríguez",
    documentoIdentidad: "87654321",
    celular: "+573009876543",
    fechaNacimiento: "1985-05-15",
    correo: "carlos.rodriguez@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-2",
    nombre: "María",
    apellido: "González",
    documentoIdentidad: "11223344",
    celular: "+573005556677",
    fechaNacimiento: "1992-08-20",
    correo: "maria.gonzalez@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-3",
    nombre: "Juan",
    apellido: "Pérez",
    documentoIdentidad: "99887766",
    celular: "+573007778899",
    fechaNacimiento: "1988-03-10",
    correo: "juan.perez@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-4",
    nombre: "Ana",
    apellido: "López",
    documentoIdentidad: "55443322",
    celular: "+573002223333",
    fechaNacimiento: "1995-12-05",
    correo: "ana.lopez@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-5",
    nombre: "Diego",
    apellido: "Martínez",
    documentoIdentidad: "66778899",
    celular: "+573004445555",
    fechaNacimiento: "1991-07-22",
    correo: "diego.martinez@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-6",
    nombre: "Patricia",
    apellido: "Herrera",
    documentoIdentidad: "33445566",
    celular: "+573006667777",
    fechaNacimiento: "1987-11-18",
    correo: "patricia.herrera@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-7",
    nombre: "Roberto",
    apellido: "Silva",
    documentoIdentidad: "77889900",
    celular: "+573008889999",
    fechaNacimiento: "1993-04-12",
    correo: "roberto.silva@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "vendedor-8",
    nombre: "Lucía",
    apellido: "Torres",
    documentoIdentidad: "44556677",
    celular: "+573001112222",
    fechaNacimiento: "1989-09-30",
    correo: "lucia.torres@hogar360.com",
    rol: "vendedor",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

// Simulación simple de bcrypt (en producción usar la librería real)
const hashPassword = (password: string): string => {
  // En producción, usar bcrypt.hash()
  return `hashed_${password}_${Date.now()}`;
};

class UsuarioService {
  async createUsuarioVendedor(
    data: CreateUsuarioVendedorRequest
  ): Promise<ApiResponse<CreateUsuarioVendedorResponse>> {
    try {
      // Simular validación de backend

      // 1. Verificar que el email no existe
      const existingEmailUser = mockUsuarios.find(
        (user) => user.correo.toLowerCase() === data.correo.toLowerCase()
      );

      if (existingEmailUser) {
        return {
          success: false,
          message: "Ya existe un usuario con este correo electrónico.",
        };
      }

      // 2. Verificar que el documento no existe
      const existingDocUser = mockUsuarios.find(
        (user) => user.documentoIdentidad === data.documentoIdentidad
      );

      if (existingDocUser) {
        return {
          success: false,
          message: "Ya existe un usuario con este documento de identidad.",
        };
      }

      // 3. Validar edad (mayor de 18)
      const birthDate = new Date(data.fechaNacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      let realAge = age;
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        realAge = age - 1;
      }

      if (realAge < 18) {
        return {
          success: false,
          message: "El usuario debe ser mayor de edad (18 años).",
        };
      }

      // 4. Crear nuevo usuario vendedor
      const hashedPassword = hashPassword(data.clave);

      const newUsuario: User = {
        id: `vendedor-${Date.now()}`,
        nombre: data.nombre,
        apellido: data.apellido,
        documentoIdentidad: data.documentoIdentidad,
        celular: data.celular,
        fechaNacimiento: data.fechaNacimiento,
        correo: data.correo,
        rol: "vendedor",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Agregar a mock data
      mockUsuarios.push(newUsuario);

      // Respuesta sin la clave por seguridad
      const response: CreateUsuarioVendedorResponse = {
        id: newUsuario.id,
        nombre: newUsuario.nombre,
        apellido: newUsuario.apellido,
        documentoIdentidad: newUsuario.documentoIdentidad,
        celular: newUsuario.celular,
        fechaNacimiento: newUsuario.fechaNacimiento,
        correo: newUsuario.correo,
        rol: newUsuario.rol,
        createdAt: newUsuario.createdAt,
        updatedAt: newUsuario.updatedAt,
      };

      console.log("Usuario vendedor creado:", {
        ...response,
        claveHasheada: hashedPassword, // Solo para debug, no retornar en respuesta real
      });

      return {
        success: true,
        data: response,
        message: "Usuario vendedor creado exitosamente",
      };
    } catch (error) {
      console.error("Error creating usuario vendedor:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al crear el usuario vendedor",
      };
    }
  }
  async getUsuarios(
    page: number = 1,
    limit: number = 10
  ): Promise<
    ApiResponse<{
      data: User[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    try {
      // Filtrar solo vendedores
      const vendedores = mockUsuarios.filter((user) => user.rol === "vendedor");

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = vendedores.slice(startIndex, endIndex);

      const response = {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: vendedores.length,
          totalPages: Math.ceil(vendedores.length / limit),
        },
      };

      return {
        success: true,
        data: response,
        message: "Usuarios obtenidos exitosamente",
      };
    } catch (error) {
      console.error("Error fetching usuarios:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al obtener los usuarios",
      };
    }
  }

  async deleteUsuario(id: string): Promise<ApiResponse<void>> {
    try {
      const index = mockUsuarios.findIndex((user) => user.id === id);

      if (index === -1) {
        return {
          success: false,
          message: "Usuario no encontrado",
        };
      }

      // No permitir eliminar admin
      if (mockUsuarios[index].rol === "admin") {
        return {
          success: false,
          message: "No se puede eliminar un usuario administrador",
        };
      }

      mockUsuarios.splice(index, 1);

      return {
        success: true,
        message: "Usuario eliminado exitosamente",
      };
    } catch (error) {
      console.error("Error deleting usuario:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al eliminar el usuario",
      };
    }
  }
}

export const usuarioService = new UsuarioService();
