<template>
  <v-app id="example-2" standalone>

    <v-toolbar fixed class="indigo darken-4" dark>
      <v-icon dark>home</v-icon>
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
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
