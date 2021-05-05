<template>
  <div class="join container">
    <form @submit.prevent="handleSubmit">
      <h1><i class="fas fa-user-plus"></i> Join Us</h1>

      <div class="error" v-if="error">{{ error }}</div>

      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button class="btn-primary" type="submit" v-if="!isLoading">Join</button>
      <button class="btn-primary" type="submit" disabled v-else>
        Loading...
      </button>
      <small
        >Already join? Please
        <router-link :to="{ name: 'Login' }">Login</router-link></small
      >
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useJoin from '@/composables/useJoin';

export default {
  name: 'Join',
  setup() {
    const { error, join } = useJoin();
    const router = useRouter();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);

    const handleSubmit = async () => {
      isLoading.value = true;
      await join(name.value, email.value, password.value);

      if (!error.value) {
        router.push({ name: 'Home' });
      }
      isLoading.value = false;
    };

    return { name, email, password, handleSubmit, isLoading, error };
  },
};
</script>

<style scoped>
form {
  margin: 50px auto;
}
h1 {
  margin-bottom: 30px;
  font-size: 1.8rem;
}
i {
  color: var(--primary-color);
}
small {
  font-size: 14px;
  margin-top: 30px;
  color: #999;
}
small a {
  color: var(--primary-color);
  font-weight: 600;
}
button[type='submit'] {
  font-weight: 600;
}
</style>
