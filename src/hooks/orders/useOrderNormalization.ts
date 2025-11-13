"use client";

import { Order, OrderItem } from "@/types";
import { RawOrder, RawOrderItem } from "./types";

/**
 * Normalizes order item data from various API response formats
 */
export function normalizeOrderItem(itemData: RawOrderItem): OrderItem {
  const quantity = Number(itemData?.quantity ?? itemData?.qty ?? 0) || 0;

  const unit_price =
    Number(
      itemData?.unit_price ??
        itemData?.price ??
        itemData?.unitPrice ??
        itemData?.slipper?.price ??
        0
    ) || 0;

  const declaredTotal =
    Number(
      itemData?.total_price ?? itemData?.total ?? itemData?.amount ?? 0
    ) || 0;

  const total_price = declaredTotal > 0 ? declaredTotal : unit_price * quantity;

  const name = String(
    itemData?.name ??
      itemData?.slipper_name ??
      itemData?.slipper?.name ??
      ""
  );

  const image = itemData?.image ?? itemData?.slipper?.image;

  const slipper_id =
    Number(itemData?.slipper_id ?? itemData?.product_id ?? 0) || 0;

  return {
    ...itemData,
    slipper_id,
    name,
    quantity,
    unit_price,
    total_price,
    image,
  } as OrderItem;
}

/**
 * Normalizes order data from various API response formats
 */
export function normalizeOrder(orderData: RawOrder): Order {
  const originalItems = Array.isArray(orderData.items) ? orderData.items : [];
  const items = originalItems.map(normalizeOrderItem);

  const serverTotal =
    Number(
      orderData?.total_amount ??
        orderData?.total ??
        orderData?.amount ??
        orderData?.sum ??
        0
    ) || 0;

  const computedTotal = items.reduce(
    (sum, it) => sum + (Number(it.total_price ?? 0) || 0),
    0
  );

  const total_amount = serverTotal > 0 ? serverTotal : computedTotal;

  return { ...orderData, items, total_amount } as Order;
}

/**
 * Normalizes array of orders from API response
 */
export function normalizeOrders(response: unknown): Order[] {
  const data: RawOrder[] = Array.isArray(response) ? response : [];
  return data.map(normalizeOrder);
}
