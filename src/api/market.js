import request from '@/utils/request'
import Qs from 'qs'
/* 秒杀列表
 * orderStatus 订单状态
 * paymentEndTime 付款结束时间
 * paymentStartTime 付款开始时间
 * sn 订单编号
 * clientName 客户名称
 * startTime 下单开始时间
 * endTime 下单结束时间
 */
export function seckillList(data) {
  return request({
    url: `api-market/activity/seckill/list`,
    method: 'post',
    data:Qs.stringify(data)
  })
}
/* 秒杀 add新增、update编辑、forbidden禁用
 * baseParam.endTime
 */
export function seckillModify(data) {
  return request({
    url: `api-market/activity/seckill/modify`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}



/* 场次信息(添加秒杀活动时候用)
 */
export function seckillPeriods(data) {
  return request({
    url: `api-market/activity/seckill/app/periods`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 秒杀活动明细
 * seckillId
 */
export function seckillDetail(query) {
  return request({
    url: `api-market/activity/seckill/detail`,
    method: 'get',
    params: query
  })
}

/* 秒杀商品审核列表
 * orderId
 */
export function seckillProduct(data) {
  return request({
    url: `api-market/activity/seckill/products/audit/list`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 秒杀缴费审核列表
 * orderId
 */
export function seckillDeposit(data) {
  return request({
    url: `api-market/activity/seckill/periodPay/audit/list`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 秒杀商品审核
 * ids
 * result
 * remarks
 */
export function productsAudit(data) {
  return request({
    url: `api-market/activity/seckill/products/audit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 秒杀报名费用审核
 * ids
 * result
 * remarks
 */
export function depositAudit(data) {
  return request({
    url: `api-market/activity/seckill/deposit/audit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}


/* 秒杀改状态
 * ids
 * result
 * remarks
 */
export function seckillStart(data) {
  return request({
    url: `api-market/activity/seckill/test/start`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 秒杀已报名商品
 * signUpNo 报名编号必输
 * name:商品名称
 * code:商品编码
 * * page
 * limit
 */
export function signUpProduct(data) {
  return request({
    url: `api-market/activity/seckill/signUp/product`,
    method: 'post',
    data: Qs.stringify(data)
  })
}



/* 每日特价列表
 * orderStatus 订单状态
 * paymentEndTime 付款结束时间
 * paymentStartTime 付款开始时间
 * sn 订单编号
 * clientName 客户名称
 * startTime 下单开始时间
 * endTime 下单结束时间
 */
export function dailySpecialList(data) {
  return request({
    url: `api-market/activity/dailySpecial/list`,
    method: 'post',
    data:Qs.stringify(data)
  })
}
/* 每日特价 add新增、update编辑、forbidden禁用
 * baseParam.endTime
 */
export function dailySpecialModify(data) {
  return request({
    url: `api-market/activity/dailySpecial/modify`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 每日特价明细
 * dailyId
 */
export function dailySpecialDetail(query) {
  return request({
    url: `api-market/activity/dailySpecial/detail`,
    method: 'post',
    params: query
  })
}
/* 每日特价已报名商品
 * signUpNo 报名编号必输
 * name:商品名称
 * code:商品编码
 * * page
 * limit
 */
export function specialProduct(data) {
  return request({
    url: `api-market/activity/dailySpecial/signUp/product`,
    method: 'post',
    data: Qs.stringify(data)
  })
}








/* 每日特价商品审核列表
 * orderId
 */
export function dailySpecialProduct(data) {
  return request({
    url: `api-market/activity/dailySpecial/products/audit/list`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 每日特价缴费审核列表
 * orderId
 */
export function dailySpecialDeposit(data) {
  return request({
    url: `api-market/activity/dailySpecial/periodPay/audit/list`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 每日特价商品审核
 * ids
 * result
 * remarks
 */
export function specialProductsAudit(data) {
  return request({
    url: `api-market/activity/dailySpecial/products/audit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 每日特价报名费用审核
 * ids
 * result
 * remarks
 */
export function specialDepositAudit(data) {
  return request({
    url: `api-market/activity/dailySpecial/deposit/audit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}


/* 每日特价改状态
 * ids
 * result
 * remarks
 */
export function dailySpecialStart(data) {
  return request({
    url: `api-market/activity/dailySpecial/test/start`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
