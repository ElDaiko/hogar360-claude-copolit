// User types
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  documentoIdentidad: string;
  celular: string;
  fechaNacimiento: string;
  correo: string;
  rol: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "vendedor" | "comprador";

// Location types
export interface Ubicacion {
  id: string;
  ciudad: string;
  departamento: string;
  descripcionCiudad: string;
  descripcionDepartamento: string;
  createdAt: string;
  updatedAt: string;
}

// Category types
export interface CategoriaInmueble {
  id: string;
  nombre: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoriaInmueble {
  nombre: string;
  descripcion: string;
}

// Property types
export interface Casa {
  id: string;
  nombre: string;
  descripcion: string;
  categoriaInmueble: CategoriaInmueble;
  cantidadCuartos: number;
  cantidadBanos: number;
  precio: number;
  ubicacion: Ubicacion;
  fechaPublicacionActiva: string;
  estadoPublicacion: EstadoPublicacion;
  fechaPublicacion: string;
  vendedorId: string;
  imagenes?: string[];
  area?: number;
  createdAt: string;
  updatedAt: string;
}

export type EstadoPublicacion =
  | "PUBLICADA"
  | "PUBLICACION_PAUSADA"
  | "TRANSACCION_CURSO"
  | "TRANSACCION_FINALIZADA";

// Visit schedule types
export interface HorarioDisponible {
  id: string;
  vendedorId: string;
  casaId: string;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  cantidadAgendados: number;
  maxCapacidad: number;
  createdAt: string;
  updatedAt: string;
}

export interface VisitaAgendada {
  id: string;
  horarioDisponibleId: string;
  compradorEmail: string;
  estado: EstadoVisita;
  createdAt: string;
  updatedAt: string;
}

export type EstadoVisita = "confirmada" | "cancelada" | "completada";

// Auth types
export interface LoginCredentials {
  correo: string;
  clave: string;
}

export interface RegisterVendedorData {
  nombre: string;
  apellido: string;
  documentoIdentidad: string;
  celular: string;
  fechaNacimiento: string;
  correo: string;
  clave: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface PropertyFilters {
  ubicacion?: string;
  categoriaId?: string;
  cantidadCuartos?: number;
  cantidadBanos?: number;
  precioMinimo?: number;
  precioMaximo?: number;
  ordenarPor?: "precio" | "fecha" | "ubicacion";
  ordenarDireccion?: "asc" | "desc";
}

export interface VisitFilters {
  fechaInicio?: string;
  fechaFin?: string;
  ubicacion?: string;
}

// Component Props types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}
