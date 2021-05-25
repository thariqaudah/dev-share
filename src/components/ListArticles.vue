<template>
  <div class="list-articles">
    <h2 v-if="title">{{ title }}</h2>
    <div class="card" v-for="article in formattedArticles" :key="article.id">
      <div class="header">
        <router-link
          :to="{
            name: 'UserArticles',
            params: { userId: article.user.id },
          }"
          ><h6 class="author">{{ article.user.displayName }}</h6></router-link
        >
        <span class="badge">
          <router-link
            :to="{
              name: 'CategoryArticles',
              params: { catId: article.category.id },
            }"
            >{{ article.category.name }}</router-link
          >
        </span>
      </div>
      <router-link :to="{ name: 'SingleArticle', params: { id: article.id } }"
        ><h3 class="title">{{ article.title }}</h3></router-link
      >
      <p class="snippet">
        {{ article.snippet }}
      </p>
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
  props: ['title', 'articles'],
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
  display: block;
  padding: 0;
}
.card {
  margin-bottom: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .author {
  color: var(--primary-color);
}
.header .badge {
  font-size: 12px;
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
