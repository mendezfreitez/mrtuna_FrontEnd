
const routes = [
  {
    path: '/',
    component: () => import('layouts/landingPage.vue')
  },
  {
    path: '/registro',
    component: () => import('layouts/registro.vue')
  },
  {
    path: '/productos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/estadisticas',
        component: () => import('pages/estadisticas.vue')
      },
      {
        path: '/ventas',
        component: () => import('pages/ventas.vue')
      },
      {
        path: '/permisos',
        component: () => import('pages/permisos.vue')
      },
      {
        path: '/clientes',
        component: () => import('src/pages/clientes.vue')
      },
      {
        path: '/repartidores',
        component: () => import('pages/repartidores.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  // {
  //   path: '/estadisticas',
  //   component: () => import('pages/estadisticas.vue')
  // }
]

export default routes
