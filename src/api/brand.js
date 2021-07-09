import request from '@/utils/request'
import Qs from 'qs'
/* 列表商品品牌
 * limit
 * page
 *
 */
export function brandList(data) {
  return request({
    url: `api-product/brand/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 保存商品品牌
 * code 区域code
 * name 区域名称
 * id 地区id
 */
export function brandSave(data) {
  return request({
    url: `api-product/brand/save`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 保存商品品牌
 * code 区域code
 * name 区域名称
 * id 地区id
 */
export function brandUpdate(data) {
  return request({
    url: `api-product/brand/update`,
    method: 'post',
    data: Qs.stringify(data)
  })
}



export function brandDelete(data) {
  return request({
    url: `api-product/brand/deleteById`,
    method: 'post',
    data: Qs.stringify(data)
  })
}


