import { UZBEK_MONTHS } from "./constants";

/**
 * Format price with currency symbol
 */
export const formatPrice = (
  price: number,
  currencyLabel: string = 'сум',
  locale: string = 'ru-RU'
): string => {
  if (isNaN(price)) return `0 ${currencyLabel}`;
  
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  
  return `${formatted} ${currencyLabel}`;
};

/**
 * Format date with locale support (Russian and Uzbek)
 */
export const formatDate = (date: string, locale: string = "ru-RU"): string => {
  const dateObj = new Date(date);
  
  if (locale === 'uz-UZ' || locale === 'uz') {
    const day = dateObj.getDate();
    const month = UZBEK_MONTHS[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} yil ${hours}:${minutes}`;
  }
  
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};
