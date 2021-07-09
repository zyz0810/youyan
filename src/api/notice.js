import request from '@/utils/request'
import Qs from 'qs'
/* 查询公告列表
 * createEndTime 创建时间-结束
 * createStartTime 创建时间-开始
 * limit
 * page
 * title
 */
export function noticeList(data) {
  return request({
    url: `api-user/notice/listByPage`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 公告新增、编辑、删除
 * content 内容
 * isDelete 0有效1无效
 * operatorType 操作类型add新增update编辑delete删除
 * title 标题
 */
export function noticeModify(data) {
  return request({
    url: `api-user/notice/noticeModify`,
    method: 'post',
    data: Qs.stringify(data)
  })
}



/* 查询公告明细
 * id
 */
export function getNoticeById(data) {
  return request({
    url: `api-user/notice/getNoticeById`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

