export const errors = {
  serverUnavailable: 'Сервер временно недоступен',
  serverUnavailableLong: 'Сервер временно недоступен. Попробуйте позже.',
  serverUnavailableRetry: 'Сервер временно недоступен. Попробуйте обновить страницу через несколько минут.',
  categoriesLoad: 'Ошибка загрузки категорий',
  badGateway: 'Ошибка шлюза сервера',
  badGatewayLong: 'Ошибка подключения к серверу. Попробуйте позже.',
  serverError: 'Ошибка сервера',
  serverErrorLong: 'Ошибка сервера. Попробуйте позже.',
  tooManyRequests: 'Слишком много запросов',
  tooManyRequestsLong: 'Слишком много запросов. Подождите немного и попробуйте снова.',
  productsLoad: 'Ошибка загрузки товаров',
  ordersLoad: 'Ошибка загрузки заказов',
  default: 'Произошла ошибка. Попробуйте позже.'
} as const;

export const errorPage = {
  default: {
    title: 'Что-то пошло не так',
    description: 'Произошла неизвестная ошибка. Попробуйте позже или обратитесь в поддержку.'
  },
  suggestions: {
    title: 'Что можно попробовать:',
    refresh: 'Попробуйте обновить страницу',
    checkConnection: 'Проверьте соединение с интернетом',
    contactSupport: '',
    tryLater: 'Попробуйте позже',
    waitFewMinutes: 'Подождите 2–3 минуты и попробуйте снова',
    slower: 'Попробуйте взаимодействовать с сайтом медленнее',
    refreshInMinute: 'Обновите страницу через минуту'
  },
  retry: 'Попробовать снова',
  goHome: 'Вернуться на главную',
  statusCode: 'Код ошибки'
} as const;
