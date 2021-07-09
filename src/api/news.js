import request from '@/utils/request'
import Qs from 'qs'
/* 查询消息列表
 * limit
 * page
 *
 */
export function newsList(data) {
  return request({
    url: `api-user/push/template/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 修改消息
 * id
 */
export function newsUpdate(data) {
  return request({
    url: `api-user/push/template/update`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 批量状态修改
 * ids
 * enable
 */
export function newsEnable(data) {
  return request({
    url: `api-user/push/template/enable`,
    method: 'post',
    data: Qs.stringify(data)
  })
}



