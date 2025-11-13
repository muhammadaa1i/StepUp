import React from 'react';
import { Star, Shield, Truck, Headphones, LucideIcon } from 'lucide-react';

interface FeaturesSectionProps {
  t: (key: string) => string;
}

const features: { icon: LucideIcon; tKey: string }[] = [
  { icon: Shield, tKey: 'home.features.quality' },
  { icon: Truck, tKey: 'home.features.delivery' },
  { icon: Headphones, tKey: 'home.features.support' },
  { icon: Star, tKey: 'home.features.customers' },
];

export default function FeaturesSection({ t }: FeaturesSectionProps) {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('home.whyChooseUs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`${feature.tKey}.title`)}</h3>
                <p className="text-gray-600">{t(`${feature.tKey}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
