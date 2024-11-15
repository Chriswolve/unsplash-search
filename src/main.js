import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Create Vue App
createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app')
