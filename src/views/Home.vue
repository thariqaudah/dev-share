<template>
  <div class="home">
    <Showcase v-if="!user" />
    <ListArticles :articles="articles" />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Showcase from '../components/Showcase.vue';
import ListArticles from '../components/ListArticles.vue';
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';

export default {
  name: 'Home',
  components: { Showcase, ListArticles },
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
.home {
  /* display: grid;
  grid-template-columns: 1fr 2fr 1fr; */
}
</style>
