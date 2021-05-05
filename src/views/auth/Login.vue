<template>
  <div class="login container">
    <form @submit.prevent="handleSubmit">
      <h1><i class="fas fa-sign-in-alt"></i> Login</h1>

      <div class="error" v-if="error">{{ error }}</div>

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button class="btn-primary" type="submit" v-if="!isLoading">Login</button>
      <button class="btn-primary" disabled type="submit" v-else>
        Loading...
      </button>
      <small
        >Not have an account yet? Let's
        <router-link :to="{ name: 'Join' }">Join</router-link></small
      >
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '@/composables/useLogin';

export default {
  name: 'Login',
  setup() {
    const { error, login } = useLogin();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);

    const handleSubmit = async () => {
      isLoading.value = true;
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: 'Home' });
      }
      isLoading.value = false;
    };

    return { email, password, handleSubmit, isLoading, error };
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
