import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css';
import vant from 'vant';

import './assets/style/main.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
