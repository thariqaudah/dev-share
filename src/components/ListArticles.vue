<template>
  <div class="container list-articles">
    <div class="card" v-for="(article, index) in articles" :key="article.id">
      <h6 class="author">{{ article.user.displayName }}</h6>
      <h4 class="title">{{ article.title }}</h4>
      <p class="snippet">
        {{ snippet[index] }}
      </p>
      <div class="article-info border-top">
        <span class="reading-time">7 mins read</span>
        <span class="publishing-time">{{ article.createdAt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ListArticles',
  props: ['articles'],
  setup(props) {
    const snippet = computed(() => {
      return props.articles.map((article) => {
        console.log(article.content.substr(0, 100));
        return `${article.content.substr(0, 200)}...`;
      });
    });

    return { snippet };
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.title {
  margin: 15px 0 5px;
}
.snippet {
  margin-bottom: 20px;
}
.article-info {
  display: flex;
}
.article-info span {
  font-size: 12px;
  color: #555;
  margin-right: 20px;
}
</style>
