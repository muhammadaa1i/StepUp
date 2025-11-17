export const orders = {
  title: 'Buyurtmalarni boshqarish',
  subtitle: 'Mijozlar buyurtmalarini ko\'rish va boshqarish',
  info: { orders: 'Buyurtmalar: {total}', page: 'Sahifa {page} / {pages}' },
  pagination: {
    shown: '{total} dan {count} ta buyurtma ko\'rsatilmoqda'
  },
  table: {
    order: 'Buyurtma',
    client: 'Mijoz',
    phone: 'Telefon',
    items: 'Mahsulotlar',
    amount: 'Summa',
    status: 'Holat',
    date: 'Sana',
    actions: 'Amallar'
  },
  createdAt: 'yaratilgan sana',
  actions: {
    refund: 'Qaytarish',
    refundRequest: 'Qaytarishni so\'rash',
    adminRefund: 'Pulni qaytarish'
  },
  refund: {
    request: 'Qaytarish',
    requesting: 'So\'rov yuborilmoqda...',
    requestSuccess: 'Qaytarish so\'rovi yuborildi',
    requestError: 'Qaytarish so\'rovini yuborishda xato',
    confirmTitle: 'Qaytarishni tasdiqlash',
    confirmMessage: 'Ushbu buyurtma uchun qaytarishni so\'ramoqchimisiz?',
    amount: 'Summa',
    orderNumber: 'Buyurtma',
    pendingImplementation: 'Qaytarish tizimi joriy qilinmoqda. Iltimos, qo\'lda qayta ishlash uchun qo\'llab-quvvatlash xizmatiga murojaat qiling.',
    requestReceived: 'Qaytarish so\'rovi qabul qilindi. Siz bilan 24 soat ichida bog\'lanamiz.',
    requestSent: 'Qaytarish so\'rovi administratorga yuborildi. Siz bilan 24 soat ichida bog\'lanamiz.',
    confirmSubtitle: 'Qaytarish so\'rovini qayta ishlash',
    warningTitle: 'Muhim xabarnoma',
    orderDetails: 'Buyurtma tafsilotlari',
    itemCount: 'Mahsulotlar',
    refundAmount: 'Qaytarish summasi',
    processingNotice: 'Qaytarish 24-48 soat ichida qayta ishlanadi',
    confirmButton: 'Qaytarishni tasdiqlash'
  },
  itemsCount: '{count} ta mahsulot',
  empty: {
    title: 'Buyurtmalar topilmadi',
    subtitle: 'Qidiruv parametrlarini o\'zgartirib ko\'ring'
  },
  status: {
    pending: 'Kutilmoqda',
    processing: 'Qayta ishlanmoqda',
    shipped: 'Yuborildi',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi',
    confirmed: 'Tasdiqlandi',
    created: 'Yaratildi',
    paid: 'To\'landi',
    failed: 'Muvaffaqiyatsiz',
    refunded: 'Qaytarildi',
    PENDING: 'Kutilmoqda',
    PROCESSING: 'Qayta ishlanmoqda',
    SHIPPED: 'Yuborildi',
    DELIVERED: 'Yetkazildi',
    CANCELLED: 'Bekor qilindi',
    CONFIRMED: 'Tasdiqlandi',
    CREATED: 'Yaratildi',
    PAID: 'To\'landi',
    FAILED: 'Muvaffaqiyatsiz',
    REFUNDED: 'Qaytarildi'
  },
  toasts: {
    loadError: 'Buyurtmalarni yuklashda xato',
    authError: 'Tizimga kirish talab qilinadi. Iltimos, qayta kiring.',
    statusUpdateSuccess: 'Buyurtma holati yangilandi',
    statusUpdateError: 'Holatni yangilashda xato',
    refundSuccess: 'Pul muvaffaqiyatli qaytarildi',
    refundError: 'Pulni qaytarishda xato',
    refundNotAllowed: 'Faqat tasdiqlangan buyurtmalar bo\'yicha pulni qaytarish mumkin'
  },
  refundConfirm: {
    title: 'Pulni qaytarishni tasdiqlash',
    message: 'Ushbu buyurtma uchun pulni qaytarishga ishonchingiz komilmi?',
    amount: 'Qaytarish summasi',
    paymentId: 'To\'lov ID',
    confirm: 'Qaytarishni tasdiqlash',
    cancel: 'Bekor qilish',
    successTitle: 'Qaytarish amalga oshirildi!',
    successMessage: '{amount} summa muvaffaqiyatli qaytarildi!',
    processingMessage: '#{orderId} buyurtma bo\'yicha qaytarish to\'lov tizimi tomonidan qayta ishlanmoqda.',
    refundInfo: 'Buyurtmaning to\'liq summasi #{orderId} buyurtma ID orqali qaytariladi',
    close: 'Yopish',
    processing: 'Qayta ishlanmoqda...',
    orderIdLabel: 'Buyurtma ID:',
    customerLabel: 'Mijoz:',
    originalAmountLabel: 'Asl summa:',
    statusLabel: 'Holat:'
  },
  unspecifiedUser: 'Ko\'rsatilmagan'
} as const;
