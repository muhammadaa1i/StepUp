/**
 * Cart quantity calculation utilities
 */

const MIN_ORDER = 60;
const PACK_SIZE = 6;

export function calculateQuantity(requestedQuantity?: number): number {
  if (requestedQuantity !== undefined) {
    const requested = Math.max(MIN_ORDER, Math.round(requestedQuantity));
    return Math.ceil(requested / PACK_SIZE) * PACK_SIZE;
  }
  return MIN_ORDER;
}

export function snapQuantityToPackSize(quantity: number, isIncrease: boolean): number {
  let snapped = isIncrease 
    ? Math.ceil(quantity / PACK_SIZE) * PACK_SIZE 
    : Math.floor(quantity / PACK_SIZE) * PACK_SIZE;
  
  if (snapped < MIN_ORDER) snapped = MIN_ORDER;
  return snapped;
}

export const CART_CONSTANTS = {
  MIN_ORDER,
  PACK_SIZE,
} as const;
