<template>
<div padding class="bg-blue-grey-1">
    <div class="row q-mt-sm q-mb-xl">
        <div class="col-12 col-md-1 col-sm-1">
        </div>
        <div class="col-12 col-md-10 col-sm-10 q-mb-sm q-mt-xs" style="padding-left:10px!important; padding-right:10px!important;">
            <q-badge color="blue-9" class="text-h6 q-mb-xs shadow-up-3 non-selectable" :label="nombrePagina" />
        </div>
        <div class="col-12 col-md-1 col-sm-1">
        </div>

        <div class="col-12 col-md-1 col-sm-1">
        </div>
        <div class="col-12 col-md-10 col-sm-10" style="padding-left:10px!important; padding-right:10px!important;">
            <p class="text-h5 text-blue-grey-10 non-selectable text-center">Mis Estadísticas</p>
        </div>
        <div class="col-12 col-md-1 col-sm-1">
        </div>
    </div>
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import Grafica from '../components/graficaSaldo'
const config = {
  'Content-Type': 'application/json',
  headers: {
    'x-access-token': localStorage.getItem('token')
  }
}
export default {
    components:{
        Grafica
    },
    data(){
        return{
            textSelect:'SELECCIONE',
            textSelectAnio:'SELECCIONE',
            arrayAnios:[],
            arrayMeses_:[
                { label:'ENERO', value: 1 },
                { label:'FEBRERO', value: 2 },
                { label:'MARZO', value: 3 },
                { label:'ABRIL', value: 4 },
                { label:'MAYO', value: 5 },
                { label:'JUNIO', value: 6 },
                { label:'JULIO', value: 7 },
                { label:'AGOSTO', value: 8} ,
                { label:'SEPTIEMBRE', value: 9 },
                { label:'OCTUBRE', value: 10 },
                { label:'NOVIEMBRE', value: 11 },
                { label:'DICIEMBRE', value: 12 }
            ],
            total: 0,
            labels_:[],
            totalTrade_:[],
            arrayColores_:[],
            arrayColoresFondo_:[],
            labels:[],
            totalTrade:[],
            arrayColores:[],
            arrayColoresFondo:[],
            form:{
                mes:'',
                anio:''
            }
        }
    },
    mounted(){
        var mesActual =  new Date().getMonth() + 1
        var anio = new Date().getFullYear()
        
        for(var t = 2000; t < anio + 1; t++) { 
            this.arrayAnios.push({label: t, value: t})
        }
            this.form.anio = this.arrayAnios[this.arrayAnios.length - 1]

        const usuario = localStorage.getItem('usuario')
        this.arrayMeses_.map(function(el) {
            if(el.value === mesActual){
                this.form.mes = el
                return
            }
        }.bind(this))

        if(usuario){
            this.setUsuario(usuario)
            this.setNombrePagina('Mis Entradas')
        }
    },
    methods:{
        ...mapMutations(['setUsuario', 'setListaTrades', 'setNombrePagina']),
        tradesMes(mes){
            axios.post(`${this.url}listadoTradesMes`, this.form, config).then(function(resp){
                if(resp.data.length === 0){
                    this.showNotif('top', `Ningún registro en el mes de <b>${this.form.mes.label}</b>!`, "error", "yellow-14", 'black')
                    this.$refs.grafica.datosGrafica.datos = []
                    this.$refs.grafica.datosGrafica.arrayColores = []
                    this.$refs.grafica.datosGrafica.arrayColoresFondo = []
                    this.$refs.grafica.datosGrafica.etiquetas = []
                    return
                }
                else{
                    this.total = 0
                    this.totalTrade_ = [];
                    this.labels_ = [];
                    this.arrayColores_ = [];
                    this.arrayColoresFondo_ = [];
                    var n = [1, 0, 0]
                    var saldoDia = 0
                    let index = 0
                    const ultimoDia = new Date(new Date().getFullYear(), this.form.mes.value, 0).getDate()
                    for(var t = 1; t < ultimoDia + 1; t++){
                        if(index < resp.data.length){   
                            if(t === resp.data[index].d){
                                while(t === resp.data[index].d){
                                    if(resp.data[index].tipoEntrada === 'COMPRA'){
                                        saldoDia += (resp.data[index].nroContratos * (resp.data[index].precioSalida - resp.data[index].precioEntrada) / (1 / (resp.data[index].mercado.value.ticksPunto * resp.data[index].mercado.value.valTick)))
                                        // console.log(resp.data[index].nroContratos * (resp.data[index].precioSalida - resp.data[index].precioEntrada) / (1 / (resp.data[index].mercado.value.ticksPunto * resp.data[index].mercado.value.valTick)))
                                    }
                                    else{
                                        saldoDia += (resp.data[index].nroContratos * (resp.data[index].precioEntrada - resp.data[index].precioSalida) / (1 / (resp.data[index].mercado.value.ticksPunto * resp.data[index].mercado.value.valTick)))
                                        // console.log(resp.data[index].nroContratos * (resp.data[index].precioEntrada - resp.data[index].precioSalida) / (1 / (resp.data[index].mercado.value.ticksPunto * resp.data[index].mercado.value.valTick)))
                                    }
                                    index++
                                    if(index === resp.data.length){
                                        break
                                    }
                                }
                                resp.data[index - 1].d < 10 ? this.labels_.push(`0${resp.data[index - 1].d}`) : this.labels_.push(`${resp.data[index - 1].d}`)

                                // this.totalTrade_ >= 0 ? this.totalTrade_.push(saldoDia.toFixed(2)) : this.totalTrade_.push((Math.abs(saldoDia)).toFixed(2))
                                this.totalTrade_.push(saldoDia.toFixed(2))
                                if (saldoDia >= 0) { 
                                    this.arrayColores_.push('#4db6ac')
                                    this.arrayColoresFondo_.push('#4db6ac')
                                } else {
                                    this.arrayColores_.push('#ef9a9a')
                                    this.arrayColoresFondo_.push('#ef9a9a')
                                }
                                saldoDia = 0
                            }
                            else{
                                this.labels_.push('')
                                this.totalTrade_.push(0)
                                this.arrayColores_.push('#ef9a9a')
                                this.arrayColoresFondo_.push('#ef9a9a')
                            }
                        }
                        else{
                            this.labels_.push('')
                            this.totalTrade_.push(0)
                            this.arrayColores_.push('#ef9a9a')
                            this.arrayColoresFondo_.push('#ef9a9a')
                        }
                    }
                    this.$refs.grafica.datosGrafica.datos = this.totalTrade_
                    this.$refs.grafica.datosGrafica.arrayColores = this.arrayColores_
                    this.$refs.grafica.datosGrafica.arrayColoresFondo = this.arrayColoresFondo_
                    this.$refs.grafica.datosGrafica.etiquetas = this.labels_     
                }
            }.bind(this))
            .catch( function(err){
                this.showNotif('top', "El servidor no responde!", "error", "red-4", 'black')
            }.bind(this))
        },
        calcularTotal(){
            this.total = 0
            this.totalTrade = []; this.labels = [];
            this.arrayColores = []; this.arrayColoresFondo = [];
            var calculo = 0
            this.listadoTrades.map(function(t){
                if(t.tipoEntrada === 'COMPRA'){
                    calculo = parseFloat((parseFloat((t.nroContratos * (t.precioSalida.toFixed(2) - t.precioEntrada.toFixed(2))).toFixed(2)) / ((1 / (t.mercado.value.ticksPunto).toFixed(2))) * (t.mercado.value.valTick).toFixed(2)).toFixed(2))
                }
                else{
                    calculo = parseFloat((parseFloat((t.nroContratos * (t.precioEntrada.toFixed(2) - t.precioSalida.toFixed(2))).toFixed(2)) / ((1 / (t.mercado.value.ticksPunto).toFixed(2))) * (t.mercado.value.valTick).toFixed(2)).toFixed(2))
                }
                
                this.totalTrade.push(calculo)       
                
                if (calculo >= 0) {
                    this.arrayColores.push('#4db6ac')
                    // this.arrayColoresFondo.push('#4db6ac87')
                    this.arrayColoresFondo.push('#4db6ac')
                } else {
                    this.arrayColores.push('#ef9a9a')
                    // this.arrayColoresFondo.push('#e5737387')
                    this.arrayColoresFondo.push('#ef9a9a')
                }
                this.labels.push(`${t.d}-${t.m}-${t.y}`)
            }.bind(this))
            this.$refs.grafica.datosGrafica.datos = this.totalTrade
            this.$refs.grafica.datosGrafica.arrayColores = this.arrayColores
            this.$refs.grafica.datosGrafica.arrayColoresFondo = this.arrayColoresFondo
            this.$refs.grafica.datosGrafica.etiquetas = this.labels
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
                classes: 'non-selectable'
                // avatar,
                // multiLine
            })
        }
    },
    computed:{
        ...mapState(['url', 'usuario', 'listadoTrades', 'nombrePagina'])
    },
    watch:{
        'form.mes': function (nv, ov) {
            this.tradesMes(nv)
        },
        'form.anio': function (nv, ov) {
            this.tradesMes(nv)
        }
    }
}
</script>