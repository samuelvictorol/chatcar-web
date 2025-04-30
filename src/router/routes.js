
const routes = [
  {
    path: '/chatcar_admin',
    component: () => import('layouts/AdminLayout.vue'),
  },
  {
    path: '',
    component: () => import('layouts/LandingLayout.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/:login',
    component: () => import('src/layouts/ChatVitrineLayout.vue'),
  },
  {
    path: '/loja',
    component: () => import('layouts/LojaLayout.vue'),
    children: [
      { path: '', component: () => import('pages/loja/IndexPage.vue') },
      { path: 'leads', component: () => import('pages/loja/LeadsPage.vue') },
      { path: 'estoque', component: () => import('pages/loja/EstoquePage.vue') },
      { path: 'ajuda', component: () => import('pages/loja/AjudaPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
