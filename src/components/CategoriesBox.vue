<template>
  <div class="categories-box card">
    <h4 class="border-bottom">Categories</h4>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link
          :to="{ name: 'CategoryArticles', params: { catId: category.id } }"
          ><h5>{{ category.name }}</h5></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import getCollection from '@/composables/getCollection';

export default {
  name: 'CategoriesBox',
  setup() {
    const { error, documents: categories, getDocs } = getCollection(
      'categories'
    );

    const fetchDocuments = async () => {
      await getDocs();
    };

    onMounted(async () => await fetchDocuments());

    return { error, categories };
  },
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
