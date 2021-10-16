import request from '@/utils/request'
import Qs from 'qs'
/* 餐企油烟污染物历史数据
 * start_time 	2021-10-16
 * end_time 	2021-10-17
 * company_id
 * page
 * pageSize
 */
export function historyData(data) {
  return request({
    url: `/api/analyse/historyData`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 辖区报警次数占比分析
 * start_time 	2021-10-16
 * end_time 	2021-10-17
 */
export function departOfWarn(data) {
  return request({
    url: `/api/analyse/departOfWarn`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 报警次数和平均油烟浓度趋势分析
 * start_time 	2021-10-16
 * end_time 	2021-10-17
 */
export function timesOfWarn(data) {
  return request({
    url: `/api/analyse/timesOfWarn`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 餐企油烟浓度趋势分析
 * start_time 	2021-10-16
 * end_time 	2021-10-17
 */
export function analyseOfWarn(data) {
  return request({
    url: `/api/analyse/analyseOfWarn`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
