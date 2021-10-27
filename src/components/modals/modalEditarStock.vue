<template>
    <q-dialog v-model="mostrar">
        <q-card style="width: 250px !important" class="bg-cyan-9 q-pt-xs q-pl-sm q-pr-sm">
            <p class="text-white q-mt-xs" style="font-size:14px;">
                <b>{{ obj.prod }}</b>
            </p>

            <div class="col col-4">
                <q-input
                    @focus="sumaStock == 0 ? sumaStock = '' : null"
                    id="txtStock"
                    input-class="text-right"
                    type="text"
                    v-model="sumaStock"
                    mask="###"
                    label="Sumar a stock"
                    :dense="true"
                />
            </div>
            
            <p class="text-white q-mt-xs" style="font-size:14px;">
                <b style="margin-right:5px!important;">Stock Actual:</b>
                {{ obj.stk }}
            </p>

            <div class="col-12">
                <q-btn :disable="desactivaGuardar" @click="guardarNuevoStock" label="GUARDAR" color="blue-grey-10" class="q-mt-sm" style="float:right!important;" />
                <q-btn @click="cerrarModal" flat label="CERRAR" color="grey-10" class="q-mt-sm" style="float:left!important; margin-bottom:5px;" v-close-popup />
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
const config = {
  "Content-Type": "application/json",
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
};
export default {
    data() {
        return {
            obj: {},
            mostrar: false,
            desactivaGuardar: true,
            sumaStock: 0,
        }
    },
    methods:{
        async guardarNuevoStock(){
            var datos = {
                nemo: this.obj.nemo,
                stk: parseFloat(this.obj.stk) + parseFloat(this.sumaStock)
            }
            let resp = await axios.post(`${this.url}setStock`, datos, config);
            if(resp.data.icono){
                let index = this.listadoTrades.findIndex(el => el.nemo === datos.nemo)
                this.listadoTrades[index].stk = datos.stk;
                this.showNotif("top",resp.data.mensaje, resp.data.icono, resp.data.color, "black");
                this.cerrarModal();
            }
        },
        cerrarModal(){
            this.sumaStock = 0;
            this.mostrar = false;
        },
        showNotif(position, message, icon, color, textColor) {
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
                classes: "non-selectable",
                // avatar,
                // multiLine
            });
        }
    },
    watch:{
        'sumaStock': function(nv, ov) {
            nv === '' || nv === '0' ? this.desactivaGuardar = true : this.desactivaGuardar = false;
        }
    },
    computed:{
        ...mapState(["url", "listadoTrades"])
    }
}
</script>

<style>
#txtStock{
    justify-content:end;
    font-size: 20px !important;
}
</style>