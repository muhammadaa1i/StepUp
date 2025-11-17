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
    _cartItemId: undefined,
  };
  
  // Optimistic update
  setItems((prev) => {
    const existing = prev.find((i) => i.id === product.id);
    if (existing) return prev;
    return [...prev, newItem];
  });
  
  toast.success(t("cart.added", { name: product.name, qty: finalQty.toString() }));
  setTimeout(() => saveToStorage(itemsRef.current), 0);

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
    const isAuthError = error instanceof Error && 
      (error.message.includes('401') || 
       error.message.includes('Unauthorized') ||
       error.message.includes('Authentication required'));
    
    if (!isAuthError) {
      toast.error(t("errors.serverErrorLong"));
    }
  }
}
