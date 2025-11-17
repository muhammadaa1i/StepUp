export const auth = {
  login: 'Войдите в аккаунт',
  register: 'Создать аккаунт',
  name: 'Имя пользователя',
  password: 'Пароль',
  passwordPlaceholder: 'Минимум 8 символов',
  confirmPassword: 'Подтверждение пароля',
  forgotPassword: 'Забыли пароль?',
  logoutConfirmTitle: 'Выйти из аккаунта?',
  logoutConfirmMessage: '',
  logoutConfirmButton: 'Выйти',
  checking: 'Проверка авторизации',
  namePlaceholder: 'Введите ваше имя',
  passwordInputPlaceholder: 'Введите пароль',
  confirmPasswordPlaceholder: 'Повторите пароль',
  phone: 'Номер телефона',
  phonePlaceholder: '+998 90 123 45 67',
  orCreate: 'Или создайте новый аккаунт',
  orLogin: 'Или войдите в существующий',
  loginProgress: 'Вход...',
  registerProgress: 'Регистрация...',
  showPassword: 'Показать пароль',
  hidePassword: 'Скрыть пароль',
  toasts: {
    loginSuccess: 'Успешный вход в систему!',
    loginInvalid: 'Неверный логин или пароль',
    registrationSuccess: 'Регистрация прошла успешно!',
    logoutSuccess: 'Вы вышли из системы',
    passwordChangeSuccess: 'Пароль успешно изменён',
    userFoundEnterNewPassword: 'Пользователь найден. Введите новый пароль'
  },
  serverMessages: {
    incorrectCredentials: 'Неверное имя или пароль'
  },
  errors: {
    invalidServerResponse: 'Ошибка авторизации: некорректный ответ сервера',
    passwordChangeFailed: 'Не удалось изменить пароль',
    userSearchFailed: 'Ошибка поиска пользователя',
    registrationFailed: 'Ошибка регистрации',
    registrationFailedNetwork: 'Сетевая ошибка или CORS заблокировал запрос. Попробуйте позже или проверьте консоль браузера.',
    existingPhone: 'Пользователь с этим номером телефона уже существует',
    existingName: 'Пользователь с таким именем уже существует'
  },
  validation: {
    nameRequired: 'Имя обязательно',
    passwordMin: 'Пароль должен содержать минимум 8 символов',
    surnameRequired: 'Фамилия обязательна',
    phoneRequired: 'Номер телефона обязателен',
    phoneFormat: 'Номер телефона должен начинаться с + и содержать 10-15 цифр',
    confirmPasswordMin: 'Подтверждение пароля обязательно (минимум 8 символов)',
    passwordsMismatch: 'Пароли не совпадают'
  },
  forgot: {
    title: 'Восстановление пароля',
    instructions: 'Введите имя пользователя и новый пароль',
    newPassword: 'Новый пароль',
    confirmNewPassword: 'Подтверждение пароля',
    submit: 'Сменить пароль',
    saving: 'Сохранение...',
    backToLogin: 'Вернуться ко входу'
  }
} as const;
