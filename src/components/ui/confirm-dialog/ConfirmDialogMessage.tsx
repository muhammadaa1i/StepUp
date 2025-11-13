import React from "react";

interface ConfirmDialogMessageProps {
  message: string | React.ReactNode;
}

export const ConfirmDialogMessage = ({ message }: ConfirmDialogMessageProps) => (
  <div className="mt-3 text-sm text-gray-600 leading-relaxed">
    {message}
  </div>
);
