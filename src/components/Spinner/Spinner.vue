<template>
  <div class="d-flex justify-content-center align-items-center spinner-container">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style lang="scss" scoped>
  .spinner-container {
    height: 100%;
    position: absolute;
    width: 100%;
  }
</style>
