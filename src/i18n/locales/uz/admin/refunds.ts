export const refunds = {
  title: 'Qaytarish so\'rovlari',
  subtitle: 'Pulni qaytarish so\'rovlarini qayta ishlash',
  table: {
    request: 'So\'rov',
    order: 'Buyurtma',
    user: 'Foydalanuvchi',
    amount: 'Summa',
    reason: 'Sabab',
    status: 'Holat',
    date: 'Sana',
    actions: 'Amallar'
  },
  status: {
    pending: 'Kutilmoqda',
    approved: 'Tasdiqlandi',
    rejected: 'Rad etildi'
  },
  actions: {
    approve: 'Tasdiqlash',
    reject: 'Rad etish',
    processing: 'Qayta ishlanmoqda...'
  },
  confirmDialog: {
    approve: {
      title: 'Qaytarishni tasdiqlashni xohlaysizmi?',
      message: 'Ushbu qaytarish so\'rovini tasdiqlashga ishonchingiz komilmi?'
    },
    reject: {
      title: 'Qaytarishni rad etishni xohlaysizmi?',
      message: 'Ushbu qaytarish so\'rovini rad etishga ishonchingiz komilmi?'
    }
  },
  toasts: {
    loadError: 'Qaytarish so\'rovlarini yuklashda xato',
    approveSuccess: 'Qaytarish tasdiqlandi',
    approveError: 'Qaytarishni tasdiqlashda xato',
    rejectSuccess: 'Qaytarish rad etildi',
    rejectError: 'Qaytarishni rad etishda xato'
  },
  empty: {
    title: 'Qaytarish so\'rovlari topilmadi',
    subtitle: 'Hozircha qaytarish so\'rovlari yo\'q'
  }
} as const;
