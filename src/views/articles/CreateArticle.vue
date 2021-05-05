<template>
  <div class="create-article container">
    <form>
      <h1>Create New Article</h1>
      <label for="title">Title</label>
      <input type="text" id="title" />
      <label for="content">Content</label>
      <!-- <textarea name="content" id="content"></textarea> -->
      <ckeditor></ckeditor>
      <label for="tags">Tags</label>
      <input type="text" id="tags" />
      <label for="photo">Photo</label>
      <input type="file" id="photo" />
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
