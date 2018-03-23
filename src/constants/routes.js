import Index from '../components/index/index'
import Publish from '../components/publish/publish'
import Edit from '../components/edit/edit'
import CatalogNew from '../components/catalog/catalognew'
import CatalogList from '../components/catalog/cataloglist'
import CatalogEdit from '../components/catalog/catalogedit'
import StarNew from '../components/star/starnew'
import StarList from '../components/star/starlist'
import StarEdit from '../components/star/staredit'
export const routes = [{
  key: '首页',
  path: '/app/index',
  component: Index
}, {
  key: '发布博客',
  path: '/app/blog/publish',
  component: Publish
}, {
  key: '编辑博客',
  path: '/app/blog/edit/:id',
  component: Edit
}, {
  key: '分类列表',
  path: '/app/catalog/list',
  component: CatalogList
}, {
  key: '创建分类',
  path: '/app/catalog/new',
  component: CatalogNew
}, {
  key: '编辑分类',
  path: '/app/catalog/edit/:id',
  component: CatalogEdit
}, {
  key: '添加收藏',
  path: '/app/collect/new',
  component: StarNew
}, {
  key: '收藏列表',
  path: '/app/collect/list',
  component: StarList
}, {
  key: '编辑收藏',
  path: '/app/collect/edit/:id',
  component: StarEdit
}]