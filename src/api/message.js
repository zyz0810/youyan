import request from '@/utils/request'
import Qs from 'qs'

/* 活动消息
 */
export function getActivityList(data) {
  return request({
    url: `api-user/activity/listByPage`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 活动消息编辑 新增 修改 禁用 启用
 */
export function modifyActivity(data) {
  return request({
    url: `api-user/activity/modify`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 图片上传
 */
export function uploadFile(file, type = 'license') {
  const data = new FormData()
  data.append('file', file)
  data.append('type', type)
  return request({
    url: `api-user/file/uploadSingleImage`,
    method: 'POST',
    data: data
  }).then(res => {
    return res ? res.data : {}
  })
}

/* 获取客户类型
 *
 */
export function getCustomerStoreCategoryList(data) {
  return request({
    url: `api-user/customerStoreCategory/getCustomerStoreCategoryList`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 获取活动列表
 *
 */
export function getMakets(data) {
  return request({
    url: `api-market/market/getMakets`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 供应商客户列表
 *
 */
export function getCustomerSupplierList(data) {
  return request({
    url: `api-user/customer/store/supplier/list`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 活动消息详情
 *
 */
export function getMessageDetail(data) {
  return request({
    url: `api-user/activity/detail`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 活动消息客户列表
 *
 */
export function getSupplierList(data) {
  return request({
    url: `api-user/customer/store/list/old`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
