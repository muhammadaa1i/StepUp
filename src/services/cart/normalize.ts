export interface CartItemDTO {
  id: number;
  slipper_id: number;
  quantity: number;
  name: string;
  price: number;
  total_price: number;
}

export interface CartDTO {
  id: number;
  items: CartItemDTO[];
  total_items: number;
  total_quantity: number;
  total_amount: number;
}

export interface CartTotalsDTO {
  total_items: number;
  total_quantity: number;
  total_amount: number;
}

export const normalizeCart = (raw: unknown): CartDTO => {
  const anyRaw = raw as Record<string, unknown> | undefined;
  const maybeData =
    (anyRaw?.["data"] as unknown) ||
    (anyRaw?.["cart"] as unknown) ||
    raw;
  const c = (maybeData || {}) as Partial<CartDTO> & {
    items?: Partial<CartItemDTO>[];
  };

  type LooseItem = Partial<CartItemDTO> & { total_price?: number };
  const items: CartItemDTO[] = (c.items || []).map((it: LooseItem) => ({
    id: Number(it.id || 0),
    slipper_id: Number(it.slipper_id || 0),
    quantity: Number(it.quantity || 0),
    name: String(it.name || ""),
    price: Number(it.price || 0),
    total_price: Number(
      it.total_price ??
        Number(it.price || 0) * Number(it.quantity || 0)
    ),
  }));

  const total_items = c.total_items ?? items.length;
  const total_quantity =
    c.total_quantity ?? items.reduce((s, i) => s + (i.quantity || 0), 0);
  const total_amount =
    c.total_amount ?? items.reduce((s, i) => s + (i.total_price || 0), 0);

  return {
    id: Number(c.id || 0),
    items,
    total_items,
    total_quantity,
    total_amount,
  } as CartDTO;
};

export const unwrap = <T,>(res: unknown): T =>
  ((res as { data?: T })?.data as T) || (res as T);
