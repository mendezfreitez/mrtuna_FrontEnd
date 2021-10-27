<template>
  <div class="fullscreen bg-blue-grey-8 text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 12vh">
        404
      </div>

      <div class="text-h3 text-blue-grey-1" style="opacity:.9">
        No se encontró la dirección
      </div>

      <q-btn
        class="q-mt-xl"
        color="teal-6"
        size="lg"
        text-color="blue-grey-1"
        unelevated
        to="/"
        label="Volver a Inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
