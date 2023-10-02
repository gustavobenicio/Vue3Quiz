import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vGoogleTranslate from "@google-translate-select/vue3";
import './index.css'

createApp(App)
    .use(vGoogleTranslate)
    .use(VueAxios, axios)
    .mount('#app')
