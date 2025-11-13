import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { Slipper } from '@/types';

interface FeaturedProductsSectionProps {
  featuredProducts: Slipper[];
  isLoading: boolean;
  onViewProduct: (product: Slipper) => void;
  t: (key: string) => string;
}

export default function FeaturedProductsSection({
  featuredProducts,
  isLoading,
  onViewProduct,
  t,
}: FeaturedProductsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('home.popularProducts')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('home.popularProductsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : featuredProducts.map((product) => (
              <ProductCard key={product.id} slipper={product} onViewDetails={onViewProduct} />
            ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/catalog"
          className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
        >
          {t('home.viewAllProducts')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
