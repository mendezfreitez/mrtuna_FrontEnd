<template>
    <q-dialog v-model="mostrar">
        <q-card class="bg-blue-grey-10">
            <q-card-section class="row items-center">
                <q-icon style="font-size:35px!important;" name="error" color="red-4" text-color="white" />
                <span class="q-ml-sm text-white">Se eliminará <b>{{nombre}}</b>, Continuar?</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="cancelar" color="red-4" v-close-popup />
                <q-btn label="eliminar" color="teal-7" v-close-popup @click="eliminar" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
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
            nombre:'VAINA',
            mostrar: false,
            idCliente:''
        }
    },
    computed:{
        ...mapState(['url'])
    },
    methods:{
        ...mapMutations(['setListaClientes']),
        async eliminar(){
            try {
                const resp = await axios.post(`${this.url}borrarCliente`, { 'id':this.idCliente }, config);
                if(resp.status === 200){
                    this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
                    this.traerClientes();
                }
            } catch (error) {
                this.showNotif('top', "El servidor no responde, no se pudo eliminar!", "error", "red-4", 'black');    
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
        },
        async traerClientes(){
            try {
                let resp = await axios.get(`${this.url}traerClientes`, config);
                if(resp.data.icono){
                    this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
                    // this.mostrarCircular = false;
                }
                else {
                    this.setListaClientes(resp.data);
                }  
            } catch (error) {
                
            }
            // axios.get(`${this.url}traerClientes`, config).then(function(resp){
            //     this.setListaClientes(resp.data)
            // }.bind(this))
        },
    }
}
</script>

<style>

</style>