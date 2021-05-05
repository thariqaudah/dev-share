import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import CKEditor from 'ckeditor4-vue';

// Main styles
import '@/assets/main.css';

createApp(App)
  .use(CKEditor)
  .use(router)
  .mount('#app');
