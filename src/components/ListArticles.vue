<template>
  <div class="list-articles">
    <div class="card" v-for="article in formattedArticles" :key="article.id">
      <h6 class="author">{{ article.user.displayName }}</h6>
      <router-link :to="{ name: 'SingleArticle', params: { id: article.id } }"
        ><h3 class="title">{{ article.title }}</h3></router-link
      >
      <p class="snippet">
        {{ article.snippet }}
      </p>
      <span>
        <router-link :to="{ name: 'SingleArticle', params: { id: article.id } }"
        >Read more</router-link
      >
      </span>
      <div class="article-info border-top">
        <span class="publishing-time"
          ><i class="fas fa-calendar"></i> {{ article.formattedDate }}</span
        >
        <!-- TODO -->
        <span class="reading-time"
          ><i class="fas fa-clock"></i>7 mins read</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import dateformat from 'dateformat';

export default {
  name: 'ListArticles',
  props: ['articles'],
  setup(props) {
    const formattedArticles = computed(() =>
      props.articles.map((article) => ({
        ...article,
        snippet: `${article.content.substr(0, 100)}...`,
        formattedDate: dateformat(article.createdAt.toDate(), 'mmmm dS'),
      }))
    );

    return { formattedArticles };
  },
};
</script>

<style scoped>
a {
  padding: 0;
}
.card {
  margin-bottom: 10px;
}
.title {
  margin: 20px 0 5px;
}
.article-info {
  display: flex;
  margin-top: 30px;
}
.article-info span {
  font-size: 12px;
  color: #555;
  margin-right: 20px;
}
.article-info i {
  margin-right: 3px;
}
</style>
