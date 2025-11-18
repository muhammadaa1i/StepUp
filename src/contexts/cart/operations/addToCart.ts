/**
 * Simplified add to cart operation
 */

import { toast } from "react-toastify";
import { Slipper, User } from "@/types";
import { hasValidToken } from "@/lib/tokenUtils";
import cartService from "@/services/cartService";
import { CartItem, mapServerToClient, reconcilePartial } from "../cartTransformers";
import { saveToStorage } from "../cartStorage";
import { validateAddToCart } from "../utils/validators";
import { calculateQuantity } from "../utils/quantityCalculator";
import { prepareFallbackImages, enrichCartItemImages } from "../utils/imageHelpers";

interface AddToCartOptions {
  product: Slipper;
  quantity?: number;
  user: User | null;
  isAuthenticated: boolean;
  itemsRef: React.MutableRefObject<CartItem[]>;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  t: (key: string, vars?: Record<string, string>) => string;
}

export function addToCart(options: AddToCartOptions) {
  const { product, quantity, user, isAuthenticated, itemsRef, setItems, t } = options;

  // Validate
  if (!validateAddToCart(product, user, itemsRef, t)) {
    return;
  }
  
  // Calculate quantity
  const finalQty = calculateQuantity(quantity);

  // Prepare images
  const fallbackImages = prepareFallbackImages(product.images);

  // Create new item
  const newItem: CartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: finalQty,
    images: fallbackImages,
    image: product.image,
    availableStock: product.quantity || 0,
    _cartItemId: undefined,
  };
  
  // Prevent duplicate distinct add - show info toast instead
  if (itemsRef.current.some(i => i.id === product.id)) {
    toast.info(t('cart.alreadyInCartAddMore'));
    return;
  }

  // Optimistic update + persist immediately
  setItems((prev) => {
    const next = [...prev, newItem];
    try { saveToStorage(next); } catch { /* ignore */ }
    return next;
  });

  toast.success(t("cart.added", { name: product.name, qty: finalQty.toString() }));

  // Sync with server
  if (isAuthenticated) {
    syncAddWithServer(product, finalQty, fallbackImages, itemsRef, setItems, t);
  }
}

async function syncAddWithServer(
  product: Slipper,
  finalQty: number,
  fallbackImages: Array<{ id: number; image_url: string }>,
  itemsRef: React.MutableRefObject<CartItem[]>,
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
  t: (key: string) => string
) {
  try {
    if (!hasValidToken()) return;
    
    const cart = await cartService.addItem({ slipper_id: product.id, quantity: finalQty });
    
    let mapped = mapServerToClient(cart, itemsRef.current);
    mapped = reconcilePartial(mapped, itemsRef.current, product.id, "add");
    mapped = enrichCartItemImages(mapped, product.id, fallbackImages, product.image);
    
    setItems(mapped);
    saveToStorage(mapped);
  } catch (error) {
    // Silently handle auth errors (401) and timeout errors (408)
    // User already has item in local cart, no need to show error
    const isAuthError = error instanceof Error && 
      (error.message.includes('401') || 
       error.message.includes('Unauthorized') ||
       error.message.includes('Authentication required'));
    
    const isTimeoutError = error instanceof Error &&
      (error.message.includes('408') ||
       error.message.includes('timeout') ||
       error.message.includes('Request timeout'));
    
    // Only show error for unexpected server errors
    if (!isAuthError && !isTimeoutError) {
      console.error('Cart sync failed:', error);
      // Don't show toast - item is already in local cart
    }
  }
}
