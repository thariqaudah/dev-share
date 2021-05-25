<template>
  <div class="index-articles container">
    <router-link class="breadcrumb" :to="{ name: 'IndexArticles' }"
      ><h5>All Articles</h5></router-link
    >
    <main>
      <CategoriesBox />
      <ListArticles :articles="articles" />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import getCollection from '@/composables/getCollection';
import ListArticles from '@/components/ListArticles.vue';
import CategoriesBox from '@/components/CategoriesBox.vue';

export default {
  name: 'IndexArticles',
  components: { ListArticles, CategoriesBox },
  setup() {
    const { error, documents: articles, getDocs } = getCollection('articles');

    const fetchData = async () => {
      await getDocs();
    };

    onMounted(async () => await fetchData());

    return { error, articles };
  },
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: unset;
  column-gap: 20px;
}
</style>
