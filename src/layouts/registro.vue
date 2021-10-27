<template>
  <q-layout view="lHh Lpr lFf">
    <img id="idFondo_" style="width:100%!important; position:fixed!important;background-size: cover!important;!important;background-repeat: no-repeat;background-position: center;" height="100%" width="100%" >
    <q-page-container>
        <q-page class="flex flex-center" style=" z-index:10;">
            <q-page-sticky position="top-right" :offset="[18, 18]" @click="alert = true">
                <q-btn fab icon="keyboard_backspace" color="grey-10" to="/" title="Volver" class="shadow-17" />
                <!-- <q-fab-action color="teal-6" icon="keyboard_backspace" to="/" title="Volver" class="shadow-17" /> -->
            </q-page-sticky>
            <div>
                <q-card style="width:350px!important;" class="bg-teal-7 shadow-17">
                    <q-card-section class="q-pb-sm" style="padding-top:5px!important;">
                        <p class="text-h5 q-mb-none q-pt-sm text-blue-grey-1 text-center">Registro</p>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input color="grey-10" v-model="form.usuario" label="Usuario" :dense="true" @keypress.enter="enviar" />
                        <q-input color="grey-10" class="q-mt-sm" v-model="form.correo" label="Correo" :dense="true" @keypress.enter="enviar" />
                        <q-input color="grey-10" class="q-mt-sm" v-model="form.contrasenia" label="Contraseña" :dense="true" type="password" @keypress.enter="enviar" />
                        <q-input color="grey-10" class="q-mt-sm" v-model="form.repetirContrasenia" label="Repetir Contraseña" :dense="true" type="password" @keypress.enter="enviar" />
                    </q-card-section>

                    <div :hidden="visibleBtn">
                        <q-card-actions align="right" style="margin-right:8px!important; padding-bottom:15px!important; padding-top:0px!important;">
                            <q-btn flat label="Limpiar" color="grey-10" @click="limpiarForm" />
                            <q-btn label="Registrar" color="grey-10" :disable="habilitarEnvio" @click="enviar" />
                        </q-card-actions>
                    </div>

                    <div :hidden="!visibleBtn">
                        <q-card-section align="center" style="margin-right:8px!important; padding-bottom:15px!important; padding-top:0px!important;">
                            <q-spinner color="teal-7" size="2.5em" :thickness="10" />
                        </q-card-section>
                    </div>

                </q-card>
            </div>
        </q-page>
    </q-page-container>
 </q-layout>         
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name: 'landingPage',
    data(){
        return{
            visibleBtn: false,
            alerta :'',
            habilitarEnvio:true,
            form:{
                usuario:'mrtuna',
                contrasenia:'mrtuna',
                repetirContrasenia:'mrtuna',
                correo:'mrtuna@gmail.com'
            }
        }
    },
    computed:{
        ...mapState(['url'])
    },
    methods:{
        limpiarForm(){
            this.form.usuario = ''
            this.form.contrasenia = ''
            this.form.repetirContrasenia = ''
            this.form.correo = ''
        },
        enviar(){
            // this.$q.notify({
            //     spinner: true,
            //     message: 'Please wait...',
            //     timeout: 2000,
            //     position:'center'
            // })
            this.visibleBtn = !this.visibleBtn
            axios.post(`${this.url}registro`, this.form).then(function(resp){
                console.log(resp)
                this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
                if(resp.data.icono !== 'error'){
                    alert(resp.data.icono)
                    this.$router.go(-1)
                }
                this.visibleBtn = !this.visibleBtn
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
        }
    },
    watch:{
        'form.usuario': function(nv, ov){
            if(nv != '' && this.form.contrasenia != '' && this.form.repetirContrasenia != '' && this.form.correo != ''){
                this.habilitarEnvio = false
            }
            else{
                this.habilitarEnvio = true
            }

            // var nv = nv.toLowerCase()
            // var codigoAscii = nv.substr(nv.length - 1, 1).charCodeAt()
            // if(codigoAscii < 97 || codigoAscii > 122){
            //     if(codigoAscii < 48 || codigoAscii > 57){
            //     if(codigoAscii < 65 || codigoAscii > 90){
            //         if(codigoAscii != 95 && codigoAscii != 196 && codigoAscii != 250){
            //         nv = nv.substr(0, nv.length - 1)
            //         }
            //     }
            //     }
            // }
            // this.form.usuario = nv.split('').join('');

        },
        'form.contrasenia': function(nv, ov){
            if(nv != '' && this.form.usuario != '' && this.form.repetirContrasenia != '' && this.form.correo != ''){
                this.habilitarEnvio = false
            }
            else{
                this.habilitarEnvio = true
            }

            nv = nv.toLowerCase()
            var codigoAscii = nv.substr(nv.length - 1, 1).charCodeAt()
            if(codigoAscii < 97 || codigoAscii > 122){
                if(codigoAscii < 48 || codigoAscii > 57){
                if(codigoAscii < 65 || codigoAscii > 90){
                    if(codigoAscii != 95 && codigoAscii != 196 && codigoAscii != 250){
                    nv = nv.substr(0, nv.length - 1)
                    }
                }
                }
            }
            this.form.contrasenia = nv.split('').join('');
        },
        'form.repetirContrasenia': function(nv, ov){
            if(nv != '' && this.form.usuario != '' && this.form.contrasenia != '' && this.form.correo != ''){
                this.habilitarEnvio = false
            }
            else{
                this.habilitarEnvio = true
            }

            nv = nv.toLowerCase()
            var codigoAscii = nv.substr(nv.length - 1, 1).charCodeAt()
            if(codigoAscii < 97 || codigoAscii > 122){
                if(codigoAscii < 48 || codigoAscii > 57){
                if(codigoAscii < 65 || codigoAscii > 90){
                    if(codigoAscii != 95 && codigoAscii != 196 && codigoAscii != 250){
                    nv = nv.substr(0, nv.length - 1)
                    }
                }
                }
            }
            this.form.repetirContrasenia = nv.split('').join('');
        },
        'form.correo': function(nv, ov){
            if(nv != '' && this.form.usuario != '' && this.form.contrasenia != '' && this.form.repetirContrasenia != ''){
                this.habilitarEnvio = false
            }
            else{
                this.habilitarEnvio = true
            }
        }
    }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
}
 
input[type=number] { -moz-appearance:textfield; }

/* .q-field__control, .q-field__native, .q-field__label {
  color: #9da6b0;
    color: #d8e7f7;
} */
.horaFecha > div > div > div > .q-field__label{
  top: 2px!important;
}
.q-field__native{
  padding-bottom: 0px!important;
}
@media (min-width: 100px) {
    #idFondo_{
        background-image: url('../assets/img/fondo.jpg');
    }
}
</style>