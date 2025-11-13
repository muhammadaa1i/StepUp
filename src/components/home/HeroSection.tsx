import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  t: (key: string) => string;
}

export default function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="bg-linear-to-r from-emerald-600 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.heroLine1')} {t('home.heroLine2')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100">{t('home.heroSubtitleAlt')}</p>
          <Link
            href="/catalog"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50 transition-colors"
          >
            {t('home.viewCatalog')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
