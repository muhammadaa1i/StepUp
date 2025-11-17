export const dashboard = {
  title: 'Administrator paneli',
  welcome: 'Internet do\'kon boshqaruv paneliga xush kelibsiz',
  loadError: 'Statistikani yuklashda xato',
  stats: {
    totalUsers: 'Jami foydalanuvchilar',
    totalProducts: 'Jami mahsulotlar',
    totalOrders: 'Jami buyurtmalar',
    pendingOrders: 'Kutilayotgan buyurtmalar'
  },
  quickActions: {
    title: 'Tezkor amallar',
    products: { title: 'Mahsulotlarni boshqarish', subtitle: 'Mahsulotlarni qo\'shish, tahrirlash' },
    orders: { title: 'Buyurtmalarni boshqarish', subtitle: 'Buyurtmalarni ko\'rish va qayta ishlash' },
    users: { title: 'Foydalanuvchilarni boshqarish', subtitle: 'Foydalanuvchilarni ko\'rish' }
  }
} as const;
