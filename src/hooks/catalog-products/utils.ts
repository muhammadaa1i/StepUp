import { Slipper } from "@/types";

export interface ApiEnvelope<T> {
  data?: T;
  items?: T;
  total?: number;
  page?: number;
  pages?: number;
  total_pages?: number;
}

export function extractArray(data: unknown): Slipper[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as Slipper[];
  const obj = data as ApiEnvelope<Slipper[]>;
  if (Array.isArray(obj.data)) return obj.data as Slipper[];
  if (Array.isArray(obj.items)) return obj.items as Slipper[];
  return [];
}
