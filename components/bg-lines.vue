<template>
<div class="bg-lines">
  <div class="lines__line"></div>
  <div class="lines__line"></div>
  <div class="lines__line"></div>
  <div class="lines__line"></div>
  <div class="lines__line"></div>
  <div class="lines__line"></div>
</div>
</template>

<style scoped>
.lines__line+.lines__line {
  border-left: 1px dashed rgba(255, 255, 255, .2);
  border-left-width: 1px;
  border-left-style: dashed;
  border-left-color: rgba(255, 255, 255, .4);
}

.lines__line {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
</style>
