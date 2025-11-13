// Admin category service with modular helpers
import { Category, SearchParams } from "@/types";
import { CategoryEndpoints } from "@/lib/api/endpoints";
import { get, post, put, del } from "./admin-categories/http";
import {
  unwrap,
  normalizeList,
  ListResult,
} from "./admin-categories/normalize";

export interface CategoryFormData {
  name: string;
  description: string;
  is_active: boolean;
}

export type CategoryListResult = ListResult;

export const adminCategoryService = {
  async list(
    params: SearchParams & { skip?: number; limit?: number }
  ): Promise<ListResult> {
    const resp = await get(
      CategoryEndpoints.LIST,
      params as Record<string, unknown>
    );
    return normalizeList(resp);
  },

  async getById(id: number): Promise<Category> {
    const res = await get(CategoryEndpoints.BY_ID(id));
    return unwrap<Category>(res);
  },

  async create(data: CategoryFormData): Promise<Category> {
    const res = await post(CategoryEndpoints.CREATE, data);
    return unwrap<Category>(res);
  },

  async update(id: number, data: CategoryFormData): Promise<Category> {
    const res = await put(CategoryEndpoints.UPDATE(id), data);
    return unwrap<Category>(res);
  },

  async delete(id: number): Promise<void> {
    await del(CategoryEndpoints.DELETE(id));
  },

  async toggleActive(category: Category): Promise<Category> {
    const res = await put(CategoryEndpoints.UPDATE(category.id), {
      ...category,
      is_active: !category.is_active,
    });
    return unwrap<Category>(res);
  },
};

export default adminCategoryService;
