<template>
<v-layout>
    <v-flex xs10 sm10 offset-sm1>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">New game</h3>
            <div>Time to fight some kana characters　せんとう!</div>
          </div>
        </v-card-title>
        <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
          <v-flex xs3>
            <v-select
              v-bind:items="types"
              v-model="type"
              label="Type"
              single-line
              bottom
              v-bind:error-messages="errorMessage('type')"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-select
              v-bind:items="numberOfRoundsList"
              v-model="numberOfRounds"
              label="Number of rounds"
              single-line
              bottom
              v-bind:error-messages="errorMessage('numberOfRounds')"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

        <v-card-actions>
          <v-btn flat class="orange--text" v-on:click="play">Play !</v-btn>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      types: [
      { text: 'hiragana - ひらがな', value: 'hiragana' }
      ],
      numberOfRoundsList: [
        5, 10, 15, 25, 50
      ],
      type: '',
      numberOfRounds: null,
      errorMessages: []
    }
  },
  methods: {
    play: function () {
      this.$v.$touch()
    },
    errorMessage: function (field) {
      console.log(field)
      if (this.$v[field].$error) {
        if (!this.$v[field].required) {
          return ['Field is required']
        }
      }
      return []
    }
  },
  validations: {
    type: {
      required
    },
    numberOfRounds: {
      required
    }
  }

}
</script>
