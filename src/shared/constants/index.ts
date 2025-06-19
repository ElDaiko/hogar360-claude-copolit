// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER_VENDEDOR: "/auth/register-vendedor",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },
  CATEGORIAS: {
    CREATE: "/categorias",
    LIST: "/categorias",
    BY_ID: (id: string) => `/categorias/${id}`,
    UPDATE: (id: string) => `/categorias/${id}`,
    DELETE: (id: string) => `/categorias/${id}`,
  },
  UBICACIONES: {
    CREATE: "/ubicaciones",
    SEARCH: "/ubicaciones/search",
    LIST: "/ubicaciones",
    BY_ID: (id: string) => `/ubicaciones/${id}`,
  },
  CASAS: {
    CREATE: "/casas",
    LIST: "/casas",
    BY_ID: (id: string) => `/casas/${id}`,
    UPDATE: (id: string) => `/casas/${id}`,
    DELETE: (id: string) => `/casas/${id}`,
  },
  HORARIOS: {
    CREATE: "/horarios",
    LIST: "/horarios",
    BY_VENDEDOR: (vendedorId: string) => `/horarios/vendedor/${vendedorId}`,
    BY_CASA: (casaId: string) => `/horarios/casa/${casaId}`,
  },
  VISITAS: {
    CREATE: "/visitas",
    LIST: "/visitas",
    BY_COMPRADOR: (email: string) => `/visitas/comprador/${email}`,
    CANCEL: (id: string) => `/visitas/${id}/cancel`,
  },
} as const;

// App Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROPERTIES: "/propiedades",
  PROPERTY_DETAIL: (id: string) => `/propiedades/${id}`,
  PROPERTY_CREATE: "/propiedades/crear",
  PROPERTY_EDIT: (id: string) => `/propiedades/${id}/editar`,
  CATEGORIES: "/categorias",
  LOCATIONS: "/ubicaciones",
  SEARCH_LOCATIONS: "/buscar-ubicaciones",
  VISITS: "/visitas",
  SCHEDULE_VISIT: (casaId: string) => `/visitas/agendar/${casaId}`,
  PROFILE: "/perfil",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/usuarios",
  ADMIN_VENDEDORES: "/admin/vendedores",
  ADMIN_CATEGORIES: "/admin/categorias",
  ADMIN_LOCATIONS: "/admin/ubicaciones",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "hogar360_auth_token",
  USER_DATA: "hogar360_user_data",
  THEME: "hogar360_theme",
  LANGUAGE: "hogar360_language",
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  NOMBRE_MAX_LENGTH: 50,
  DESCRIPCION_MAX_LENGTH: 120,
  CATEGORIA_DESCRIPCION_MAX_LENGTH: 90,
  TELEFONO_MAX_LENGTH: 13,
  PASSWORD_MIN_LENGTH: 8,
  MAX_HORARIOS_SEMANAS: 3,
  MAX_COMPRADORES_POR_HORARIO: 2,
} as const;

// Default Values
export const DEFAULT_VALUES = {
  PAGINATION: {
    PAGE: 1,
    LIMIT: 10,
  },
  PROPERTY_FILTERS: {
    ORDEN_POR: "fecha" as const,
    ORDEN_DIRECCION: "desc" as const,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Este campo es requerido",
  INVALID_EMAIL: "Ingrese un email válido",
  INVALID_PHONE: "El teléfono debe tener máximo 13 caracteres",
  INVALID_DOCUMENT: "El documento debe ser numérico",
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`,
  UNDERAGE: "Debe ser mayor de edad",
  DUPLICATE_NAME: "Este nombre ya existe",
  UNAUTHORIZED: "No tiene permisos para realizar esta acción",
  SERVER_ERROR: "Error del servidor. Intente más tarde",
  NETWORK_ERROR: "Error de conexión. Verifique su internet",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Inicio de sesión exitoso",
  REGISTER_SUCCESS: "Registro exitoso",
  CREATE_SUCCESS: "Creado exitosamente",
  UPDATE_SUCCESS: "Actualizado exitosamente",
  DELETE_SUCCESS: "Eliminado exitosamente",
  VISIT_SCHEDULED: "Visita agendada exitosamente",
  VISIT_CANCELLED: "Visita cancelada exitosamente",
} as const;

// Theme Colors (matching Tailwind config)
export const COLORS = {
  PRIMARY: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  SECONDARY: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
} as const;

// Property Categories (for seeding/mocking)
export const PROPERTY_CATEGORIES = [
  { nombre: "Casa", descripcion: "Casas unifamiliares y multifamiliares" },
  { nombre: "Apartamento", descripcion: "Apartamentos y condominios" },
  { nombre: "Local Comercial", descripcion: "Espacios comerciales y oficinas" },
  { nombre: "Lote", descripcion: "Terrenos y lotes para construcción" },
  { nombre: "Finca", descripcion: "Propiedades rurales y fincas" },
] as const;

// Colombian Departments and Cities (sample for mocking)
export const COLOMBIA_LOCATIONS = [
  {
    departamento: "Antioquia",
    descripcionDepartamento: "Departamento de Antioquia",
    ciudades: [
      { ciudad: "Medellín", descripcionCiudad: "Capital de Antioquia" },
      {
        ciudad: "Bello",
        descripcionCiudad: "Municipio del área metropolitana",
      },
      {
        ciudad: "Itagüí",
        descripcionCiudad: "Municipio del área metropolitana",
      },
    ],
  },
  {
    departamento: "Cundinamarca",
    descripcionDepartamento: "Departamento de Cundinamarca",
    ciudades: [
      { ciudad: "Bogotá", descripcionCiudad: "Capital de Colombia" },
      { ciudad: "Soacha", descripcionCiudad: "Municipio cercano a Bogotá" },
      { ciudad: "Chía", descripcionCiudad: "Municipio de la sabana" },
    ],
  },
  {
    departamento: "Valle del Cauca",
    descripcionDepartamento: "Departamento del Valle del Cauca",
    ciudades: [
      { ciudad: "Cali", descripcionCiudad: "Capital del Valle del Cauca" },
      { ciudad: "Palmira", descripcionCiudad: "Municipio del Valle" },
      {
        ciudad: "Buenaventura",
        descripcionCiudad: "Puerto principal del Pacífico",
      },
    ],
  },
] as const;
