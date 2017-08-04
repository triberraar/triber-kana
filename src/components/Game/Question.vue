<template>
  <v-layout row wrap>
    <v-flex sm4 md2 offset-sm5>
      <v-card dark class="primary mt-1 mb-1 text-xs-center">
        <v-card-text v-on:click="play">
          <h2 v-if="written">{{questionDisplay}}</h2>
          <div v-if="spoken"><v-btn flat primary :loading="talking > 0"><v-icon x-large>play_arrow</v-icon></v-btn></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>  
</template>

<script>
import { mapGetters } from 'vuex'

import speaker from '@/mixins/speaker'
import { WRITTEN_KANA_TO_SELECT_ROMAJI, WRITTEN_ROMAJI_TO_SELECT_KANA, SPOKEN_TO_SELECT_KANA } from './constants'

export default {
  data () {
    return {
      synth: speechSynthesis,
      voiceList: [],
      voices: [],
      talking: false
    }
  },
  mixins: [speaker],
  created () {
    this.voiceList = this.synth.getVoices()
    this.voices = this.voiceList.filter(it => it.lang === 'ja-JP')
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices()
      this.voices = this.voiceList.filter(it => it.lang === 'ja-JP')
    }
  },
  computed: {
    ...mapGetters([
      'question',
      'mode'
    ]),
    questionDisplay () {
      if (this.mode === WRITTEN_KANA_TO_SELECT_ROMAJI) {
        return this.question.kana
      } else if (this.mode === WRITTEN_ROMAJI_TO_SELECT_KANA) {
        return this.question.romaji
      } else if (this.mode === SPOKEN_TO_SELECT_KANA) {
        return
      }
    },
    written () {
      return this.mode === WRITTEN_KANA_TO_SELECT_ROMAJI || this.mode === WRITTEN_ROMAJI_TO_SELECT_KANA
    },
    spoken () {
      return this.mode === SPOKEN_TO_SELECT_KANA
    }
  },
  methods: {
    play () {
      if (this.spoken) {
        this.speak(this.question.kana)
      }
    }
  }
}
</script>
