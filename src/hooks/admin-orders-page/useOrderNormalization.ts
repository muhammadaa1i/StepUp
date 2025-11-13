"use client";

import { Order } from "@/types";

type RawOrderItem = Partial<import("@/types").OrderItem> & {
  unit_price?: number;
  quantity?: number;
  total_price?: number;
  price?: number;
  unitPrice?: number;
  qty?: number;
  total?: number;
  amount?: number;
  name?: string;
  slipper_name?: string;
  slipper_id?: number;
  product_id?: number;
  image?: string;
  slipper?: { name?: string; price?: number; image?: string };
};

type RawOrder = Partial<Order> & {
  order_items?: RawOrderItem[];
  items?: RawOrderItem[];
  user?: import("@/types").User;
  customer?: import("@/types").User;
  total_amount?: number;
  total?: number;
  amount?: number;
  sum?: number;
  user_name?: string;
};

export function useOrderNormalization() {
  const normalizeOrders = (rawData: any[]): Order[] => {
    const data: any = Array.isArray(rawData) ? rawData : [];

    const normalizedOrders: Order[] = (Array.isArray(data) ? data : [])
      .map((rawUnknown) => rawUnknown as RawOrder)
      .map((raw) => {
        const rawItems: RawOrderItem[] = Array.isArray(raw.items)
          ? raw.items
          : Array.isArray(raw.order_items)
          ? raw.order_items
          : [];

        const processedItems = rawItems.map((it) => {
          const quantity = Number(it?.quantity ?? it?.qty ?? 0) || 0;
          const unit_price =
            Number(it?.unit_price ?? it?.price ?? it?.unitPrice ?? it?.slipper?.price ?? 0) || 0;
          const declaredTotal = Number(it?.total_price ?? it?.total ?? it?.amount ?? 0) || 0;
          const total_price = declaredTotal > 0 ? declaredTotal : unit_price * quantity;
          const name = String(it?.name ?? it?.slipper_name ?? it?.slipper?.name ?? "");
          const image = it?.image ?? it?.slipper?.image;
          const slipper_id = Number(it?.slipper_id ?? it?.product_id ?? 0) || 0;
          return {
            ...(it as any),
            slipper_id,
            name,
            quantity,
            unit_price,
            total_price,
            image,
          } as import("@/types").OrderItem;
        });

        const serverTotal = Number(raw?.total_amount ?? raw?.total ?? raw?.amount ?? raw?.sum ?? 0) || 0;
        const total_amount =
          serverTotal > 0
            ? serverTotal
            : processedItems.reduce((sum, it) => {
                const itemTotal =
                  Number(it.total_price ?? 0) || Number(it.unit_price ?? 0) * Number(it.quantity ?? 0);
                return sum + itemTotal;
              }, 0);

        const user =
          raw.user ??
          raw.customer ??
          (raw.user_name
            ? {
                id: undefined,
                name: String(raw.user_name || ""),
                surname: "",
                phone_number: "",
                is_admin: false,
              }
            : undefined);

        return { ...(raw as Order), user, items: processedItems, total_amount } as Order;
      });

    // Filter out invalid items
    const processedOrders = normalizedOrders
      .map((order) => {
        const validItems = order.items.filter((item) => {
          const hasValidProduct = !!(item.slipper_id && item.name && item.name.trim().length > 0);
          const hasValidQuantity = Number(item.quantity ?? 0) > 0;
          const hasValidPrice = Number(item.unit_price ?? 0) > 0 || Number(item.total_price ?? 0) > 0;
          return hasValidProduct && hasValidQuantity && hasValidPrice;
        });
        return { ...order, items: validItems };
      })
      .filter((order) => order.items.length > 0);

    return processedOrders;
  };

  return {
    normalizeOrders,
  };
}
