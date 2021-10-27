<template>
  <div class="bg-blue-grey-1">
    <div class="row">
      <div class="col-12"></div>
      <div class="col-12">
        <q-btn v-if="txtMes != 'MES'" @click="generarResumen" class="q-mt-xs q-ml-xs q-mb-xs" style="float: left !important; height: 30px !important; display: inline-block !important; font-size: 12px !important;" color="cyan-9">
          RESÚMEN
        </q-btn>
        <q-btn @click="modal()" class="q-mt-xs q-mr-xs q-mb-xs" style="float: right !important; height: 30px !important; display: inline-block !important; font-size: 12px !important;" color="cyan-9">
          NUEVA VENTA
        </q-btn>
      </div>
      <div class="col-12"></div>
    </div>
    <div class="row" :hidden="listaMercados_.length === 0" v-if="listaMercados_.length > 0">
      <div class="col-12"></div>
      <div class="col-12">
        <q-table
          ref="tablaPrincipal"
          style="background: transparent !important"
          :data="listaMercados"
          :columns="nombreColumnas"
          row-key="name"
          separator="cell"
          no-data-label="NO SE ENCONTRARON RESULTADOS!!!"
          no-results-label="NO SE ENCONTRARON RESULTADOS!!!"
          dense
          virtual-scroll
          :virtual-scroll-sticky-size-start="48"
          :visible-columns="visibleColumns"
          :filter="filter" 
          :pagination.sync="pagination" 
          id="tablaVentas"
          class="text-black shadow-17 hoverTable my-sticky-virtscroll-table"
        >
          <template class="cabecera" v-slot:header>
            <tr>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 110px !important;">
                <q-btn-dropdown size="12px" color="teal-5"
                  :label="txtStatusPago"
                  class="btnFiltro" padding="0px 8px"
                  style="width: 110px !important; height:27px!important; margin-top: 1px !important"
                >
                  <q-list>
                    <q-item @click="filtrarPorStatusPago(null)" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>TODOS</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item @click="filtrarPorStatusPago(true)" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>PAGADO</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item @click="filtrarPorStatusPago(false)" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>POR PAGAR</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 130px !important;">
                <q-btn-dropdown
                  size="12px"
                  color="teal-5"
                  :label="txtStatusEntrega"
                  class="btnFiltro"
                  padding="0px 8px"
                  style="width: 130px !important; height:27px!important; margin-top: 1px !important"
                >
                  <q-list>
                    <q-item @click="filtrarPorStatusEntrega(null)" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>TODOS</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item @click="filtrarPorStatusEntrega(true)" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ENTREGADO</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item @click="filtrarPorStatusEntrega(false)" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>POR ENTREGAR</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 65px !important;">
                <q-btn-dropdown
                  size="12px"
                  color="teal-5"
                  :label="txtSemana"
                  class="btnFiltro"
                  padding="0px 8px"
                  style="padding-left: 8px !important; width: 80px !important; margin-top: 1px !important; width: 65px !important; height:27px!important;"
                >
                  <q-list>
                    <q-item @click="filtrarPorSemana('0')" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>TODOS</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-for="t in arraySemanas"
                      :key="t.value"
                      clickable
                      v-close-popup
                      @click="filtrarPorSemana(t.label)"
                    >
                      <q-item-section>
                        <q-item-label>{{ t.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 100px !important;">
                <q-btn-dropdown
                  size="12px"
                  color="teal-5"
                  :label="txtMes"
                  class="btnFiltro"
                  padding="0px 8px"
                  style="padding-left: 8px !important; width: 130px !important; margin-top: 1px !important; width: 100px !important; height:27px!important;"
                >
                  <q-list>
                    <q-item clickable v-close-popup @click="filtrarPorMes('0')">
                      <q-item-section>
                        <q-item-label>TODOS</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-for="t in arrayMeses"
                      :key="t.value"
                      clickable
                      v-close-popup
                      @click="filtrarPorMes(t.label)"
                    >
                      <q-item-section>
                        <q-item-label>{{ t.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 120px !important;">
                <q-btn
                  size="12px"
                  class="btnFiltro"
                  padding="0px 0px"
                  color="teal-5"
                  icon-right="search"
                  label="VENDEDOR"
                  @click=" () => { searchByVendedor = true; }"
                  style="width: 126px !important; margin-top: 1px !important; height:27px!important;"
                  v-if="!searchByVendedor"
                />
                <div v-else style="padding-top: 1px !important">
                  <input
                    class="HHHHHHHHH"
                    dense
                    outlined
                    v-model="txtFilterVendedor"
                    ref="txtFilterVendedor"
                  />
                  <q-btn
                    @click="() => { searchByVendedor = false; txtFilterVendedor = ''; }"
                    padding="1px"
                    icon="close"
                    color="secondary"
                    size="14px"
                    style="display: inline-block !important; margin-top: -2px; margin-left: 0px; border-radius: 0px 4px 4px 0px !important; height: 27px;"
                  />
                </div>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 120px !important;">
                <q-btn
                  size="12px"
                  :class="{ btnFiltro: true, ocultoVaina: searchByCliente }"
                  padding="0px 0px"
                  color="teal-5"
                  icon-right="search"
                  label="CLIENTE"
                  @click="() => { searchByCliente = true; }"
                  style="width: 126px !important; margin-top: 1px !important; height:27px!important;"
                />
                <div style="padding-top: 1px !important" :class="{ ocultoVaina: !searchByCliente }">
                  <input class="HHHHHHHHH" dense outlined v-model="txtFilterCliente" id="txtFilterCliente" />
                  <q-btn
                    @click="() => { searchByCliente = false; txtFilterCliente = ''; }"
                    padding="1px"
                    icon="close"
                    size="14px"
                    color="secondary"
                    style="display: inline-block !important; margin-top: -2px; margin-left: 0px; border-radius: 0px 4px 4px 0px !important; height: 27px;"
                  />
                </div>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px !important; width: 120px !important;">
                <q-btn
                  size="12px"
                  class="btnFiltro"
                  padding="0px 0px"
                  color="teal-5"
                  icon-right="search"
                  label="REPARTIDOR"
                  @click=" () => { searchByRepartidor = true; }"
                  style="width: 126px !important; margin-top: 1px !important; height:27px!important;"
                  v-if="!searchByRepartidor"
                />
                <div v-else style="padding-top: 1px !important">
                  <input
                    class="HHHHHHHHH"
                    dense
                    outlined
                    v-model="txtFilterRepartidor"
                    ref="txtFilterVendedor"
                  />
                  <q-btn
                    @click="() => { searchByRepartidor = false; txtFilterRepartidor = ''; }"
                    padding="1px"
                    icon="close"
                    color="secondary"
                    size="14px"
                    style="display: inline-block !important; margin-top: -2px; margin-left: 0px; border-radius: 0px 4px 4px 0px !important; height: 27px;"
                  />
                </div>
              </th>
              <th class="bg-blue-9 text-white" style="font-size:12px!important;">DESPACHO</th>
              <th class="bg-blue-9 text-white" style="top: 0px !important;" :colspan="1">
                <q-td class="text-center columna" style="width: 210px !important; font-size:12px!important;">PRODUCTO</q-td>
                <q-td class="text-center columna" style="width: 80px !important; font-size:12px!important;">PRECIO</q-td>
                <q-td class="bg-blue-grey-9 text-center columna" style="padding: 0px !important; width: 60px !important; font-size:12px!important;" aria-colspan="2">
                  <!-- <span style="display:block!important; font-size:10px!important; width: 54px !important;">CANT</span> -->
                  <span style="display:block!important; font-size:11px!important; width: 54px !important;">{{ sumaCant[0] }}</span>
                  
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[1, 8]">
                    <strong style="font-size:12px!important;">CANTIDAD</strong>
                  </q-tooltip>
                </q-td>
                <q-td class="text-center columna" style="width: 80px !important; font-size:12px!important;">S. TOTAL</q-td>
              </th>
              <th class="bg-blue-9 text-white" style="padding: 0px 2px !important; font-size:12px!important;">DESCTO</th>
              <th class="bg-blue-9 text-right text-white" style="font-size:11px!important; padding-right:5px!important; height:29px!important;">
                <!-- <span style="display:block!important; font-size:11px!important; width: 54px !important;">{{ sumaCant[1] | currency }}</span> -->
                {{ sumaCant[1] | currency }}
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[1, 3]">
                  <strong style="font-size:12px!important;">TOTAL</strong>
                </q-tooltip>
              </th>
              <th class="bg-blue-9 text-white" style="font-size:12px!important;">ACCIÓN</th>
            </tr>
          </template>

          <template v-slot:body="props">
            <q-tr
              :class="{
                qqqAAA: true,
                'bg-grey-3': !props.row.stat[0] && !props.row.stat[1],
                amarillo_SnapChat: props.row.stat[0] && !props.row.stat[1],
                rojo_YouTube: !props.row.stat[0] && props.row.stat[1],
                verde_WhatsApp: props.row.stat[0] && props.row.stat[1],
              }"
              style="font-size: 10px !important; padding-bottom: 0px !important; padding-top: 0px !important; z-index: 0 !important;"
              :props="props"
            >
              <q-td style="width: 110px !important; font-size: 12px !important; padding: 0px !important" class="text-center" key="status1" :props="props">
                <q-btn
                  :class="{'bg-blue-grey-1': !props.row.stat[0], 'text-grey-10': !props.row.stat[0], 'bg-blue-grey-9': props.row.stat[0], 'text-grey-2': props.row.stat[0],}"
                  size="xs"
                  @dblclick="cambioStatus1(props.row._id, $event)"
                  @click="verCtrlStatus1(props.row._id)"
                  style="height: 100% !important; width: 100% !important; border-radius: 0px !important;"
                >
                  <b style="font-size: 11px !important" v-if="props.row.stat[0] === true">PAGADO</b>
                  <b style="font-size: 11px !important" v-else>POR PAGAR</b>
                </q-btn>
              </q-td>
              <q-td style="width: 130px !important; font-size: 12px !important; padding: 0px !important" class="text-center q-p-xs" key="status2" :props="props">
                <q-btn
                  :class="{'bg-blue-grey-1': !Boolean(props.row.stat[1]),'text-grey-10': !Boolean(props.row.stat[1]), 'bg-blue-grey-9': Boolean(props.row.stat[1]), 'text-grey-2': Boolean(props.row.stat[1]),}"
                  size="xs"
                  @dblclick="cambioStatus2(props.row._id, $event)"
                  @click="verCtrlStatus2(props.row._id)"
                  style="width: 100% !important; height: 100% !important; border-radius: 0px !important;"
                >
                  <b style="font-size: 11px !important" v-if="props.row.stat[1] === true">ENTREGADO</b>
                  <b style="font-size: 11px !important" v-else>POR ENTREGAR</b>
                </q-btn>
              </q-td>

              <!-- NO BORRAR, SON LOS MISMOS BOTONES PERO CON LA CONDICION DE QUE SI EL USUARIO
              QUE REGISTRO LA VENTA ES IGUAL AL LOGUEADO, LE DE LERMISOS DE EDITAR, CAMBIAR STATUS O BORRAR
              LO QUE OCURRE ES QUE EL CLIENTE QUIERE TENER ACCESO A TODAS LAS VENTAS, INCLUSO A LAS QUE NO REGISTRO SU USUARIO -->

              <!-- <q-td style="font-size:12px!important; padding:0px!important" class="text-center" key="status1" :props="props">
                <q-btn :disable="verificarUsuario !== props.row.usu" :class="{ 'bg-blue-grey-1':!props.row.stat[0], 'text-grey-10':!props.row.stat[0], 'bg-blue-grey-9':props.row.stat[0], 'text-grey-2':props.row.stat[0] }" size="xs" @click="cambioStatus1(props.row._id, $event)" style="width:100%!important; height:100%!important; border-radius:0px!important;">
                  <b style="font-size:11px!important;" v-if="props.row.stat[0] === true">PAGADO</b>
                  <b style="font-size:11px!important;" v-else>POR PAGAR</b>
                </q-btn>
              </q-td>
              <q-td style="font-size:12px!important; padding:0px!important;" class="text-center q-p-xs" key="status2" :props="props">     
                <q-btn :disable="verificarUsuario !== props.row.usu" :class="{ 'bg-blue-grey-1':!Boolean(props.row.stat[1]), 'text-grey-10':!Boolean(props.row.stat[1]), 'bg-blue-grey-9':Boolean(props.row.stat[1]), 'text-grey-2':Boolean(props.row.stat[1]) }" size="xs" @click="cambioStatus2(props.row._id, $event)" style="width:100%!important; height:100%!important; border-radius:0px!important;">
                  <b style="font-size:11px!important;" v-if="props.row.stat[1] === true">ENTREGADO</b>
                  <b style="font-size:11px!important;" v-else>POR ENTREGAR</b>
                </q-btn>
              </q-td> -->

              <!-- NO BORRAR, SON LOS MISMOS BOTONES PERO CON LA CONDICION DE QUE SI EL USUARIO
              QUE REGISTRO LA VENTA ES IGUAL AL LOGUEADO, LE DE LERMISOS DE EDITAR, CAMBIAR STATUS O BORRAR
              LO QUE OCURRE ES QUE EL CLIENTE QUIERE TENER ACCESO A TODAS LAS VENTAS, INCLUSO A LAS QUE NO REGISTRO SU USUARIO -->
              <q-td style="font-size: 12px !important" class="text-center q-p-xs" key="semana" :props="props"> {{ props.row.sem }} </q-td>
              <q-td style="font-size: 12px !important" class="text-center q-p-xs" key="mes" :props="props"> {{ props.row.mes }} </q-td>
              <q-td style="font-size: 12px !important" class="text-left q-p-xs" key="vendedor" :props="props"> {{ props.row.usu.toUpperCase() }} </q-td>
              <q-td style="font-size: 12px !important" class="text-left q-p-xs" key="nombre" :props="props"> {{ props.row.nom }} </q-td>
              <q-td style="font-size: 12px !important" class="text-left q-p-xs" key="repartidor" :props="props"> {{ props.row.rep }} </q-td>
              <!-- <q-td style="font-size:12px!important; white-space:normal!important;" class="text-left q-p-xs" key="direccion" :props="props"> {{ props.row.dir }} </q-td> -->
              <q-td style="font-size: 12px !important" class="text-center q-p-xs" key="diaDespacho" :props="props"> {{ props.row.ddesp }} </q-td>
              <q-td style="font-size: 12px !important; width: 200px !important; padding: 0px !important; z-index: 0 !important;" class="text-right" key="productos" :props="props">
              <q-tr class="q-pt-none q-pb-none q-mt-none q-mb-none fila" style="font-size: 11px !important; height: 10px !important; table-layout: fixed !important; width: 100%; border-collapse: collapse;"
                v-for="m in props.row.prods"
                :key="m.id"
              >
                <q-td class="text-left columna" style="font-size: 11px !important; width: 220px !important">{{ m.prod }}</q-td>
                <q-td class="text-right columna" style="font-size: 11px !important; width: 80px !important">{{ m.pre.toString() | currency }}</q-td>
                <q-td class="text-center columna" style="font-size: 11px !important; width: 60px !important;">{{ m.cant }}</q-td>
                <q-td class="text-right columna" style="font-size: 11px !important; width: 90px !important">{{ (parseFloat(m.cant) * m.pre).toString() | currency }}</q-td>
              </q-tr>
              </q-td>
              <q-td style="font-size: 11px !important" class="text-right q-p-xs" key="descuento" :props="props">
                <span v-if="props.row.desc === 0">{{ props.row.desc.toString() | currency }}</span>
                <span v-else-if="props.row.desc > 0 && props.row.porcdesc" style="background:#37474F; color:#FFF; padding:1px 3px; border-radius:3px;">{{ props.row.desc.toString() | currencyPorc }}</span>
                <span v-else style="background:#E0E0E0; padding:1px 3px; border-radius:3px;"> {{ props.row.desc.toString() | currency }} </span>
              </q-td>

              <!-- <q-td style="font-size: 11px !important" class="text-right q-p-xs" key="total" :props="props"> {{ props.row.tot.toString() | currency }} </q-td> -->
              <q-td style="font-size: 11px !important" class="text-right q-p-xs" key="total" :props="props"> 
                <span v-if="props.row.desc === 0">{{ props.row.tot.toString() | currency }}</span>
                <span v-else-if="props.row.desc > 0 && props.row.porcdesc">{{ (parseFloat(((props.row.tot - ((props.row.tot * props.row.desc) / 100)) / 1000).toFixed(2)) * 1000).toString() | currency }}</span>
                <span v-else>{{ (props.row.tot - props.row.desc).toString() | currency }}</span>
              </q-td>
              <q-td style="font-size: 15px !important" class="text-center q-p-xs" key="accion">
                <q-btn round flat padding="none" icon="delete" size="14px" color="blue-grey-10 q-mr-sm" @click="modalEliminar(props.row)" />
                <q-btn round flat padding="none" icon="article" size="14px" color="blue-grey-10" @click="modal(props.row)" />
              </q-td>

              <!-- NO BORRAR, SON LOS MISMOS BOTONES PERO CON LA CONDICION DE QUE SI EL USUARIO
              QUE REGISTRO LA VENTA ES IGUAL AL LOGUEADO, LE DE LERMISOS DE EDITAR, CAMBIAR STATUS O BORRAR
              LO QUE OCURRE ES QUE EL CLIENTE QUIERE TENER ACCESO A TODAS LAS VENTAS, INCLUSO A LAS QUE NO REGISTRO SU USUARIO -->

              <!-- <q-td style="font-size:15px!important;" class="text-center q-p-xs" key="accion">
                <q-btn v-if="verificarUsuario === props.row.usu" round flat padding="none" icon="delete" size="14px" class="" color="blue-grey-10 q-mr-sm" @click="modalEliminar(props.row)" />
                <q-btn v-if="verificarUsuario === props.row.usu" round flat padding="none" icon="edit" size="14px" color="blue-grey-10" @click="modal(props.row)" />
              </q-td>   -->

              <!-- NO BORRAR, SON LOS MISMOS BOTONES PERO CON LA CONDICION DE QUE SI EL USUARIO
              QUE REGISTRO LA VENTA ES IGUAL AL LOGUEADO, LE DE LERMISOS DE EDITAR, CAMBIAR STATUS O BORRAR
              LO QUE OCURRE ES QUE EL CLIENTE QUIERE TENER ACCESO A TODAS LAS VENTAS, INCLUSO A LAS QUE NO REGISTRO SU USUARIO -->
            </q-tr>
          </template>

          <template class="non-selectable bg-primary" v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 2" icon="first_page" class="text-white" square dense flat :disable="scope.isFirstPage" @click="scope.firstPage" />
            <q-btn icon="chevron_left" class="text-white" square dense flat :disable="scope.isFirstPage" @click="scope.prevPage" />
            <q-btn icon="chevron_right" class="text-white" square dense flat :disable="scope.isLastPage" @click="scope.nextPage" />
            <q-btn v-if="scope.pagesNumber > 2" icon="last_page" class="text-white" square dense flat :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>
        </q-table>
      </div>
      <div class="col-12"></div>
    </div>

    <q-inner-loading v-if="listaMercados_.length === 0 && mostrarCircular" :showing="listaMercados_.length === 0">
      <q-circular-progress
        indeterminate
        size="75px"
        :thickness="1"
        color="teal-6"
        center-color="blue"
        class="q-ma-md"
      />
    </q-inner-loading>

    <div>
      <q-dialog v-model="alert" transition-show="fade" transition-hide="fade">
        <q-card style="width: 450px !important" class="bg-cyan-9 q-pt-xs">
          <div class="row" style="padding: 0px 10px !important">
            <div class="col-12" style="padding: 0px 5px !important">
              <q-input
                :readonly="inputDesactivado"
                clearable
                list="listaClientes"
                v-model="form.nombre"
                maxlength="20"
                class="text-white"
                label="CLIENTE"
                :dense="true"
                type="text"
                style="font-size: 12px !important"
                @keyup.enter="guardar"
              />
              <datalist id="listaClientes">
                <option v-for="t in listaClientes" :key="t.id">
                  {{ t.nom }}
                </option>
              </datalist>
            </div>
            <div class="col-12 q-mt-xs" style="padding: 0px 5px !important">
              <q-input
                :readonly="inputDesactivado"
                clearable
                v-model="form.direccion"
                class="text-white"
                label="DIRECCIÓN"
                :dense="true"
                type="text"
                style="font-size: 12px !important"
                @keyup.enter="guardar"
              />
            </div>
            <div class="col-6 q-mt-xs" style="padding: 0px 5px !important">
              <q-select
                :readonly="inputDesactivado"
                options-dense
                style="font-size: 14px !important"
                v-model="form.mes"
                :options="arrayMeses"
                label="MES"
                :dense="true"
              />
            </div>
            <div class="col-6 q-mt-xs" style="padding: 0px 5px !important">
              <q-select
                :readonly="inputDesactivado"
                options-dense
                style="font-size: 14px !important"
                v-model="form.semana"
                :options="arraySemanas"
                label="SEMANA"
                :dense="true"
              />
            </div>
            <div class="col-6 q-mt-xs" style="padding: 0px 5px !important">
              <q-input
                :readonly="inputDesactivado"
                clearable
                list="listaDias"
                v-model="form.diaDespacho"
                label="DÍA DESPACHO"
                :dense="true"
                type="text"
                style="font-size: 12px !important"
              />
              <datalist id="listaDias">
                <option :value="t.label" v-for="t in arrayDias" :key="t.value">
                  {{ t.label }}
                </option>
              </datalist>
            </div>
            <div class="col-6 q-mt-xs" style="padding: 0px 5px !important">
              <q-input :readonly="inputDesactivado" clearable list="listaRepartidores" v-model="form.repartidor" label="REPARTIDOR" :dense="true" type="text" style="font-size: 12px !important" />
              <datalist id="listaRepartidores">
                <option v-for="t in listaRepartidores" :key="t.id"> {{ t.nom }} </option>
              </datalist>
            </div>

            <div :hidden="form.productos.length == 0" class="col-6 text-right">
              <q-toggle :disable="inputDesactivado" v-model="form.porcdesc" color="white" keep-color />
            </div>




            <div :hidden="form.productos.length == 0" class="col-6" style="padding: 0px 5px !important">
              <q-input v-if="form.porcdesc" shadow-text=" %" @focus="focusTxtDescuento" @blur="verTxtDescuento" ref="porcDescuento" clearable :readonly="inputDesactivado" v-model="form.descuento" label="PORCENTAJE" input-class="text-left" :dense="true" type="number" style="font-size: 12px !important" />
              <q-input v-else shadow-text=" $" @focus="focusTxtDescuento" @blur="verTxtDescuento" ref="txtDescuento" clearable :readonly="inputDesactivado" v-model="form.descuento" label="DESCUENTO" input-class="text-left" :dense="true" type="number" style="font-size: 12px !important" />
            </div>

            <div class="col-12 q-mt-md" style="padding: 0px 5px !important">
              <p class="text-white text-h6 q-mb-none" style="color: #fff !important; float: left !important; display: inline-block !important;">
                Productos
              </p>
              <q-btn v-if="!inputDesactivado" round size="sm" style="float: right !important; display: inline-block !important;" class="q-p-xs" color="grey-10" @click="() => { alertProd = true; nuevoProd = true; }">
                <q-icon name="add" />
              </q-btn>
            </div>

            <div class="q-mt-xs bg-grey-4 col-12 q-mt-none" style="padding: 0px 5px !important; border-radius: 5px" v-for="(t, index) in form.productos" :key="index">
              <p class="q-mb-none q-pt-xs float-left text-grey-10" style="font-size: 11px !important; display: inline-block !important;">
                {{ t.prod }}
              </p>

              <q-btn v-if="!inputDesactivado" round flat padding="none" icon="delete" size="13px" class="float-right" color="blue-grey-10" style="display: inline-block !important;" @click="eliminarProdCarro(index)" />

              <q-btn v-if="!inputDesactivado" round flat padding="none" icon="edit" size="13px" color="blue-grey-10" class="float-right" @click="editarProdDetalle(t)" />








              <p style=" font-size: 11px !important; display: inline-block !important; width: 100px !important;" class="float-right q-pt-xs q-mb-none">
                <b>subTotal:</b> {{ (t.pre * t.cant) | currency }}
              </p>

              <p style="font-size: 11px !important; display: inline-block !important; width: 50px !important;" class="float-right q-mr-sm q-pt-xs q-mb-none">
                <b>cant:</b> {{ t.cant }}
              </p>
            </div>

            <div v-if="form.productos.length > 0" class="col-12">
              <q-badge class="q-mt-xs q-pt-xs q-pb-xs float-right" text-color="grey-10" color="grey-4" style="font-size: 14px !important">
                <span v-if="form.porcdesc">
                  <b class="q-mr-xs">Descuento:</b> {{ form.descuento | currencyPorc }}
                </span>
                <span v-else>
                  <b class="q-mr-xs">Descuento:</b> {{ form.descuento | currency }}
                </span>
              </q-badge>
            </div>

            <div class="col-12">
              <q-toggle
                v-if="form.total <= 30000 && form.productos.length > 0"
                :disable="inputDesactivado"
                left-label
                size="xs"
                label="Aplica Envío"
                v-model="form.apEnvio"
                checked-icon="check"
                unchecked-icon="clear"
                :class="{'q-pl-xl': true}"
                color="cyan-4"
                style="height: 24px!important; padding-left: 70px!important;"
                :true-value="true"
                :false-value="false"
              />
              <q-badge v-if="form.productos.length > 0" class="q-mt-xs q-pt-xs q-pb-xs float-right" text-color="grey-10" color="grey-4" style="font-size: 14px !important">
                <b class="q-mr-xs">Costo envío:</b>
                {{ costoEnvio | currency }}
              </q-badge>
            </div>
            <div class="col-12">
              <q-badge v-if="form.productos.length > 0" class="q-mt-xs q-pt-xs q-pb-xs float-right" text-color="grey-10" color="grey-4" style="font-size: 14px !important">
                <b class="q-mr-xs">A Pagar:</b>
                {{ total | currency }}
              </q-badge>
            </div>
          </div>

          <q-btn style="float: left !important" icon="file_download" class="q-ml-sm q-mt-sm q-pr-xs" text-color="blue-grey-10" color="red-14" @click="generarPDF(form)" v-if="btnPDFvisible">
            PDF
          </q-btn>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey-10" v-close-popup />
            <q-btn
              v-if="!inputDesactivado"
              :disable="form.productos.length === 0"
              label="GUARDAR"
              color="blue-grey-10"
              text-color="blue-grey-1"
              @click="guardar"
            />
            <q-btn
              v-else
              label="EDITAR"
              color="blue-grey-10"
              text-color="blue-grey-1"
              @click="inputDesactivado = false"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="alertProd" transition-show="fade" transition-hide="fade">
        <q-card style="width: 350px !important" class="bg-cyan-9">
          <div class="row" style="padding: 0px 10px !important">
            <div class="col-12 q-mt-sm" style="padding: 0px 5px !important">
              <q-input
                clearable
                list="listaProds"
                v-model="productoObj.producto"
                id="nombreMercadoTxt"
                class="text-white"
                label="PRODUCTO"
                :dense="true"
                type="text"
                style="font-size: 12px !important"
                @keyup.enter="guardar"
              />
              <datalist id="listaProds">
                <option v-for="t in listadoTrades" :key="t.idProducto">{{ t.nom }}</option>
              </datalist>
            </div>

            <div class="col-12" style="padding: 0px 5px !important">
              <q-input
                :readonly="true"
                v-model="productoObj.nemo"
                id="nombreMercadoTxt"
                class="text-white"
                label="NEMO"
                :dense="true"
                type="text"
                style="font-size: 12px !important"
              />
            </div>

            <div class="col-4 q-mt-sm" style="padding: 0px 5px !important">
              <q-input
                :readonly="true"
                v-model="productoObj.kilos"
                label="KG / UNIDAD"
                :dense="true"
                type="number"
                style="font-size: 12px !important"
              />
            </div>

            <div class="col-5 q-mt-sm" style="padding: 0px 5px !important">
              <q-input
                v-model="productoObj.precio"
                label="PRECIO / KG"
                :dense="true"
                type="number"
                style="font-size: 12px !important"
                :readonly="true"
              />
            </div>

            <div class="col-3 q-mt-sm" style="padding: 0px 5px !important">
              <q-input
                v-model="productoObj.cantidad"
                label="CANTIDAD"
                :dense="true"
                type="text"
                style="font-size: 12px !important"
              />
            </div>

            <div class="col-12 q-mt-sm" style="padding: 0px 5px !important">
              <q-input
                v-model="productoObj.subTotal"
                label="SUB TOTAL"
                :dense="true"
                type="number"
                style="font-size: 12px !important"
                :readonly="true"
              />
            </div>
          </div>

          <q-card-actions align="right">
            <q-btn flat label="CERRAR" color="grey-10" v-close-popup />
            <q-btn
              :disable="productoObj.subTotal === 0"
              label="GUARDAR"
              color="blue-grey-10"
              text-color="blue-grey-1"
              @click="agregarProducto"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

<!-- /////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////// PDF //////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////////////////// -->

      <!-- <div style="position: fixed !important; top: 0px; left: 0px"> -->
      <PDFcontainer ref="PDF_Cont" />
      <ModalEliminar ref="modalEliminar" />
      <ModalResumenVentas ref="modalResumenVentas" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ModalEliminar from "../components/modalEliminarVenta";
import { mapState, mapMutations } from "vuex";
import PDFcontainer from "../components/pdfContainer"
import ModalResumenVentas from '../components/modals/modalResumenVentas'
const config = {
  "Content-Type": "application/json",
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
};

window.addEventListener("resize", () => { 
  try { document.getElementById("tablaVentas").style.height = `${window.innerHeight - 88}px`;  } catch (error) {}
});

var ctrlPresionado = false
document.addEventListener("keydown", function(e) { e.keyCode === 17 ? ctrlPresionado = true : null })
document.addEventListener("keyup", function(e) { e.keyCode === 17 ? ctrlPresionado = false : null })

export default {
  name: "PageIndex",
  components: {
    ModalEliminar, PDFcontainer, ModalResumenVentas
  },
  data() {
    return {
      keyPressed:false,
      nuevoProd: true,
      shadowTxt: ' %',
      labelInputDesc: 'PORCENTAJE',
      descPorc: true,
      txtStatusPago: "STATUS PAGO",
      statPago: null,
      txtStatusEntrega: "STATUS ENTREGA",
      statEntrega: null,
      txtSemana: "SEM",
      txtMes: "MES",
      listaFiltrada: [],
      txtFilterVendedor: "",
      txtFilterRepartidor: "",
      txtFilterCliente: "",
      searchByVendedor: false,
      searchByCliente: false,
      searchByRepartidor:false,
      costoEnvio: 0,
      visibleColumns: [
        "status1",
        "status2",
        "vendedor",
        "nombre",
        /*'direccion',*/ "semana",
        "mes",
        "diaDespacho",
        "repartidor",
        "productos",
        "descuento",
        "total",
        "accion",
      ],
      mostrarCircular: true,
      filter: "",
      inputDesactivado: true,
      costoEnvio: 0,
      clienteBusqueda: "",
      btnPDFvisible: true,
      verificarUsuario: "",
      componentKey: 0,
      status1: false,
      status2: true,
      alert: false,
      alertProd: false,
      productosVenta: [],
      pagination: {
        sortBy: "desc",
        descending: true,
        page: 1,
        rowsPerPage: 25,
      },
      productoObj: {
        idProducto: "",
        nemo: "",
        producto: "",
        precio: 0,
        kilos: 0,
        cantidad: 0,
        subTotal: 0,
      },
      form: {
        apEnvio: true,
        productos: [],
        nombre: "",
        direccion: "",
        mes: "",
        semana: "",
        diaDespacho: "",
        repartidor: "",
        total: 0,
        id: "",
        descuento: 0,
        porcdesc:true
      },
      total: 0,
      nombreColumnas: [
        {
          name: "status1",
          align: "center",
          field: "status1",
          label: "Status Pago",
          headerClasses: "bg-blue-9 text-white colStatus",
        },
        {
          name: "status2",
          align: "center",
          field: "status2",
          label: "Status Entrega",
          headerClasses: "bg-blue-9 text-white colStatus",
        },
        {
          name: "vendedor",
          align: "center",
          field: "vendedor",
          label: "Vendedor",
          headerClasses: "bg-blue-9 text-white colStatus",
          field: (row) => row.usu,
          sortable: true,
        },
        {
          name: "nombre",
          align: "center",
          field: "nombre",
          label: "Cliente",
          headerClasses: "bg-blue-9 text-white",
          field: (row) => row.nom,
          sortable: true,
        },
        {
          name: "direccion",
          align: "center",
          field: "direccion",
          label: "Dirección",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "semana",
          align: "center",
          field: "semana",
          label: "SEM",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "mes",
          align: "center",
          field: "mes",
          label: "MES",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "diaDespacho",
          align: "center",
          field: "diaDespacho",
          label: "DESPACHO",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "repartidor",
          align: "center",
          field: "repartidor",
          label: "REPARTIDOR",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "productos",
          align: "center",
          field: "productos",
          label: "Productos",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "descuento",
          align: "center",
          field: "descuento",
          label: "Descuento",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "total",
          align: "center",
          field: "total",
          label: "Total",
          headerClasses: "bg-blue-9 text-white",
        },
        {
          name: "accion",
          align: "center",
          field: "accion",
          align: "center",
          label: "Acción",
          headerClasses: "bg-blue-9 text-white",
        },
      ],
      arrayDias: [
        { label: "LUNES", value: 1 },
        { label: "MARTES", value: 2 },
        { label: "MIÉRCOLES", value: 3 },
        { label: "JUEVES", value: 4 },
        { label: "VIERNES", value: 5 },
        { label: "SÁBADO", value: 6 },
        { label: "DOMINGO", value: 7 },
      ],
      arrayMeses: [
        { label: "ENERO", value: 1 },
        { label: "FEBRERO", value: 2 },
        { label: "MARZO", value: 3 },
        { label: "ABRIL", value: 4 },
        { label: "MAYO", value: 5 },
        { label: "JUNIO", value: 6 },
        { label: "JULIO", value: 7 },
        { label: "AGOSTO", value: 8 },
        { label: "SEPTIEMBRE", value: 9 },
        { label: "OCTUBRE", value: 10 },
        { label: "NOVIEMBRE", value: 11 },
        { label: "DICIEMBRE", value: 12 },
      ],
      arraySemanas: [
        { label: "SEM 1", value: 1 },
        { label: "SEM 2", value: 2 },
        { label: "SEM 3", value: 3 },
        { label: "SEM 4", value: 4 },
        { label: "SEM 5", value: 5 },
      ],
    };
  },
  methods: {
    ...mapMutations([
      "setUsuario",
      "setListaMercados",
      "setNombrePagina",
      "setPermisos",
      "setListaClientes",
      "setListaTrades",
      "setRepartidores",
      "setlistaMercadosByFiltro",
      "setListaResumen"
    ]),
    verCtrlStatus1(id){
      ctrlPresionado ? this.cambioStatus1(id) : null;
      // if(ctrlPresionado){
      //   this.cambioStatus1(id)
      // }
    },
    verCtrlStatus2(id){
      ctrlPresionado ? this.cambioStatus2(id) : null;
      // if(ctrlPresionado){
      //   this.cambioStatus2(id)
      // }
    },
    editarProdDetalle(obj){
      this.nuevoProd = false;
      let prod = this.listadoTrades.filter((el) => el.nemo === obj.nemo)

      this.productoObj.producto = prod[0].nom; 
      this.productoObj.nemo = prod[0].nemo;
      this.productoObj.precio = prod[0].prec;
      this.productoObj.kilos = prod[0].cant;
      this.productoObj.cantidad = obj.cant;
      this.productoObj.subTotal = (parseFloat(obj.pre) * parseFloat(obj.cant)).toFixed(0);
      
      this.alertProd = true;
    },
    generarResumen(){

      if(this.listaResumen.length > 0) {
        this.$refs.modalResumenVentas.mostrar = true;
        return;
      }
      var listaNueva = JSON.parse(JSON.stringify(this.listaMercados))
      var total = 0;
      let li = listaNueva.reduce((acc, el) => { return [...acc, el.prods].flat() }, []);
      var acum = []
      li.forEach(el => {
        total += el.cant * el.pre;
        var existe = acum.findIndex((ell) => ell.nemo === el.nemo)
        if(existe === -1) { acum.push(el) }
        else { acum[existe].cant = parseFloat((parseFloat(acum[existe].cant) + parseFloat(el.cant)).toFixed(2)) }
      })
      total = (total / 1000).toFixed(2) * 1000;

      acum.forEach((el, index) => {
        let elemento = this.listadoTrades.find(ell => ell.nemo === el.nemo);
        acum[index].stk = elemento.stk;
      });
      this.setListaResumen(acum);

      this.$refs.modalResumenVentas.total = total;

      this.txtSemana == "SEM" ? this.$refs.modalResumenVentas.semana = 'TODAS' : this.$refs.modalResumenVentas.semana = this.txtSemana;
      this.txtMes == "MES" ? this.$refs.modalResumenVentas.mes = 'TODOS' : this.$refs.modalResumenVentas.mes = this.txtMes;
      this.$refs.modalResumenVentas.mostrar = true;
    },
    verTxtDescuento(){
      this.form.descuento === '' || this.form.descuento === null ? this.form.descuento = 0 : null;
    },
    focusTxtDescuento(){
      this.form.descuento === 0 ? this.form.descuento = '' : null;
      // this.form.descuento === '' || this.form.descuento === null ? this.form.descuento = 0 : null;
    },
    filtrado() {
      let lista_ = this.listaMercados_;
      if (this.statPago != null) {
        lista_ = lista_.filter((el) => {
          return el.stat[0] == this.statPago;
        });
      }
      if (this.statEntrega != null) {
        lista_ = lista_.filter((el) => {
          return el.stat[1] == this.statEntrega;
        });
      }
      if (this.txtSemana != "SEM") {
        lista_ = lista_.filter((el) => {
          return el.sem === this.txtSemana;
        });
      }
      if (this.txtMes != "MES") {
        lista_ = lista_.filter((el) => {
          return el.mes === this.txtMes;
        });
      }
      if(this.txtFilterVendedor != '') {
        lista_ = lista_.filter((el) => {
          return el.usu.toLowerCase().match(`${this.txtFilterVendedor.toLowerCase()}`);
        });
      }
      if(this.txtFilterCliente != '') {
        lista_ = lista_.filter((el) => {
          return el.nom.toLowerCase().match(`${this.txtFilterCliente.toLowerCase()}`);
        });
      }
      if(this.txtFilterRepartidor != '') {
        lista_ = lista_.filter((el) => {
          return el.rep.toLowerCase().match(`${this.txtFilterRepartidor.toLowerCase()}`);
        });        
      }

      this.setlistaMercadosByFiltro(lista_);
      this.setListaResumen([]);

      // var listaNueva = JSON.parse(JSON.stringify(lista_))

      // let li = listaNueva.reduce((acc, el) => { return [...acc, el.prods].flat() }, []);
      // var acum = []
      // li.forEach(el => {
      //   var existe = acum.findIndex((ell) => ell.nemo === el.nemo)
      //   if(existe === -1) { acum.push(el) }
      //   else { acum[existe].cant = (parseFloat(acum[existe].cant) + parseFloat(el.cant)).toFixed(1) }
      // })
      // console.log(acum)
    },
    filtrarPorStatusEntrega(statusEntrega) {
      this.statEntrega = statusEntrega;
      if (this.statEntrega == null) {
        this.txtStatusEntrega = "STATUS ENTREGA";
      } else {
        statusEntrega == true ? (this.txtStatusEntrega = "ENTREGADO") : (this.txtStatusEntrega = "POR ENTREGAR");
      }
      this.filtrado();
    },
    filtrarPorStatusPago(statusPago) {
      this.statPago = statusPago;
      if (this.statPago == null) {
        this.txtStatusPago = "STATUS PAGO";
      } else {
        statusPago == true ? (this.txtStatusPago = "PAGADO") : (this.txtStatusPago = "POR PAGAR");
      }
      this.filtrado();
    },
    filtrarPorSemana(semana) {
      if (semana === "0") {
        this.txtSemana = "SEM";
      } else {
        this.txtSemana = semana;
      }
      this.filtrado();
    },
    filtrarPorMes(mes) {
      if (mes === "0") {
        this.txtMes = "MES";
      } else {
        this.txtMes = mes;
      }
      this.filtrado();
    },
    generarPDF(obj) {
      this.$refs.PDF_Cont.costoEnvio = this.costoEnvio;
      this.$refs.PDF_Cont.obj = obj;
      this.$refs.PDF_Cont.crearPDF(obj.id);
      // var doc = new jsPDF();
      // doc.html(document.getElementById("pdfContainer"), {
      //   callback: function (doc) {
      //     doc.save(`ventaID_${obj.id}.pdf`);
      //   },
      //   x: 10,
      //   y: 10,
      // });
    },
    cambioStatus1(id, event) {
      let status_;
      let in_ = 0;
      this.listaMercados.forEach(function (obj, index) {
          if (obj._id === id) {
            status_ = this.listaMercados[index].stat[0];
            if (status_ === true) status_ = false;
            else status_ = true;
            this.listaMercados[index].stat[0] = status_;
            in_ = index;
          }
        }.bind(this)
      );
      axios.post(`${this.url}cambioStatus`, this.listaMercados[in_], config).then(function (resp) {
            if (resp.data.icono !== "error")
              this.$refs.tablaPrincipal.$forceUpdate();
              this.showNotif("top", resp.data.mensaje, resp.data.icono, resp.data.color, "black");
          }.bind(this)
        );
    },
    cambioStatus2(id, event) {
      let status_;
      let in_ = 0;
      this.listaMercados.forEach(function (obj, index) {
          if (obj._id === id) {
            status_ = this.listaMercados[index].stat[1];
            if (status_ === true) status_ = false;
            else status_ = true;
            this.listaMercados[index].stat[1] = status_;
            in_ = index;
          }
        }.bind(this)
      );
      axios.post(`${this.url}cambioStatus`, this.listaMercados[in_], config).then( function (resp) {
          if (resp.data.icono !== "error")
            this.$refs.tablaPrincipal.$forceUpdate();
            this.showNotif("top", resp.data.mensaje, resp.data.icono, resp.data.color, "black");
        }.bind(this)
      );
    },
    async traerRepartidores() {
      try {
        let resp = await axios.get(`${this.url}traerRepartidores`, config); 
        resp.data.icono ? null : this.setRepartidores(resp.data);
      } catch (err) {
        this.showNotif("top", "El servidor no responde!", "error", "red-4", "black");
      }
    },
    eliminarProdCarro(index) {
      this.form.productos.splice(index, 1);
      this.form.productos.length === 0 ? this.form.descuento = 0 : null;
      this.calculoTotal(this.form.productos);
    },
    agregarProducto() {
      let encontrado = this.form.productos.findIndex((el) => el.nemo === this.productoObj.nemo);
      if(encontrado !== -1 && this.nuevoProd === true){
        this.showNotif("top", `Producto <b>${this.productoObj.nemo}</b> ya fué agregado!`, "error", "yellow-14", "black");
        return;
      }
      else {
        if(encontrado !== -1){
          this.form.productos[encontrado] = { 
            nemo: this.productoObj.nemo,
            prod: this.productoObj.producto,
            cant: this.productoObj.cantidad,
            pre: this.productoObj.precio,
          }
        } else {
          this.form.productos = [...this.form.productos, ...[{
            nemo: this.productoObj.nemo,
            prod: this.productoObj.producto,
            cant: this.productoObj.cantidad,
            pre: this.productoObj.precio,
          }]]
        }
        this.calculoTotal(this.form.productos);
        this.productoObj.nemo = "";
        this.productoObj.producto = "";
        this.productoObj.idProducto = "";
        this.productoObj.precio = 0;
        this.productoObj.kilos = 0;
        this.productoObj.cantidad = 0;
        this.productoObj.subTotal = 0;      
      }
    },
    modalEliminar(prod) {
      this.$refs.modalEliminar.mostrar = true;
      this.$refs.modalEliminar.idVenta = prod._id;
    },
    modal(obj) {
      this.alert = !this.alert;
      if (obj) {
        this.inputDesactivado = true;
        this.btnPDFvisible = true;
        let obj_ = JSON.parse(JSON.stringify(obj));
        this.arraySemanas.forEach(function (sem) {
          if (sem.label === obj_.sem) {
            this.form.semana = sem;
            return;
          }
        }.bind(this));
        this.arrayMeses.forEach(function (mes) {
          if (mes.label === obj_.mes) {
            this.form.mes = mes;
            return;
          }
        }.bind(this));
        this.form.nombre = obj_.nom;
        this.form.direccion = obj_.dir;
        this.form.diaDespacho = obj_.ddesp;
        this.form.productos = obj_.prods;
        this.form.repartidor = obj_.rep;
        this.form.total = obj_.tot;
        this.total = obj_.tot;
        this.form.id = obj_._id;
        this.form.apEnvio = obj_.apenv;
        this.form.descuento = obj_.desc;
        this.form.apEnvio === true ? this.costoEnvio = 2500 : this.costoEnvio = 0;
        this.total += this.costoEnvio - this.form.descuento;
        this.form.porcdesc = obj_.porcdesc;
      } else {
        this.inputDesactivado = false;
        this.btnPDFvisible = false;
        var mes = new Date().getMonth() + 1;
        var dia = new Date().getDate();
        // console.log(dia, mes);
        if (dia <= 7) {
          this.form.semana = { label: "SEM 1", value: 1 };
        } else if (dia > 7 && dia <= 14) {
          this.form.semana = { label: "SEM 2", value: 2 };
        } else if (dia > 14 && dia <= 21) {
          this.form.semana = { label: "SEM 3", value: 3 };
        } else if (dia > 21 && dia <= 28) {
          this.form.semana = { label: "SEM 4", value: 4 };
        } else if (dia > 28) {
          this.form.semana = { label: "SEM 5", value: 5 };
        }
        this.arrayMeses.forEach((el) => {
          if (el.value === mes) {
            this.form.mes = el;
            return;
          }
        });
        this.form.descuento = 0;
        this.form.nombre = "";
        this.form.direccion = "";
        this.form.diaDespacho = "";
        this.form.productos = [];
        this.form.repartidor = "";
        this.form.total = 0;
        this.form.id = "";
      }
      this.traerRepartidores();
    },
    guardar() {
      this.form.descuento === '' || this.form.descuento === null ? this.form.descuento = 0 : null;

      if (this.form.nombre === "") {
        this.showNotif("top", "Debe ingresar un Cliente!", "error", "yellow-14", "black");
        return;
      } else if (this.form.repartidor === "") {
        this.showNotif("top", "Debe asignar un repartidor!", "error", "yellow-14", "black");
        return;
      } else if (this.form.repartidor === "") {
        this.showNotif("top", "Debe asignar un repartidor!", "error", "yellow-14", "black");
        return;
      }
      axios.post(`${this.url}ventas`, this.form, config).then(function (resp) {
        this.alert = !this.alert;
        if (resp.data.icono !== "error") {
          this.resetForm();
          this.traerListaVentas();
        }
        this.showNotif("top", resp.data.mensaje, resp.data.icono, resp.data.color, "black");
      }.bind(this))
        .catch(
          function (err) {
            this.showNotif("top", "El servidor no responde, no se pudo guardar!", "error", "red-4", "black");
        }.bind(this));
    },
    async traerProductos() {
      try {
        const productos = await axios.get(`${this.url}listaProductos`, config);
        productos.data.icono ? null : this.setListaTrades(productos.data);
      } catch (err) {
       this.showNotif("top", "El servidor no responde!", "error", "red-4", "black");
      }
    },
    async traerListaVentas() {
      try {
        let ventas = await axios.get(`${this.url}listaVentas`, config);
        if (ventas.data.icono){
          this.showNotif("top", ventas.data.mensaje, ventas.data.icono, ventas.data.color, "black");
          this.mostrarCircular = false;
        } else {
          this.setListaMercados(ventas.data);
        }
      } catch (err) {
        this.showNotif("top", "El servidor no responde!", "error", "red-4", "black");
      }
    },
    async traerClientes () {
      try {
        const clientes = await axios.get(`${this.url}traerClientes`, config);
        clientes.data.icono ? null : this.setListaClientes(clientes.data);  
      } catch (err) {
        this.showNotif("top", "El servidor no responde!", "error", "red-4", "black");
      }
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
    },
    resetForm() {
      this.form.productos = [];
      this.form.nombre = "";
      this.form.direccion = "";
      this.form.diaDespacho = "";
      this.form.repartidor = "";
      this.form.id = "";
      this.form.descuento = 0;
    },
    calculoTotal(productos) {
      this.costoEnvio = 0;
      this.total = productos.reduce((acc, el) => {
        return acc + (el.cant * el.pre);
      }, 0);

      if (this.form.porcdesc) {
        if(this.form.descuento > 50){
          this.showNotif('top','El descuento no puede ser mayor a 50%','error','red-4','black');
          this.form.descuento = 0;
          this.$refs.porcDescuento.blur();
        }
      } else {
        if(this.form.descuento > this.total){
          this.showNotif('top','El descuento excede el total a pagar','error','red-4','black');
          this.form.descuento = 0;
          this.$refs.txtDescuento.blur();
        }
      }

      this.form.total = this.total;

      if (this.total < 30000) { this.form.apEnvio = true;   this.costoEnvio = 2500; }
      else { this.form.apEnvio = false; }

      if (this.form.porcdesc) { this.total -= this.total * (this.form.descuento / 100); }
      else { this.total -= this.form.descuento; }

      this.total = ((this.total) / 1000).toFixed(2) * 1000;
      this.total += this.costoEnvio;
      this.setListaResumen([]);
    },
  },
  watch: {
    "form.porcdesc": function(nv, ov){
      // this.form.descuento = 0;
      this.inputDesactivado === false ? this.form.descuento = 0 : null;

      // if(nv === true){
      //   this.shadowTxt = ' %';
      //   this.labelInputDesc = 'PORCENTAJE';
      // }
      // else{
      //   this.shadowTxt = ' $';
      //   this.labelInputDesc = 'DESCUENTO';
      // }
    },
    "form.nombre": function (nv, ov) {
      if (nv === null) {
        nv = "";
        this.form.direccion = "";
      }
      this.listaClientes.forEach(
        function (el) {
          if (el.nom === nv) {
            this.form.direccion = el.dir;
          }
        }.bind(this)
      );
    },
    "productoObj.producto": function (nv, ov) {
      if (nv === null) {
        this.productoObj.nemo = "";
        this.productoObj.producto = "";
        this.productoObj.idProducto = "";
        this.productoObj.precio = 0;
        this.productoObj.kilos = 0;
        this.productoObj.cantidad = 0;
        this.productoObj.subTotal = 0;
        return;
      }

      var el = this.listadoTrades.filter((ell) => ell.nom === nv)

      if(el.length > 0){
        this.productoObj.idProducto = el[0]._id;
        this.productoObj.nemo = el[0].nemo;
        this.productoObj.producto = el[0].nom;
        this.productoObj.kilos = el[0].cant;
        this.productoObj.cantidad === 0 ? this.productoObj.cantidad = 1 : null;
        this.productoObj.precio = el[0].prec;
        this.productoObj.subTotal = parseInt(el[0].precio * el[0].cantidad);
      }
    },
    "productoObj.cantidad": function (nv, ov) {
      //#region ESTE CODIGO ES PARA LIMITAR un UN INPUT TEXT A SOLO NUMEROS Y EL CARACTER "." COMO SEPARADOR DECIMAL
      if (nv.length > 0 && nv !== ''){
        let ascii = nv.charCodeAt(nv.length - 1);
        (ascii < 48 || ascii > 57) && ascii !== 46 ? this.$nextTick(() => this.productoObj.cantidad = ov ) : null;
        nv.length === 1 && ascii === 46 ? this.$nextTick(() => this.productoObj.cantidad = ov ) : null;
      }
      //#endregion

      //#region ESTE CODIGO ES PARA LIMITAR A DOS DECIMALES
      if(this.productoObj.cantidad.toString().indexOf('.') !== -1){
        let largo = this.productoObj.cantidad.substr(this.productoObj.cantidad.indexOf('.') + 1,this.productoObj.cantidad.length - 1);
        largo.length > 2 ? this.$nextTick(() => this.productoObj.cantidad = ov ) : null;
      }
      //#endregion


      this.productoObj.subTotal = parseInt(
        this.productoObj.precio * nv * this.productoObj.kilos
      );
    },
    "form.descuento": function (nv) {
      this.costoEnvio = 0;
      this.total = this.form.productos.reduce((acc, el) => {
        return acc + (el.cant * el.pre)
      }, 0);

      if (this.form.porcdesc) {
        if(nv > 50){
          this.showNotif('top','El descuento no puede ser mayor a 50%','error','red-4','black');
          this.form.descuento = 0;
          this.$refs.porcDescuento.blur();
        }
      } else {
        if(nv > this.total){
          this.showNotif('top','El descuento excede el total a pagar','error','red-4','black');
          this.form.descuento = 0;
          this.$refs.txtDescuento.blur();
        }
      }

      this.form.total = this.total;

      if (this.form.porcdesc) { this.total -= this.total * (this.form.descuento / 100); }
      else { this.total -= this.form.descuento; }

      if (this.total < 30000 && this.form.apEnvio) { this.costoEnvio = 2500; }
      
      this.total = ((this.total) / 1000).toFixed(2) * 1000;
      this.total += this.costoEnvio;
    },
    "txtFilterVendedor": function (nv, ov) {
      this.filtrado();
    },
    "txtFilterCliente": function (nv, ov) {
      this.filtrado();
    },
    "txtFilterRepartidor": function (nv, ov) {
      this.filtrado();
    },
    "form.apEnvio": function (nv, ov) {
      this.costoEnvio = 0;
      this.total = this.form.productos.reduce((acc, el) => {
        return acc + (el.cant * el.pre);
      }, 0);

      this.form.total = this.total;

      if (this.form.porcdesc) { this.total -= this.total * (this.form.descuento / 100); }
      else { this.total -= this.form.descuento; } 

      this.total = ((this.total) / 1000).toFixed(2) * 1000;

      if(nv === true){
        this.costoEnvio = 2500;
        this.total += this.costoEnvio;
      }
    },
  },
  mounted() {
    this.verificarUsuario = localStorage.getItem("usuario");
    this.listaMercados.length === 0 ? this.traerListaVentas() : null;

    setTimeout(() => {
      try {
        document.getElementById("tablaVentas").style.height = `${window.innerHeight - 88}px`;
      } catch (error) {}
    }, 2500);

    this.traerProductos();
    this.traerClientes();
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      this.setUsuario(usuario);
    }
    this.setNombrePagina("Ventas");
    // this.setPermisos(JSON.parse(localStorage.getItem('p'))) ////////NO SABEMOS SI ESTO VA A APLICAR A FUTURO... POR LAS MOSCAS NO LO BORRES, PAYASO...
  },
  computed: {
    ...mapState([
      "usuario",
      "url",
      "listaMercados",
      "listaMercados_",
      "nombrePagina",
      "permisos",
      "listadoTrades",
      "listaClientes",
      "listaRepartidores",
      "sumaCant",
      "listaResumen"
    ]),
  },
};
</script>

<style>
.q-toggle__label {
  color: #fff;
}
.ocultoVaina {
  display: none !important;
}
button.btnFiltro > span > span > i {
  margin-left: 2px !important;
  margin-top: 1px !important;
}
input.HHHHHHHHH {
  outline: none;
  width: 100px !important;
  background: transparent !important;
  color: #fff;
  display: inline-block !important;
  border: 2px solid #26a69a !important;
  border-radius: 4px 0px 0px 4px !important;
  height: 27px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.q-field__control,
.q-field__native,
.q-field__label,
.valorPuntoTxt {
  color: #fff;
}
div.q-table__bottom {
  background: #1565c0 !important;
}

.fila {
  width: 100%;
  display: table;
  table-layout: fixed;
}
.columna {
  background-color: transparent !important;
  height: 8px !important;
  border-bottom: 0px solid #fff !important;
  border-top: 0px solid #fff !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.columna {
  background-color: transparent !important;
  height: 8px !important;
  border-bottom: 0px solid #fff !important;
  border-top: 0px solid #fff !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

thead,
tr,
th {
  position: sticky;
  z-index: 100 !important;
  color: #000 !important;
}
thead tr:last-child th {
  top: 48px;
}
thead tr:first-child th {
  top: 0px;
}

.txtBuscarCliente:focus {
  outline: none !important;
  border: 0px solid red;
  background-color: #eef1f5 !important;
}

.q-table__top {
  background: transparent !important;
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 0px !important;
  padding-bottom: 3px !important;
  width: 100% !important;
  overflow-x: hidden !important;
}
.q-table-top > .q-table-control {
  overflow-x: hidden !important;
}
</style>