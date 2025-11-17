export const orders = {
  title: 'Управление заказами',
  subtitle: 'Просмотр и управление заказами клиентов',
  info: { orders: 'Заказов: {total}', page: 'Страница {page} из {pages}' },
  pagination: {
    shown: 'Показано {count} из {total} заказов'
  },
  table: {
    order: 'Заказ',
    client: 'Клиент',
    phone: 'Телефон',
    items: 'Товары',
    amount: 'Сумма',
    status: 'Статус',
    date: 'Дата',
    actions: 'Действия'
  },
  createdAt: 'дата создания',
  actions: {
    refund: 'Возврат',
    refundRequest: 'Запросить возврат',
    adminRefund: 'Вернуть средства'
  },
  refund: {
    request: 'Возврат',
    requesting: 'Запрашиваем...',
    requestSuccess: 'Запрос на возврат отправлен',
    requestError: 'Ошибка отправки запроса на возврат',
    confirmTitle: 'Подтвердить возврат',
    confirmMessage: 'Вы уверены, что хотите запросить возврат для этого заказа?',
    amount: 'Сумма',
    orderNumber: 'Заказ',
    pendingImplementation: 'Система возвратов внедряется. Пожалуйста, обратитесь в поддержку для ручной обработки.',
    requestReceived: 'Запрос на возврат получен. С вами свяжутся в течение 24 часов.',
    requestSent: 'Запрос на возврат отправлен администратору. С вами свяжутся в течение 24 часов.',
    confirmSubtitle: 'Обработка запроса на возврат',
    warningTitle: 'Важное уведомление',
    orderDetails: 'Детали заказа',
    itemCount: 'Товаров',
    refundAmount: 'Сумма возврата',
    processingNotice: 'Возврат будет обработан в течение 24-48 часов',
    confirmButton: 'Подтвердить возврат'
  },
  itemsCount: '{count} товар(ов)',
  empty: {
    title: 'Заказы не найдены',
    subtitle: 'Попробуйте изменить параметры поиска'
  },
  status: {
    pending: 'Ожидает',
    processing: 'Обрабатывается',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен',
    confirmed: 'Подтвержден',
    created: 'Создан',
    paid: 'Оплачен',
    failed: 'Неудачно',
    refunded: 'Возвращено',
    PENDING: 'Ожидает',
    PROCESSING: 'Обрабатывается',
    SHIPPED: 'Отправлен',
    DELIVERED: 'Доставлен',
    CANCELLED: 'Отменен',
    CONFIRMED: 'Подтвержден',
    CREATED: 'Создан',
    PAID: 'Оплачен',
    FAILED: 'Неудачно',
    REFUNDED: 'Возвращено'
  },
  toasts: {
    loadError: 'Ошибка загрузки заказов',
    authError: 'Требуется авторизация. Пожалуйста, войдите снова.',
    statusUpdateSuccess: 'Статус заказа обновлен',
    statusUpdateError: 'Ошибка обновления статуса заказа',
    refundSuccess: 'Возврат средств выполнен успешно',
    refundError: 'Ошибка при возврате средств',
    refundNotAllowed: 'Можно вернуть средства только по подтвержденным заказам'
  },
  refundConfirm: {
    title: 'Подтвердить возврат средств',
    message: 'Вы уверены, что хотите вернуть средства за этот заказ?',
    amount: 'Сумма возврата',
    paymentId: 'ID платежа',
    confirm: 'Подтвердить возврат',
    cancel: 'Отмена',
    successTitle: 'Возврат выполнен!',
    successMessage: 'Возврат на сумму {amount} успешно обработан!',
    processingMessage: 'Возврат по заказу #{orderId} обрабатывается платежной системой.',
    refundInfo: 'Полная сумма заказа будет возвращена с использованием ID заказа: #{orderId}',
    close: 'Закрыть',
    processing: 'Обработка...',
    orderIdLabel: 'ID заказа:',
    customerLabel: 'Клиент:',
    originalAmountLabel: 'Оригинальная сумма:',
    statusLabel: 'Статус:'
  },
  unspecifiedUser: 'Не указано'
} as const;
