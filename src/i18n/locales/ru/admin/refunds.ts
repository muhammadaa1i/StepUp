export const refunds = {
  title: 'Запросы на возврат',
  subtitle: 'Обработка запросов на возврат средств',
  table: {
    request: 'Запрос',
    order: 'Заказ',
    user: 'Пользователь',
    amount: 'Сумма',
    reason: 'Причина',
    status: 'Статус',
    date: 'Дата',
    actions: 'Действия'
  },
  status: {
    pending: 'Ожидает',
    approved: 'Одобрено',
    rejected: 'Отклонено'
  },
  actions: {
    approve: 'Одобрить',
    reject: 'Отклонить',
    processing: 'Обработка...'
  },
  confirmDialog: {
    approve: {
      title: 'Одобрить возврат?',
      message: 'Вы уверены, что хотите одобрить этот запрос на возврат?'
    },
    reject: {
      title: 'Отклонить возврат?',
      message: 'Вы уверены, что хотите отклонить этот запрос на возврат?'
    }
  },
  toasts: {
    loadError: 'Ошибка загрузки запросов на возврат',
    approveSuccess: 'Возврат одобрен',
    approveError: 'Ошибка одобрения возврата',
    rejectSuccess: 'Возврат отклонен',
    rejectError: 'Ошибка отклонения возврата'
  },
  empty: {
    title: 'Запросы на возврат не найдены',
    subtitle: 'На данный момент нет запросов на возврат'
  }
} as const;
