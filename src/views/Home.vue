<template>
  <div class="home">
    <Showcase v-if="!user" />
    <main class="container" v-else>
      <!-- <UserBox :user="user" /> -->
      <CategoriesBox />
      <ListArticles :articles="articles" />
      <SearchBox />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import Showcase from '../components/Showcase.vue';
import ListArticles from '../components/ListArticles.vue';
import CategoriesBox from '../components/CategoriesBox.vue';
import SearchBox from '../components/SearchBox.vue';

export default {
  name: 'Home',
  components: { Showcase, ListArticles, CategoriesBox, SearchBox },
  setup() {
    const { user } = getUser();
    const { error, documents: articles, getDocs } = getCollection('articles');

    const fetchData = async () => {
      await getDocs();
    };

    onMounted(async () => await fetchData());

    return { error, articles, user };
  },
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: unset;
  column-gap: 20px;
  margin-top: 20px;
}
</style>
