import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/IndexView.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/OrderView.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue'),
      },
      {
        path: 'coupon',
        name: 'AdminCoupon',
        component: () => import('../views/AdminCoupon.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
