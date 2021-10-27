<template>
    <div  class="bg-blue-grey-1">
      <div class="row q-mt-xs" v-if="listadoTrades.length > 0">
        <div class="col-12 col-md-1 col-sm-1"></div>
        <div class="col-12 col-md-10 col-sm-10 q-mb-xs" style="padding-left:10px!important; padding-right:10px!important;">
          <q-btn style="float:right!important; display:inline-block!important; height:30px!important; font-size:12px!important;" class="q-p-xs" color="cyan-9" @click="modal()">
            NUEVO PRODUCTO
          </q-btn>
          <q-input bg-color="blue-7" standout="bg-light-blue-10" style="display:inline-block; float:right!important;" class="txtFiltrar q-mt-none text-grey-10 q-mr-xs q-pr-none" dense debounce="0" v-model="filter" placeholder="BÚSQUEDA" >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-1 col-sm-1"></div>
      </div>

      <div class="row" v-if="listadoTrades.length > 0">
        <div class="col-12 col-md-1 col-sm-1"></div>
        <div class="col-12 col-md-10 col-sm-10" style="padding-left:10px!important; padding-right:10px!important;">
          <q-table
            style="background: transparent !important;"
            :data="listadoTrades"
            :columns="nombreColumnas"
            row-key="name"
            separator="cell"
            no-data-label="NO SE HA CARGADO LA DATA!"
            no-results-label="NO SE ENCONTRARON RESULTADOS!"
            :filter="filter"
            dense
            :pagination.sync="pagination"
            class="q-mb-md text-black shadow-17"
          >

          <template v-slot:header>
            <tr>
              <th class="bg-blue-9 text-white">NEMO</th>
              <th class="bg-blue-9 text-white">PRODUCTO</th>
              <th class="bg-blue-9 text-white">TIPO</th>
              <th class="bg-blue-9 text-white">PRECIO</th>
              <th class="bg-blue-9 text-white">COSTO</th>
              <th class="bg-blue-9 text-white" style="width:50px;">CANT</th>
              <th class="bg-blue-9 text-white" style="width:50px;">STOCK</th>
              <th class="bg-blue-9 text-white">UTILIDAD</th>
              <th class="bg-blue-9 text-white">{{txtCabecera.toUpperCase()}}</th>
              <th class="bg-blue-9 text-white">ACCIÓN</th>
            </tr>
          </template>

            <template v-slot:body="props">
              <q-tr class="bg-blue-grey-1" style="font-size:15px!important;" :props="props">
                <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="nemo" :props="props"> {{ props.row.nemo }} </q-td>
                <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="producto" :props="props"> {{ props.row.nom }} </q-td>
                <q-td style="font-size:13px!important;" class=" q-p-xs" key="tipo" :props="props">{{ props.row.tipo }}</q-td>
                <q-td style="font-size:13px!important;" class="text-right q-p-xs" key="precio" :props="props.prec">{{ parseFloat(props.row.prec).toFixed(2) | currency }}</q-td> 
                <q-td style="font-size:13px!important;" class="text-right q-p-xs" key="costo" :props="props.cost">{{ parseFloat(props.row.cost).toFixed(2) | currency }}</q-td> 
                <q-td style="font-size:13px!important;" class="text-center q-p-xs" key="cantidad" :props="props.cant">{{ props.row.cant }}</q-td> 
                <q-td style="font-size:13px!important;" class="text-center q-p-xs stockCelda" key="stk" :props="props.stk" @click="editarStock(props.row)">{{ props.row.stk }}</q-td> 
                <q-td style="font-size:13px!important;" class="text-right q-p-xs" key="utilidad" :props="props.utilidad">{{ (parseFloat(props.row.prec) - parseFloat(props.row.cost)).toFixed(2) | currency }}</q-td>
                
                <q-td v-if="parseFloat(props.row.comi) <= 20" style="font-size:13px!important;" class="text-center bg-red-5 q-p-xs" key="comision" :props="props.comi">{{ (parseFloat(props.row.comi)).toFixed(0) }}%</q-td>
                <q-td v-else-if="parseFloat(props.row.comi) > 20 && parseFloat(props.row.comi) <= 35" style="font-size:13px!important;" class="text-center bg-yellow-5 q-p-xs" key="comision" :props="props.comi">{{ (parseFloat(props.row.comi)).toFixed(0) }}%</q-td>
                <q-td v-else-if="parseFloat(props.row.comi) > 35 && parseFloat(props.row.comi) <= 50" style="font-size:13px!important;" class="text-center bg-blue-5 q-p-xs" key="comision" :props="props.comi">{{ (parseFloat(props.row.comi)).toFixed(0) }}%</q-td>
                <q-td v-else-if="parseFloat(props.row.comi) > 50" style="font-size:13px!important;" class="text-center bg-green-5 q-p-xs" key="comision" :props="props.comi">{{ (parseFloat(props.row.comi)).toFixed(0) }}%</q-td>

                <q-td style="font-size:13px!important;" class="text-center q-p-xs">
                  <q-btn round flat padding="none" icon="delete" size="14px" class="" color="blue-grey-10 q-mr-sm" @click="modalEliminar(props.row.nemo, props.row._id)" />
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
        <div class="col-12 col-md-1 col-sm-1"></div>
      </div>

      <q-inner-loading v-else :showing="true">
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
          <q-card style="width:350px!important;" class="bg-cyan-9 q-pt-xs">
            <div class="row" style="padding: 0px 10px!important;">
              <div class="col-12" style="padding: 0px 5px!important;">
                <q-input class="mayuscula" v-model="form.nemo" label="NEMO" :dense="true" type="text" clearable />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 5px!important;">
                <q-input class="mayuscula" v-model="form.producto" label="PRODUCTO" :dense="true" type="text" clearable />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 3px!important;">
                <q-select style="font-size:14px!important;" v-model="form.tipoProducto" :options="opciones" label="TIPO" :dense="true" clearable />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 5px!important;">
                <q-input v-model="form.precio" label="PRECIO" :dense="true" type="number" clearable />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 5px!important;">
                <q-input v-model="form.costo" label="COSTO" :dense="true" type="number" clearable />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 5px!important;">
                <q-input v-model="form.utilidad" label="UTILIDAD" :dense="true" type="number" readonly />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 5px!important;">
                <q-input v-model="form.cantidad" label="CANTIDAD" :dense="true" type="number" clearable />
              </div>
              <div class="col-12 q-mt-sm" style="padding: 0px 5px!important;">
                <q-input v-model="form.porcComision" readonly label="% COMISIÓN" :dense="true" type="number" />
              </div>
            </div>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="grey-10" v-close-popup />
              <q-btn label="GUARDAR" color="blue-grey-10" text-color="blue-grey-1" @click="guardar" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    <ModalEliminar ref="modalEliminar"></ModalEliminar>
    <ModalEditarStock ref="modalEditarStock"/>
  </div> 
