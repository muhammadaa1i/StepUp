"use client";
import React from "react";
import { useI18n } from "@/i18n";
import { BrandSection } from "./footer/BrandSection";
import { ContactSection } from "./footer/ContactSection";
import { SocialSection } from "./footer/SocialSection";
import { PaymentSection } from "./footer/PaymentSection";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BrandSection
            brandName={t("brand.name")}
            tagline={t("brand.tagline")}
            description={t("brand.description")}
          />

          <ContactSection title={t("footer.contactUs")} />

          <SocialSection title={t("footer.followUs")} />

          <PaymentSection title={t("footer.paymentMethods")} />
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <p className="text-sm text-gray-500">© 2025 StepUp. {t('footer.rights')}</p>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="/offer" target="_blank" className="text-sm text-emerald-600 hover:text-emerald-700 underline">
              {t('offer.title')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
