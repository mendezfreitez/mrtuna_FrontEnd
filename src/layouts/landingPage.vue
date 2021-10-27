<template>
  <q-layout view="lHh Lpr lFf" id="fondoRegistro">
    <!-- <img id="idFondo" style="position:fixed!important;background-size: cover!important;!important;background-repeat: no-repeat;background-position: center;" height="100%" width="100%" > -->
    <q-page-container>
        <q-page class="flex flex-center q-electron-drag">
            <div>
                <q-card id="cardInicio" style="width:300px!important; z-index:10;" class="bg-teal-7 shadow-5 q-electron-drag--exception">
                    <q-card-section class="q-pb-sm text-center" style="padding-top:5px!important;">
                        <img style="width:80%!important;" class="q-mt-md" src="../assets/img/p.png" alt="" srcset="">
                    </q-card-section>

                    <q-card-section class="q-pt-none q-electron-drag--exception">
                        <q-input v-model="form.usuario" label="Usuario" @keyup.enter="enviar" />
                        <q-input text-color="grey-10" class="q-mt-sm text-grey-10" v-model="form.contrasenia" label="Contraseña" type="password" @keyup.enter="enviar" />
                    </q-card-section>

                    <div v-if="visibleBtn == false" class="q-electron-drag--exception">
                        <q-card-actions align="right" style="margin-right:8px!important; padding-bottom:15px!important; padding-top:0px!important;">
                            <q-btn flat label="Limpiar" color="grey-10" @click="limpiarForm" />
                            <!-- <q-btn label="Iniciar" color="grey-10" :disable="habilitarEnvio" @click="enviar" /> -->
                            <q-btn label="Iniciar" color="grey-10" :disable="false" @click="enviar" />
                        </q-card-actions>
                    </div>

                    <div v-else>
                        <q-card-actions align="center" style="padding-bottom:15px!important; padding-top:0px!important;">
                            <q-spinner color="grey-10" size="2.5em" :thickness="10" />
                        </q-card-actions>
                    </div>
                </q-card>

                <q-card style="width:300px!important;" class="bg-teal-7 q-mt-md shadow-5">
                    <q-card-section class="text-blue-grey-1 non-selectable" align="right" style="font-size:14px!important;">
                        No estas registrado? <q-btn class="q-ml-sm" style="font-size:13px!important; width:100px!important;" to="/registro" size="sm" label="Registrarme" color="grey-10" />
                    </q-card-section>
                </q-card>
            </div>
        </q-page>
    </q-page-container>
 </q-layout>         
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BarraSuperior from '../components/BarraSuperior'
import axios from 'axios'
export default {
    name: 'landingPage',
    data(){
        return{
            visibleBtn:false,
            habilitarEnvio:true,
            form:{
                usuario:'mrtuna',
                contrasenia:'mrtuna'
            }
        }
    },
    components:{
        BarraSuperior
    },
    computed:{
        ...mapState(['url'])
    },
    methods:{
        ...mapMutations(['setPermisos']),
        limpiarForm(){
            this.form.usuario = ''
            this.form.contrasenia = ''
        },
        enviar(){
            this.visibleBtn = !this.visibleBtn
            axios.post(`${this.url}login`, this.form).then(function(resp){
                this.showNotif('top', resp.data.mensaje, resp.data.icono, resp.data.color, 'black')
                if(resp.data.token){
                    localStorage.setItem('token', resp.data.token)
                    localStorage.setItem("p", resp.data.dataUsuario[0].admin)
                    localStorage.setItem('usuario', resp.data.dataUsuario[0].usuario)
                    // this.visibleBtn = !this.visibleBtn
                    this.$router.go("/")
                    // location.reload() //-----------> ESTA LINEA SE PUEDE COMENTAR PARA VERSIONES WEB... PARA VERSION "ELECTRON" DEBE ESTAR FUNCIONAL(((OBLIGATORIO)))
                }
                else{
                    this.visibleBtn = !this.visibleBtn
                }
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
                // onDismiss:() => { 
                //     alert()    
                // }
                // classes: 'glossy'
                // avatar,
                // multiLine
            })
        }
    },
    watch:{
        'form.usuario': function(nv, ov){
            if(nv != '' && this.form.contrasenia != ''){
                this.habilitarEnvio = false
            }
            else{
                this.habilitarEnvio = true
            }

            var nv = nv.toLowerCase()
            var codigoAscii = nv.substr(nv.length - 1, 1).charCodeAt()
            // console.log(codigoAscii)
            if(codigoAscii < 97 || codigoAscii > 122){
                if(codigoAscii < 48 || codigoAscii > 57){
                    if(codigoAscii < 65 || codigoAscii > 90){
                        if(codigoAscii != 95 && codigoAscii != 196 && codigoAscii != 250){
                            nv = nv.substr(0, nv.length - 1)
                        }
                    }
                }
            }
            this.form.usuario = nv.split('').join('')
        },
        'form.contrasenia': function(nv, ov){
            if(nv != '' && this.form.usuario != ''){
                this.habilitarEnvio = false
            }
            else{
                this.habilitarEnvio = true
            }
            var nv = nv.toLowerCase()
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
            this.form.contrasenia = nv.split('').join('')
        }
    }
}
</script>

<style lang="scss">
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
}
 
input[type=number] { -moz-appearance:textfield; }

.q-field__control, .q-field__native, .q-field__label {
    color: #d8e7f7;
}
.horaFecha > div > div > div > .q-field__label{
    top: 2px!important;
}
.q-field__native{
    padding-bottom: 0px!important;
}

#fondoRegistro {
    background-color: #8ae6aa;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2350eedf'/%3E%3Cstop offset='1' stop-color='%2350eedf' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2330d3bd'/%3E%3Cstop offset='1' stop-color='%2330d3bd' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231276bf'/%3E%3Cstop offset='1' stop-color='%231276bf' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%238ae6aa'/%3E%3Cstop offset='1' stop-color='%238ae6aa' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230d8eff'/%3E%3Cstop offset='1' stop-color='%230d8eff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231a577d'/%3E%3Cstop offset='1' stop-color='%231a577d' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

@media (min-width: 100px) {
    #idFondo {
        background-image: url('../assets/img/fondo.jpg');
        border: 0px solid #FFF!important;
    }
}
</style>