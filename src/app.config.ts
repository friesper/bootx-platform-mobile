export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/index/index',
    'pages/my/index'

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    color:'#46a6dd',
    selectedColor:'#fcd116',
    backgroundColor:'#ffffff',
    borderStyle:'black',
    list:[{pagePath:'pages/login/index',text:'首页',iconPath:'static/icon/home.png',selectedIconPath:'static/icon/home.png'},{pagePath:'pages/my/index',text:'我的',iconPath:'static/icon/mine.png',selectedIconPath:'static/icon/mine.png'}]
  }
})
