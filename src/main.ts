import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { gsap } from 'gsap'// 导入gsap到vue项目
import MotionPath from 'gsap/MotionPathPlugin'// 导入gsap插件ScrollToPlugin

// 引入全局样式
import './assets/global.scss';
import './themes/dew.scss';
import './themes/mew.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)
app.mount('#app')

// 注册gsap插件
gsap.registerPlugin(MotionPath)// 注册插件
