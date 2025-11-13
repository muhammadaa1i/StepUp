import React from "react";
import { Server, AlertTriangle, Clock } from "lucide-react";

interface ErrorIconProps {
  status?: number;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ status }) => {
  const getIcon = () => {
    switch (status) {
      case 503:
        return <Server className="h-16 w-16 text-orange-500" />;
      case 502:
        return <Server className="h-16 w-16 text-red-500" />;
      case 500:
        return <AlertTriangle className="h-16 w-16 text-red-500" />;
      case 429:
        return <Clock className="h-16 w-16 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-16 w-16 text-gray-500" />;
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-gray-100 p-4 rounded-full">{getIcon()}</div>
    </div>
  );
};
