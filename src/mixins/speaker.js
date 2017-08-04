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
  methods: {
    speak (words) {
      this.talking = this.voices.length
      this.voices.forEach(voice => {
        const message = new window.SpeechSynthesisUtterance()
        message.text = words
        message.voice = voice
        message.rate = 0.5
        message.onend = () => {
          this.talking = this.talking - 1
        }
        this.synth.speak(message)
      })
    }
  }
}
