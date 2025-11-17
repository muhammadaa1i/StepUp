import { nav, header, common } from './common';
import { products } from './products';
import { users } from './users';
import { orders } from './orders';
import { refunds } from './refunds';
import { dashboard } from './dashboard';

export const admin = {
  nav,
  header,
  common,
  products,
  users,
  orders,
  refunds,
  dashboard
} as const;
