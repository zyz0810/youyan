import request from '@/utils/request'
import Qs from 'qs'
/* 获取所有系统设置树
 * createEndTime 创建时间-结束
 * createStartTime 创建时间-开始
 * limit
 * page
 * title
 */
export function sysTree(data) {
  return request({
    url: `api-user/setting/getSysSettingTree`,
    method: 'get',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 保存/修改/删除
 * content 内容
 * isDelete 0有效1无效
 * operatorType 操作类型add新增update编辑delete删除
 * title 标题
 */
export function sysSave(data) {
  return request({
    url: `api-user/setting/modifySysSetting`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 公告新增、编辑、删除
 * content 内容
 * isDelete 0有效1无效
 * operatorType 操作类型add新增update编辑delete删除
 * title 标题
 */
export function tipUpdate(data) {
  return request({
    url: `api-user/warm-remind/update`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}




/* 查询公告明细
 * id
 */
export function tipView(query) {
  return request({
    url: `api-user/warm-remind/detail`,
    method: 'get',
    params: query
  })
}



/* 意见反馈列表
 */
export function selectFeedBackList(data) {
 return request({
   url: `api-user/helpCenter/selectFeedBackList`,
   method: 'post',
   data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
 })
}
