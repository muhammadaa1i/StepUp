"use client";
import React from "react";

const statusIcons: Record<string, React.ReactElement> = {
  pending: <span className="h-4 w-4 text-yellow-500">⏱</span>,
  processing: <span className="h-4 w-4 text-emerald-500">📦</span>,
  shipped: <span className="h-4 w-4 text-teal-500">🚚</span>,
  delivered: <span className="h-4 w-4 text-green-500">✓</span>,
  cancelled: <span className="h-4 w-4 text-red-500">✗</span>,
  confirmed: <span className="h-4 w-4 text-green-500">✓</span>,
  created: <span className="h-4 w-4 text-gray-500">⏱</span>,
  paid: <span className="h-4 w-4 text-green-500">✓</span>,
  failed: <span className="h-4 w-4 text-red-500">✗</span>,
  refunded: <span className="h-4 w-4 text-teal-500">↩</span>,
  PENDING: <span className="h-4 w-4 text-yellow-500">⏱</span>,
  PROCESSING: <span className="h-4 w-4 text-emerald-500">📦</span>,
  SHIPPED: <span className="h-4 w-4 text-teal-500">🚚</span>,
  DELIVERED: <span className="h-4 w-4 text-green-500">✓</span>,
  CANCELLED: <span className="h-4 w-4 text-red-500">✗</span>,
  CONFIRMED: <span className="h-4 w-4 text-green-500">✓</span>,
  CREATED: <span className="h-4 w-4 text-gray-500">⏱</span>,
  PAID: <span className="h-4 w-4 text-green-500">✓</span>,
  FAILED: <span className="h-4 w-4 text-red-500">✗</span>,
  REFUNDED: <span className="h-4 w-4 text-teal-500">↩</span>,
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-emerald-100 text-emerald-800",
  shipped: "bg-teal-100 text-teal-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  confirmed: "bg-green-100 text-green-800",
  created: "bg-gray-100 text-gray-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-teal-100 text-teal-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-emerald-100 text-emerald-800",
  SHIPPED: "bg-teal-100 text-teal-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CREATED: "bg-gray-100 text-gray-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-teal-100 text-teal-800",
};

interface StatusBadgeProps {
  status: string;
  label: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        statusColors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusIcons[status]}
      <span className="ml-1">{label}</span>
    </span>
  );
}

export { statusIcons, statusColors };
