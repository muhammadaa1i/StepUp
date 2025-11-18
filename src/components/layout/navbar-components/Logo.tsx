import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  brandName: string;
  tagline: string;
}

export const Logo: React.FC<LogoProps> = ({ brandName, tagline }) => {
  return (
    <div className="flex flex-col justify-around items-start min-w-0 flex-1 max-w-[200px]">
      <Link
        href="/"
        className="flex items-center space-x-1 sm:space-x-2 min-w-0"
        suppressHydrationWarning
      >
        <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 shrink-0">
          <Image
            src="/logo.svg"
            alt={brandName}
            width={40}
            height={40}
            priority
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            {brandName}
          </span>
          <span
            className="text-[10px] sm:text-xs md:text-sm font-serif tracking-widest text-gray-500 mb-0.5 md:mb-1 truncate"
            style={{
              letterSpacing: "0.1em",
              fontFamily: "Playfair Display, serif",
            }}
          >
            {tagline}
          </span>
        </div>
      </Link>
    </div>
  );
};
