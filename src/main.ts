import { createApp } from 'vue'
import App from './App.vue'
import 'vangle/dist/style.css'
import Vangle from 'vangle'

import TassUI from 'tass-ui';
import 'tass-ui/es/style.css';

createApp(App).use(Vangle).use(TassUI).mount('#app')
