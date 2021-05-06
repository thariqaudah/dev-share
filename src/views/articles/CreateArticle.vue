<template>
  <div class="create-article container">
    <form>
      <h1>Create New Article</h1>
      <label for="title">Title</label>
      <input type="text" id="title" />
      <label for="content">Content</label>
      <ckeditor
        tagname="textarea"
        :editor="editor"
        v-model="editorData"
      ></ckeditor>
      <label for="tags">Tags</label>
      <input type="text" id="tags" />
      <label for="photo">Photo</label>
      <input type="file" id="photo" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  setup() {
    const editor = ClassicEditor;
    const editorData = ref('');

    return { editor, editorData };
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
  margin-bottom: 20px;
}
form label {
  display: inline-block;
  margin-bottom: 10px;
}
</style>
