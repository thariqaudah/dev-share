<template>
  <div class="index-dashboard container">
    <h1>Dashboard</h1>
    <table>
      <tr>
        <th>Article Title</th>
        <th>Category</th>
        <th>Created At</th>
        <th></th>
      </tr>
      <tr v-for="article in formattedArticles" :key="article.id">
        <td>{{ article.title }}</td>
        <td>{{ article.category.name }}</td>
        <td>{{ article.formattedDate }}</td>
        <td></td>
      </tr>
    </table>

    <!-- TODO: -->
    <!-- 1. table of user articles -->
    <!-- 2. Action button to CRUD Article -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import dateformat from 'dateformat';

export default {
  name: 'IndexDashboard',
  setup() {
    const { user } = getUser();
    const { error, documents: articles, getDocs } = getCollection('articles', [
      'user.id',
      '==',
      user.value.uid,
    ]);

    const fetchData = async () => {
      await getDocs();
    };

    const formattedArticles = computed(() =>
      articles.value.map((article) => ({
        ...article,
        formattedDate: dateformat(
          article.createdAt.toDate(),
          'dddd, mmmm dS yyyy'
        ),
      }))
    );

    onMounted(async () => await fetchData());

    return { error, formattedArticles };
  },
};
</script>

<style scoped>
.index-dashboard {
  margin-top: 20px;
}
</style>
