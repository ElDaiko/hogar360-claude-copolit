# Hogar360 - Plataforma Inmobiliaria

## Descripción

Hogar360 es una plataforma inmobiliaria moderna desarrollada con React 18, TypeScript, Vite 5 y TailwindCSS. La plataforma permite a usuarios administradores, vendedores y compradores gestionar propiedades inmobiliarias de manera eficiente.

## Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript + Vite 5
- **Estilos**: TailwindCSS
- **Arquitectura**: Atomic Design + LIFT
- **Estado**: Zustand
- **Validación**: Zod + React Hook Form
- **Iconos**: Font Awesome

## Características Implementadas

### ✅ HU#8 - Autenticación de Usuarios

- Sistema de login con validación
- Gestión de sesiones con Zustand
- Rutas protegidas por rol
- Roles: Administrador, Vendedor, Comprador
- Dashboard personalizado por rol
- Navegación lateral (sidebar) responsiva

### ✅ HU#1 - Gestión de Categorías de Inmuebles

- CRUD completo de categorías de inmuebles (Admin)
- Formulario de creación con validación avanzada
- Tabla de categorías existentes con paginación
- Modal de confirmación para eliminación
- Modal de advertencia para nombres duplicados
- Validación local y del servidor
- Layout optimizado según diseño Figma
- Responsive design completo

### ✅ HU#2 - Listar Categorías

- Visualización de categorías existentes
- Paginación y filtros
- Integración con sistema de gestión

### ✅ HU#3 - Gestión de Ubicaciones

- CRUD completo de ubicaciones (Admin)
- Formulario de creación con campos: ciudad, departamento, descripciones
- Validaciones Zod con límites de caracteres (50 para nombres, 120 para descripciones)
- Tabla de ubicaciones existentes con funcionalidad de eliminación
- Modal de confirmación para eliminación
- Modal de advertencia para departamentos duplicados
- No permite crear ubicaciones con departamentos existentes
- 8 ubicaciones por defecto de Colombia
- 5 categorías por defecto (Apartamento, Casa, Penthouse, Oficina, Local Comercial)
- Acceso restringido solo para administradores
- Integración completa con sidebar de navegación
- Hooks reutilizables siguiendo patrones del proyecto
- Funciona completamente con datos mockeados

### ✅ HU#4 - Búsqueda de Ubicaciones en Tiempo Real

- Funcionalidad de búsqueda disponible para todos los roles
- Búsqueda en tiempo real con debounce (300ms)
- Normalización de texto (ignora tildes y mayúsculas/minúsculas)
- Filtrado por ciudad y departamento simultáneamente
- Ordenamiento ascendente/descendente por ciudad o departamento
- Paginación completa con navegación intuitiva
- UI responsiva: tabla en desktop + tarjetas en móvil
- Paddings y espaciado optimizados
- Patrón de búsqueda substring inclusivo
- Hook reutilizable `useSearchUbicaciones`
- Ruta `/buscar-ubicaciones` accesible para todos
- Integración completa con sidebar de navegación

### ✅ HU#5 - Gestión de Usuarios Vendedores

- CRUD completo de usuarios vendedores (Solo Admin)
- Formulario de creación con validación completa y UX mejorada
- Campos: nombre, apellido, documento, celular, fecha de nacimiento, correo, contraseña
- Validación de edad mínima (18 años) con lógica de fechas
- Selección de fecha de nacimiento con dropdowns intuitivos (día, mes, año)
- Años ordenados de más reciente a más antiguo con separadores por décadas
- Validación de días dinámicos según mes/año (no permite 31 de febrero)
- Indicador de fortaleza de contraseña en tiempo real
- Verificación de correo y documento únicos
- Encriptación simulada de contraseñas
- Lista paginada de usuarios vendedores existentes
- UI responsiva: tabla en desktop + tarjetas en móvil
- Modal de confirmación para eliminación de usuarios
- 8 usuarios vendedores por defecto para desarrollo/pruebas
- Modales con efecto blur azulado en lugar de fondo negro
- Hooks reutilizables: `useCreateUsuarioVendedor`, `useUsuariosVendedores`
- Tipos TypeScript completos y validación Zod
- Servicio mock con lógica de negocio completa
- Acceso restringido solo para administradores
- Integración completa con sidebar de navegación
- Documentación completa de usuarios por defecto (USUARIOS_VENDEDORES.md)

### ✅ HU#6 - Publicación de Propiedades

- Funcionalidad completa para que vendedores publiquen casas
- Formulario de publicación con todos los campos requeridos:
  - Nombre, descripción, categoría de inmueble
  - Cantidad de cuartos y baños, precio
  - Ubicación (ciudad y departamento)
  - Fecha de publicación con validación (no mayor a un mes)
- Estados de publicación: PUBLICADA, PUBLICACION_PAUSADA, TRANSACCION_CURSO, TRANSACCION_FINALIZADA
- Validaciones completas con Zod y React Hook Form
- Gestión de propiedades del vendedor con listado paginado
- Acciones disponibles: eliminar casa y cambiar estado de publicación
- UI responsiva: tabla en desktop + tarjetas en móvil
- Navegación separada: "Mis Propiedades" y "Publicar Casa"
- Rutas protegidas para vendedores: `/vendedor/casas` y `/vendedor/publicar-casa`
- Modales de confirmación y advertencia para todas las acciones
- Feedback visual completo con mensajes de éxito y error
- Hooks reutilizables: `useCasas`, `useCreateCasa`
- Servicio mock con CRUD completo y lógica de negocio
- Tipos TypeScript: `Casa`, `CreateCasaRequest`, `CreateCasaResponse`
- Integración completa con componentes existentes del sistema
- 12 casas por defecto para desarrollo/pruebas

