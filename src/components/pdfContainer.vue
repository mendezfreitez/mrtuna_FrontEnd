<template>
          <!-- <div style="position: fixed !important; top: 0px; left: 0px"> -->
      <div style="position: fixed !important; top: -100px; left: -100px">
        <div id="pdfContainer">
          <img style="margin-left: 80px !important; margin-top: 5px !important" src="../assets/img/p.png" width="35" height="35" alt="" srcset="" />

          <p style="font-size: 8px; margin-bottom: 4px; margin-left: 70px; margin-top: 0px !important;">Orden de venta</p>

          <p style="font-size: 4px; margin-bottom: 1px; margin-left: 10px">
            <span style="font-weight: bold; margin-right: 7px">ID venta:</span>
            <span style="font-weight: normal">{{ obj.id }}</span>
          </p>

          <p style="font-size: 4px; margin-bottom: 1px; margin-left: 10px">
            <span style="font-weight: bold; margin-right: 9px">Cliente:</span>
            <span style="font-weight: normal">{{ obj.nombre }}</span>
          </p>

          <p style="font-size: 4px; margin-bottom: 3px">
            <span style="font-weight: bold; margin-right: 5px; margin-left: 10px">Dirección:</span>
            <span style="font-weight: normal">{{ obj.direccion }}</span>
          </p>

          <table style="margin-left: 20px">
            <tr>
              <td style="font-weight: bold; font-size: 4px !important; width: 80px;" class="text-center">Nombre</td>
              <td style="font-weight: bold; font-size: 4px !important; width: 25px;" class="text-center">Precio</td>
              <td style="font-weight: bold; font-size: 4px !important; width: 10px;" class="text-center">Cant</td>
              <td style="font-weight: bold; font-size: 4px !important; width: 25px;" class="text-right">Sub Total</td>
            </tr>
            <tr v-for="t in obj.productos" :key="t.nemo">
              <td class="q-pt-none q-pb-none" style="font-size: 4px; word-spacing: 2px">{{ t.prod }}</td>
              <td class="q-pt-none q-pb-none" style="font-size: 4px; float: right !important">{{ t.pre | currency }}</td>
              <td style="font-size: 4px" class="text-center q-pt-none q-pb-none">{{ t.cant }}</td>
              <td class="q-pt-none q-pb-none" style="font-size: 4px; float: right !important">{{ (parseFloat(t.pre) * parseFloat(t.cant)) | currency }}</td> 
            </tr>
            <tr style="pading-right: 0px !important">
              <td colspan="4" style="width: 160px !important" class="q-pt-xs q-pb-none">
                <span style="display: inline !important; float: right !important; font-weight: bold; font-size: 4px !important; word-spacing: 1px;">
                  Costo de envío:
                  <span style="margin-right: 0px; font-weight: normal !important; margin-left: 2px; display: inline !important;">{{ costoEnvio | currency }}</span>
                </span>
              </td>
            </tr>
            <tr v-if="obj.descuento > 0" style="pading-right: 0px !important">
              <td colspan="4" style="width: 160px !important" class="q-pt-none q-pb-none">
                <span style="display: inline !important; float: right !important; font-weight: bold; font-size: 4px !important; word-spacing: 1px;">
                  Descuento:
                  <span style="margin-right: 0px; font-weight: normal !important; margin-left: 2px; display: inline !important;">{{ obj.descuento | currency }}</span>
                </span>
              </td>
            </tr>
            <tr style="pading-right: 0px !important">
              <td colspan="4" style="width: 160px !important" class="q-pt-none">
                <span style="display: inline !important; float: right !important; font-weight: bold; font-size: 4px !important; word-spacing: 1px;">
                  Total a pagar:
                  <span style="margin-right: 0px; font-weight: normal !important; margin-left: 2px; display: inline !important;">{{ (obj.total + costoEnvio - obj.descuento) | currency }}</span>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
</template>

<script>
import jsPDF from 'jspdf';
export default {
    data(){
        return {
            obj:{
                productos: [],
                descuento: 0,
                total: 0,
                id: '',
                nombre: '',
                direccion: ''
            },
            costoEnvio:0,
        }
    },
    methods:{
      crearPDF(id){
        var doc = new jsPDF();
        doc.html(document.getElementById("pdfContainer"), {
          callback: function (doc) {
            doc.save(`ventaID_${id}.pdf`);
          },
          x: 10,
          y: 10,
        });
      }
    }
}
</script>