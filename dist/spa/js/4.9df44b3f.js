(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"1e5b":function(t,e,a){},"2da0":function(t,e,a){"use strict";a("1e5b")},"6e0d":function(t,e,a){"use strict";a("b439")},"713b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",[a("q-layout",{attrs:{view:"hHh Lpr lff"}},[a("q-header",{staticClass:"bg-teal-7 q-electron-drag",attrs:{elevated:""}},[a("q-toolbar",[a("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu",size:"lg","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),a("span",{staticClass:"text-h6 q-ml-sm"},[t._v(t._s(t.nombrePagina))]),a("q-space"),a("q-btn-dropdown",{staticStyle:{display:"inline-block!important",float:"right!important"},attrs:{color:"blue-8",push:"","no-caps":""},scopedSlots:t._u([{key:"label",fn:function(){return[a("div",{staticClass:"row items-center no-wrap"},[a("q-icon",{attrs:{left:"",name:"person"}}),a("div",{staticClass:"text-center",staticStyle:{"font-size":"14px"}},[t._v(" "+t._s(t.usuario)+" ")])],1)]},proxy:!0}])},[a("q-list",{class:{alto1:1==t.accesoAdmin,alto2:0==t.accesoAdmin}},[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"bg-blue-8 text-white",staticStyle:{"border-bottom":"3px solid rgba(0,0,0,0.15)"},attrs:{clickable:""},on:{click:t.cerrarSession}},[a("q-item-section",[a("q-item-label",{staticClass:"text-bold non-selectable",staticStyle:{display:"inline-block!important"}},[t._v("Cerrar Sessión")])],1),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"power_settings_new",color:"blue-grey-1"}})],1)],1),1==t.accesoAdmin?a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"bg-blue-8 text-white",staticStyle:{"border-bottom":"3px solid rgba(0,0,0,0.15)"},attrs:{to:"permisos",clickable:""}},[a("q-item-section",[a("q-item-label",{staticClass:"text-bold non-selectable",staticStyle:{display:"inline-block!important"}},[t._v("Permisos")])],1),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"manage_accounts",color:"blue-grey-1"}})],1)],1):t._e()],1)],1)],1)],1),a("q-drawer",{attrs:{value:!0,width:250,breakpoint:1300,id:"idDrawer","content-class":"bg-blue-grey-10 text-white"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[a("q-list",[a("q-item",{staticStyle:{"padding-bottom":"0px!important","padding-top":"14px!important"}},[a("p",{staticClass:"text-center",staticStyle:{"font-size":"18px!important","margin-bottom":"0px!important"}},[t._v("Menú")])]),t._l(t.essentialLinks,(function(e){return a("EssentialLink",t._b({key:e.title,attrs:{to:e.to}},"EssentialLink",e,!1))}))],2)],1),a("q-page-container",[a("router-view")],1),a("ModalConfig",{ref:"modalConfig"})],1)],1)},i=[],o=a("ded3"),n=a.n(o),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-item",{attrs:{clickable:"",tag:"a",to:t.link}},[t.icon?a("q-item-section",{staticClass:"text-white",attrs:{avatar:""}},[a("q-icon",{attrs:{size:"sm",name:t.icon}})],1):t._e(),a("q-item-section",[a("q-item-label",{staticClass:"text-white"},[t._v(t._s(t.title))])],1)],1)},l=[],c={name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}},p=c,m=a("2877"),d=a("66e5"),u=a("4074"),b=a("0016"),g=a("0170"),h=a("eebe"),f=a.n(h),k=Object(m["a"])(p,r,l,!1,null,null,null),q=k.exports;f()(k,"components",{QItem:d["a"],QItemSection:u["a"],QIcon:b["a"],QItemLabel:g["a"]});var w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-dialog",{model:{value:t.mostrar,callback:function(e){t.mostrar=e},expression:"mostrar"}},[a("q-card",{staticClass:"bg-blue-grey-10 q-pb-lg shadow-17",staticStyle:{width:"350px!important"}},[a("q-card-section",{staticStyle:{"padding-top":"5px!important"}},[a("div",{staticClass:"text-h6 text-white non-selectable"},[t._v("Configurar Permisos")])]),a("div",{staticClass:"row",staticStyle:{padding:"0px 10px!important"}},[a("q-card",{staticClass:"bg-blue-grey-7 q-ml-md q-mr-md shadow-17",staticStyle:{width:"100%!important"}},[a("div",{staticClass:"col-12",staticStyle:{padding:"0px 5px!important"}},[a("q-toggle",{staticClass:"text-white non-selectable",attrs:{"checked-icon":"check",color:"teal-4","unchecked-icon":"clear",label:"Eliminar Entrada"},model:{value:t.permisos[0],callback:function(e){t.$set(t.permisos,0,e)},expression:"permisos[0]"}})],1),a("div",{staticClass:"col-12",staticStyle:{padding:"0px 5px!important"}},[a("q-toggle",{staticClass:"text-white non-selectable",attrs:{"checked-icon":"check",color:"teal-4","unchecked-icon":"clear",label:"Editar Entrada"},model:{value:t.permisos[1],callback:function(e){t.$set(t.permisos,1,e)},expression:"permisos[1]"}})],1)]),a("q-card",{staticClass:"bg-blue-grey-7 q-ml-md q-mr-md q-mt-md shadow-17",staticStyle:{width:"100%!important"}},[a("div",{staticClass:"col-12",staticStyle:{padding:"0px 5px!important"}},[a("q-toggle",{staticClass:"text-white non-selectable",attrs:{"checked-icon":"check",color:"teal-4","unchecked-icon":"clear",label:"Eliminar Mercado"},model:{value:t.permisos[2],callback:function(e){t.$set(t.permisos,2,e)},expression:"permisos[2]"}})],1),a("div",{staticClass:"col-12",staticStyle:{padding:"0px 5px!important"}},[a("q-toggle",{staticClass:"text-white non-selectable",attrs:{"checked-icon":"check",color:"teal-4","unchecked-icon":"clear",label:"Editar Mercado"},model:{value:t.permisos[3],callback:function(e){t.$set(t.permisos,3,e)},expression:"permisos[3]"}})],1)])],1)],1)],1)},x=[],v=a("bc3a"),y=a.n(v),S=a("2f62");const C={"Content-Type":"application/json",headers:{"x-access-token":localStorage.getItem("token")}};var _={name:"configuracion",data(){return{mostrar:!1,mostrarBtn:!1}},methods:n()(n()({},Object(S["b"])(["setPermisos"])),{},{guardar(){y.a.post(`${this.url}setPermisosUsuario`,this.permisos,C).then(function(t){this.showNotif("top",t.data.mensaje,t.data.icono,t.data.color,"black"),200===t.status&&localStorage.setItem("p",JSON.stringify(this.permisos))}.bind(this)).catch(function(t){this.showNotif("top","El servidor no responde, no se pudo guardar!","error","red-4","black")}.bind(this))},showNotif(t,e,a,s,i){this.$q.notify({color:s,textColor:i,icon:a,message:e,position:t,multiLine:!0,group:!0,timeout:2e3,html:!0,classes:"non-selectable"})}}),computed:n()({},Object(S["c"])(["url","usuario","listadoTrades","nombrePagina","permisos"])),watch:{permisos(t,e){JSON.stringify(t)===JSON.stringify([!1,!1,!1,!1])?this.mostrarBtn=!0:JSON.stringify(t)===JSON.stringify([!0,!0,!0,!0])&&(this.mostrarBtn=!1),this.guardar()}}},Q=_,O=(a("6e0d"),a("24e8")),E=a("f09f"),I=a("a370"),L=a("9564"),P=a("8572"),$=a("eaac"),D=Object(m["a"])(Q,w,x,!1,null,null,null),M=D.exports;f()(D,"components",{QDialog:O["a"],QCard:E["a"],QCardSection:I["a"],QToggle:L["a"],QField:P["a"],QTable:$["a"]});const N=[{title:"Mis Productos",caption:"quasar.dev",icon:"list",link:"/productos"},{title:"Listado de Ventas",caption:"github.com/quasarframework",icon:"list_alt",link:"/ventas"},{title:"Mis Clientes",caption:"github.com/quasarframework",icon:"supervised_user_circle",link:"/clientes"},{title:"Repartidores",caption:"github.com/quasarframework",icon:"local_shipping",link:"/repartidores"}];var j={name:"MainLayout",components:{EssentialLink:q,ModalConfig:M},data(){return{leftDrawerOpen:!0,essentialLinks:N,accesoAdmin:0}},methods:n()(n()({},Object(S["b"])(["setPermisos"])),{},{cerrarSession(){localStorage.removeItem("token"),localStorage.removeItem("usuario"),localStorage.removeItem("p"),this.$router.go("/"),location.reload()},modalConfig(){this.$refs.modalConfig.mostrar=!0}}),computed:n()({},Object(S["c"])(["usuario","nombrePagina"])),mounted(){this.accesoAdmin=localStorage.getItem("p")}},J=j,A=(a("2da0"),a("4d5a")),B=a("e359"),T=a("65c6"),z=a("9c40"),H=a("2c91"),F=a("f20b"),R=a("1c1c"),U=a("9404"),V=a("09e3"),G=a("4e73"),K=a("7f67"),W=Object(m["a"])(J,s,i,!1,null,null,null);e["default"]=W.exports;f()(W,"components",{QLayout:A["a"],QHeader:B["a"],QToolbar:T["a"],QBtn:z["a"],QSpace:H["a"],QBtnDropdown:F["a"],QIcon:b["a"],QList:R["a"],QItem:d["a"],QItemSection:u["a"],QItemLabel:g["a"],QDrawer:U["a"],QPageContainer:V["a"],QMenu:G["a"]}),f()(W,"directives",{ClosePopup:K["a"]})},b439:function(t,e,a){}}]);