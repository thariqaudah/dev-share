<template>
  <div class="navbar">
    <nav class="container">
      <div class="brand">
        <h2>Devshare</h2>
      </div>
      <ul class="nav-list">
        <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li><router-link :to="{ name: 'About' }">About</router-link></li>
        <!--- <li><router-link :to="{}">Categories</router-link></li>-->
        <!-- <li><router-link to="">Saved</router-link></li> -->
      </ul>
      <ul class="nav-auth">
        <div v-if="!user">
          <li>
            <router-link class="a" :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
            <router-link class="btn btn-primary" :to="{ name: 'GetStarted' }"
              >Get Started</router-link
            >
          </li>
        </div>
        <div v-if="user">
          <li>
            <router-link class="a" :to="{ name: 'Dashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li>
            <button class="btn btn-primary" @click="handleLogout">
              Log out
            </button>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();

    const { user } = getUser();
    const { logout } = useLogout();

    const handleLogout = async () => {
      await logout();
      router.push({ name: 'Login' });
    };

    return { user, handleLogout };
  },
};
</script>

<style scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.navbar nav {
  display: flex;
  align-items: center;
}
.brand {
  margin-right: 20px;
}
nav ul {
  display: flex;
}
nav li {
  margin-right: 5px;
}
.nav-auth {
  margin-left: auto;
}
.nav-auth div {
  display: flex;
  align-items: center;
}
</style>
