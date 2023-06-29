// 底部菜单
export const tabbar = [
  {
    span: '首页',
    icon: 'wap-home',
    activeIcon: 'home-o',
    path: '/',
    replace: true
  },
  {
    span: '发布',
    icon: 'add',
    activeIcon: 'add-o',
    path: '/publish',
    replace: false
  },
  {
    span: '我的',
    icon: 'manager',
    activeIcon: 'manager-o',
    path: '/me',
    replace: true
  }
]

// 是否为生成环境
export const isProd = process.env.NODE_ENV === 'production';

// API URI
export const host = !isProd
  ? 'http://localhost:7000'
  : 'https://wx.airtlab.com';
