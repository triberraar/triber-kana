<template>
  <v-layout>
    <v-flex xs10 sm10 offset-sm1>
      <v-card>
        <v-layout row wrap>
          <v-flex sm4 md2 offset-sm5>
            <v-card dark class="primary mt-1 mb-1 text-xs-center">
              <v-card-text><h2>{{question.kana}}</h2></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <kana-row v-for="i in numberOfRows" :key="i" :rowNumber="i-1"></kana-row>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import KanaRow from './KanaRow'
import { HOME } from '@/router/constants'

export default {
  data () {
    return {
    }
  },
  created: function () {
  },
  computed: {
    ...mapGetters([
      'numberOfSymbols',
      'question'
    ]),
    numberOfRows: function () {
      return this.numberOfSymbols / 6
    }
  },
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.gameCanBeStarted) {
      next()
    } else {
      next({name: HOME})
    }
  },
  components: {
    'kana-row': KanaRow
  }
}
</script>
