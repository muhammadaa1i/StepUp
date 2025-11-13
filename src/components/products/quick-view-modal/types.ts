import { Slipper } from '@/types';

export interface ProductQuickViewModalProps {
  product: Slipper | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalImageCarouselProps {
  images: string[];
  currentIndex: number;
  productName: string;
  onPrevious: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  t: (key: string) => string;
}

export interface ModalProductDetailsProps {
  product: Slipper;
  price: string;
  inCart: boolean;
  isAdmin: boolean;
  onAddToCart: () => void;
  t: (key: string, params?: Record<string, string>) => string;
}
