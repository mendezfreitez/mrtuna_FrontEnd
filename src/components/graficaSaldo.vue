<template>
    <div id="contenedorChart">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
var ancho = 0

function graficar(obj){
    if(document.getElementById("myChart") !== null) { document.getElementById("myChart").remove() }
    else { return }
    var canvas = document.createElement("canvas")
    canvas.id = "myChart"
    var fontSize = 0
    document.getElementById("contenedorChart").appendChild(canvas)
    if(window.innerWidth <= 500){
        fontSize = 6
    }
    else if(window.innerWidth > 500 && window.innerWidth <= 701){
        fontSize = 7
    }
    else if(window.innerWidth > 701 && window.innerWidth <= 1000){
        fontSize = 8
    }
    else if(window.innerWidth > 1000 && window.innerWidth <= 1300){
        fontSize = 9
    }
    else{
        fontSize = 11
    }
    var ctx = document.getElementById('myChart').getContext('2d')

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: obj.etiquetas,
            datasets: [{
                labels:'',
                hideInLegendAndTooltip:true,
                data: obj.datos,
                backgroundColor: obj.arrayColoresFondo,
                borderColor: obj.arrayColores,
                borderWidth: 0,
            }]
        },
        options: {
            
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    labels: false,
                    ticks: {
                        beginAtZero: true,
                        fontColor:"#cfd8dc", // <-- Color de labels eje X
                        fontSize: fontSize
                    },
                    gridLines:{
                        color:"rgba(255,255,255,0.08)" // <-- Color eje X
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor:"#cfd8dc", // <-- Color de labels eje X
                        fontSize: fontSize
                    },
                    gridLines:{
                        color:"rgba(255,255,255,0.08)" // <-- Color eje X
                    }
                }],
            },
            tooltips: {
                // bodyFontSize:'15',
                enabled: true,      
                callbacks: {
                    title: function() {}
                }
            }
        }
    })
    // document.getElementById('myChart').setAttribute("width", document.getElementById('myChart').getAttribute("width"))
}

import Chart, { scaleService } from 'chart.js'
export default {
    data(){
        return{
            datosGrafica: {
                etiquetas:[],
                datos:[],
                arrayColores:[],
                arrayColoresFondo:[],
                dimension: ancho
            }
        }
    },
    mounted(){
        // graficar(this.datosGrafica)
    },
    methods:{
        
    },
    watch:{
        'datosGrafica.etiquetas': function(nv, ov){
            graficar(this.datosGrafica)
        }
    },
    created(){
        window.addEventListener("resize", function(){
            graficar(this.datosGrafica)
        }.bind(this))
    }
}

</script>