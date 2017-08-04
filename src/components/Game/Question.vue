<template>
  <v-layout row wrap>
    <v-flex sm4 md2 offset-sm5>
      <v-card dark class="primary mt-1 mb-1 text-xs-center">
        <v-card-text v-on:click="speak">
          <h2 v-if="written">{{questionDisplay}}</h2>
          <div v-if="spoken"><v-btn flat primary :loading="talking > 0"><v-icon x-large>play_arrow</v-icon></v-btn></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>  
</template>

<script>
import { mapGetters } from 'vuex'

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
  created: function () {
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
      'type'
    ]),
    questionDisplay: function () {
      if (this.type === WRITTEN_KANA_TO_SELECT_ROMAJI) {
        return this.question.kana
      } else if (this.type === WRITTEN_ROMAJI_TO_SELECT_KANA) {
        return this.question.romaji
      } else if (this.type === SPOKEN_TO_SELECT_KANA) {
        return
      }
    },
    written: function () {
      return this.type === WRITTEN_KANA_TO_SELECT_ROMAJI || this.type === WRITTEN_ROMAJI_TO_SELECT_KANA
    },
    spoken: function () {
      return this.type === SPOKEN_TO_SELECT_KANA
    }
  },
  methods: {
    speak: function () {
      if (this.spoken) {
        this.talking = this.voices.length
        this.voices.forEach(voice => {
          const message = new window.SpeechSynthesisUtterance()
          message.text = this.question.kana
          message.voice = voice
          message.rate = 0.5
          message.onend = () => {
            this.talking = this.talking - 1
          }
          this.synth.speak(message)
        })
      }
    },
    listenForSpeechEvents: function () {

    }
  }
}
</script>
