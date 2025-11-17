export const products = {
  title: 'Mahsulotlarni boshqarish',
  subtitle: 'Katalogdagi mahsulotlarni ko\'rish va boshqarish',
  add: 'Mahsulot qo\'shish',
  table: {
    product: 'Mahsulot',
    price: 'Narx',
    size: 'O\'lchamlar',
    status: 'Holat',
    actions: 'Amallar'
  },
  pagination: {
    shown: '{total} dan {count} ta ko\'rsatilmoqda'
  },
  empty: {
    title: 'Mahsulotlar topilmadi',
    subtitle: 'Qidiruv parametrlarini o\'zgartirib ko\'ring yoki yangi mahsulot qo\'shing'
  },
  status: {
    active: 'Faol',
    inactive: 'Nofaol'
  },
  dialogs: {
    deleteTitle: 'Mahsulotni o\'chirish: {name}?',
    deleteMessage: '"{name}" mahsulotini o\'chirishga ishonchingiz komilmi? Bu amalni bekor qilib bo\'lmaydi.'
  },
  deleteConfirm: {
    title: 'Mahsulotni o\'chirish',
    message: 'Ushbu mahsulotni o\'chirishga ishonchingiz komilmi? Bu amalni bekor qilib bo\'lmaydi.',
    confirm: 'O\'chirish'
  },
  form: {
    createTitle: 'Mahsulot yaratish',
    editTitle: 'Mahsulotni tahrirlash',
    fields: {
      name: 'Nomi',
      namePlaceholder: 'Nomini kiriting',
      price: 'Narx',
      quantity: 'Miqdori',
      size: 'O\'lchamlar',
      sizePlaceholder: 'Masalan 36-40',
      active: 'Faol mahsulot'
    },
    buttons: {
      saving: 'Saqlash...',
      update: 'Yangilash',
      create: 'Yaratish'
    }
  },
  images: {
    section: 'Rasmlar (ixtiyoriy)',
    single: 'Bitta rasm',
    multiple: 'Bir nechta rasm',
    recommendation: 'Tavsiya: 2MB gacha bo\'lgan rasmlar. Katta fayllar avtomatik siqiladi.',
    selectedFiles: 'Tanlangan fayllar: {count}',
    uploading: 'Rasmlar yuklanmoqda...',
    willUploadAfterCreate: 'Rasmlar mahsulot yaratilgandan keyin yuklanadi.',
    current: 'Joriy rasmlar',
    loading: 'Yuklanmoqda...',
    none: 'Saqlangan rasmlar yo\'q',
    primaryBadge: 'Asosiy',
    removeImageAria: 'Rasmni o\'chirish',
    addingHint: 'Yuqoridagi yangi fayllar qo\'shiladi - almashtirish uchun ortiqcha fayllarni o\'chirib, yangisini yuklang.',
    progress: '{current} / {total}',
    deleteConfirmTitle: 'Rasmni o\'chirish',
    deleteConfirmMessage: 'Ushbu rasmni o\'chirish?',
    deleteSuccess: 'Rasm o\'chirildi',
    deleteError: 'Rasmni o\'chirishda xato',
    uploadSingleSuccess: 'Rasm yuklandi ({field})',
    uploadAllSuccess: 'Barcha rasmlar yuklandi',
    uploadError: 'Rasmlarni yuklashda xato',
    setPrimarySuccess: 'Asosiy rasm o\'rnatildi',
    setPrimaryError: 'Asosiy rasmni o\'rnatishda xato'
  },
  toasts: {
    loadError: 'Mahsulotlarni yuklashda xato',
    deleteSuccess: 'Mahsulot muvaffaqiyatli o\'chirildi',
    deleteAlreadyRemoved: 'Mahsulot allaqachon o\'chirilgan',
    deleteError: 'Mahsulotni o\'chirishda xato',
    saveError: 'Mahsulotni saqlashda xato',
    updateSuccess: 'Mahsulot yangilandi',
    createSuccess: 'Mahsulot yaratildi',
    statusUpdateSuccess: 'Mahsulot holati yangilandi',
    statusUpdateError: 'Holatni yangilashda xato'
  }
} as const;
