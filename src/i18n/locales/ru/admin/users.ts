export const users = {
  title: 'Управление пользователями',
  subtitle: 'Просмотр и управление пользователями системы',
  table: {
    user: 'Пользователь',
    phone: 'Телефон',
    role: 'Роль',
    registeredAt: 'Дата регистрации'
  },
  pagination: {
    info: 'Пользователей: {total}',
    shown: 'Показано {count} из {total}'
  },
  empty: {
    title: 'Пользователи не найдены',
    subtitle: 'Попробуйте изменить параметры поиска или фильтры'
  },
  toasts: { loadError: 'Ошибка загрузки пользователей' },
  role: { admin: 'Администратор', user: 'Пользователь' },
  dateNA: 'Н/Д'
} as const;
