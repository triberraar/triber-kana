<template>
  <v-layout>
    <v-flex xs10 sm10 offset-sm1>
      <v-card>
        <question></question>
        <answers v-for="i in numberOfRows" :key="i" :rowNumber="i-1"></answers>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import Answers from './Answers'
import Question from './Question'
import { HOME } from '@/router/constants'
import { WRITTEN_KANA_TO_SELECT_ROMAJI, WRITTEN_ROMAJI_TO_SELECT_KANA, SPOKEN_TO_SELECT_KANA } from './constants'

export default {
  computed: {
    ...mapGetters([
      'numberOfSymbols',
      'question',
      'type'
    ]),
    numberOfRows () {
      return this.numberOfSymbols / 6
    },
    questionDisplay () {
      if (this.type === WRITTEN_KANA_TO_SELECT_ROMAJI) {
        return this.question.kana
      } else if (this.type === WRITTEN_ROMAJI_TO_SELECT_KANA) {
        return this.question.romaji
      } else if (this.type === SPOKEN_TO_SELECT_KANA) {
        return
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.gameCanBeStarted) {
      next()
    } else {
      next({name: HOME})
    }
  },
  components: {
    'answers': Answers,
    'question': Question
  }
}
</script>
