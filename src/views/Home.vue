<template>
  <div class="home">
    <section class="showcase container">
      <img src="../assets/showcase.jpg" alt="showcase" />
      <div class="text">
        <h1>Where you share and get some inspiration</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
          placeat eaque minima assumenda eligendi et!
        </p>
        <router-link class="btn btn-primary" :to="{ name: 'GetStarted' }"
          >Get Started</router-link
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.showcase {
  width: 100%;
  max-height: 600px;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
  position: relative;
}
.showcase img {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -1;
}
.showcase .text {
  color: #fff;
  align-self: flex-start;
  padding: 60px;
}
.showcase .text h1 {
  margin-bottom: 10px;
  font-size: 2rem;
}
.showcase .text a {
  margin-top: 20px;
  transition: all 0.1s;
}
.showcase .text a:hover {
  transform: scale(1.02);
  background: var(--primary-color);
  color: #fff;
}
</style>
