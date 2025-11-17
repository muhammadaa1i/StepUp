export const auth = {
  login: 'Tizimga kiring',
  register: "Ro'yhatdan o'tish",
  name: 'Foydalanuvchi nomi',
  password: 'Parol',
  passwordPlaceholder: 'Kamida 8 ta belgi',
  confirmPassword: 'Parolni tasdiqlash',
  forgotPassword: 'Parolni unutdingizmi?',
  logoutConfirmTitle: 'Tizimdan chiqishni xohlaysizmi?',
  logoutConfirmMessage: '',
  logoutConfirmButton: 'Chiqish',
  checking: 'Avtorizatsiya tekshirilmoqda',
  namePlaceholder: 'Ismingizni kiriting',
  passwordInputPlaceholder: 'Parolni kiriting',
  confirmPasswordPlaceholder: 'Parolni takrorlang',
  phone: 'Telefon raqami',
  phonePlaceholder: '+998 90 123 45 67',
  orCreate: 'Yoki yangi akkaunt yarating',
  orLogin: 'Yoki mavjud tizimga kiring',
  loginProgress: 'Kirish...',
  registerProgress: 'Ro\'yxatdan o\'tish...',
  showPassword: 'Parolni ko\'rsatish',
  hidePassword: 'Parolni yashirish',
  toasts: {
    loginSuccess: 'Tizimga muvaffaqiyatli kirildi!',
    loginInvalid: 'Noto\'g\'ri login yoki parol',
    registrationSuccess: 'Ro\'yxatdan o\'tish muvaffaqiyatli!',
    logoutSuccess: 'Tizimdan chiqdingiz',
    passwordChangeSuccess: 'Parol muvaffaqiyatli o\'zgartirildi',
    userFoundEnterNewPassword: 'Foydalanuvchi topildi. Yangi parolni kiriting'
  },
  serverMessages: {
    incorrectCredentials: 'Noto\'g\'ri ism yoki parol'
  },
  errors: {
    invalidServerResponse: 'Avtorizatsiya xatosi: noto\'g\'ri server javobi',
    passwordChangeFailed: 'Parolni o\'zgartirib bo\'lmadi',
    userSearchFailed: 'Foydalanuvchini qidirish xatosi',
    registrationFailed: 'Ro\'yxatdan o\'tish xatosi',
    registrationFailedNetwork: 'Tarmoq xatosi yoki CORS bloklandi. Keyinroq yana urinib ko\'ring yoki brauzer konsolini tekshiring.',
    existingPhone: 'Ushbu telefon raqami bilan foydalanuvchi allaqachon mavjud',
    existingName: 'Bunday nomdagi foydalanuvchi allaqachon mavjud'
  },
  validation: {
    nameRequired: 'Ism majburiy',
    passwordMin: 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak',
    surnameRequired: 'Familiya majburiy',
    phoneRequired: 'Telefon raqami majburiy',
    phoneFormat: 'Telefon raqami + bilan boshlanishi va 10-15 ta raqamdan iborat bo\'lishi kerak',
    confirmPasswordMin: 'Parolni tasdiqlash majburiy (kamida 8 ta belgi)',
    passwordsMismatch: 'Parollar mos kelmaydi'
  },
  forgot: {
    title: 'Parolni tiklash',
    instructions: 'Foydalanuvchi nomini va yangi parolni kiriting',
    newPassword: 'Yangi parol',
    confirmNewPassword: 'Parolni tasdiqlash',
    submit: 'Parolni o\'zgartirish',
    saving: 'Saqlash...',
    backToLogin: 'Kirishga qaytish'
  }
} as const;
