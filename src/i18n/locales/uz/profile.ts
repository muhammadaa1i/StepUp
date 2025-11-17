export const profilePage = {
  title: 'Mening profilim',
  roleAdmin: 'Administrator',
  roleUser: 'Foydalanuvchi',
  basicInfo: 'Asosiy ma\'lumot',
  phoneNumber: 'Telefon raqami',
  passwordChangeOptional: 'Parolni o\'zgartirish (ixtiyoriy)',
  currentPassword: 'Joriy parol',
  newPassword: 'Yangi parol',
  newPasswordPlaceholder: 'O\'zgartirmoqchi bo\'lmasangiz bo\'sh qoldiring',
  confirmNewPassword: 'Yangi parolni tasdiqlash',
  confirmNewPasswordPlaceholder: 'Yangi parolni takrorlang',
  updating: 'Saqlash...',
  toasts: {
    updateSuccess: 'Profil muvaffaqiyatli yangilandi!',
    updateError: 'Profilni yangilashda xato'
  },
  validation: {
    currentPasswordRequired: 'Parolni o\'zgartirish uchun joriy parol majburiy',
    newPasswordMin: 'Yangi parol kamida 8 ta belgidan iborat bo\'lishi kerak',
    allPasswordFieldsRequired: 'Parolni o\'zgartirish uchun barcha parol maydonlarini to\'ldiring'
  }
} as const;
