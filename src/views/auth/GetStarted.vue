<template>
  <div class="get-started container">
    <form class="card" @submit.prevent="handleSubmit">
      <h1><i class="fas fa-user-plus"></i> Get Started</h1>

      <div class="error" v-if="error">{{ error }}</div>

      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <div class="action">
        <button class="btn btn-primary" type="submit" v-if="!isLoading">
          Get Started
        </button>
        <button class="btn btn-primary" type="submit" disabled v-else>
          Loading...
        </button>
        <router-link to="">Forgot password</router-link>
      </div>
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
import useGetStarted from '@/composables/useGetStarted';

export default {
  name: 'GetStarted',
  setup() {
    const { error, getStarted } = useGetStarted();
    const router = useRouter();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);

    const handleSubmit = async () => {
      isLoading.value = true;
      await getStarted(name.value, email.value, password.value);

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
button[type='submit'] {
  font-weight: 600;
}
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
</style>
