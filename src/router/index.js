import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


export default function (/* { store, ssrContext } */) {

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })



  var token = localStorage.getItem('token')
  Router.beforeEach((to, from, next) => {
    if (to.path != "/" && to.path != "/registro" && token === null) {
      next({ path: '/' })
    }
    else if ((to.path === '/' || to.path === '/registro') && token !== null) {
      next({ path: '/ventas' })
    }
    else {
      next()
    }
  })
  // Router.beforeEach((to, from, next) => {
  //   if (to.path != "/" && to.path != "/registro" && token === null) {
  //     next({ path: '/' })
  //   }
  //   else {
  //     next()
  //   }
  // })
  // Router.beforeEach((to, from, next) => {
  //   if ((to.path === '/' || to.path === '/registro') && token) {
  //     next({ path: '/entradas' })
  //   }
  //   else {
  //     next()
  //   }
  // })

  return Router
}
