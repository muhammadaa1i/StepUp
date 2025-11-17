export const profilePage = {
  title: 'Мой профиль',
  roleAdmin: 'Администратор',
  roleUser: 'Пользователь',
  basicInfo: 'Основная информация',
  phoneNumber: 'Номер телефона',
  passwordChangeOptional: 'Смена пароля (необязательно)',
  currentPassword: 'Текущий пароль',
  newPassword: 'Новый пароль',
  newPasswordPlaceholder: 'Оставьте пустым, если не хотите менять',
  confirmNewPassword: 'Подтверждение нового пароля',
  confirmNewPasswordPlaceholder: 'Повторите новый пароль',
  updating: 'Сохранение...',
  toasts: {
    updateSuccess: 'Профиль успешно обновлён!',
    updateError: 'Ошибка обновления профиля'
  },
  validation: {
    currentPasswordRequired: 'Текущий пароль обязателен для смены пароля',
    newPasswordMin: 'Новый пароль должен содержать минимум 8 символов',
    allPasswordFieldsRequired: 'Для смены пароля заполните все поля пароля'
  }
} as const;
