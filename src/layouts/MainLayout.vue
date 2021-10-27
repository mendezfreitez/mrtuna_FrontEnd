<template>
  <q-layout>
    <q-layout view="hHh Lpr lff">
      <!-- <q-header elevated class="bg-blue-grey-10 q-electron-drag"> -->
      <q-header elevated class="bg-teal-7 q-electron-drag">
        <q-toolbar> 
          <q-btn flat dense round icon="menu" size="lg" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />
            <span class="text-h6 q-ml-sm">{{nombrePagina}}</span>
            <q-space></q-space>
            <q-btn-dropdown color="blue-8" push no-caps style="display:inline-block!important; float:right!important;">
              <template v-slot:label>
                <div class="row items-center no-wrap">
                  <q-icon left name="person" />
                  <div class="text-center" style="font-size:14px;"> {{usuario}} </div>
                </div>
              </template>

              <q-list :class="{'alto1':accesoAdmin == 1, 'alto2': accesoAdmin == 0 }">
                <q-item clickable v-close-popup @click="cerrarSession" class="bg-blue-8 text-white" style="border-bottom: 3px solid rgba(0,0,0,0.15);">
                  <q-item-section>
                    <q-item-label style="display:inline-block!important;" class="text-bold non-selectable">Cerrar Sessión</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="power_settings_new" color="blue-grey-1" />
                  </q-item-section>
                </q-item>

                <q-item to="permisos" v-if="accesoAdmin == 1" clickable v-close-popup class="bg-blue-8 text-white" style="border-bottom: 3px solid rgba(0,0,0,0.15);">
                  <q-item-section>
                    <q-item-label style="display:inline-block!important;" class="text-bold non-selectable">Permisos</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="manage_accounts" color="blue-grey-1" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
        </q-toolbar>
      </q-header>

      <q-drawer
        :value="true"
        v-model="leftDrawerOpen"
        :width="250"
        :breakpoint="1300"
        id="idDrawer"
        content-class="bg-blue-grey-10 text-white"
      >
      
        <q-list>
          <q-item style="padding-bottom:0px!important;padding-top:14px!important;">
            <p class="text-center" style="font-size:18px!important; margin-bottom:0px!important;">Menú</p>
          </q-item>
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" :to="link.to" />
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <ModalConfig ref="modalConfig"></ModalConfig>
    </q-layout>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import ModalConfig from '../components/configuracion.vue'
// import BarraSuperior from 'components/BarraSuperior.vue'

  /////////////////////////////////////////////////////////////////////////
 ////////////// NO VAYAS A BORRAR ESTO DE ABAJO, SUBNORMAL ///////////////
/////////////////////////////////////////////////////////////////////////
const linksData = [
  {
    title: 'Mis Productos',
    caption: 'quasar.dev',
    icon: 'list',
    link:'/productos',
  },
  {
    title: 'Listado de Ventas',
    caption: 'github.com/quasarframework',
    icon: 'list_alt',
    link:'/ventas',
  },
  // {
  //   title: 'Mis estadísticas',
  //   caption: 'github.com/quasarframework',
  //   icon: 'bar_chart',
  //   link:'/estadisticas',
  // },
  {
    title: 'Mis Clientes',
    caption: 'github.com/quasarframework',
    icon: 'supervised_user_circle',
    link:'/clientes',
  },
  {
    title: 'Repartidores',
    caption: 'github.com/quasarframework',
    icon: 'local_shipping',
    // icon: 'delivery_dining',
    link:'/repartidores',
  },
]

import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  components: { EssentialLink, ModalConfig },
  data () {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData,
      accesoAdmin: 0
    }
  },
  methods:{
    ...mapMutations(['setPermisos']),
    cerrarSession(){
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      localStorage.removeItem('p')
      this.$router.go('/')
      location.reload() //-----------> ESTA LINEA SE PUEDE COMENTAR PARA VERSIONES WEB... PARA VERSION "ELECTRON" DEBE ESTAR FUNCIONAL(((OBLIGATORIO)))
    },
    modalConfig(){
      this.$refs.modalConfig.mostrar = true
    }
  },
  computed:{
    ...mapState(['usuario', 'nombrePagina'])
  },
  mounted(){
    this.accesoAdmin = localStorage.getItem('p')
  }
}
</script>

<style>
div.q-menu.q-position-engine{
  margin-top: 2px!important;
  border-radius: 7px;
  padding: 0px;
}
#idDrawer > aside{
  background-size: cover!important;
  background-repeat:no-repeat!important;
  background-position:center!important;
  background-image: url('../assets/img/sidebar2.jpg')!important;
}
aside.q-drawer > div.q-drawer__content {
      background: #1f262991 !important;
}
.alto1{
  height: 96px!important;
}
.alto2{
  height: 48px!important;
}
</style>