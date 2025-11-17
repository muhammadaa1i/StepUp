import { Order } from "@/types";

export interface UseOrdersProps {
  isAuthenticated: boolean;
  t: (key: string) => string;
}

export interface UseOrdersResult {
  orders: Order[];
  filteredOrders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  authError: boolean;
}

export interface RawOrderItem {
  quantity?: number;
  qty?: number;
  unit_price?: number;
  price?: number;
  unitPrice?: number;
  total_price?: number;
  total?: number;
  amount?: number;
  name?: string;
  slipper_name?: string;
  image?: string;
  slipper_id?: number;
  product_id?: number;
  slipper?: {
    price?: number;
    name?: string;
    image?: string;
  };
  [key: string]: unknown;
}

export interface RawOrder {
  items?: RawOrderItem[];
  total_amount?: number;
  total?: number;
  amount?: number;
  sum?: number;
  [key: string]: unknown;
}
