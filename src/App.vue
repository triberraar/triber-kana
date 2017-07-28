<template>
  <v-app id="example-2" standalone>

    <v-toolbar fixed class="indigo darken-4" dark>
      <v-icon dark v-on:click="home">home</v-icon>
      <v-toolbar-title>かな あったく</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import { HOME } from '@/router/constants'

  export default {
    data () {
      return {

      }
    },
    methods: {
      home: function () {
        this.$router.push({name: HOME})
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
