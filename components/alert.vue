<template>
<div class="animated fadeInRight">
  <p class="max-tc-border-box tc-p-3 tc-bg-white tc-text-red-600 tc-rounded tc-text-center poppins tc-text-medium">
    {{message}}
  </p>
</div>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      default: 'Wrong user action.'
    }
  }
}
</script>

<style scoped>
div {
  box-shadow: 0 12px 20px rgba(0, 0, 0, .15);
}

p {
  border: 1.5px solid #9966FF;
}
</style>
