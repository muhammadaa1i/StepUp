export const dashboard = {
  title: 'Панель администратора',
  welcome: 'Добро пожаловать в панель управления интернет-магазином',
  loadError: 'Ошибка загрузки статистики',
  stats: {
    totalUsers: 'Всего пользователей',
    totalProducts: 'Всего товаров',
    totalOrders: 'Всего заказов',
    pendingOrders: 'Ожидающих заказов'
  },
  quickActions: {
    title: 'Быстрые действия',
    products: { title: 'Управление товарами', subtitle: 'Добавить, редактировать товары' },
    orders: { title: 'Управление заказами', subtitle: 'Просмотр и обработка заказов' },
    users: { title: 'Управление пользователями', subtitle: 'Просмотр пользователей' }
  }
} as const;
