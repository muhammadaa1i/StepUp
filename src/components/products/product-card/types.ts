import { Slipper } from "@/types";

export interface ProductCardProps {
  slipper: Slipper;
  onAddToCart?: (slipper: Slipper) => void;
  onViewDetails?: (slipper: Slipper) => void;
}

export interface AvailabilityInfo {
  isAvailable: boolean;
  canAddToCart: boolean;
  displayText: string;
  quantity: number;
}
