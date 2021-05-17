<template>
  <div class="error container" v-if="error">{{ error }}</div>
  <div class="single-article container" v-if="article">
    <div class="card">
      <!-- <nav>
        TODO: breadcrumb
      </nav> -->
      <div class="cover">
        <img :src="formattedArticle.image.publicUrl" alt="">
      </div>
      <h1>{{ article.title }}</h1>
      <div class="article-info">
        <span><i class="fas fa-user"></i> <router-link to="">{{ formattedArticle.user.displayName }}</router-link></span>
        <span><i class="fas fa-calendar"></i> {{ formattedArticle.formattedDate }}</span>
        <span class="reading-time"><i class="fas fa-clock"></i>7 mins read</span>
      </div>
      <article>
        {{ formattedArticle.content }}
      </article>
      <div class="tags">
        <p>Tags:</p>
        <ul>
          <li class="badge" v-for="(tag, index) in formattedArticle.tags" :key="index">
            <router-link to="">{{ tag }}</router-link>
          </li>
        </ul>
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
      formattedDate: dateformat(article.value.createdAt.toDate(), 'dddd, mmmm dS yyyy')
    }));

    onMounted(async () => await fetchDocument());

    return { error, article, formattedArticle };
  },
};
</script>

<style scoped>
.single-article, .error {
  margin-top: 20px;
}
.cover {
  padding: 250px;
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
.tags {
  margin-top: 40px;
}
.tags li {
  display: inline-block;
  margin-right: 10px;
}
</style>
