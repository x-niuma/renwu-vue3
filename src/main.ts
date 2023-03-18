import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css';
import vant from 'vant';

import './assets/style/main.less';

import infiniteScroll from 'vue-infinite-scroll'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
app.use(infiniteScroll)