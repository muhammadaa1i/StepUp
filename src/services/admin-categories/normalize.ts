import { Category } from "@/types";

export interface ListResult {
  items: Category[];
  total: number;
  totalPages: number;
}

export const unwrap = <T,>(res: unknown): T =>
  ((res as { data?: T })?.data as T) || (res as T);

export const normalizeList = (resp: unknown): ListResult => {
  type WithData = { data?: unknown };
  type WithMeta = {
    data?: { total?: number; pages?: number; total_pages?: number };
  };

  const dataContainer = resp as WithData | unknown[];
  const listContainer = (dataContainer as WithData)?.data ?? dataContainer;

  const items = Array.isArray(listContainer)
    ? (listContainer as Category[])
    : (listContainer as { items?: Category[]; data?: Category[] })?.items ||
      (listContainer as { items?: Category[]; data?: Category[] })?.data ||
      [];

  const total = (dataContainer as WithMeta)?.data?.total || 0;
  const totalPages =
    (dataContainer as WithMeta)?.data?.pages ||
    (dataContainer as WithMeta)?.data?.total_pages ||
    (total && Array.isArray(items) && items.length > 0 ? 1 : 0);

  return { items: Array.isArray(items) ? items : [], total, totalPages };
};
