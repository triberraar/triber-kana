<template>
  <v-layout row wrap >
    <v-flex sm1 hidden-sm-and-down v-for="i in 3" :key="i"></v-flex>
    <v-flex sm6>
      <v-layout row wrap justify-space-around>
        <v-flex sm2 v-for="(answer, index) in symbolsForRow(rowNumber)" :key="index">
          <v-card class=" mb-1 text-xs-center animated infinite" v-on:click="select(answer)" v-bind:class="computeClasses(answer)">
            <v-card-text ><h3>{{answer.romaji}}</h3></v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex sm1 hidden-sm-and-down v-for="i in 3" :key="i"></v-flex>
  </v-layout>
</template>

<script>
// import { bus } from '@/messaging'
import { SYMBOL_SELECTED } from '@/store/constants'

import { mapGetters, mapActions } from 'vuex'

function kanaEqual (a, b) {
  return a.kana === b.kana && a.romaji === b.romaji
}

export default {
  data () {
    return {
      selectedAnswers: [],
      solved: false
    }
  },
  props: ['rowNumber'],
  created: function () {
  },
  computed: {
    ...mapGetters([
      'question',
      'symbolsForRow',
      'selectedSymbols',
      'question'
    ])
  },

  methods: {
    ...mapActions([
      SYMBOL_SELECTED
    ]),
    select: function (answer) {
      this[SYMBOL_SELECTED](answer)
    },
    computeClasses: function (answer) {
      let ret = []
      if (this.shouldPulse(answer)) {
        ret.push('pulse')
      }
      if (this.shouldBeWarning(answer)) {
        ret.push('warning')
      }
      if (this.shouldBeSuccess(answer)) {
        ret.push('success')
      }
      return ret
    },
    shouldPulse (answer) {
      return (this.selectedSymbols.some((it) => kanaEqual(it, answer)) || (kanaEqual(answer, this.question) && this.solved))
    },
    shouldBeWarning (answer) {
      return (this.selectedSymbols.some((it) => kanaEqual(it, answer)) && !kanaEqual(answer, this.question))
    },
    shouldBeSuccess (answer) {
      return (this.selectedSymbols.some((it) => kanaEqual(it, answer)) && kanaEqual(answer, this.question))
    }
  }
}
</script>
