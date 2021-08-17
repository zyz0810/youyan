import request from '@/utils/request'
import Qs from 'qs'
/* 趋势曲线
 * facility_id 	设备编号
 */
export function homeTrend(data) {
  return request({
    url: `api/home/trend`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
