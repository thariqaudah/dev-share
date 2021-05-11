<template>
  <div class="create-article container">
    <form @submit.prevent="handleSubmit">
      <h1>Create New Article</h1>
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
      <label for="level">Select Level</label>
      <select id="level" v-model="level">
        <option disabled value="">Select a reading level</option>
        <option value="beginners">Beginners</option>
        <option value="intermediates">Intermediates</option>
        <option value="advanced">Advanced</option>
      </select>
      <!-- Radio btn -->
      <p>Save as</p>
      <div class="radio-input">
        <input type="radio" value="public" id="public" v-model="status" />
        <label for="public">Public</label>
        <input type="radio" value="private" id="private" v-model="status" />
        <label for="private">Private</label>
      </div>
      <!-- Image -->
      <label for="image">Cover Image</label>
      <div class="error" v-if="errorFile">{{ errorFile }}</div>
      <input type="file" id="image" @change="handleFile" />
      <!-- Button -->
      <div class="action">
        <button type="submit" class="btn btn-primary" v-if="!isLoading">Save</button>
        <button type="submit" disabled class="btn btn-primary" v-else>Saving...</button>
        <button type="button" class="btn btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useCollection from '@/composables/useCollection';
import useStorage from '@/composables/useStorage';

export default {
  setup() {
    const { error, addDoc } = useCollection('articles');
    const { filePath, publicUrl, uploadImage } = useStorage();

    const title = ref('');
    const content = ref('');
    const tag = ref('');
    const tags = ref([]);
    const level = ref('');
    const status = ref('');
    const file = ref(null);
    const errorFile = ref(null);
    const isLoading = ref(false);

    const addTag = () => {
      if (tag.value) {
        tags.value.push(tag.value);
        console.log(tags.value);
        tag.value = '';
      }
    };

    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    const handleFile = (e) => {
      file.value = e.target.files[0];
      if(!file.value || !file.value.type.includes('image')) {
        errorFile.value = 'Please select an image';
      } else {
        errorFile.value = null;
        console.log('file ready');
      }
    }

    const handleSubmit = async () => {
      if(title.value == '' || content.value == '' || level.value == '' || status.value == '' || errorFile.value ) {
        error.value = 'All fields are required'
      } else {
        isLoading.value = true;
        // Upload the cover image first
        await uploadImage(file.value);

        // Submit doc to firestore
        await addDoc({
          title: title.value,
          content: content.value,
          tags: tags.value,
          level: level.value,
          status: status.value,
          image: {
            filePath: filePath.value,
            publicUrl: publicUrl.value
          }
        });

        isLoading.value = false;
        
        if (!error.value) {
          console.log('success add doc');
        }
      }
    };

    return {
      error,
      errorFile,
      title,
      content,
      tags,
      tag,
      level,
      status,
      addTag,
      removeTag,
      handleFile,
      handleSubmit,
      isLoading
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
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 30px;
  font-size: 1.8rem;
}
form label,
form p {
  display: inline-block;
  margin-bottom: 10px;
  font-weight: 600;
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
