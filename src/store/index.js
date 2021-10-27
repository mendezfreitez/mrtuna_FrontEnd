import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // modules: {

    // },
    // strict: process.env.DEBUGGING
    state: {
      // url: 'http://localhost:3000/',         // LOCAL
      // url: 'https://mr-tuna.uc.r.appspot.com/', // PRODUCCIÓN
      url: 'https://mrtuna.herokuapp.com/',     //VOLVI A HEROKU PORQUE LA GENTE DE GOOGLE ME COBRA JAJAJA XD
      usuario: '',
      listaMercados:[],
      listaMercados_:[],
      listadoTrades:[],
      listaClientes: [],
      listaRepartidores:[],
      permisos:[],
      nombrePagina:'',
      sumaCant: [],
      listaResumen: []
    },
    mutations: {
      setUsuario(state, _usuario) {
        state.usuario = _usuario;
      },
      setListaResumen(state, lista) {
        state.listaResumen = lista;
      },
      setlistaMercadosByFiltro(state, lista){
        state.listaMercados = [];
        state.listaMercados = lista;

        var cant_subt = [0.0, 0.0];
        lista.forEach((el) => {
          el.prods.forEach((ell) => {
            cant_subt[0] += parseFloat(ell.cant);
          });
          cant_subt[1] += parseFloat(el.tot);
        });
        state.sumaCant[0] =  ((cant_subt[0]) / 1000).toFixed(2) * 1000;
        state.sumaCant[1] =  ((cant_subt[1]) / 1000).toFixed(2) * 1000;
      },
      setListaMercados(state, lista) {
        state.listaMercados = []
        state.listaMercados_ = []
        state.listaMercados = lista
        state.listaMercados_ = lista

        var cant_subt = [0.0, 0.0];
        lista.forEach((el) => {
          el.prods.forEach((ell) => {
            cant_subt[0] += parseFloat(ell.cant);
          });
          cant_subt[1] += parseFloat(el.tot);
        });
        state.sumaCant[0] =  ((cant_subt[0]) / 1000).toFixed(2) * 1000;
        state.sumaCant[1] =  ((cant_subt[1]) / 1000).toFixed(2) * 1000;

        setTimeout(() => {
          try {
            document.getElementById('tablaVentas').style.height = `${window.innerHeight - 88}px`
          } catch (error) { }
        }, 2500)
      },
      setNombrePagina(state, nombre) {
        state.nombrePagina = nombre
      },
      setListaTrades(state, lista) {
        state.listadoTrades = lista
      },
      setPermisos(state, permisos) {
        state.permisos = permisos
      },
      setListaClientes(state, lista) {
        state.listaClientes = lista
      },
      setRepartidores(state, lista) {
        state.listaRepartidores = lista
      }
    }
  })

  return Store
}
