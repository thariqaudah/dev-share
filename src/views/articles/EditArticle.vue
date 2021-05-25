<template>
  <div class="edit-article container">
    <form class="card" @submit.prevent="handleSubmit">
      <h1 class="border-bottom">Edit Article</h1>
      <div class="error" v-if="error">{{ error }}</div>
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" />
      <label for="content">Content</label>
      <textarea id="content" v-model="content"></textarea>
      <!-- Tags -->
      <label for="tags">Add Tags (Press "tab" to add)</label>
      <input
        type="text"
        id="tags"
        v-model="tag"
        @keydown.prevent.tab="addTag"
      />
      <div class="tags-container" v-if="tags">
        <div
          v-for="(eachTag, index) in tags"
          :key="index"
          @click="removeTag(index)"
        >
          {{ eachTag }}
        </div>
      </div>
      <!-- Select -->
      <label for="catgeory">Select Category</label>
      <select id="catgeory" v-model="category" @change="handleChange">
        <option disabled value="">Select a category</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          >{{ category.name }}</option
        >
      </select>
      <!-- Image -->
      <label for="image">Cover Image</label>
      <div class="error" v-if="errorFile">{{ errorFile }}</div>
      <input type="file" id="image" @change="handleFile" />
      <!-- Button -->
      <div class="action">
        <button type="submit" class="btn btn-primary" v-if="!isLoading">
          Save Change
        </button>
        <button type="submit" disabled class="btn btn-primary" v-else>
          Saving...
        </button>
        <router-link :to="{ name: 'Dashboard' }" class="btn btn-secondary"
          >Cancel</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import getDocument from '@/composables/getDocument';
import getCollection from '@/composables/getCollection';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import { timestamp } from '@/firebase/config';

export default {
  props: ['id'],
  setup(props) {
    const { document: article, getDoc } = getDocument('articles', props.id);
    const { getDocs, documents: categories } = getCollection('categories');
    const { error, updateDoc } = useDocument('articles', props.id);
    const { filePath, publicUrl, uploadImage } = useStorage();
    const router = useRouter();

    // Refs
    const title = ref('');
    const content = ref('');
    const tag = ref('');
    const tags = ref([]);
    const category = ref('');
    const selectedCategory = ref(null);
    const file = ref(null);
    const errorFile = ref(null);
    const isLoading = ref(false);

    // Fetch categories collection
    const fetchDocuments = async () => {
      await getDocs();
      await getDoc();
      
      if (article.value) {
        title.value = article.value.title;
        content.value = article.value.content;
        tags.value = article.value.tags;
        category.value = article.value.category.id;
      }
    };

    // Add tag
    const addTag = () => {
      if (tag.value) {
        tags.value.push(tag.value);
        console.log(tags.value);
        tag.value = '';
      }
    };

    // Remove tag
    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    // Handle change in select input
    const handleChange = () => {
      selectedCategory.value = categories.value.filter(
        (cat) => cat.id == category.value
      );
    };

    // Hanlde file input
    const handleFile = (e) => {
      file.value = e.target.files[0];
      if (!file.value || !file.value.type.includes('image')) {
        errorFile.value = 'Please select an image';
      } else {
        errorFile.value = null;
      }
    };

    // Submit document
    const handleSubmit = async () => {
      if (
        title.value == '' ||
        content.value == '' ||
        category.value == {} ||
        errorFile.value
      ) {
        error.value = 'All fields are required';
      } else {
        if (!selectedCategory.value) {
          selectedCategory.value = categories.value.filter(
            (cat) => cat.id == article.value.category.id
          );
        }

        isLoading.value = true;
        // Upload the cover image first
        await uploadImage(file.value);

        // Submit doc to firestore
        await updateDoc({
          title: title.value,
          content: content.value,
          tags: tags.value,
          category: {
            id: selectedCategory.value[0].id,
            name: selectedCategory.value[0].name,
          },
          image: {
            filePath: filePath.value,
            publicUrl: publicUrl.value,
          },
          createdAt: timestamp(),
        });

        isLoading.value = false;

        if (!error.value) {
          console.log('success update doc');
          router.push({ name: 'Dashboard' });
        }
      }
    };

    // Mounted hooks
    onMounted(async () => {
      await fetchDocuments();
    });

    return {
      error,
      errorFile,
      categories,
      title,
      content,
      tags,
      tag,
      category,
      addTag,
      removeTag,
      handleChange,
      handleFile,
      handleSubmit,
      isLoading,
    };
  },
};
</script>

<style scoped>
form {
  max-width: 80%;
  margin: auto;
}
form h1 {
  margin-bottom: 30px;
  font-size: 1.8rem;
}
form label,
form p {
  display: inline-block;
  margin-bottom: 10px;
}
form .tags-container {
  display: flex;
}
form .tags-container div {
  margin: -20px 5px 20px 0;
  background-color: var(--secondary-color);
  border-radius: 20px;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
}
form .tags-container div:hover {
  opacity: 0.3;
}
form .radio-input label {
  font-weight: normal;
  margin-right: 20px;
}
form .radio-input input {
  width: auto;
  margin-right: 5px;
}
form input[type='file'] {
  border: none;
}
form .btn {
  font-weight: 600;
}
form .btn-primary {
  margin: 20px 0 10px;
}
form .action button {
  margin-right: 10px;
}
</style>
