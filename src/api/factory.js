import request from '@/utils/request'
import Qs from 'qs'
/* 生产厂家列表
 * limit
 * page
 *
 */
export function factoryList(data) {
  return request({
    url: `api-user/manufacture/findList`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 新增、修改生产厂家
 * code 区域code
 * name 区域名称
 * id 地区id
 */
export function factorySave(data) {
  return request({
    url: `api-user/manufacture/saveOrUpdate`,
    method: 'post',
    data:Qs.stringify(data)
  })
}


/* 删除生产厂家
 * id
 */
export function factoryDelete(data) {
  return request({
    url: `api-user/manufacture/delete`,
    method: 'post',
    data:Qs.stringify(data)
  })
}


