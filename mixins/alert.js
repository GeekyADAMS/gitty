export default {
  methods: {
    showError(message) {
      this.errMessage = message
      setTimeout(() => {
        this.errMessage = null
      }, 4000)
    }
  }
}