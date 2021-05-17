<template>
  <div class="user-box card">
    <h4 class="border-bottom">User Info</h4>
    <div class="row">
      <span>Logged as</span>
      <span class="pill">{{ user.email }}</span>
    </div>
    <div class="row">
      <span>Post</span>
      <span class="pill">25</span>
    </div>
    <div class="row">
      <span>Comments</span>
      <span class="pill">100</span>
    </div>
    <div class="row action">
      <router-link to="" class="btn btn-secondary">
        Edit Profile
      </router-link>
      <router-link :to="{ name: 'CreateArticle' }" class="btn btn-primary">
        Create New Article
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBox',
  props: ['user'],
};
</script>

<style scoped>
.user-box {
  align-self: start;
}
h4 {
  margin-bottom: 20px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.row.action {
  margin-top: 40px;
}
.row span {
  font-size: 14px;
}
.pill {
  display: inline-block;
  background-color: var(--secondary-color);
  color: #fff;
  padding: 5px;
  border-radius: 40px;
  font-size: 12px !important;
}
a {
  font-size: 14px;
}
</style>
