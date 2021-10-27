<template>



    <q-dialog v-model="mostrar">
      <q-card class="bg-blue-grey-10 q-pb-lg shadow-17" style="width:350px!important;">
        <q-card-section style="padding-top:5px!important;">
          <div class="text-h6 text-white non-selectable">Configurar Permisos</div>
        </q-card-section>

        <div class="row" style="padding: 0px 10px!important;">
          <q-card class="bg-blue-grey-7 q-ml-md q-mr-md shadow-17" style="width:100%!important;">
            <div class="col-12" style="padding: 0px 5px!important;">
              <q-toggle v-model="permisos[0]" checked-icon="check" color="teal-4" unchecked-icon="clear" label="Eliminar Entrada" class="text-white non-selectable" />
            </div>

            <div class="col-12" style="padding: 0px 5px!important;">
              <q-toggle v-model="permisos[1]" checked-icon="check" color="teal-4" unchecked-icon="clear" label="Editar Entrada" class="text-white non-selectable" />
            </div>
          </q-card>

          <q-card class="bg-blue-grey-7 q-ml-md q-mr-md q-mt-md shadow-17" style="width:100%!important;">
            <div class="col-12" style="padding: 0px 5px!important;">
              <q-toggle v-model="permisos[2]" checked-icon="check" color="teal-4" unchecked-icon="clear" label="Eliminar Mercado" class="text-white non-selectable" />
            </div>

            <div class="col-12" style="padding: 0px 5px!important;">
              <q-toggle v-model="permisos[3]" checked-icon="check" color="teal-4" unchecked-icon="clear" label="Editar Mercado" class="text-white non-selectable" />
            </div>
          </q-card>
        </div>
      </q-card>
    </q-dialog>



    
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
const config = {
  'Content-Type': 'application/json',
  headers: {
    'x-access-token': localStorage.getItem('token')
  }
}
export default {
  name: 'configuracion',
  data(){
    return{
      mostrar:false,
      mostrarBtn:false
    }
  },
  methods:{
    ...mapMutations(['setPermisos']),
    guardar(){
      axios.post(`${this.url}setPermisosUsuario`, this.permisos, config).then(function(resp){
        this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
        if(resp.status === 200){
          localStorage.setItem("p", JSON.stringify(this.permisos))
        }
      }.bind(this)).catch( function(err){
        this.showNotif('top', "El servidor no responde, no se pudo guardar!", "error", "red-4", 'black')
      }.bind(this))
    },
    showNotif (position, message, icon, color, textColor) {
      this.$q.notify({
          color,
          textColor,
          icon,
          message,
          position,
          multiLine: true,
          group: true,
          timeout: 2000,
          html: true,
          classes:'non-selectable'
          // avatar,
          // multiLine
      })
    }
  },
  computed:{
    ...mapState(['url', 'usuario', 'listadoTrades', 'nombrePagina', 'permisos'])
  },
  watch:{
    permisos(nv, ov){
      if(JSON.stringify(nv) === JSON.stringify([false, false, false, false])){
        this.mostrarBtn = true
      }
      else if(JSON.stringify(nv) === JSON.stringify([true, true, true, true])){
        this.mostrarBtn = false
      }
      this.guardar()
    }
  }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  font-size:14px!important;
}
input[type="date"]{
  padding-top: 18px!important;
}
input[type=number] { -moz-appearance:textfield; }
input[type=date] {  font-size:14px!important; }

.q-field__control, .q-field__native, .q-field__label {
  color: #FFF;
  font-size: 14px;
}
.horaFecha > div > div > div > .q-field__label{
  top: 2px!important;
}
.q-field__native{
  padding-bottom: 0px!important;
}
tr > th {
  font-size:15px!important;
}
div.q-table__bottom{
  background: #263238 !important;
}
span.q-table__bottom-item{
  color: #FFF;
}
</style>