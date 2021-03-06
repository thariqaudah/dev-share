<template>
  <div class="index-dashboard container">
    <h1>Dashboard</h1>
    <h3>Welcome, {{ user.displayName }}</h3>
    <router-link class="btn btn-primary cta" :to="{ name: 'CreateArticle' }">
      <i class="fas fa-pen"></i> Create Article
    </router-link>
    <div v-if="!formattedArticles.length">
      <p>You have no article yet</p>
    </div>
    <table v-else>
      <tr>
        <th>Article Title</th>
        <th>Category</th>
        <th>Date</th>
        <th></th>
      </tr>
      <tr v-for="article in formattedArticles" :key="article.id">
        <td>
          <router-link
            :to="{ name: 'SingleArticle', params: { id: article.id } }"
            >{{ article.title }}</router-link
          >
        </td>
        <td>{{ article.category.name }}</td>
        <td>{{ article.formattedDate }}</td>
        <td>
          <router-link :to="{ name: 'EditArticle', params: { id: article.id } }"
            ><i class="fas fa-edit"></i
          ></router-link>
          <button @click="handleDelete(article.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import useDocument from '@/composables/useDocument'
import dateformat from 'dateformat'

export default {
  name: 'IndexDashboard',
  setup() {
    const { user } = getUser()
    const { error, documents: articles, getDocs } = getCollection('articles', [
      'user.id',
      '==',
      user.value.uid,
    ])

    const fetchData = async () => {
      await getDocs()
    }

    const formattedArticles = computed(() =>
      articles.value.map(article => ({
        ...article,
        formattedDate: dateformat(
          article.createdAt.toDate(),
          'dddd, mmmm dS yyyy hh:MM tt'
        ),
      }))
    )

    const handleDelete = async id => {
      const { error, deleteDoc } = useDocument('articles', id)
      await deleteDoc()
      if (!error.value) {
        articles.value.splice(id, 1)
      }
    }

    onMounted(async () => await fetchData())

    return { error, formattedArticles, user, handleDelete }
  },
}
</script>

<style scoped>
.index-dashboard {
  margin-top: 20px;
}
h1 {
  margin-bottom: 1rem;
}
h3 {
  margin-bottom: 2rem;
}
.cta {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
}
.cta i {
  margin-right: 5px;
}
table {
  margin-top: 20px;
  width: 100%;
}
table th {
  background-color: #444;
  color: #fff;
  text-align: left;
}
table,
th,
td {
  border-bottom: 1px solid #ddd;
  border-collapse: collapse;
}
table th,
table td {
  padding: 15px;
}
table td a {
  color: var(--primary-color);
}
table td button {
  background-color: transparent;
  color: var(--secondary-color);
}
table i {
  font-size: 1rem;
}
</style>
