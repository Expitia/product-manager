export type QueryParams = Record<string, Record<string, string>>;

export interface GeneralResponse<T = undefined> {
  message?: string;
  error?: { message?: string };
  data?: T;
}

export interface User {
  admin?: boolean;
  email: string;
  sub?: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  categoryId: string;
  updatedAt: string;
  createdAt: string;
  convertedId: string;
  description: string;
}

export interface Favorite {
  _id: string;
  user: string;
  product: string;
  products: Product[];
}

export interface CarProduct {
  _id: string;
  user: string;
  amount: number;
  product: string;
  products: Product[];
}

export interface ServerUserSearch {
  id: string;
  text: string;
}

export interface ServerProductUser {
  _id?: string;
  user: string;
  product: string;
  amount?: number;
}

export interface ServerProduct {
  id?: string;
  name?: string;
  userId?: string;
  categoryId?: string;
  description?: string;
}

export interface ServerCategory {
  id?: string;
  name?: string;
  userId?: string;
}

export interface ServerRegister {
  email: string;
  password: string;
  admin?: boolean;
}
