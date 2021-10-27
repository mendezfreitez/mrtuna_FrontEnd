<template>
    <q-dialog v-model="mostrar">
        <q-card class="bg-blue-grey-10">
            <q-card-section class="row items-center">
                <q-icon style="font-size:35px!important;" name="error" color="red-4" text-color="white" />
                <span class="q-ml-sm text-white">Se eliminará esta venta, Continuar?</span>
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
            idVenta:''
        }
    },
    computed:{
        ...mapState(['url'])
    },
    methods:{
        ...mapMutations(['setListaMercados']),
        eliminar(){
            axios.post(`${this.url}borrarVenta`, { 'id':this.idVenta }, config).then(function(resp){
            if(resp.status === 200){
                this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
                this.traerListaVentas()
            }
            }.bind(this)).catch( function(err){
                this.showNotif('top', "El servidor no responde, no se pudo eliminar!", "error", "red-4", 'black')
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
        traerListaVentas(){
            axios.get(`${this.url}listaVentas`, config).then(function(resp){
                // console.log(resp.data);
                this.setListaMercados(resp.data)
            }.bind(this)).catch(function(err){
                this.showNotif('top', "El servidor no responde!", "error", "red-4", 'black')
            }.bind(this))
        }
    }
}
</script>

<style>

</style>