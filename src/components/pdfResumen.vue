<template>
    <div style="position: fixed !important; top: -3000px; left: -3000px">
    <!-- <div> -->
        <div id="pdfResumenContainer">
            <img style="margin-left: 77px !important;" src="../assets/img/p.png" width="35" height="35" alt="" srcset="" />

            <p style="font-size: 8px; margin-bottom: 4px; margin-left: 58px; margin-top: 0px !important;">Resúmen de ventas</p>

            <p style="font-size: 4px; margin-bottom: 1px; margin-left: 20px">
                <span style="font-weight: bold; margin-right: 2px">Semana:</span>
                <span style="font-weight: normal">{{ semana }}</span>
                
                <span style="font-weight: bold; margin-right: 2px; margin-left:15px;">Mes:</span>
                <span style="font-weight: normal">{{ mes }}</span>
            </p>

            <table style="margin-left: 16px">
                <tr>
                    <td style="font-weight: bold; font-size: 4px !important; width: 80px;" class="text-center">Nombre</td>
                    <td style="font-weight: bold; font-size: 4px !important; width: 25px;" class="text-center">Precio</td>
                    <td style="font-weight: bold; font-size: 4px !important; width: 10px;" class="text-center">Cant</td>
                    <td style="font-weight: bold; font-size: 4px !important; width: 25px;" class="text-right">Sub Total</td>
                </tr>
                <tr v-for="t in lista" :key="t.nemo">
                    <td class="q-pt-none q-pb-none" style="font-size: 4px; word-spacing: 2px">{{ t.prod }}</td>
                    <td class="q-pt-none q-pb-none" style="font-size: 4px; float: right !important">{{ t.pre | currency }}</td>
                    <td style="font-size: 4px" class="text-center q-pt-none q-pb-none">{{ t.cant }}</td>
                    <td class="q-pt-none q-pb-none" style="font-size: 4px; float: right !important">{{ (parseFloat(t.pre) * parseFloat(t.cant)) | currency }}</td> 
                </tr>
                <tr style="pading-right: 0px !important">
                <td colspan="4" style="width: 160px !important;" class="q-pt-none">
                    <span style="display: inline !important; float: right !important; font-weight: bold; font-size: 4px !important; word-spacing: 1px;">
                        Total:
                        <span style="margin-right: 0px; font-weight: normal !important; margin-left: 2px; display: inline !important;">{{ total | currency }}</span>
                    </span>
                </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import jsPDF from 'jspdf'
export default {
    data(){
        return{
            lista: [],
            total: 0,
            semana: 'No Aplica',
            mes: '',
        }
    },
    methods:{
        crearPDF(sem, mes){
            var doc = new jsPDF();
            doc.html(document.getElementById("pdfResumenContainer"), {
                callback: function (doc) {
                    doc.save(`orden-${sem}-${mes}.pdf`);
                },
                x: 10,
                y: 10,
            });
        }
    }
}
</script>

<style>

</style>