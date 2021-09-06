<template>
  <div class="showcase">
    <h1>In DevShare, you can share and get some inspirations</h1>
    <router-link :to="{ name: 'GetStarted' }" class="btn btn-primary"
      >Get Started With DevShare</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'Showcase',
}
</script>

<style scoped>
.showcase {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  position: relative;
  border-bottom: 1px solid var(--primary-color);
}
.showcase h1 {
  margin-bottom: 20px;
}
</style>
