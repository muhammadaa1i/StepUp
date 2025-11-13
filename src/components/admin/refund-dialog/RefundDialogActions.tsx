import React from "react";
import { CheckCircle } from "lucide-react";

interface RefundDialogActionsProps {
  isSuccess: boolean;
  isProcessing: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  t: (key: string) => string;
}

export const RefundDialogActions: React.FC<RefundDialogActionsProps> = ({
  isSuccess,
  isProcessing,
  handleConfirm,
  handleCancel,
  t,
}) => {
  return (
    <div className="flex gap-3 p-6 bg-gray-50 rounded-b-lg">
      {!isSuccess && (
        <button
          onClick={handleCancel}
          className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing}
        >
          {t("admin.orders.refundConfirm.cancel")}
        </button>
      )}
      <button
        onClick={isSuccess ? handleCancel : handleConfirm}
        className={`${
          isSuccess ? "w-full" : "flex-1"
        } px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSuccess
            ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
            : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
        }`}
        disabled={isProcessing && !isSuccess}
      >
        {isSuccess ? (
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {t("admin.orders.refundConfirm.close")}
          </div>
        ) : isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t("admin.orders.refundConfirm.processing")}
          </div>
        ) : (
          t("admin.orders.refundConfirm.confirm")
        )}
      </button>
    </div>
  );
};
