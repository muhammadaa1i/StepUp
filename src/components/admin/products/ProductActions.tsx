import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Slipper } from "@/types";

interface ProductActionsProps {
  product: Slipper;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  t: (key: string) => string;
  compact?: boolean;
}

export default function ProductActions({
  product: _product,
  onEdit,
  onDelete,
  t,
  compact = false,
}: ProductActionsProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 text-gray-500">
        <button
          onClick={onEdit}
          className="hover:text-green-600"
          aria-label={t("admin.products.table.actions")}
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="hover:text-red-600"
          aria-label={t("common.delete")}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-end space-x-2">
      <button onClick={onEdit} className="text-green-600 hover:text-green-900">
        <Edit className="h-4 w-4" />
      </button>
      <button onClick={onDelete} className="text-red-600 hover:text-red-900">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
