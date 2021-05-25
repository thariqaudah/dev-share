<template>
  <div class="error container" v-if="error">{{ error }}</div>
  <div class="single-article container" v-if="article">
    <div class="card">
      <ol class="breadcrumb">
        <li>
          <router-link :to="{ name: 'IndexArticles' }"
            ><h5>All Articles</h5></router-link
          >
        </li>
        <li>/</li>
        <li>
          <router-link to="" class="active"
            ><h5>{{ article.title }}</h5></router-link
          >
        </li>
      </ol>
      <div class="cover">
        <img :src="formattedArticle.image.publicUrl" alt="" />
      </div>
      <h1>{{ article.title }}</h1>
      <div class="article-info">
        <span
          ><i class="fas fa-user"></i>
          <router-link
            class="author"
            :to="{
              name: 'UserArticles',
              params: { userId: article.user.id },
            }"
            >{{ formattedArticle.user.displayName }}</router-link
          ></span
        >
        <span
          ><i class="fas fa-calendar"></i>
          {{ formattedArticle.formattedDate }}</span
        >
        <span class="reading-time"
          ><i class="fas fa-clock"></i>7 mins read</span
        >
      </div>
      <article>
        {{ formattedArticle.content }}
      </article>
      <div class="category">
        <span>Category:</span>
        <span class="badge">
          <router-link
            :to="{
              name: 'CategoryArticles',
              params: { catId: formattedArticle.category.id },
            }"
            >{{ formattedArticle.category.name }}</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import getDocument from '@/composables/getDocument';
import dateformat from 'dateformat';

export default {
  name: 'SingleArticle',
  props: ['id'],
  setup(props) {
    const { error, document: article, getDoc } = getDocument(
      'articles',
      props.id
    );

    const fetchDocument = async () => {
      await getDoc();
    };

    const formattedArticle = computed(() => ({
      ...article.value,
      formattedDate: dateformat(
        article.value.createdAt.toDate(),
        'dddd, mmmm dS yyyy'
      ),
    }));

    onMounted(async () => await fetchDocument());

    return { error, article, formattedArticle };
  },
};
</script>

<style scoped>
.single-article,
.error {
  margin-top: 20px;
}
.cover {
  padding: 200px;
  position: relative;
  overflow: hidden;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
h1 {
  margin: 40px 0 20px;
}
a {
  padding: 0;
}
.article-info {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}
.article-info span {
  margin-right: 20px;
}
.article-info i {
  margin-right: 3px;
}
.article-info .author {
  color: var(--primary-color);
}
.category {
  margin-top: 40px;
}
.category .badge {
  margin-left: 10px;
}
</style>
