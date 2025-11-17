export const errors = {
  serverUnavailable: 'Server vaqtincha mavjud emas',
  serverUnavailableLong: 'Server vaqtincha mavjud emas. Keyinroq urinib ko\'ring.',
  serverUnavailableRetry: 'Server vaqtincha mavjud emas. Bir necha daqiqadan keyin sahifani yangilashga harakat qiling.',
  categoriesLoad: 'Kategoriyalarni yuklashda xato',
  badGateway: 'Server shlyuz xatosi',
  badGatewayLong: 'Serverga ulanishda xato. Keyinroq urinib ko\'ring.',
  serverError: 'Server xatosi',
  serverErrorLong: 'Server xatosi. Keyinroq urinib ko\'ring.',
  tooManyRequests: 'Juda ko\'p so\'rovlar',
  tooManyRequestsLong: 'Juda ko\'p so\'rovlar. Biroz kuting va qayta urinib ko\'ring.',
  productsLoad: 'Mahsulotlarni yuklashda xato',
  ordersLoad: 'Buyurtmalarni yuklashda xato',
  default: 'Xatolik yuz berdi. Keyinroq urinib ko\'ring.'
} as const;

export const errorPage = {
  default: {
    title: 'Nimadir noto\'g\'ri ketdi',
    description: 'Noma\'lum xatolik yuz berdi. Keyinroq urinib ko\'ring yoki qo\'llab-quvvatlashga murojaat qiling.'
  },
  suggestions: {
    title: 'Nimani sinab ko\'rish mumkin:',
    refresh: 'Sahifani yangilashga harakat qiling',
    checkConnection: 'Internetga ulanishni tekshiring',
    contactSupport: '',
    tryLater: 'Keyinroq urinib ko\'ring',
    waitFewMinutes: '2-3 daqiqa kutib, qayta urinib ko\'ring',
    slower: 'Saytdan sekinroq foydalanib ko\'ring',
    refreshInMinute: 'Bir daqiqadan so\'ng sahifani yangilang'
  },
  retry: 'Qayta urinib ko\'rish',
  goHome: 'Bosh sahifaga qaytish',
  statusCode: 'Xato kodi'
} as const;
