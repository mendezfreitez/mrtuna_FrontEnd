<template>
  <div class="bg-blue-grey-1">
        <div class="row q-mt-xs" v-if="listaUsuarios.length > 0">
            <div class="col-12 col-sm-1 col-md-2 col-lg-3">
            </div>
            <div class="col-12 col-sm-10 col-md-8 col-lg-6" style="padding-left:10px!important; padding-right:10px!important;">
                <q-table
                style="background: transparent !important;"
                :data="listaUsuarios"
                :columns="nombreColumnas"
                row-key="name"
                separator="cell"
                dense
                :pagination.sync="pagination"
                class=" q-mb-md text-black shadow-17"
                > 
                <template v-slot:body="props">
                    <q-tr class="bg-blue-grey-1" style="font-size:15px!important;" :props="props">
                    <q-td style="font-size:13px!important; padding-left:0px!important; padding-right:0px!important; width:110px!important;" class="text-center" key="permiso" :props="props">
                        <!-- <q-btn :class="{ 'bg-blue-grey-1':true, 'text-grey-6':props.row.per === 0, 'text-blue-9':props.row.per === 1 }"  @click="setPermisos(props.row._id, $event)" style="height: 100%!important; width: 100%!important;  border-radius:0px!important;"> -->
                            <q-icon @click="setPermiso(props.row._id)" size="lg" color="blue-9" v-if="props.row.per === 1" name="toggle_on" style="height: 100%!important; width: 100%!important;  border-radius:0px!important;"></q-icon>
                            <q-icon @click="setPermiso(props.row._id)" size="lg" color="grey-6" v-else name="toggle_off" style="height: 100%!important; width: 100%!important;  border-radius:0px!important;"></q-icon>
                            
                            <!-- <b style="font-size:11px!important;" v-if="props.row.per === 1">ASIGNADO</b>
                            <b style="font-size:11px!important;" v-else>NO ASIGNADO</b> -->
                        <!-- </q-btn> -->
                    </q-td>
                    <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="usuario" :props="props"> {{ props.row.usuario }} </q-td>
                    <q-td style="font-size:13px!important;" class="text-left q-p-xs" key="direccion" :props="props"> {{ props.row.dir }} </q-td>
                    <q-td style="font-size:13px!important;" class="text-center q-p-xs" key="accion">
                        <q-btn round flat padding="none" icon="delete" size="14px" class="" color="blue-grey-10 q-mr-sm" @click="modalEliminar(props.row)" />
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

const config = {
  'Content-Type': 'application/json',
  headers: {
    'x-access-token': localStorage.getItem('token')
  }
}

export default {
data(){
    return{
        valor:null,
        listaUsuarios: [],
        pagination: {
            sortBy: 'desc',
            descending: true,
            page: 1,
            rowsPerPage: 20
        },
        nombreColumnas:[
            { name: 'permiso', align: 'center', field: 'permiso', label: 'Permiso', headerClasses: 'bg-blue-9 text-white'},
            { name: 'usuario', align: 'center', field: 'usuario', label: 'Usuario', headerClasses: 'bg-blue-9 text-white', field: row => row.usuario, sortable:true },
            { name: 'accion', align: 'center', field: 'accion', label: 'Acción', headerClasses: 'bg-blue-9 text-white'}
      ],
    }
},
methods:{
    ...mapMutations(['setUsuario']),
    setPermiso(id){
        var permiso = 0;
        var indice = 0;
        this.listaUsuarios.forEach(function(el, index){
            if(el._id === id){
                if(this.listaUsuarios[index].per === 1){
                    permiso = 0
                }
                else{
                    permiso = 1
                }
                axios.post(`${this.url}setPermiso`, { "id": id, "per": permiso }, config).then(function(resp){
                    if(resp.data.icono == "check_circle_outline"){
                        this.listaUsuarios[index].per = permiso;
                    }
                    return resp
                }.bind(this)).then(function(respp){
                    this.showNotif('top', respp.data.mensaje, respp.data.icono, respp.data.color, 'black')
                }.bind(this))
            }
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
    usuarios_no_admin(){
        axios.get(`${this.url}permisos`, config).then(function(resp){
            if(resp.data.icono){
                this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
            }
            else{
                // console.log(resp.data)
                this.listaUsuarios = resp.data
            }
        }.bind(this)).catch(function(e){
            // console.log(e)
            this.showNotif('top', "No hay respuesta del servidor!", "error", "red-5", 'black');
        }.bind(this))
    },
    modalEliminar(obj){

    }
},
mounted(){
    this.usuarios_no_admin()
    this.setUsuario(localStorage.getItem('usuario'))
},
computed:{
    ...mapState(['url'])
}
}
</script>

<style>

</style>