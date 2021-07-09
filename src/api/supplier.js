import request from '@/utils/request'
import Qs from 'qs'
/* 供应商查询、列表
 * limit
 * page
 *
 */
export function supplierList(query) {
  return request({
    url: `api-user/supplier/users/getSuppliers`,
    method: 'get',
    params: query
  })
}
/* 供应商查询、列表V2
 * limit
 * page
 *
 */
export function supplierListV2(query) {
  return request({
    url: `api-user/supplier/v2/users/getSuppliers`,
    method: 'get',
    params: query
  })
}
/* 供应商审核日志
 * supplierId  供应商id
 */
export function getSupplierReviewLogs(query) {
  return request({
    url: `api-user/supplier/users/getSupplierReviewLogs`,
    method: 'GET',
    params: query
  })
}
/* 供应商审核
 * id  供应商id
 * status 1.审核通过，2.审核不通过
 */
export function auditSupplier(data) {
  return request({
    url: `api-user/supplier/users/supplier/audit`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 供应商审核日志
 * id  供应商id
 * status 1.审核通过，2.审核不通过
 */
export function auditSupplierV2(data) {
  return request({
    url: `api-user/supplier/v2/users/supplier/audit`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 供应商状态
 * id  供应商id
 *  isEnable 0未启用, 1启用
 */
export function enableSupplier(data) {
  return request({
    url: `api-user/supplier/users/supplier/enable`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 供应商详情
 * id  供应商id
 */
export function detailSupplier(data) {
  return request({
    url: `api-user/supplier/users/supplier/detail`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 获取供应商发布分类
 * id  供应商id
 */
export function categoryCheckedSupplier(data) {
  return request({
    url: `api-product/productCategory/find/category/checked`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 更新供应商发布分类
 * id  供应商id
 * productCategoryIdList
 */
export function categorySupplier(data) {
  return request({
    url: `api-user/supplier/users/supplier/category`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 供应商详情
 * id
 *
 */
export function supplierDetail(data) {
  return request({
    url: `api-user/supplier/v2/manage/detail`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 申请记录
 */
export function supplierRecord(data) {
  return request({
    url: `api-user/supplier/v2/manage/record`,
    method: 'post',
    data:Qs.stringify(data)
  })
}
/* 供应商客户列表
 *
 */
export function getCustomerSupplierList(data) {
  return request({
    url: `api-user/customer/store/list/certified`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
