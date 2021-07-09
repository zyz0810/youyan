import request from '@/utils/request'
import Qs from 'qs'
/* 获取客户列表
 * name 客户分类名称
 */
export function customerListAll(data) {
  return request({
    url: `api-user/customer/store/list`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 获取客户列表（一审、二审、三审）
 * name 客户分类名称
 */
export function customerList(data) {
  return request({
    url: `api-user/customer/store/list/audit`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 客户详情
 * id
 */
export function customerView(data) {
  return request({
    url: `api-user/customer/store/detail`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 客户信息修改
 * id
 */
export function updateCustomer(data) {
  return request({
    url: `api-user/customer/store/update/info`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 客户状态批量修改
 * customerIds
 * customerStatus 客户状态 1启用0禁用
 */
export function statusCustomer(data) {
  return request({
    url: `api-user/customer/store/update/status`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 客户审核
 * auditStatus 审核状态 0:不通过1:通过
 * id id
 * remark 备注
 * scopes 经营范围ids
 */
export function auditCustomer(data) {
  return request({
    url: `api-user/customer/store/update/audit`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 客户经营范围修改
 * id id
 * scopes 经营范围ids
 */
export function scopeCustomer(data) {
  return request({
    url: `api-user/customer/store/update/scope`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 申请记录
 * id
 */
export function applyRecord(data) {
  return request({
    url: `api-user/customer/store/apply/record`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 客户审核记录
 * customerApplyId 店铺申请记录id
 * customerStoreId 店铺Id
 */
export function auditDetail(data) {
  return request({
    url: `api-user/customer/store/detail/audit`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 申请记录详情(客户详情)
 * storeId storeId
 * id 查询申请记录详情时必填
 */
export function applyDetail(data) {
  return request({
    url: `api-user/customer/store/apply/detail`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 已认证用户（价格策略用到）
 * customerName 客户名称
 * customerSn 客户编码
 * customerType 客户类型
 * startTime 注册开始时间
 * endTime 注册结束时间
 * id id
 */
export function certifiedList(data) {
  return request({
    url: `api-user/customer/store/list/certified`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 导出客户图片
*/
export function customerMaterialsExport(data) {
  return request({
    url: `api-user/customer/store/list/materials`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
