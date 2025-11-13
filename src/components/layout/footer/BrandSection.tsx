import React from "react";
import Image from "next/image";

interface BrandSectionProps {
  brandName: string;
  tagline: string;
  description: string;
}

export const BrandSection: React.FC<BrandSectionProps> = ({
  brandName,
  tagline,
  description,
}) => {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12">
          <Image
            src="/logo.svg"
            alt={brandName}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-serif font-semibold text-gray-900 tracking-wide">
            {brandName}
          </h3>
          <span
            className="text-xs md:text-sm font-serif tracking-widest text-gray-500 mb-0.5 md:mb-1"
            style={{ letterSpacing: "0.15em", fontFamily: "Playfair Display, serif" }}
          >
            {tagline}
          </span>
        </div>
      </div>
      <p className="text-gray-600 text-sm max-w-xs">{description}</p>
    </div>
  );
};
