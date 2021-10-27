<template>
  <div class="bg-blue-grey-1">
    <div class="row q-mt-xs">
      <div class="col-12 col-sm-1 col-md-2 col-lg-3">
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6" style="padding-left:10px!important; padding-right:10px!important;">
          <q-btn size="sm" style="float:right!important; display:inline-block!important; font-size:12px!important;" class="q-p-xs" color="cyan-9" @click="modal()">
            NUEVO CLIENTE
          </q-btn>
      </div>
      <div class="col-12 col-sm-1 col-md-2 col-lg-3">
      </div>
    </div>
    <div class="row q-mt-xs" v-if="listaClientes.length > 0">

      <div class="col-12 col-sm-1 col-md-2 col-lg-3">
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6" style="padding-left:10px!important; padding-right:10px!important;">
        <q-table
          style="background: transparent !important;"
          :data="listaClientes"
          :columns="nombreColumnas"
          row-key="name"
          separator="cell"
          dense
          :pagination.sync="pagination"
          class=" q-mb-md text-black shadow-17"
        >
          <template v-slot:body="props">
            <q-tr class="bg-blue-grey-1" style="font-size:15px!important;" :props="props">
              <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="nombre" :props="props"> {{ props.row.nom }} </q-td>
              <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="direccion" :props="props"> {{ props.row.dir }} </q-td>
              <q-td style="font-size:13px!important;" class="text-center q-p-xs" key="fono" :props="props"> {{ props.row.fono }} </q-td>
              <q-td style="font-size:13px!important;" class="text-center q-p-xs" key="accion">
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
      <div class="col-12 col-sm-1 col-md-2 col-lg-3">
      </div>
    </div>

    <q-inner-loading v-if="listaClientes.length === 0 && mostrarCircular" :showing="true">
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
          <div class="row" style="padding: 0px 10px!important;">
            <div class="col-12" style="padding: 0px 5px!important;">
              <q-input v-model="form.nombre" label="Nombre Cliente" maxlength="20" :dense="true" type="text" clearable />
            </div>
          </div>

          <div class="row" style="padding: 0px 10px!important;">
            <div class="col-12" style="padding: 0px 5px!important;">
              <q-input v-model="form.direccion" id="nombreMercadoTxt" label="Dirección" :dense="true" type="text" style="font-size:12px!important;" @keyup.enter="guardar" clearable />
            </div>
          </div>

          <div class="row" style="padding: 0px 10px!important;">
            <div class="col-12" style="padding: 0px 5px!important;">
              <q-input @keyup="fonoCambio" v-model="form.fono" maxlength="9" label="Fono" :dense="true" type="text" style="font-size:12px!important;" clearable />
            </div>
          </div>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey-10" v-close-popup />
            <q-btn label="GUARDAR" color="blue-grey-10" @click="guardar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <ModalEliminar ref="modalEliminar"></ModalEliminar>
    </div>
  </div> 
</template>

<script>
import axios from 'axios'
import ModalEliminar from '../components/modalEliminar'
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
    ModalEliminar
  },
  data(){
    return{
      mostrarCircular: true,
      alert:false,
      listaRegistros:[],
      form:{
        nombre:'',
        direccion:'',
        fono:'',
        id:''
      },
      pagination: {
        sortBy: 'desc',
        descending: true,
        page: 1,
        rowsPerPage: 20
      },
      nombreColumnas:[
        { name: 'nombre', field: 'nombre', align: 'center', label: 'NOMBRE', headerClasses: 'bg-blue-9 text-white' },
        { name: 'direccion', field: 'direccion', align: 'center', label: 'DIRECCIÓN', headerClasses: 'bg-blue-9 text-white' },
        { name: 'fono', field: 'fono', align: 'center', label: 'FONO', headerClasses: 'bg-blue-9 text-white'},
        { name: 'accion', field: 'accion', align: 'center', label: 'ACCIÓN', headerClasses: 'bg-blue-9 text-white'}
      ]
    }
  },
  methods:{
    ...mapMutations(['setUsuario', 'setListaClientes', 'setNombrePagina']),
    async traerClientes(){
      try {
        let resp = await axios.get(`${this.url}traerClientes`, config);
        if(resp.data.icono){
          this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
          this.mostrarCircular = false;
        }
        else {
          this.setListaClientes(resp.data);
        }
      } catch (err) {
        this.showNotif("top", "El servidor no responde!", "error", "red-4", "black");
      }
    },
    modalEliminar(obj){
      this.$refs.modalEliminar.nombre = obj.nom
      this.$refs.modalEliminar.idCliente = obj._id
      this.$refs.modalEliminar.mostrar = true
    },
    modal(obj){
      if(obj){
        this.form.nombre = obj.nom;
        this.form.direccion = obj.dir;
        this.form.id = obj._id;
        this.form.fono = obj.fono;
      }
      else{
        this.form.nombre = '';
        this.form.direccion = '';
        this.form.fono = '';
        this.form.id = '';
      }
      this.alert = true
    },
    guardar(){
      if(this.form.nombre === ''){
        this.showNotif('top', "Debe ingresar un nombre!", "error", "yellow-14", 'black')
        return
      }
      axios.post(`${this.url}nuevoMercado`, this.form, config).then(function(resp){
        this.alert = !this.alert
        if(resp.status === 200){
          this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
          this.traerClientes()
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
    },
    fonoCambio: function(){
      let caracter = this.form.fono.substr(this.form.fono.length - 1, 1).charCodeAt();
      if(caracter < 48 || caracter > 57){
        this.form.fono = this.form.fono.substr(0, this.form.fono.length - 1);
      }
    }
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
    },
  },
  mounted(){
    const usuario = localStorage.getItem('usuario')
    if(usuario){
      this.setUsuario(usuario)
      this.traerClientes()
    }
    this.setNombrePagina('Clientes')
  },
  computed:{
   ...mapState(['usuario','url', 'nombrePagina', 'permisos', 'listaClientes']) 
  }
}
// var nv = nv.toLowerCase()
// var codigoAscii = nv.substr(nv.length - 1, 1).charCodeAt()
// if(codigoAscii < 97 || codigoAscii > 122){
//     if(codigoAscii < 48 || codigoAscii > 57){
//     if(codigoAscii < 65 || codigoAscii > 90){
//         if(codigoAscii != 95 && codigoAscii != 196 && codigoAscii != 250){
//         nv = nv.substr(0, nv.length - 1)
//         }
//     }
//     }
// }
// this.form.nombre = nv.split('').join('')
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