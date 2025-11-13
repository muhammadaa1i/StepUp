import { OrderItem } from "@/types";

/**
 * Format date based on locale
 */
export function formatOrderDate(dateString: string, locale: string): string {
  const dateObj = new Date(dateString);
  return locale === "uz"
    ? `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
    : dateObj.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

/**
 * Format price with locale-specific formatting
 */
export function formatOrderPrice(price: number, locale: string, currencySuffix: string): string {
  const numPrice = Number(price) || 0;
  const formatted = new Intl.NumberFormat(
    locale === "uz" ? "uz-UZ" : "ru-RU",
    {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(numPrice);
  return `${formatted} ${currencySuffix}`;
}

/**
 * Check if an order item is valid for display
 */
export function isValidOrderItem(item: OrderItem): boolean {
  const hasValidProduct = !!item.name && item.name.trim().length > 0;
  const unit = Number(item.unit_price ?? 0);
  const qty = Number(item.quantity ?? 0);
  const line = Number(item.total_price ?? 0);
  const hasValidPrice =
    (Number.isFinite(line) && line > 0) || (unit > 0 && qty > 0);
  return hasValidProduct && hasValidPrice && qty > 0;
}

/**
 * Filter valid items from an order
 */
export function getValidOrderItems(items: OrderItem[]): OrderItem[] {
  return items.filter(isValidOrderItem);
}

/**
 * Check if an order can be refunded
 */
export function canRefundOrder(status: string): boolean {
  const refundableStatuses = ['delivered', 'DELIVERED', 'PAID', 'confirmed'];
  const nonRefundableStatuses = ['REFUNDED', 'refunded'];
  return refundableStatuses.includes(status) && !nonRefundableStatuses.includes(status);
}
