import request from '@/utils/request'
import Qs from 'qs'
/* 收益记录列表
 * limit
 * page
 * customerName 客户经理名称
 * endTime 提现结束时间
 * startTime 提现开始时间
 * status 提现状态0可提现1冻结
 */
export function profitListByPage(data) {
  return request({
    url: `api-product/advertisementWallet/profitListByPage`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
//
/* 收益明细
 * clerkId (客户经理ID 对应列表的 customerId
 */
export function profitView(data) {
  return request({
    url: `api-order/operation/order/profit/orderDetail`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
