import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';

interface CategoriesSectionProps {
  categories: Category[];
  t: (key: string) => string;
}

export default function CategoriesSection({ categories, t }: CategoriesSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">{t('home.categories')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.slice(0, 6).map((category) => (
          <Link
            key={category.id}
            href={`/catalog?category=${category.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-200 hover:border-emerald-300"
          >
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