## Estructura del Proyecto

```
src/
├── components/           # Componentes siguiendo Atomic Design
│   ├── atoms/           # Componentes básicos
│   ├── molecules/       # Combinaciones de átomos
│   ├── organisms/       # Combinaciones complejas
│   └── templates/       # Layouts y plantillas
├── pages/               # Páginas de la aplicación
│   ├── CategoriasPage.tsx
│   ├── UbicacionesPage.tsx
│   ├── BuscarUbicacionesPage.tsx
│   ├── UsuariosVendedoresPage.tsx
│   ├── CasasPage.tsx
│   ├── PublicarCasaPage.tsx
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── shared/              # Recursos compartidos
│   ├── constants/       # Constantes globales
│   ├── hooks/          # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useCreateCategoria.ts
│   │   ├── useListarCategorias.ts
│   │   ├── useCreateUbicacion.ts
│   │   ├── useUbicaciones.ts
│   │   ├── useDeleteUbicacion.ts
│   │   ├── useSearchUbicaciones.ts
│   │   ├── useCreateUsuarioVendedor.ts
│   │   ├── useUsuariosVendedores.ts
│   │   ├── useCasas.ts
│   │   └── useCreateCasa.ts
│   ├── store/          # Estado global (Zustand)
│   ├── types/          # Tipos TypeScript
│   └── validations/    # Esquemas de validación
│       ├── authSchemas.ts
│       ├── categoriaSchemas.ts
│       ├── ubicacionSchemas.ts
│       ├── usuarioSchemas.ts
│       └── casaSchemas.ts
└── services/           # Servicios y API calls
    ├── authService.ts
    ├── categoriaService.ts
    ├── ubicacionService.ts
    ├── usuarioService.ts
    └── casaService.ts
```

## Desarrollo

### Instalación

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

### Build para producción

```bash
npm run build
```

## GitFlow

Este proyecto utiliza GitFlow para el manejo de ramas:

### Ramas principales:

- `main`: Rama principal de producción
- `develop`: Rama de desarrollo donde se integran las features

### Ramas de trabajo:

- `feature/HU-X-nombre`: Ramas para cada Historia de Usuario
- `release/v*`: Ramas para preparar releases
- `hotfix/nombre`: Ramas para correcciones urgentes

### Flujo de trabajo:

1. **Nueva HU**: `git checkout develop && git checkout -b feature/HU-X-nombre`
2. **Desarrollo**: Desarrollar la funcionalidad en la rama feature
3. **Commit**: `git add . && git commit -m "feat(HU-X): descripción"`
4. **Push**: `git push -u origin feature/HU-X-nombre`
5. **Pull Request**: Crear PR desde GitHub para merger a develop
6. **Merge**: Después de review, merger a develop
7. **Cleanup**: Eliminar rama feature

### Estado actual:

- ✅ **HU#8**: `feature/HU-8-autenticacion` - Completada y mergeada
- ✅ **HU#1**: `feature/HU-1-gestion-categorias` - Completada y mergeada
- ✅ **HU#2**: `feature/HU-2-listar-categorias` - Completada y mergeada
- ✅ **HU#3**: `feature/HU-3-crear-ubicaciones` - Completada y mergeada
- ✅ **HU#4**: `feature/HU-4-buscar-ubicaciones` - Completada y mergeada
- ✅ **HU#5**: `feature/HU-5-crear-usuario-vendedor` - Completada y mergeada
- ✅ **HU#6**: `feature/HU-6-publicar-casa` - Completada y lista para push
- 🔄 **Próxima HU**: HU#7 - Búsqueda de Propiedades

### Comandos útiles:

```bash
# Ver estado del repositorio
git status
git branch -a

# Crear nueva rama para HU
git checkout develop
git pull origin develop
git checkout -b feature/HU-X-nombre

# Sincronizar con remoto
git fetch --all
git pull origin develop
```

## Historias de Usuario Pendientes

- ✅ HU#1: Gestión de Categorías de Inmuebles - **COMPLETADA**
- ✅ HU#2: Listar Categorías - **COMPLETADA**
- ✅ HU#3: Gestión de Ubicaciones - **COMPLETADA**
- ✅ HU#4: Búsqueda de Ubicaciones - **COMPLETADA**
- ✅ HU#5: Gestión de Usuarios Vendedores - **COMPLETADA**
- ✅ HU#6: Publicación de Propiedades - **COMPLETADA**
- 🔄 HU#7: Búsqueda de Propiedades
- HU#8: Agendar Visitas
- HU#9: Gestión de Horarios

## Contribución

1. Crea una rama feature desde develop
2. Desarrolla la funcionalidad
3. Haz commit de tus cambios
4. Crea un Pull Request a develop

## Licencia

Este proyecto es privado y confidencial.
