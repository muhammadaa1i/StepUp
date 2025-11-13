import React from "react";
import { Instagram, Send } from "lucide-react";

interface SocialSectionProps {
  title: string;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="flex flex-col items-center md:items-start space-y-4">
        {/* Instagram */}
        <div className="flex items-center space-x-3">
          <a
            href="https://www.instagram.com/velora_shoes.uz?igsh=MW5tZ2RqajNwYTdiYg=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-pink-500 via-red-500 to-yellow-500 text-white hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
            title="Instagram"
          >
            <Instagram size={20} />
          </a>
          <p className="text-sm text-gray-500">@velora_shoes.uz</p>
        </div>

        {/* Telegram Channel */}
        <div className="flex items-center space-x-3">
          <a
            href="https://t.me/ElbekoptomEshonguzar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0088cc] text-white hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
            title="Telegram Channel"
          >
            <Send size={20} />
          </a>
          <p className="text-sm text-gray-500">@ElbekoptomEshonguzar</p>
        </div>
      </div>
    </div>
  );
};
