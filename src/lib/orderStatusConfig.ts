/**
 * Order Status Config
 */
import { Package, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export interface StatusConfig {
  icon: any;
  color: string;
  bgColor: string;
  label: string;
}

export type StatusMap = Record<string, StatusConfig>;

export function getOrderStatusConfig(t: (key: string) => string): StatusMap {
  return {
    pending: {
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      label: t("orders.status.pending"),
    },
    processing: {
      icon: Package,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      label: t("orders.status.processing"),
    },
    shipped: {
      icon: Package,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      label: t("orders.status.shipped"),
    },
    delivered: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      label: t("orders.status.delivered"),
    },
    cancelled: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      label: t("orders.status.cancelled"),
    },
    refunded: {
      icon: AlertCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      label: t("orders.status.refunded"),
    },
  };
}
