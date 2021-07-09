import request from '@/utils/request'
import Qs from 'qs'
/* 列表资质材料
 * limit
 * page
 *
 */
export function scienceList(data) {
  return request({
    url: `api-user/categoryParameters/getCategoryParameters`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 新增、修改资质材料
 * id 材料ID
 * name 材料名称
 * example 示例
 */
export function scienceSave(data) {
  return request({
    url: `api-user/categoryParameters/saveOrUpdateCategoryParameters`,
    method: 'post',
    data: Qs.stringify(data)
  })
}


/* 删除资质材料
 * id 材料ID
 */
export function scienceDelete(data) {
  return request({
    url: `api-user/categoryParameters/delete`,
    method: 'post',
    data: Qs.stringify(data)
  })
}


