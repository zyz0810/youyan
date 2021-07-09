import request from '@/utils/request'
import Qs from 'qs'
/* 业务员列表
 * limit
 * page
 *
 */
export function clerkList(query) {
  return request({
    url: `api-user/clerk/getClerks`,
    method: 'get',
    params: query
  })
}
/* 新增、修改业务员信息
 * id
 * mobile 区域code
 * name 区域名称
 * no 地区id
 * status 枚举类型,可用值:ENABLED,DISABLED
 */
export function clerkUpdate(data) {
  return request({
    url: `api-user/clerk/saveOrUpdateClerk`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

