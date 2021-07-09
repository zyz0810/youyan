import request from '@/utils/request'
import Qs from 'qs'
/* 结算单查询
 * limit
 * page
 * balanceSn 结算单号
 * balanceStatus 结算状态
 * checkStatus 审核状态
 * createEndTime 生成结束时间
 * createStartTime 生成开始时间
 * storeId 供应商姓名
 */
export function balanceList(data) {
  return request({
    url: `api-order/operation/balance/query/order`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 结算单明细
 * id 结算单ID
 */
export function balanceView(data) {
  return request({
    url: `api-order/operation/balance/order/detail`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 审核通过
 * ids 结算单ID
 */
export function balanceSuccess(data) {
  return request({
    url: `api-order/operation/balance/check/success/order`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 审核不通过
 * ids 结算单ID
 */
export function balanceFail(data) {
  return request({
    url: `api-order/operation/balance/check/fail/order`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 结算接口
 * ids 结算单ID
 */
export function balanceApply(data) {
  return request({
    url: `api-order/operation/balance`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 导出结算单报表
 */
export function balanceExport(data) {
  return request({
    url: `api-order/operation/balance/export/operation/balance`,
    method: 'POST',
    responseType:'blob',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 服务商结算单列表
 * ids 结算单ID
 */
export function balanceListService(data) {
  return request({
    url: `api-order/provider/balance/listByPage`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 服务商结算单审核
 * ids 结算单ID
 * operatorType  checkSuccess审核通过 checkFaild审核失败
 */
export function providerBalanceCheck(data) {
  return request({
    url: `api-order/provider/balance/check`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 服务商结算接口
 * ids 结算单ID
 */
export function providerBalanceApply(data) {
  return request({
    url: `api-order/provider/balance/balance`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 商品明细
 * balanceSn
 */
export function balanceDetailService(data) {
  return request({
    url: `api-order/provider/balance/product/detail`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}



/* 商品明细导出
 * balanceSn
 */
export function balanceProductExport(data) {
  return request({
    url: `api-order/provider/balance/product/detail/export`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 订单明细
 * skuId
 */
export function balanceOrderDetail(data) {
  return request({
    url: `api-order/provider/balance/order/detail`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 订单明细导出
 * orderIds
 */
export function balanceOrderExport(data) {
  return request({
    url: `api-order/provider/balance/order/detail/export`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 服务商结算单第二版*/

/* 服务商结算单列表-查看明细
 * balanceSn
 * limit
 * page
 */
export function orderListService(data) {
  return request({
    url: `api-order/provider/balance/order/detail`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 服务商结算单列表 - 查看明细 - 查看明细
 * providerId
 * orderIds
 * limit
 * page
 */
export function orderDetailService(data) {
  return request({
    url: `api-order/provider/balance/queryProviderSaleProductDetailV2 `,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
