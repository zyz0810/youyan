import request from '@/utils/request'
import Qs from 'qs'
/* 获取客户分类树
 * name 客户分类名称
 */
//第一版
export function findCustomerStoreCategoryTree(query) {
  return request({
    // url: `api-user/customerStoreCategory/findCustomerStoreCategoryTree`,
    url: `api-user/customerStoreCategory/getCustomerStoreCategorys`,
    method: 'get',
    params: query
  })
}
//第二版
export function customerStoreCategoryTree(data) {
  return request({
    // url: `api-user/customerStoreCategory/findCustomerStoreCategoryTree`,
    url: `api-user/customerStoreCategory/getCustomerStoreCategorys`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 获取客户分类（过滤掉禁用状态）
 */
export function usableList(data) {
  return request({
    url: `api-user/customerStoreCategory/usableList`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 新增、修改客户分类
 * id
 * isGroup.declaringClass
 * isGroup.desc
 * isGroup.value
 * name
 * orders
 * parentId
 * remarks
 */
export function updateCustomerStoreCategory(data) {
  return request({
    url: `api-user/customerStoreCategory/saveOrUpdateCustomerStoreCategory`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 禁用客户分类
 * id
 * isGroup.declaringClass
 * isGroup.desc
 * isGroup.value
 * name
 * orders
 * parentId
 * remarks
 */
export function customerStoreCategoryDisable(data) {
  return request({
    url: `api-user/customerStoreCategory/customerStoreCategoryDisable`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 删除客户分类
 * id
 */
export function deleteCustomerStoreCategory(data) {
  return request({
    url: `api-user/customerStoreCategory/deleteCustomerStoreCategory`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 查询客户分类
 * id
 */
export function selectByCategoryId(data) {
  return request({
    url: `api-user/customerStoreCategory/selectByCategoryId`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
