export const payment = {
  processing: 'Обработка платежа...',
  creatingOrder: 'Создание заказа...',
  processingLargeOrder: 'Обработка крупного заказа...',
  creatingPayment: 'Создание платежа...',
  redirecting: 'Переход к оплате...',
  checking: 'Проверка статуса платежа',
  pleaseWait: 'Пожалуйста, подождите',
  orderId: 'Номер заказа',
  amount: 'Сумма',
  status: 'Статус',
  orderDescription: 'Заказ из {itemCount} товаров для {customerName}',
  batchOrderDescription: 'Пакетный заказ для {customerName} ({itemCount} товаров, {batchCount} частей)',
  success: {
    title: 'Платеж успешно завершен',
    message: 'Ваш платеж обработан успешно. Спасибо за покупку!'
  },
  pending: {
    title: 'Платеж в обработке',
    message: 'Ваш платеж обрабатывается. Мы уведомим вас о результате.'
  },
  failure: {
    title: 'Платеж не удался',
    message: 'К сожалению, не удалось обработать ваш платеж. Пожалуйста, попробуйте еще раз.',
    retry: 'Попробовать снова'
  },
  error: {
    title: 'Ошибка платежа',
    failed: 'Платеж не удался',
    statusCheck: 'Не удалось проверить статус платежа',
    initiation: 'Не удалось инициировать платеж'
  },
  continueShopping: 'Продолжить покупки',
  viewOrders: 'Посмотреть заказы',
  orderCreated: 'Заказ успешно создан!',
  orderCreateError: 'Ошибка при создании заказа',
  noCancellationNotice: 'Внимание! После успешной оплаты отмена заказа или возврат средств невозможны.'
} as const;
