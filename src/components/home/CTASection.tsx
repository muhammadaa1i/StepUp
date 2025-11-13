import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  t: (key: string) => string;
}

export default function CTASection({ t }: CTASectionProps) {
  return (
    <section className="bg-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('home.ctaTitle')}</h2>
        <p className="text-xl mb-8 text-emerald-100">{t('home.ctaSubtitle')}</p>
        <Link
          href="/catalog"
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50 transition-colors"
        >
          {t('home.ctaStartShopping')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
