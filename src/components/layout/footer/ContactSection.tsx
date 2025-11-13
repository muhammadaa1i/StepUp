import React from "react";
import { Phone, Send } from "lucide-react";

interface ContactSectionProps {
  title: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="space-y-3">
        {/* Phone */}
        <a
          href="tel:+998950210207"
          className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-emerald-100 transition-colors">
            <Phone size={16} className="text-gray-600 group-hover:text-emerald-600" />
          </div>
          <span className="text-sm">+998 95 021 02 07</span>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/elbek_s101"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-gray-600 hover:text-[#0088cc] transition-colors group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#0088cc]/10 transition-colors">
            <Send size={16} className="text-gray-600 group-hover:text-[#0088cc]" />
          </div>
          <span className="text-sm">@elbek_s101</span>
        </a>
      </div>
    </div>
  );
};
