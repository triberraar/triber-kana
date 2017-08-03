import Vue from 'vue'

class Bus {
  constructor () {
    this.vue = new Vue()
  }

  fire (event, data = null) {
    this.vue.$emit(event, data)
  }

  listen (event, cb) {
    this.vue.$on(event, cb)
  }
}

const bus = new Bus()

export { bus }
