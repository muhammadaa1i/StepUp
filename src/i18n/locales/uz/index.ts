import { brand } from './brand';
import { common } from './common';
import { home } from './home';
import { auth } from './auth';
import { product, productDetail } from './product';
import { cart, cartPage } from './cart';
import { payment } from './payment';
import { orders, ordersPage } from './orders';
import { profilePage } from './profile';
import { catalog } from './catalog';
import { errors, errorPage } from './errors';
import { offer, offerPage } from './offer';
import { footer } from './footer';
import { admin } from './admin/index';

export default {
  brand,
  common,
  home,
  auth,
  product,
  productDetail,
  cart,
  cartPage,
  payment,
  orders,
  ordersPage,
  profilePage,
  catalog,
  errors,
  errorPage,
  offer,
  offerPage,
  footer,
  admin
} as const;
