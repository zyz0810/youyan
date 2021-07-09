import request from '@/utils/request'
import Qs from 'qs'
/* 商品服务-服务商商品审核-列表
 * agentName 服务商名称
 * checkStatus 审核状态0待提交1待审核2通过3未通过
 * goodsSn 商品编号
 * manufacturerName 生产厂家
 * name 商品名称
 * serviceStatus 服务状态0待服务1已服务2已撤销
 * supplierName 供应商名称
 * limit
 * page
 */
export function agentProductServiceCheckList(data) {
  return request({
    url: `api-product/product/service/agentProductServiceCheckListByPage`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 商品服务-服务商商品审核-审核
 * agentProductServiceCheckSuccess 审核通过，agentProductServiceCheckFaild 审核不通过
 * ids id
 * operatorType 操作类型:agentProductServiceCheckSuccess 审核通过，agentProductServiceCheckFaild 审核不通过，providerCancelSuccess 撤销通过，providerCancelFaild 撤销失败
 */
export function agentProductServiceCheckModify(data) {
  return request({
    url: `api-product/product/service/agentProductServiceCheckModify`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 商品服务-服务商商品审核-查询日志
 * id id
 * type：provider
 */
export function agentProductServiceLog(data) {
  return request({
    url: `api-product/product/service/operatorProductServiceSearchLog`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

