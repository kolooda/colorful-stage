import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import * as ElementPlusIconVue from "@element-plus/icons-vue"
import router from "./router"
import pinia from "./store"
import "./permission"

const app = createApp(App)
app.use(ElementPlus,{
  locale:zhCn
})
app.use(router)
app.use(pinia)
for(const [key,component] of Object.entries(ElementPlusIconVue)){
  app.component(key,component)
}
app.mount('#app')
