import * as base from '@/pages'

export const mainRouter = [
  {
    path: '/login',
    component: base.Login,
  },
  {
    path: '/404',
    component: base.NotFound
  }
] 

export const adminRouter = [
  {
    path: '/admin/tables',
    component: base.Tables,
    name: '表格'
  },
  {
    path: '/admin/count',
    component: base.Count,
    name: '数量'
  },
  {
    path: '/admin/list',
    component: base.List,
    name: '列表'
  },
  {
    path: '/admin/game',
    component: base.Game,
    name: '游戏'
  },
  {
    path: '/admin/commentList',
    component: base.CommentList,
    name: '评论列表'
  },
  {
    path: '/admin/setting',
    component: base.Setting,
    name: '配置'
  }
]