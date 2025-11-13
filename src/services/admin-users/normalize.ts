import { PAGINATION } from "@/lib/constants";
import { SearchParams } from "@/types";

export interface ListResult<T = unknown> {
  items: T[];
  total: number;
  totalPages: number;
}

export const unwrap = <T,>(res: unknown): T =>
  ((res as { data?: T })?.data as T) || (res as T);

export const normalizeList = <T = unknown>(
  raw: unknown,
  filters: SearchParams
): ListResult<T> => {
  let items: T[] = [];
  let total = 0;
  let totalPages = 1;

  if (Array.isArray(raw)) {
    items = raw as T[];
    total = items.length;
    totalPages = 1;
  } else if (raw && typeof raw === "object") {
    const obj = raw as any;
    const maybeItems = (obj.items ?? obj.data) as T[] | undefined;
    if (Array.isArray(maybeItems)) items = maybeItems;

    const candidateTotals = [
      obj.total,
      obj.count,
      obj?.meta?.total,
      obj?.data?.total,
      obj?.data?.count,
    ];
    const found = candidateTotals.find((v) => typeof v === "number");
    if (typeof found === "number") {
      total = Number(found);
    } else {
      const skip = Number((filters as any).skip || 0);
      const len = items.length;
      const pageSize = Number(
        (filters as any).limit || PAGINATION.DEFAULT_LIMIT
      );
      total = len < pageSize ? skip + len : skip + len + 1;
    }
    const limit = Number(
      (filters as any).limit || PAGINATION.DEFAULT_LIMIT
    );
    totalPages = Math.max(1, Math.ceil(total / limit));
  }

  return { items, total, totalPages };
};
