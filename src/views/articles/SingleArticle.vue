<template>
  <div class="single-article container">
    <div class="error" v-if="error">{{ error }}</div>
    <div class="card" v-else>
      <h1>{{ article.title }}</h1>
      <article>
        {{ article.content }}
      </article>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import getDocument from '@/composables/getDocument';

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
      console.log(article.value);
    };

    onMounted(async () => await fetchDocument());

    return { error, article };
  },
};
</script>

<style scoped></style>
