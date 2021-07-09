import request from '@/utils/request'
import Qs from 'qs'
/* 商品规格 列表
 * limit
 * page
 * 0:禁用 1.启用
 */
export function specificationList(data) {
  return request({
    url: `api-product/specification/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 保存商品规格
 * code 区域code
 * name 区域名称
 * id 地区id
 */
export function specificationSave(data) {
  return request({
    url: `api-product/specification/save`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 编辑商品规格
 */
export function specificationUpdate(data) {
  return request({
    url: `api-product/specification/update`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 商品规格启用禁用
 */
export function specificationUpOrDown(data) {
  return request({
    url: `api-product/specification/upOrDown`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 删除商品规格
 */
export function specificationDelete(data) {
  return request({
    url: `api-product/specification/deleteById`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 商品规格值 列表
 *
 */
export function specList(data) {
  return request({
    url: `api-product/specificationValue/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 保存商品规格值
 * name
 * orders
 * specificationId
 */
export function specSave(data) {
  return request({
    url: `api-product/specificationValue/save`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 编辑商品规格值
 */
export function specUpdate(data) {
  return request({
    url: `api-product/specificationValue/update`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 删除商品规格值
 */
export function specDelete(data) {
  return request({
    url: `api-product/specificationValue/deleteById`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
