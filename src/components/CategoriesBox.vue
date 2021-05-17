<template>
  <div class="categories-box card">
    <h4 class="border-bottom">Categories</h4>
    <ul>
      <li><router-link to=""><h5>Web Development</h5></router-link></li>
      <li><router-link to=""><h5>Frontend Dev</h5></router-link></li>
      <li><router-link to=""><h5>Backend Dev</h5></router-link></li>
      <li><router-link to=""><h5>Machine Learning</h5></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoriesBox'
};
</script>

<style scoped>
.categories-box {
  align-self: start;
}
ul {
  margin-top: 20px;
}
ul li {
  margin: 20px 0;
}
ul li h5 {
  font-size: 1rem;
}
ul a {
  padding: 0;
}
</style>
