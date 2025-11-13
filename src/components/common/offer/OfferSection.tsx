import React from "react";

interface OfferSectionProps {
  title: string;
  items: string[];
}

export const OfferSection: React.FC<OfferSectionProps> = ({ title, items }) => {
  return (
    <section className="mb-8 sm:mb-10">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
        {title}
      </h2>
      <ol className="list-decimal ml-4 sm:ml-6 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </section>
  );
};
