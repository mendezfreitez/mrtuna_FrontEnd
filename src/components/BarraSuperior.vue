<template>
    <q-bar class="q-electron-drag">
        <q-icon name="laptop_chromebook" />
        <div>Trades App</div>
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimizar" />
        <q-btn dense flat icon="crop_square" @click="maximizar" />
        <q-btn dense flat icon="close" @click="cerrar" />
    </q-bar>
</template>

<script>
// We guard the Electron API calls, but this
// is only needed if we build same app with other
// Quasar Modes as well (SPA/PWA/Cordova/SSR...)

// The code below requires Node Integration being kept turned "on"
// More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration

export default {
  methods: {
    minimizar () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximizar () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        }
        else {
          win.maximize()
        }
      }
    },

    cerrar () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>

<style>

</style>