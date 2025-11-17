export const users = {
  title: 'Foydalanuvchilarni boshqarish',
  subtitle: 'Tizim foydalanuvchilarini ko\'rish va boshqarish',
  table: {
    user: 'Foydalanuvchi',
    phone: 'Telefon',
    role: 'Rol',
    registeredAt: 'Ro\'yxatdan o\'tgan sana'
  },
  pagination: {
    info: 'Foydalanuvchilar: {total}',
    shown: '{total} dan {count} ta ko\'rsatilmoqda'
  },
  empty: {
    title: 'Foydalanuvchilar topilmadi',
    subtitle: 'Qidiruv parametrlari yoki filtrlarni o\'zgartirib ko\'ring'
  },
  toasts: { loadError: 'Foydalanuvchilarni yuklashda xato' },
  role: { admin: 'Administrator', user: 'Foydalanuvchi' },
  dateNA: 'N/A'
} as const;
