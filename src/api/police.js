import request from '@/utils/request'
import Qs from 'qs'
/* 报警列表
 * pageSize
 * page
 */
export function policeList(data) {
  return request({
    url: `api/home/warnList`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 综合概览列表
 * pageSize
 * page
 */
export function dataList(data) {
  return request({
    url: `api/home/dataList`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 获取实时工况
 * facility_id 	设备编号
 */
export function realTime(data) {
  return request({
    url: `api/home/realTime`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
