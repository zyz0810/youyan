import request from '@/utils/request'
import Qs from 'qs'
/* 订单查询列表
 * orderStatus 订单状态
 * paymentEndTime 付款结束时间
 * paymentStartTime 付款开始时间
 * sn 订单编号
 * clientName 客户名称
 * startTime 下单开始时间
 * endTime 下单结束时间
 */
export function orderList(data) {
  return request({
    url: `api-order/operation/order/find/order`,
    method: 'post',
    data:Qs.stringify(data)
  })
}
/* 订单详情
 * orderId
 */
export function orderView(data) {
  return request({
    url: `api-order/operation/order/order/detail`,
    method: 'post',
    data:Qs.stringify(data)
  })
}



/* 客服备注
 * orderId
 * serviceRemarks
 */
export function saveRemarks(data) {
  return request({
    url: `api-order/order/service/remarks`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 操作日志
 * id
 */
export function orderlog(query) {
  return request({
    url: `api-order/orderlog/one`,
    method: 'get',
    params: query
  })
}

/* 发货记录
 * orderId
 */
export function shippingList(data) {
  return request({
    url: `api-order/operation/order/shipping/record`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 收款记录
 * orderId
 */
export function paymentList(data) {
  return request({
    url: `api-order/operation/order/record`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 签收记录
 * orderId
 */
export function signList(data) {
  return request({
    url: `api-order/operation/order/sign/order`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 订单交易记录
 * endTime
 * limit
 * orderStatus
 * page
 * sn
 * startTime
 * storeName
 */
export function recordsList(data) {
  return request({
    url: `api-order/order/records/list`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 订单交易记录导出
 */
export function recordsExport(data) {
  return request({
    url: `api-order/order/records/export`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 查询退款单列表
 * getRefundOrderList
 */
export function getRefundOrderList(data) {
 return request({
   url: `api-order/operation/refundOrder/getRefundOrderList`,
   method: 'get',
   params: data
 })
}


/* 查询退款单详情
 * getRefundOrderDetail
 */
export function getRefundOrderDetail(data) {
 return request({
   url: `api-order/operation/refundOrder/getRefundOrderDetail`,
   method: 'get',
   params: data
 })
}


/* 查询退款单物流信息
 * getShippingInfo
 */
export function getShippingInfo(data) {
 return request({
   url: `api-order/operation/refundOrder/getShippingInfo`,
   method: 'get',
   params: data
 })
}


/* 查询退款单协商历史
 * getLogs
 */
export function getLogs(data) {
 return request({
   url: `api-order/operation/refundOrder/getLogs`,
   method: 'get',
   params: data
 })
}
