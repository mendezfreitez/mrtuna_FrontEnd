<template>
  <div class="bg-blue-grey-1">
    <div class="row q-mt-xs">
      <div class="col-12 col-sm-1 col-md-2 col-lg-4"> 
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-4" style="padding-left:10px!important; padding-right:10px!important;">
        <q-btn size="sm" style="float:right!important; display:inline-block!important; font-size:12px!important;" class="q-p-xs" color="cyan-9" @click="modal()">
          NUEVO REPARTIDOR
        </q-btn>
      </div>
      <div class="col-12 col-sm-1 col-md-2 col-lg-4">
      </div>
    </div>
    <div class="row q-mt-xs" v-if="listaRepartidores.length > 0">
      <div class="col-12 col-sm-1 col-md-2 col-lg-4">
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-4" style="padding-left:10px!important; padding-right:10px!important;">
        <q-table
          style="background: transparent !important;"
          :data="listaRepartidores"
          :columns="nombreColumnas"
          row-key="nombre"
          separator="cell"
          dense
          :pagination.sync="pagination"
          class=" q-mb-md text-black shadow-17"
        >
          <template v-slot:body="props">
            <q-tr class="bg-blue-grey-1" style="font-size:15px!important;" :props="props">
              <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="nombre" :props="props"> {{ props.row.nom }} </q-td>
              <!-- <q-td style="font-size:15px!important;" class="text-left q-p-xs" key="direccion" :props="props"> {{ props.row.direccion }} </q-td> -->
              <q-td style="font-size:15px!important;" class="text-center q-p-xs" key="accion">
                <q-btn round flat padding="none" icon="delete" size="14px" class="" color="blue-grey-10 q-mr-sm" @click="modalEliminar(props.row)" />
                <q-btn round flat padding="none" icon="edit" size="14px" color="blue-grey-10" @click="modal(props.row)" />
              </q-td>  
            </q-tr>
          </template>

          <template class="non-selectable bg-primary" v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 2" icon="first_page" class="text-white" square dense flat :disable="scope.isFirstPage" @click="scope.firstPage" />
            <q-btn icon="chevron_left" class="text-white" square dense flat :disable="scope.isFirstPage" @click="scope.prevPage" />
            <q-btn icon="chevron_right" class="text-white" square dense flat :disable="scope.isLastPage" @click="scope.nextPage" />
            <q-btn v-if="scope.pagesNumber > 2" icon="last_page" class="text-white" square dense flat :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>
        </q-table>
      </div>
      <div class="col-12 col-sm-1 col-md-2 col-lg-4">
      </div>
    </div>

    <q-inner-loading v-if="listaRepartidores.length === 0 && mostrarCircular" :showing="true">
      <q-circular-progress
        indeterminate
        size="75px"
        :thickness="1"
        color="teal-6"
        center-color="blue"
        class="q-ma-md"
      />
    </q-inner-loading>

    <div>
      <q-dialog v-model="alert">
        <q-card style="width:300px!important;" class="bg-cyan-9 q-pt-xs">
          <!-- <q-card-section  style="padding-top:5px!important;">
            <div class="text-h6 text-white">{{tituloModal}}</div>
          </q-card-section> -->

          <div class="row" style="padding: 0px 10px!important;">
            <div class="col-12" style="padding: 0px 5px!important;">
              <q-input v-model="form.nombre" maxlength="20" label="Nombre" :dense="true" type="text" clearable @keyup.enter="guardar" />
            </div>
          </div>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey-10" v-close-popup />
            <q-btn label="GUARDAR" color="blue-grey-10" @click="guardar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <ModalEliminarRepartidor ref="modalEliminarRepartidor"></ModalEliminarRepartidor>
    </div>
  </div> 
</template>

<script>
import axios from 'axios'
import ModalEliminarRepartidor from '../components/modalEliminarRepartidor'
import { mapState, mapMutations } from 'vuex'
const config = {
  'Content-Type': 'application/json',
  headers: {
    'x-access-token': localStorage.getItem('token')
  }
}
export default {
  name: 'PageIndex',
  components:{
    ModalEliminarRepartidor
  },
  data(){
    return{
      mostrarCircular: true,
      tituloModal:'',
      alert:false,
      listaRegistros:[],
      form:{
        nombre:'',
        // direccion:'',
        id:''
      },
      pagination: {
        sortBy: 'desc',
        descending: true,
        page: 1,
        rowsPerPage: 15
      },
      nombreColumnas:[
        { name: 'nombre', field: 'nombre', align: 'center', label: 'NOMBRE', headerClasses: 'bg-blue-9 text-white' },
        { name: 'accion', field: 'accion', align: 'center', label: 'ACCIÓN', headerClasses: 'bg-blue-9 text-white'}
      ]
    }
  },
  methods:{
    ...mapMutations(['setUsuario', 'setListaMercados', 'setNombrePagina', 'setRepartidores']),
    async traerRepartidores() {
      try {
        let resp = await axios.get(`${this.url}traerRepartidores`, config);
        if(resp.data.icono){
          this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
          this.mostrarCircular = false;
        }
        else{
          this.setRepartidores(resp.data);
        }
      } catch (err) {
        this.showNotif("top", "El servidor no responde!", "error", "red-4", "black");
      }
    },
    modalEliminar(obj){
      this.$refs.modalEliminarRepartidor.nombre = obj.nom
      this.$refs.modalEliminarRepartidor.idRepartidor = obj._id
      this.$refs.modalEliminarRepartidor.mostrar = true
    },
    modal(obj){
      if(obj){
        this.form.nombre = obj.nom
        this.form.id = obj._id
      }
      else{
        this.form.nombre = ''
        this.form.id = ''
      }
      this.alert = true
    },
    async guardar(){
      if(this.form.nombre === ''){
        this.showNotif('top', "Debe ingresar un nombre!", "error", "yellow-14", 'black')
        return
      }
      
      try {
        let resp = await axios.post(`${this.url}repartidores`, this.form, config);  
        this.alert = !this.alert
        if(resp.status === 200){
          this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
          this.traerRepartidores();
        }
      } catch (err) {
        this.showNotif('top', "El servidor no responde, no se pudo guardar!", "error", "red-4", 'black')
      }
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
   ...mapState(['usuario','url', 'nombrePagina', 'permisos', 'listaMercados', 'listaRepartidores']) 
  },
  watch:{
    'form.nombre': function(nv, ov){
      if(nv !== null && nv !== ''){
        function capitalize(nv) {
          return nv.charAt(0).toUpperCase() + nv.slice(1).toLowerCase()
        }
        this.form.nombre = nv.split(' ').map(capitalize).join(' ')
      }
      else{
        this.form.nombre = ''
      }
    },
    'form.direccion': function(nv, ov){
      if(nv === null){
        this.form.direccion = ''
      }
    }
  },
  mounted(){
    const usuario = localStorage.getItem('usuario')
    if(usuario){
      this.setUsuario(usuario)
      this.setNombrePagina('Repartidores')
      this.traerRepartidores()
    }
  }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
}
 
input[type=number] { -moz-appearance:textfield; }

.q-field__control, .q-field__native, .q-field__label, .valorPuntoTxt {
  color: #9da6b0;
  color: #d8e7f7;
}
div.q-table__bottom{
  background: #1565c0 !important;
}
</style>