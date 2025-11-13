import React from "react";
import { Package, XCircle } from "lucide-react";
import { Order } from "@/types";

interface OrderActionsProps {
  order: Order;
  canRefund: boolean;
  onShowDetails: () => void;
  onRequestRefund: () => void;
  t: (key: string) => string;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  order: _order,
  canRefund,
  onShowDetails,
  onRequestRefund,
  t,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
      {/* About button */}
      <button
        onClick={onShowDetails}
        className="group inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-linear-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-700 hover:text-emerald-800 font-medium text-xs sm:text-sm rounded-lg border border-emerald-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
      >
        <Package className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
        <span className="text-xs sm:text-sm">
          {t("orders.about") || "About"}
        </span>
      </button>
      
      {/* Refund button */}
      {canRefund && (
        <button
          onClick={onRequestRefund}
          className="group inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-linear-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 hover:text-red-800 font-medium text-xs sm:text-sm rounded-lg border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
        >
          <XCircle className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-xs sm:text-sm">
            {t("orders.refund.request") || "Refund"}
          </span>
        </button>
      )}
    </div>
  );
};
