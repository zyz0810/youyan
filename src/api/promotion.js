import request from '@/utils/request'
import Qs from 'qs'
/* 满折满减活动分页列表
 * activityStatus
 * activityType
 * endTime
 * id
 * limit
 * page
 * startTime
 * title
 */
export function promotionList(query) {
  return request({
    url: `activity/listByPage`,
    method: 'get',
    params: query
  })
}
/* 获取区域叶子
 * id
 */
export function promotionView(query) {
  return request({
    url: `activity/detail`,
    method: 'get',
    params: query
  })
}









/* 新增、修改地区
 * code
 * id
 * lat
 * lng
 * name
 * orders
 * parentId
 * telCode
 * zipCode
 */
export function saveOrUpdateArea(data) {
  return request({
    url: `api-user/area/saveOrUpdateArea`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 删除区域
 * id
 */
export function deleteArea(data) {
  return request({
    url: `api-user/area/deleteArea`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
