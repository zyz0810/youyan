import request from '@/utils/request'
import Qs from 'qs'
/* 客户经营范围列表
 * limit
 * page
 * name
 */
export function businessScopesList(query) {
  return request({
    url: `api-user/businessScope/getBusinessScopes`,
    method: 'get',
    params: query
  })
}
/* 经营范围列表
 * limit
 * page
 * name
 */
export function getEnabledBusinessScopes(query) {
  return request({
    url: `api-user/businessScope/getEnabledBusinessScopes`,
    method: 'get',
    params: query
  })
}
/* 新增、修改客户经营范围
 * id
 * name
 * orders
 */
export function businessScopesUpdate(data) {
  return request({
    url: `api-user/businessScope/saveOrUpdateBusinessScope`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}



