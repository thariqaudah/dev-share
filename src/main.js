import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { auth } from './firebase/config'
// import CKEditor from '@ckeditor/ckeditor5-vue';

// Main styles
import '@/assets/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    // Store mounting app to var
    app = createApp(App)
      .use(router)
      .mount('#app');
  }
});

