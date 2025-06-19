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

## Estructura del Proyecto

```
src/
├── components/           # Componentes siguiendo Atomic Design
│   ├── atoms/           # Componentes básicos
│   ├── molecules/       # Combinaciones de átomos
│   ├── organisms/       # Combinaciones complejas
│   └── templates/       # Layouts y plantillas
├── pages/               # Páginas de la aplicación
├── shared/              # Recursos compartidos
│   ├── constants/       # Constantes globales
│   ├── hooks/          # Custom hooks
│   ├── store/          # Estado global (Zustand)
│   ├── types/          # Tipos TypeScript
│   └── validations/    # Esquemas de validación
└── services/           # Servicios y API calls
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
- `main`: Rama principal de producción
- `develop`: Rama de desarrollo
- `feature/HU-*`: Ramas para cada Historia de Usuario
- `release/*`: Ramas para preparar releases
- `hotfix/*`: Ramas para correcciones urgentes

## Historias de Usuario Pendientes

- HU#1: Gestión de Categorías de Inmuebles
- HU#2: Gestión de Ubicaciones
- HU#3: Gestión de Usuarios
- HU#4: Publicación de Propiedades
- HU#5: Búsqueda de Propiedades
- HU#6: Agendar Visitas
- HU#7: Gestión de Horarios

## Contribución

1. Crea una rama feature desde develop
2. Desarrolla la funcionalidad
3. Haz commit de tus cambios
4. Crea un Pull Request a develop

## Licencia

Este proyecto es privado y confidencial.
    ...reactDom.configs.recommended.rules,
  },
})
```
