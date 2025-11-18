export const cart = {
  inCart: 'Savatda',
  addToCart: 'Savatga',
  addMore: 'Yana qo\'shish',
  alreadyInCartAddMore: 'Mahsulot allaqachon savatda. Yana qo\'shish uchun bosing',
  limitReached: 'Bu mahsulot uchun maksimal miqdorga yetdingiz',
  allProductsAdded: 'Bu sahifadagi barcha mahsulotlar savatga qo\'shilgan',
  addToCartHint: 'Savatga qo\'shish',
  added: '{name}: +{qty} birlik qo\'shildi',
  removed: '{name}: o\'chirildi',
  cleared: 'Savat tozalandi',
  outOfStock: '{name} - mavjud emas',
  insufficientStock: '{name} - yetarli miqdor yo\'q (mavjud: {available})',
  limitedStock: '{name} - faqat {qty} qo\'shildi (mavjud: {available})',
  emptyCart: 'Savat bo\'sh',
  loginRequired: 'Savatingizni ko\'rish uchun tizimga kiring',
  goToLogin: 'Tizimga kirish'
} as const;

export const cartPage = {
  emptyTitle: 'Savatingiz bo\'sh',
  emptySubtitle: 'Xaridni boshlash uchun katalogdan mahsulotlar qo\'shing',
  continueShopping: 'Xaridga o\'tish',
  continue: 'Xaridni davom ettirish',
  heading: 'Savat',
  itemsCount: '{count} ta mahsulot',
  clear: 'Savatni tozalash',
  orderSummary: 'Buyurtma jami',
  productsLine: 'Mahsulotlar ({count} dona)',
  total: 'Jami summa',
  emptyCart: 'Savat bo\'sh',
  checkout: 'Buyurtma berish',
  loginForCheckout: 'Tizimga kiring',
  loginForCheckoutSuffix: 'buyurtma berish uchun',
  processingBatch: 'Paket {current} / {total} qayta ishlanmoqda...',
  batchProcessingStart: 'Katta buyurtma qayta ishlanmoqda ({total} qism)...',
  batchProcessingFallback: 'Buyurtma qayta qayta ishlanmoqda ({total} qism)...',
  batchProcessingSuccess: 'Muvaffaqiyatli buyurtma',
  largeOrderNotice: {
    title: 'Katta buyurtma',
    message: 'Buyurtmangizda {total} ta mahsulot bor. U optimal ishlash uchun qismlarga ajratiladi.',
    extraLargeMessage: 'Juda katta buyurtma. Qayta ishlash bir necha daqiqa davom etishi mumkin.'
  },
  size: 'O\'lcham',
  color: 'Rang'
} as const;
