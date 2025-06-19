import { create } from "zustand";
import type {
  Casa,
  CategoriaInmueble,
  Ubicacion,
  PropertyFilters,
} from "../types";

interface PropertyState {
  properties: Casa[];
  categories: CategoriaInmueble[];
  locations: Ubicacion[];
  currentProperty: Casa | null;
  filters: PropertyFilters;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PropertyActions {
  setProperties: (properties: Casa[]) => void;
  setCategories: (categories: CategoriaInmueble[]) => void;
  setLocations: (locations: Ubicacion[]) => void;
  setCurrentProperty: (property: Casa | null) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setPagination: (pagination: Partial<PropertyState["pagination"]>) => void;
  addProperty: (property: Casa) => void;
  updateProperty: (property: Casa) => void;
  removeProperty: (propertyId: string) => void;
}

type PropertyStore = PropertyState & PropertyActions;

const initialFilters: PropertyFilters = {
  ordenarPor: "fecha",
  ordenarDireccion: "desc",
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  // State
  properties: [],
  categories: [],
  locations: [],
  currentProperty: null,
  filters: initialFilters,
  isLoading: false,
  error: null,
  pagination: initialPagination,

  // Actions
  setProperties: (properties: Casa[]) => {
    set({ properties });
  },

  setCategories: (categories: CategoriaInmueble[]) => {
    set({ categories });
  },

  setLocations: (locations: Ubicacion[]) => {
    set({ locations });
  },

  setCurrentProperty: (property: Casa | null) => {
    set({ currentProperty: property });
  },

  setFilters: (newFilters: Partial<PropertyFilters>) => {
    const { filters } = get();
    set({
      filters: { ...filters, ...newFilters },
      pagination: { ...get().pagination, page: 1 }, // Reset page when filters change
    });
  },

  clearFilters: () => {
    set({
      filters: initialFilters,
      pagination: { ...get().pagination, page: 1 },
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  setPagination: (newPagination: Partial<PropertyState["pagination"]>) => {
    const { pagination } = get();
    set({ pagination: { ...pagination, ...newPagination } });
  },

  addProperty: (property: Casa) => {
    const { properties } = get();
    set({ properties: [property, ...properties] });
  },

  updateProperty: (updatedProperty: Casa) => {
    const { properties } = get();
    const updatedProperties = properties.map((property) =>
      property.id === updatedProperty.id ? updatedProperty : property
    );
    set({ properties: updatedProperties });
  },

  removeProperty: (propertyId: string) => {
    const { properties } = get();
    const filteredProperties = properties.filter(
      (property) => property.id !== propertyId
    );
    set({ properties: filteredProperties });
  },
}));
