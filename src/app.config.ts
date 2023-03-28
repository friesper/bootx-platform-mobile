export default defineAppConfig({
  pages: ['pages/index/index', 'pages/cart/index', 'pages/login/index', 'pages/my/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: false,
    color: '#46a6dd',
    selectedColor: '#fcd116',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      { pagePath: 'pages/index/index', text: '首页', iconPath: 'static/icon/首页.png', selectedIconPath: 'static/icon/首页.png' },
      { pagePath: 'pages/cart/index', text: '工作台', iconPath: 'static/icon/更多.png', selectedIconPath: 'static/icon/更多.png' },
      { pagePath: 'pages/my/index', text: '我的', iconPath: 'static/icon/我的.png', selectedIconPath: 'static/icon/我的.png' }
    ]
  }
})
