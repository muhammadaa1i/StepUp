// Admin orders service with modular helpers
import { OrderEndpoints } from "@/lib/api/endpoints";
import { SearchParams } from "@/types";
import { get, getNoCache, post, put, del } from "./admin-orders/http";
import {
  unwrap,
  normalizeList,
  ListResult,
} from "./admin-orders/normalize";

export type OrdersListResult<T = unknown> = ListResult<T>;

export const AdminOrdersService = {
  async list<T = unknown>(filters: SearchParams): Promise<ListResult<T>> {
    const res = await get(
      OrderEndpoints.LIST,
      filters as unknown as Record<string, unknown>
    );
    const raw = unwrap(res);
    return normalizeList<T>(raw, filters);
  },

  async getById<T = unknown>(id: number): Promise<T> {
    const res = await getNoCache(OrderEndpoints.BY_ID(id));
    return unwrap<T>(res);
  },

  async create<T = unknown>(data: unknown): Promise<T> {
    const res = await post(OrderEndpoints.CREATE, data);
    return unwrap<T>(res);
  },

  async createFromCart<T = unknown>(clearCart = true): Promise<T> {
    const endpoint = `${OrderEndpoints.FROM_CART}?clear_cart=${clearCart}`;
    const res = await post(endpoint);
    return unwrap<T>(res);
  },

  async update<T = unknown>(id: number, data: unknown): Promise<T> {
    const res = await put(OrderEndpoints.UPDATE(id), data);
    return unwrap<T>(res);
  },

  async cancel<T = unknown>(id: number): Promise<T> {
    const res = await post(OrderEndpoints.CANCEL(id));
    return unwrap<T>(res);
  },

  async delete(id: number): Promise<void> {
    await del(OrderEndpoints.DELETE(id));
  },
};
