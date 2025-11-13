import { X } from "lucide-react";

interface ConfirmDialogHeaderProps {
  title: string;
  onClose: () => void;
}

export const ConfirmDialogHeader = ({ title, onClose }: ConfirmDialogHeaderProps) => (
  <>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      aria-label="Закрыть"
    >
      <X className="h-4 w-4" />
    </button>
    <h2
      id="confirm-title"
      className="text-lg font-semibold text-gray-900 pr-6"
    >
      {title}
    </h2>
  </>
);
