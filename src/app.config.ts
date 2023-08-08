export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/workspace/index',
    'pages/login/index',
    'pages/my/index',
    'pages/my/modifyPassword',
    'pages/my/personInfo/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffff',
    navigationBarTitleText: '首页',
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
      { pagePath: 'pages/workspace/index', text: '工作台', iconPath: 'static/icon/更多.png', selectedIconPath: 'static/icon/更多.png' },
      { pagePath: 'pages/my/index', text: '个人', iconPath: 'static/icon/我的.png', selectedIconPath: 'static/icon/我的.png' }
    ]
  }
})
