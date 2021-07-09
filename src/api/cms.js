import request from '@/utils/request'
import Qs from 'qs'


/* 
搜索H5 配置
 * limit
 * page
 *
 */
export function searchH5Config(data) {
  return request({
    url: `api-user/app/searchH5Config`,
    method: 'post',
    // params: query
    data: Qs.stringify(data)
  })
}

/* 
更新H5 配置
 *
 */

export function updateH5Config(data) {
 return request({
   url: `api-user/app/updateH5Config`,
   method: 'post',
   // params: query
   data: Qs.stringify(data)
 })
}


/* 
保存H5 配置
 *
 */

export function addH5Config(data) {
 return request({
   url: `api-user/app/addH5Config`,
   method: 'post',
   // params: query
   data: Qs.stringify(data)
 })
}


/* 
保存H5 配置
 *
 */

export function findH5ConfigById(data) {
 return request({
   url: `api-user/app/findH5ConfigById`,
   method: 'post',
   // params: query
   data: Qs.stringify(data)
 })
}


/* 
获取H5 详细配置参数
 *
 */

export function getH5ConfigDetail(data) {
 return request({ 
   url: `api-user/app/getH5ConfigDetail`,
   method: 'post',
   // params: query
   data: Qs.stringify(data)
 })
}


/* 
获取H5草稿 详细配置参数
 *
 */

export function getH5ConfigDetailDraft(data) {
 return request({ 
   url: `api-user/app/getH5ConfigDetailDraft`,
   method: 'post',
   // params: query
   data: Qs.stringify(data)
 })
}

/* 
保存H5 详细配置参数
 *
 */

export function saveH5ConfigDetail(data) {
 return request({
   url: `api-user/app/saveH5ConfigDetail`,
   method: 'post',
   data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
 })
}


/* 
获取oss鉴权
 *
 */

export function getExpressSts(params) {
 return request({
   url: `api-order/order/express/sts`,
   method: 'get',
   params
 })
}



/* 
保存url
 *
 */

export function updateH5ConfigUrl(data) {
 return request({
   url: `api-user/app/updateH5ConfigUrl`,
   method: 'post',
   data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
 })
}


/* 
保存草稿
 *
 */

export function saveH5ConfigDetailDraft(data) {
 return request({
   url: `api-user/app/saveH5ConfigDetailDraft`,
   method: 'post',
   data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
 })
}


