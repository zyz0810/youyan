import request from '@/utils/request'
import Qs from 'qs'
/* 商品发布分类
 * limit
 * page
 *
 */
export function publishList(data) {
  return request({
    url: `api-product/productCategory/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
export function publishView(data) {
  return request({
    url: `api-product/productCategory/findById`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrafindByCategoryIdyFormat: 'indices', allowDots: true })
  })
}
/* 保存商品发布分类
 */
export function publishSave(data) {
  return request({
    url: `api-product/productCategory/save`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 根据发布分类Id 查询展示分类列表
 *productDisplayCategory/update
 */
export function findByCategoryId(query) {
  return request({
    url: `api-product/productDisplayCategory/findByCategoryId`,
    method: 'get',
    params: query
    // data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 修改商品发布分类
 */
export function publishUpdate(data) {
  return request({
    url: `api-product/productCategory/update`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 删除商品发布分类
 */
export function publishDelete(data) {
  return request({
    url: `api-product/productCategory/deleteById`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 更新商品发布分类有效无效
 * categoryIds 分类id
 * effective true 有效，无效false
 */
export function publishEffective(data) {
  return request({
    url: `api-product/productCategory/effectiveOrNot`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 商品展示分类
 * limit
 * page
 *
 */
export function displayList(data) {
  return request({
    url: `api-product/productDisplayCategory/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 保存商品展示类目
 *productDisplayCategory/update
 */
export function displaySave(data) {
  return request({
    url: `api-product/productDisplayCategory/save`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 修改商品展示类目
 *
 */
export function displayUpdate(data) {
  return request({
    url: `api-product/productDisplayCategory/update`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 更新商品展示分类有效无效
 * categoryIds 分类id
 * status 1 启用，0禁用
 */
export function displayEffective(data) {
  return request({
    url: `api-product/productDisplayCategory/updateStatus`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 删除商品展示类目
 * id
 */
export function displayDelete(data) {
  return request({
    url: `api-product/productDisplayCategory/deleteById`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}



/* 商品展示分类
 * limit
 * page
 *
 */
export function displayView(data) {
  return request({
    url: `api-product/productDisplayCategory/findById`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
