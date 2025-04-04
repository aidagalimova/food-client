import { PaginationMeta } from '../types';

interface ImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
}

interface Image {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

export interface Recipe {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  calories: number;
  cookingTime: number;
  likes: number;
  preparationTime: number;
  rating: number;
  servings: number;
  summary: string;
  totalTime: number;
  vegetarian: boolean;
  images: Image[];
  ingradients: Ingredient[];
}

export interface FullRecipe extends Recipe {
  equipments: Equipment[];
  directions: Direction[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface Equipment {
  id: number;
  name: string;
}

export interface Direction {
  id: number;
  image: Image | null;
  description: string;
}

export interface RecipeResponse {
  data: Recipe[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface SingleRecipeResponse {
  data: FullRecipe;
}
