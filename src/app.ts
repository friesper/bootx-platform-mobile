import { createApp } from 'vue'

import './app.scss'
import "@nutui/nutui/dist/styles/variables-jdt.scss";
import './assets/icon/iconfont.css'
import store from './store'
import NutUI from "@nutui/nutui-taro" // 在入口文件处引用NutUI


const App = createApp({
  onShow(options) {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(store,NutUI)

export default App
