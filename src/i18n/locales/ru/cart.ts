export const cart = {
  inCart: 'В корзине',
  addToCart: 'В корзину',
  addMore: 'Добавить ещё',
  alreadyInCartAddMore: 'Товар уже в корзине. Нажмите чтобы добавить ещё',
  limitReached: 'Достигнуто максимальное количество для этого товара',
  allProductsAdded: 'Все товары на этой странице каталога уже добавлены в корзину',
  addToCartHint: 'Добавить в корзину',
  added: '{name}: +{qty} единиц добавлено',
  removed: '{name}: удалён',
  cleared: 'Корзина очищена',
  outOfStock: '{name} - нет в наличии',
  insufficientStock: '{name} - недостаточное количество (доступно: {available})',
  limitedStock: '{name} - добавлено только {qty} (доступно: {available})',
  emptyCart: 'Корзина пуста',
  loginRequired: 'Войдите в систему для просмотра корзины',
  goToLogin: 'Перейти к входу'
} as const;

export const cartPage = {
  emptyTitle: 'Ваша корзина пуста',
  emptySubtitle: 'Добавьте товары из каталога, чтобы начать покупки',
  continueShopping: 'Перейти к покупкам',
  continue: 'Продолжить покупки',
  heading: 'Корзина',
  itemsCount: '{count} товаров',
  clear: 'Очистить корзину',
  orderSummary: 'Итого по заказу',
  productsLine: 'Товары ({count} шт.)',
  total: 'Общая сумма',
  emptyCart: 'Корзина пуста',
  checkout: 'Оформить заказ',
  loginForCheckout: 'Войдите в систему',
  loginForCheckoutSuffix: 'для оформления заказа',
  processingBatch: 'Обработка пакета {current} из {total}...',
  batchProcessingStart: 'Обработка крупного заказа ({total} частей)...',
  batchProcessingFallback: 'Повторная обработка заказа ({total} частей)...',
  batchProcessingSuccess: 'Успешный заказ',
  largeOrderNotice: {
    title: 'Крупный заказ',
    message: 'В вашем заказе {total} товаров. Он будет обработан по частям для оптимальной обработки.',
    extraLargeMessage: 'Очень крупный заказ. Обработка может занять несколько минут.'
  },
  size: 'Размер',
  color: 'Цвет'
} as const;
