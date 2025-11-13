"use client";
import React from "react";
import { useI18n } from "@/i18n";
import { OfferSection } from "./offer/OfferSection";
import { SellerInfo } from "./offer/SellerInfo";

export default function OfferContent() {
  const { t } = useI18n();

  const orderPaymentItems = [
    <>
      {t('offerPage.sections.orderPayment.li1').replace(
        'https://www.optomoyoqkiyim.uz/',
        ''
      )}
      {" "}
      <a
        className="text-emerald-600 hover:text-emerald-700 underline break-all"
        href="https://www.optomoyoqkiyim.uz/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.optomoyoqkiyim.uz/
      </a>
    </>,
    t('offerPage.sections.orderPayment.li2'),
    t('offerPage.sections.orderPayment.li3'),
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-10">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t('offerPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">{t('offerPage.updated')}</p>

          <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 mb-4 sm:mb-6">{t('offerPage.intro1')}</p>
          <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 mb-8 sm:mb-10">{t('offerPage.intro2')}</p>

          <section className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {t('offerPage.sections.orderPayment.title')}
            </h2>
            <ol className="list-decimal ml-4 sm:ml-6 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
              {orderPaymentItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </section>

          <OfferSection
            title={t('offerPage.sections.returns.title')}
            items={[
              t('offerPage.sections.returns.li1'),
              t('offerPage.sections.returns.li2'),
              t('offerPage.sections.returns.li3'),
              t('offerPage.sections.returns.li4'),
            ]}
          />

          <OfferSection
            title={t('offerPage.sections.delivery.title')}
            items={[
              t('offerPage.sections.delivery.li1'),
              t('offerPage.sections.delivery.li2'),
              t('offerPage.sections.delivery.li3'),
            ]}
          />

          <OfferSection
            title={t('offerPage.sections.security.title')}
            items={[
              t('offerPage.sections.security.li1'),
              t('offerPage.sections.security.li2'),
              t('offerPage.sections.security.li3'),
            ]}
          />

          <OfferSection
            title={t('offerPage.sections.privacy.title')}
            items={[
              t('offerPage.sections.privacy.li1'),
              t('offerPage.sections.privacy.li2'),
              t('offerPage.sections.privacy.li3'),
              t('offerPage.sections.privacy.li4'),
            ]}
          />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {t('offerPage.sections.seller.title')}
            </h2>
            <SellerInfo
              name={t('offerPage.sections.seller.name')}
              inn={t('offerPage.sections.seller.inn')}
              legalAddress={t('offerPage.sections.seller.legalAddress')}
              actualAddress={t('offerPage.sections.seller.actualAddress')}
              phone={t('offerPage.sections.seller.phone')}
              email={t('offerPage.sections.seller.email')}
            />
          </section>

          <div className="mt-8 sm:mt-12 rounded-lg bg-emerald-50 border border-emerald-200 p-3 sm:p-4 text-sm sm:text-base text-emerald-800 leading-6">
            {t('offerPage.notice')}
          </div>
        </div>
      </div>
    </div>
  );
}
