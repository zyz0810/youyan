import request from '@/utils/request'
import Qs from 'qs'
/* 服务商列表查询
 *
 */
export function providerList(data) {
  return request({
    url: `api-user/crm/provider/providerPages`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}
/* 服务商详情
 * id
 */
export function providerDetail(query) {
  return request({
    url: `api-user/crm/provider/providerDetail`,
    method: 'get',
    params: query
    // data: Qs.stringify(data)
  })
}
/* 服务商审核（资料）
 * id
 * result 审核结果 （通过：APPROVED  不通过：FAILED）
 */
export function profitAudit(data) {
  return request({
    url: `api-user/crm/provider/audit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}


/* 设置服务区域
 * id 服务商id
 * areaIds 	区域ids
 */
export function saveProviderArea(data) {
  return request({
    url: `api-user/crm/provider/saveProviderArea`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 设置服务商保证金
 * id 服务商id []
 * setDeposit 	保证金设置金额
 * instalmentsProportion  分期付款设置的每月扣除分期比例,需要输入整数
 */
export function saveProviderMoney(data) {
  return request({
    url: `api-user/crm/provider/saveDeposit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 服务商保证金审核
 * id 服务商id
 * remarks 	保证金设置金额
 */
export function auditProviderMoney(data) {
  return request({
    url: `api-user/crm/provider/auditDeposit`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 服务商保证金审核
 * id 服务商id
 * remarks 	保证金设置金额
 */
export function saveProviderType(data) {
  return request({
    url: `api-user/crm/provider/saveProviderType`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 服务商服务状态关闭和开启按钮
 * id 服务商id
 * serviceOpenOrClose	传值: OPEN对应开启  CLOSE对应关闭
 */
export function updateServiceStatus(data) {
  return request({
    url: `api-user/crm/provider/updateServiceStatus`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

/* 服务商推广状态关闭和开启按钮
 * id 服务商id
 * providerStatus	传值: OPEN对应开启  CLOSE对应关闭
 */
export function updateAdvertisementStatus(data) {
  return request({
    url: `api-user/crm/provider/updateAdvertisementStatus`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
