<template>
  <div class="create-article container">
    <form @submit.prevent="handleSubmit">
      <h1>Create New Article</h1>
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" />
      <label for="content">Content</label>
      <ckeditor
        :editor="editor"
        :config="editorConfig"
        v-model="content"
      ></ckeditor>
      <label for="tags">Add   Tags</label>
      <input type="text" id="tags" v-model="tags" />
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
        <input type="radio" value="public" id="public" v-model="status">
        <label for="public">Public</label>
        <input type="radio" value="private" id="private" v-model="status">
        <label for="private">Private</label>
      </div>
      <!-- Image -->
      <label for="image">Cover Image</label>
      <input type="file" id="image" />
      <!-- Button -->
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-secondary">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useCollection from '@/composables/useCollection';

export default {
  setup() {
    const editor = ClassicEditor;
    const editorConfig = {
      toolbar: ['bold', 'italic', '|', 'link']
    }

    const { error, addDoc } = useCollection('articles');

    const title = ref('');
    const content = ref('');
    const tags = ref([]);
    const level = ref('');
    const status = ref('');

    const handleSubmit = async () => {
      await addDoc({
        title: title.value,
        content: content.value,
        tags: tags.value,
        level: level.value,
        status: status.value
      }); 

      if(!error.value) {
        console.log('success add doc')
      }
      // console.log(title.value, content.value, tags.value, level.value, status.value);
    };

    return { editor, editorConfig, title, content, tags, level, status, handleSubmit };
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
form label, form p {
  display: inline-block;
  margin-bottom: 10px;
  font-weight: 600;
}
form input[type="file"] {
  border: none;
}
form .radio-input {
  margin-bottom: 20px;
}
form .radio-input label {
  font-weight: normal;
  margin: 0 20px 0 5px;
}
form .radio-input input {
  margin: 0;
}
form .btn {
  font-weight: 600;;
}
form .btn-primary {
  margin: 20px 0 10px;
}
</style>
