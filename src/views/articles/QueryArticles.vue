<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="query-articles container" v-if="articles">
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ name: 'IndexArticles' }"
          ><h5>All Articles</h5></router-link
        >
      </li>
      <li>/</li>
      <li>
        <router-link to="" class="active"><h5>Query Articles</h5></router-link>
      </li>
    </ol>
    <ListArticles :articles="articles" />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import getCollection from '@/composables/getCollection';
import ListArticles from '@/components/ListArticles.vue';

export default {
  name: 'QueryArticles',
  components: { ListArticles },
  setup() {
    let query;

    if (useRoute().params.catId) {
      query = ['category.id', '==', useRoute().params.catId];
    } else if (useRoute().params.userId) {
      query = ['user.id', '==', useRoute().params.userId];
    }

    const { error, documents: articles, getDocs } = getCollection(
      'articles',
      query
    );

    const fetchDocuments = async () => {
      await getDocs();

      if (!articles.value.length) {
        error.value = 'No article to display';
      }
    };

    onMounted(async () => {
      await fetchDocuments();
    });

    return { error, articles };
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
