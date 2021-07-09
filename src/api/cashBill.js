import request from '@/utils/request'
import Qs from 'qs'
/* 提现单列表
 * limit
 * page
 * applyEndTime 申请结束时间
 * applyStartTime 申请开始时间
 * applyUser 申请人
 * checkStatus 审核状态0待审核1审核通过2审核不通过
 * settlementSn 提现单单号
 */
export function withdrawListByPage(data) {
  return request({
    url: `api-product/advertisementWallet/withdrawListByPage`,
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
 * operatorType 审核通过 checkSuccess/审核不通过 checkFaild
 * remark 备注
 * settlementSn 提现单单号
 */
export function advertisementWalletCheck(data) {
  return request({
    url: `api-product/advertisementWallet/check`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 结算接口
 * settlementSn settlementSn
 */
export function advertisementWalletApply(data) {
  return request({
    url: `api-product/advertisementWallet/settlement`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


