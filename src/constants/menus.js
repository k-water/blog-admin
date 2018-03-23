export const menus = [{
    key: '/app/index',
    title: '首页',
    icon: 'home'
  },
  {
    key: '/app/blog',
    title: '博客',
    icon: 'edit',
    sub: [{
      key: '/app/blog/publish',
      title: '发布博客',
      icon: ''
    }],
  },
  {
    key: '/app/catalog',
    title: '分类',
    icon: 'exception',
    sub: [{
      key: '/app/catalog/list',
      title: '分类列表',
      icon: ''
    }, {
      key: '/app/catalog/new',
      title: '创建分类',
      icon: ''
    }]
  },
  {
    key: '/app/collect',
    title: '收藏',
    icon: 'star',
    sub: [{
      key: '/app/collect/list',
      title: '收藏列表',
      icon: ''
    }, {
      key: '/app/collect/new',
      title: '添加收藏',
      icon: ''
    }]
  }
]