</template>

<script>
import axios from 'axios'
import ModalEditarStock from '../components/modals/modalEditarStock'
import ModalEliminar from '../components/modalEliminarTrade'
import {mapState, mapMutations} from 'vuex'
const config = {
  'Content-Type': 'application/json',
  headers: {
    'x-access-token': localStorage.getItem('token')
  }
}
export default {
  name: 'PageIndex',
  components:{
    ModalEliminar, ModalEditarStock
  },
  data(){
    return{
      txtCabecera:'sdfsdf',
      filter:'',
      tituloModal:'Nuevo Producto',
      pagination: {
        sortBy: 'desc',
        descending: true,
        page: 1,
        rowsPerPage: 15
      },
      date:'',
      alert:false,
      opciones:['PESCADOS', 'CAMARONES', 'MARISCOS'],
      form:{
        nemo:'',
        producto:'',
        tipoProducto: '',
        precio:'',
        costo: '',
        utilidad:0,
        cantidad:1,
        porcComision:0,
        id:'',
        stk: 0
      },
      listaMercados:[],
      total:0,
      colorTotal:'bg-teal-4',
      nombreColumnas:[
        { name: 'nemo', field: 'nemo', align: 'center', label: 'NEMO', headerClasses: 'bg-blue-9 text-white' },
        { name: 'producto', field: 'producto', align: 'center', label: 'Producto', headerClasses: 'bg-blue-9 text-white', field: row => row.nom },
        { name: 'tipo', field: 'tipo', align: 'center', label: 'Tipo', headerClasses: 'bg-blue-9 text-white', field: row => row.nom },
        { name: 'precio', field: 'urecio', align: 'center', label: 'Precio', headerClasses: 'bg-blue-9 text-white' },
        { name: 'costo', field: 'costo', align: 'center', label: 'Costo', headerClasses: 'bg-blue-9 text-white' },
        { name: 'cantidad', field: 'cantidad', align: 'center', label: 'Cantidad', headerClasses: 'bg-blue-9 text-white' },
        { name: 'stock', field: 'stock', align: 'center', label: 'Stock', headerClasses: 'bg-blue-9 text-white' },
        { name: 'utilidad', field: 'utilidad', align: 'center', label: 'Utilidad', headerClasses: 'bg-blue-9 text-white' },
        { name: 'comision', field: 'comision', align: 'center', label: this.txtCabecera, headerClasses: 'bg-blue-9 text-white q-pa-none' },
        { name: 'accion', field: 'accion', align: 'center', label: 'Acción', headerClasses: 'bg-blue-9 text-white'},
      ],
    }
  },
  methods:{
    ...mapMutations(['setUsuario', 'setListaMercados', 'setListaTrades', 'setNombrePagina', 'setPermisos']),
    guardar(){
      if(this.form.nemo === ""){
        this.showNotif('top', "Debe ingresar un NEMO!", "error", "yellow-14", 'black'); return;
      }
      else if(this.form.producto === ""){
        this.showNotif('top', "Debe ingresar un NOMBRE!", "error", "yellow-14", 'black'); return;
      }
      else if(this.form.tipoProducto === ""){
        this.showNotif('top', "Debe seleccionar TIPO PRODUCTO!", "error", "yellow-14", 'black'); return;
      }
      else if(this.form.precio === ""){
        this.showNotif('top', "Debe seleccionar un PRECIO!", "error", "yellow-14", 'black'); return;
      }
      else if(this.form.costo === ""){
        this.showNotif('top', "Debe ingresar una COSTO!", "error", "yellow-14", 'black'); return;
      }
      else if(this.form.porcComision === ""){
        this.showNotif('top', "Debe ingresar COMISIÓN!", "error", "yellow-14", 'black'); return;
      }
      else if(this.form.utilidad < 0){
        this.showNotif('top', "La UTILIDAD no puede ser negativa, revise los valores DE PRECIO y COSTO", "error", "red-5", 'black'); return;
      }
      axios.post(`${this.url}productos`, this.form, config).then(function(resp){
        this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
        if(resp.data.icono === 'check_circle_outline'){
          this.alert = !this.alert
          this.traerProductos()
        }
      }.bind(this)).catch( function(err){
        this.showNotif('top', "El servidor no responde, no se pudo guardar!", "error", "red-4", 'black')
      }.bind(this))
    },
    editarStock(obj){
      this.$refs.modalEditarStock.desactivaGuardar = true;
      this.$refs.modalEditarStock.obj = obj;
      this.$refs.modalEditarStock.totalStock = obj.stk;
      this.$refs.modalEditarStock.mostrar = true;
    },
    modalEliminar(nemo, idProducto){
      this.$refs.modalEliminar.mostrar = true
      this.$refs.modalEliminar.idTrade = idProducto
      this.$refs.modalEliminar.nemo = nemo
    },
    modal(obj){
      if(obj){
        this.tituloModal = 'Edición producto'
        this.form.nemo = obj.nemo
        this.form.producto = obj.nom
        this.form.tipoProducto = obj.tipo
        this.form.precio = obj.prec
        this.form.costo = obj.cost
        this.form.cantidad = obj.cant
        this.form.porcComision = obj.comi
        this.form.id = obj._id
      }
      else{
        this.tituloModal = 'Nuevo producto'
        this.form.nemo = ''
        this.form.producto = ''
        this.form.tipoProducto = ''
        this.form.precio = ''
        this.form.costo = ''
        this.form.cantidad = 1
        this.form.porcComision = 0
        this.form.id = ''
      }
      this.alert = !this.alert
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
    traerProductos(){
      axios.get(`${this.url}listaProductos`, config).then(function(resp){
        this.setListaTrades(resp.data)
      }.bind(this)).catch(function(err){
        this.showNotif('top', "El servidor no responde!", "error", "red-4", 'black')
      }.bind(this))
    },
    traerListaMercados(){
      this.listaMercados = []
      axios.get(`${this.url}listadoMercados`, config).then(function(resp){
        resp.data.map(function(el){
          this.listaMercados.push({'label':el.nombre, value:{'valTick':el.valorTick, 'ticksPunto': el.ticksPorPunto }})
        }.bind(this))
      }.bind(this)).catch( function(err){
        this.showNotif('top', "El servidor no responde!", "error", "red-4", 'black')
      }.bind(this))
    },
    calcularTotal(){
      this.total = 0
      this.listadoTrades.map(function(t){
        if(t.tipoEntrada === 'COMPRA'){
          this.total += parseFloat((parseFloat((t.nroContratos * (t.precioSalida.toFixed(2) - t.precioEntrada.toFixed(2))).toFixed(2)) / ((1 / (t.mercado.value.ticksPunto).toFixed(2))) * (t.mercado.value.valTick).toFixed(2)).toFixed(2))
        }
        else{
         this.total += parseFloat((parseFloat((t.nroContratos * (t.precioEntrada.toFixed(2) - t.precioSalida.toFixed(2))).toFixed(2)) / ((1 / (t.mercado.value.ticksPunto).toFixed(2))) * (t.mercado.value.valTick).toFixed(2)).toFixed(2))
        }
      }.bind(this))
      this.colorTotal = this.total > 0 ? 'bg-teal-4' : 'bg-red-4'
    }
  },
  computed:{
    ...mapState(['url', 'usuario', 'listadoTrades', 'nombrePagina', 'permisos'])
  },
  watch:{
    'form.precio': function(nv, ov){
      this.form.utilidad = parseFloat(nv).toFixed(2) - parseFloat(this.form.costo)
      this.form.porcComision = ((parseFloat(this.form.utilidad).toFixed(2) / parseFloat(nv).toFixed(2)) * 100).toFixed(0)
    },
    'form.costo': function(nv, ov){
      this.form.utilidad = parseFloat(this.form.precio).toFixed(2) - parseFloat(nv)
      this.form.porcComision = ((parseFloat(this.form.utilidad).toFixed(2) / parseFloat(this.form.precio).toFixed(2)) * 100).toFixed(0)
    }
  },
  mounted(){
    const usuario = localStorage.getItem('usuario')
    
    if(usuario){
      this.setUsuario(usuario)
      this.traerProductos()
    }
    this.setNombrePagina('Productos')
    localStorage.getItem('p') == 1 ? this.txtCabecera = 'Margen' : this.txtCabecera = 'Comisión'
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
  background: #1565c0 !important;
}
span.q-table__bottom-item{
  color: #FFF;
}
.mayuscula{
  text-transform: uppercase!important;
}
.stockCelda {
  background: rgb(230, 230, 230);
  cursor: pointer;
}
.stockCelda:hover {
  background: rgb(188, 188, 188);
}
</style>