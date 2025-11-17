export const payment = {
  processing: 'To\'lov qayta ishlanmoqda...',
  creatingOrder: 'Buyurtma yaratilmoqda...',
  processingLargeOrder: 'Katta buyurtma qayta ishlanmoqda...',
  creatingPayment: 'To\'lov yaratilmoqda...',
  redirecting: 'To\'lovga o\'tish...',
  checking: 'To\'lov holati tekshirilmoqda',
  pleaseWait: 'Iltimos, kuting',
  orderId: 'Buyurtma raqami',
  amount: 'Summa',
  status: 'Holat',
  orderDescription: '{customerName} uchun {itemCount} ta mahsulotdan iborat buyurtma',
  batchOrderDescription: '{customerName} uchun paket buyurtma ({itemCount} ta mahsulot, {batchCount} qism)',
  success: {
    title: 'To\'lov muvaffaqiyatli amalga oshirildi',
    message: 'To\'lovingiz muvaffaqiyatli qayta ishlandi. Xaridingiz uchun rahmat!'
  },
  pending: {
    title: 'To\'lov qayta ishlanmoqda',
    message: 'To\'lovingiz qayta ishlanmoqda. Natija haqida sizga xabar beramiz.'
  },
  failure: {
    title: 'To\'lov amalga oshmadi',
    message: 'Afsuski, to\'lovingizni qayta ishlab bo\'lmadi. Iltimos, qayta urinib ko\'ring.',
    retry: 'Qayta urinish'
  },
  error: {
    title: 'To\'lov xatosi',
    failed: 'To\'lov amalga oshmadi',
    statusCheck: 'To\'lov holatini tekshirib bo\'lmadi',
    initiation: 'To\'lovni boshlash amalga oshmadi'
  },
  continueShopping: 'Xaridni davom ettirish',
  viewOrders: 'Buyurtmalarni ko\'rish',
  orderCreated: 'Buyurtma muvaffaqiyatli yaratildi!',
  orderCreateError: 'Buyurtma yaratishda xatolik',
  noCancellationNotice: 'Diqqat! Muvaffaqiyatli to\'lovdan keyin buyurtmani bekor qilish yoki pulni qaytarish mumkin emas.'
} as const;
