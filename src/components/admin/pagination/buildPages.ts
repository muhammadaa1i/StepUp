export function buildPages(totalPages: number, currentPage: number): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = [];
  
  if (totalPages <= 7) {
    for (let p = 1; p <= totalPages; p++) items.push(p);
  } else {
    items.push(1);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    if (start > 2) items.push("ellipsis");
    for (let p = start; p <= end; p++) items.push(p);
    if (end < totalPages - 1) items.push("ellipsis");
    items.push(totalPages);
  }
  
  return items;
}
