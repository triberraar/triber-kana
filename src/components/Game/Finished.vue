<template>
  <v-layout>
    <v-flex xs10 sm10 offset-sm1>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">You made it, your score:</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="outcome === 'good'" value="true" class="success">
            Well done.
          </v-alert>
           <v-alert v-else-if="outcome === 'ok'" value="true" class="warning">
            You did ok, practice makes perfect.
          </v-alert>
           <v-alert v-else-if="outcome === 'bad'" value="true" class="error">
            Ow this went badly, you better study.
          </v-alert>
          <v-list>
            <v-list-tile v-for="(attempt, index) in attempts" :key="index">
              <v-list-tile-avatar>
                <em>{{attempt.kana}}</em>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-chip v-bind:class="{'success': attempt.amount < 2, 'warning': attempt.amount < 4, 'error': attempt.amount > 3}">{{attempt.amount}} attempt<span v-show="attempt.amount > 1">s</span></v-chip></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn flat class="orange--text" v-on:click="playAgain">Play again</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store'
import { HOME } from '@/router/constants'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'gameResult'
    ]),
    outcome: function () {
      var count = this.gameResult.attempts.reduce(function (sum, value) {
        if (value.amount > 1) {
          return sum + 1
        }
        return sum
      }, 0)
      var state = (count / this.gameResult.numberOfRounds) * 100
      if (state < 20) {
        return 'good'
      } else if (state < 40) {
        return 'ok'
      } else {
        return 'bad'
      }
    },
    attempts: function () {
      return this.gameResult.attempts
    }
  },
  methods: {
    playAgain: function () {
      this.$router.push({name: HOME})
    }
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.gameFinished) {
      next()
    } else {
      next({name: HOME})
    }
  }
}
</script>
