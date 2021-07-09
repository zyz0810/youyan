import request from '@/utils/request'
import Qs from 'qs'
/* 商品模型-列表
 * limit
 * page
 *
 */
export function modelList(data) {
  return request({
    url: `api-product/productModel/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 保存商品品牌
 * code 区域code
 * name 区域名称
 * id 地区id
 */
export function modelSave(data) {
  return request({
    url: `api-product/productModel/save`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 保存模型
 * code 区域code
 * name 区域名称
 * id 地区id
 */
export function modelUpdate(data) {
  return request({
    url: `api-product/productModel/update`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 商品模型启用禁用
 * id 地区id
 * status
 */
export function modelStatus(data) {
  return request({
    url: `api-product/productModel/updateStatus`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


export function modelDelete(data) {
  return request({
    url: `api-product/productModel/deleteById`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/*根据模型id查询详情

 */
export function modelView(query) {
  return request({
    url: `api-product/productModel/findById`,
    method: 'get',
    params: query
  })
}
