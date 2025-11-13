export interface ProductGalleryProps {
  imageUrls: string[];
  productName: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export interface GalleryCarouselProps {
  imageUrls: string[];
  productName: string;
  activeIndex: number;
  imageError: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  onImageError: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export interface GalleryThumbnailsProps {
  imageUrls: string[];
  productName: string;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}
