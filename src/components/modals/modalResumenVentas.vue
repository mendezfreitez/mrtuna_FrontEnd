<template>
    <q-dialog v-model="mostrar" fade>
        <q-card style="width: 500px !important" class="bg-cyan-9 q-pt-xs q-pl-sm q-pr-sm">
            <div class="col-12 q-pb-xs q-pt-xs">
                <p style="height:29px; margin:0px!important; text-align:center; font-size: 18px; margin-left:-10px;" class="text-white">
                    RESÚMEN DE ÓRDENES
                </p>
                <div>
                    <q-badge class="q-pt-xs" color="grey-10" text-color="white" style="font-size: 14px;">
                        <b class="q-mr-sm">Semana:</b> {{ semana }}
                    </q-badge>
                    <q-badge class="q-ml-md q-pt-xs" color="grey-10" text-color="white" style="font-size: 14px;">
                        <b class="q-mr-sm">Més:</b> {{ mes }}
                    </q-badge>
                </div>
            </div>
            <div class="col-12 q-pb-xs">
                <q-table
                    :data="listaResumen"
                    :columns="columnas"
                    row-key="name"
                    separator="cell"
                    dense
                    class="text-black"
                    :pagination.sync="pagination"
                    :visible-columns="visibleColumns"
                >
                    <template class="cabecera" v-slot:header>
                        <tr style="height:29px;">
                            <th class="bg-blue-9 text-white" style="font-size:12px!important;">NOMBRE</th>
                            <!-- <th class="bg-blue-9 text-white" style="font-size:12px!important;">NEMO</th> -->
                            <th class="bg-blue-9 text-white" style="font-size:12px!important; width:70px;">CANT</th>
                            <th class="bg-blue-9 text-white" style="font-size:12px!important; width:70px;">STOCK</th>
                            <th class="bg-blue-9 text-white" style="font-size:12px!important; width:70px;">BORRAR</th>
                            <!-- <th class="bg-blue-grey-10 text-white text-right" style="font-size:12px!important;">
                                {{ total | currency }}
                                <q-tooltip anchor="top middle" style="background:red!important;" class="bg-primary" self="bottom middle" :offset="[1, 3]">
                                    <strong style="font-size:12px!important;">TOTAL</strong>
                                </q-tooltip>
                            </th> -->
                        </tr>
                    </template>

                    <template v-slot:body="props">
                        <q-tr :props="props" style="height:20px!important;" :class="{'bg-red-3': props.row.cant > props.row.stk, 'bg-yellow-4': props.row.cant == props.row.stk }">
                            <q-td style="font-size: 12px !important;height:20px!important;" class="textLeft q-p-xs" key="prod_" :props="props"> {{ props.row.prod }} </q-td>
                            <!-- <q-td style="font-size: 12px !important;height:20px!important;" class="textLeft q-p-xs" key="nemo_" :props="props"> {{ props.row.nemo }} </q-td> -->
                            <q-td style="font-size: 12px !important;height:20px!important;" class="txtCentrado q-p-xs" key="cant_" :props="props"> {{ props.row.cant }} </q-td>
                            <q-td style="font-size: 12px !important;height:20px!important;" class="txtCentrado stockCell q-p-xs" key="stk" :props="props" @click="editarStock(props.row)"> {{ props.row.stk }} </q-td>
                            <!-- <q-td style="font-size: 12px !important;height:20px!important;" class="q-p-xs bg-blue-grey-1" key="pre_" :props="props">
                                {{ (props.row.pre * props.row.cant) | currency }}
                            </q-td> -->
                            <q-td style="font-size: 12px !important;height:20px!important;" class="txtCentrado q-p-xs">
                                <q-btn round flat padding="none" icon="delete" size="14px" color="blue-grey-10" @click="borrarDeResumen(props.row.nemo)" />
                            </q-td>

                        </q-tr>
                    </template>

                    <template class="non-selectable bg-primary" v-slot:pagination></template>
                </q-table>  
            </div>
            <div class="col-12">
                <q-btn label="PDF" style="float: left !important; margin-bottom:8px;" icon="file_download" class="q-mt-sm" text-color="blue-grey-10" color="red-14" @click="generarPDFresumen" />
                <q-btn label="CERRAR" style="float:right!important; margin-bottom:5px;" flat color="grey-10" class="q-mt-sm" v-close-popup />
            </div>
        </q-card>

        <GeneradorResumen ref="generador_Resumen"></GeneradorResumen>
        <ModalEditarStock ref="modalEditarStock" />
    </q-dialog>
</template>

<script>
import GeneradorResumen from '../../components/pdfResumen'
import ModalEditarStock from '../modals/modalEditarStock'
import { mapState, mapMutations } from 'vuex'
export default {
    components:{
        GeneradorResumen, ModalEditarStock
    },
    data(){
        return {
            semana: 'No Aplica',
            mes:'No Aplica',
            mostrar: false,
            lista: [],
            total: 0,
            columnas: [
                { name: 'prod_', alingn:'left', field:'producto', label:'Producto', headerClasses: "bg-blue-9 text-white" },
                { name: 'cant_', alingn:'center', field:'cant', label:'Cantidad', headerClasses: "bg-blue-9 text-white colStatus" },
                { name: 'stk', alingn:'center', field:'stk', label:'Stock', headerClasses: "bg-blue-9 text-white colStatus" },
                { name: 'pre_', alingn:'center', field:'precio', label:'Total', headerClasses: "bg-blue-9 text-white colStatus" },
                { name: 'nemo_', alingn:'nemo', field:'nemo', label:'Nemo', headerClasses: "bg-blue-9 text-white colStatus" },
            ],
            visibleColumns:[
                "prod_",
                "cant_",
                "stk",
                // "pre_",
                // "nemo_"
            ],
            pagination: {
                sortBy: "desc",
                descending: true,
                page: 1,
                rowsPerPage: 0,
            },
        }
    },
    methods: {
        ...mapMutations(["setListaResumen"]),
        editarStock(obj){
            this.$refs.modalEditarStock.desactivaGuardar = true;
            this.$refs.modalEditarStock.obj = obj;
            this.$refs.modalEditarStock.totalStock = obj.stk;
            this.$refs.modalEditarStock.mostrar = true;
        },
        generarPDFresumen() {
            this.$refs.generador_Resumen.total = this.total
            this.$refs.generador_Resumen.semana = this.semana
            this.$refs.generador_Resumen.mes = this.mes
            this.$refs.generador_Resumen.crearPDF(this.semana, this.mes);
        },
        borrarDeResumen(nemo){
            this.setListaResumen( this.listaResumen.filter(el => el.nemo !== nemo) );
        }
    },
    computed:{
        ...mapState(['listaResumen'])
    }
}
</script>

<style>
.textLeft {
    text-align: left!important;
}
.txtCentrado {
    text-align: center!important;
}
.stockCell {
    cursor: pointer;
}
</style>