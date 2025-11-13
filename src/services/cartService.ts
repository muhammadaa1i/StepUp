// Cart service with modular helpers
import { CartEndpoints } from "@/lib/api/endpoints";
import { get, post, put, del } from "./cart/http";
import {
  normalizeCart,
  unwrap,
  CartDTO,
  CartTotalsDTO,
  CartItemDTO,
} from "./cart/normalize";

export type {
  CartDTO,
  CartTotalsDTO,
  CartItemDTO,
};

export interface AddCartItemRequest {
  slipper_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<CartDTO> {
    const res = await get(CartEndpoints.GET);
    return normalizeCart(res);
  },

  async getTotals(): Promise<CartTotalsDTO> {
    const res = await get(CartEndpoints.TOTAL);
    return unwrap<CartTotalsDTO>(res);
  },

  async addItem(payload: AddCartItemRequest): Promise<CartDTO> {
    const res = await post(CartEndpoints.ADD_ITEM, payload);
    return normalizeCart(res);
  },

  async updateItem(
    cartItemId: number,
    payload: UpdateCartItemRequest
  ): Promise<CartDTO> {
    const res = await put(CartEndpoints.UPDATE_ITEM(cartItemId), payload);
    return normalizeCart(res);
  },

  async deleteItem(cartItemId: number): Promise<CartDTO> {
    const res = await del(CartEndpoints.DELETE_ITEM(cartItemId));
    return normalizeCart(res);
  },

  async clear(): Promise<CartDTO> {
    const res = await del(CartEndpoints.CLEAR);
    return normalizeCart(res);
  },
};

export default cartService;
