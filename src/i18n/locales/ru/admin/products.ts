export const products = {
  title: 'Управление товарами',
  subtitle: 'Просмотр и управление товарами в каталоге',
  add: 'Добавить товар',
  table: {
    product: 'Товар',
    price: 'Цена',
    size: 'Размеры',
    status: 'Статус',
    actions: 'Действия'
  },
  pagination: {
    shown: 'Показано {count} из {total} товаров'
  },
  empty: {
    title: 'Товары не найдены',
    subtitle: 'Попробуйте изменить параметры поиска или добавьте новый товар'
  },
  status: {
    active: 'Активный',
    inactive: 'Неактивный'
  },
  dialogs: {
    deleteTitle: 'Удалить товар: {name}?',
    deleteMessage: 'Вы уверены, что хотите удалить "{name}"? Это действие нельзя отменить.'
  },
  deleteConfirm: {
    title: 'Удалить товар',
    message: 'Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить.',
    confirm: 'Удалить'
  },
  form: {
    createTitle: 'Создать товар',
    editTitle: 'Редактировать товар',
    fields: {
      name: 'Название',
      namePlaceholder: 'Введите название',
      price: 'Цена',
      quantity: 'Количество',
      size: 'Размеры',
      sizePlaceholder: 'Например 36-40',
      active: 'Активный товар'
    },
    buttons: {
      saving: 'Сохранение...',
      update: 'Обновить',
      create: 'Создать'
    }
  },
  images: {
    section: 'Изображения (опционально)',
    single: 'Одно изображение',
    multiple: 'Несколько изображений',
    recommendation: 'Рекомендуется: изображения до 2МБ. Большие файлы будут автоматически сжаты.',
    selectedFiles: 'Выбрано файлов: {count}',
    uploading: 'Загрузка изображений...',
    willUploadAfterCreate: 'Изображения будут загружены после создания товара.',
    current: 'Текущие изображения',
    loading: 'Загрузка...',
    none: 'Нет сохранённых изображений',
    primaryBadge: 'Основное',
    removeImageAria: 'Удалить изображение',
    addingHint: 'Новые файлы выше будут добавлены — чтобы заменить, удалите лишние и загрузите новые.',
    progress: '{current} / {total}',
    deleteConfirmTitle: 'Удалить изображение',
    deleteConfirmMessage: 'Удалить это изображение?',
    deleteSuccess: 'Изображение удалено',
    deleteError: 'Ошибка удаления изображения',
    uploadSingleSuccess: 'Изображение загружено ({field})',
    uploadAllSuccess: 'Все изображения загружены',
    uploadError: 'Ошибка загрузки изображений',
    setPrimarySuccess: 'Основное изображение установлено',
    setPrimaryError: 'Ошибка установки основного изображения'
  },
  toasts: {
    loadError: 'Ошибка загрузки товаров',
    deleteSuccess: 'Товар успешно удален',
    deleteAlreadyRemoved: 'Товар уже был удален',
    deleteError: 'Ошибка удаления товара',
    saveError: 'Ошибка сохранения товара',
    updateSuccess: 'Товар обновлен',
    createSuccess: 'Товар создан',
    statusUpdateSuccess: 'Статус товара обновлен',
    statusUpdateError: 'Ошибка обновления статуса'
  }
} as const;
