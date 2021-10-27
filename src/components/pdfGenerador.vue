<template>
    <div>
        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="true"
            :paginate-elements-by-height="1400"
            :filename="form.nombre"
            :pdf-quality="2"
            :manual-pagination="false" 
            pdf-format="a5"
            pdf-orientation="portrait"
            pdf-content-width="100%"

            @progress="onProgress($event)"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="generadorPDF"
        >
            <section style="margin-left:20px!important;margin-right:20px!important; margin-top:30px!important;" slot="pdf-content">
                <div class="text-left">
                    <p style="font-size:18px!important;margin-top: 5px!important;"><b>Orden de venta</b> #{{form.id}}</p>
                </div>
                <p style="margin-bottom:5px!important; font-size:12px!important;"><b>ID Venta:</b> {{form.id}}</p>
                <p style="margin-bottom:5px!important; font-size:12px!important;"><b>Cliente:</b> {{form.nombre}}</p>
                <p style="margin-bottom:5px!important; font-size:12px!important;"><b>Direción:</b> {{form.direccion}}</p>
                <!-- <h4 style="margin-bottom:5px!important; font-size:20px!important;">Productos</h4> -->
                <div style="width:100%!important;" class="text-center">
                    <table style="border: 1px solid #000!important;border-collapse: collapse; width:100%!important;">
                        <tbody>
                            <tr class="text-center">
                                <th colspan="4">Productos</th>
                            </tr>
                            <tr>
                                <th style="padding:3px 5px!important; font-size:11px!important;border: 1px solid #000!important;border-right:0px!important;">Nombre</th>
                                <th style="padding:3px 5px!important; font-size:11px!important;border: 1px solid #000!important;border-right:0px!important;">Cant</th>
                                <th style="padding:3px 5px!important; font-size:11px!important;border: 1px solid #000!important;border-right:0px!important;">Precio C/U</th>
                                <th style="padding:3px 5px!important; font-size:11px!important;border: 1px solid #000!important;border-right:0px!important;">SubTotal</th>
                            </tr>
                            <tr v-for="t in form.productos" :key="t.nemo">
                                <td class="text-left" style="padding:3px 5px!important; font-size:11px!important;">{{t.prod}}</td>
                                <td class="text-center" style="padding:3px 5px!important; font-size:11px!important;">{{t.cant}}</td>
                                <td class="text-right" style="padding:3px 5px!important; font-size:11px!important;">{{t.pre | currency}}</td>
                                <td class="text-right" style="padding:3px 5px!important; font-size:11px!important;">
                                    <b>{{parseFloat(t.pre) * parseFloat(t.cant) | currency}}</b>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td style="padding:3px 5px!important;" colspan="3"><b>Total a pagar</b></td>
                                <td style="padding:3px 5px!important;"><b>{{form.total | currency}}</b></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
                <p style="float:right!important; font-size:15px!important; padding-left: 5px!important; margin-top: 5px!important;"><b>Total a pagar: </b>{{form.total | currency}}</p>
            </section>
        </vue-html2pdf>

        <!-- <q-dialog v-model="mostrar" medium-width full-height @show="llenar">
            <q-card>
                <q-card-section style="height:100%!important;" class="q-pt-sm q-pl-sm q-pr-sm q-pb-sm">
                    <div id="aca" style="height:92%!important;"></div>
                    <q-btn align="right" color="cyan-7" size="sm" label="OK" v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog> -->
    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
var elementoPDF;
export default {
    name:'generador',
    components:{
        VueHtml2pdf
    },
    data(){
        return{
            mostrar:false,
            generar: false,
            obj: null,
            form:{
                id: null,
                nombre:'fgbhgfhghsh',
                productos:[],
                total:0
            }
        } 
    },
    methods:{
        // llenar(){
        //     // alert()
        //     document.getElementById('aca').append(elementoPDF)
        // }, 
        onProgress(ev){
            // elementoPDF = (document.querySelector('section.pdf-preview > iframe'))
            // if (elementoPDF !== null ) {
            //     this.mostrar = true
            // }
        },
        hasStartedGeneration(){
        },
        hasGenerated(ev){
        },
        generarPDF(){
            this.$refs.generadorPDF.generatePdf()
        }
    },
    watch:{
        'generar': function(nv, ov){
            if(nv === true){
                this.form.id = this.obj.id,
                this.form.direccion = this.obj.direccion,
                this.form.nombre = this.obj.nombre,
                this.form.productos = this.obj.productos,
                this.form.total = this.obj.total
                // console.log(JSON.stringify(this.obj, 0, 2))
                this.generarPDF()
                this.generar = false
            }
        }
    }
}
</script>

<style>

</style>