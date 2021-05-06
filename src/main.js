import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import CKEditor from '@ckeditor/ckeditor5-vue';

// Main styles
import '@/assets/main.css';

createApp(App)
  .use(router)
  .use(CKEditor)
  .mount('#app');
