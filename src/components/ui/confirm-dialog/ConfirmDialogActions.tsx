interface ConfirmDialogActionsProps {
  cancelText: string;
  confirmText: string;
  variant: "default" | "danger";
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialogActions = ({
  cancelText,
  confirmText,
  variant,
  onCancel,
  onConfirm,
}: ConfirmDialogActionsProps) => (
  <div className="mt-6 flex justify-end space-x-3">
    <button
      onClick={onCancel}
      className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
    >
      {cancelText}
    </button>
    <button
      onClick={onConfirm}
      className={
        variant === "danger"
          ? "px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          : "px-4 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      }
      autoFocus
    >
      {confirmText}
    </button>
  </div>
);
