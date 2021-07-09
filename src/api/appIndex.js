import request from '@/utils/request'
import Qs from 'qs'
/* App首页列表
 * createEndTime 创建时间-结束
 * createStartTime 创建时间-开始
 * limit
 * page
 * title
 */
export function appList(data) {
  return request({
    url: `api-user/app/listByPage`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/* 新增、编辑、删除
 * content 内容
 * isDelete 0有效1无效
 * operatorType 操作类型add新增update编辑delete删除
 * title 标题
 */
export function appModify(data) {
  return request({
    url: `api-user/app/modify`,
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}



/* 查询公告明细
 * id
 */
export function getNoticeById(query) {
  return request({
    url: `api-user/notice/getNoticeById`,
    method: 'get',
    params: query
  })
}

/* 商品展示列表
 * showId 展示ID
 * showName 展示名称
 * showStatus 	展示状态0开启1关闭
 * limit
 * page
 */
export function productShow(data) {
  return request({
    url: `api-product/productShow/listByPage`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* 编辑商品展示列表 add添加update编辑forbidden禁用
 * operatorType 操作类型:add添加update编辑forbidden禁用
 * createTime 创建时间
 * createUser 	创建人
 * endTime 结束时间
 * id 自增主键id
 * showId 自增主键id
 * showName 展示名称
 * showStatus 展示状态
 * startTime  开始时间
 * updateTime 更新时间
 * updateUser 更新人
 * productShowItem[0].createTime  商品创建时间
 * productShowItem[0].goodsSn  商品编号
 * productShowItem[0].id  自增主键id
 * productShowItem[0].manufacturerName  厂家名称
 * productShowItem[0].productId  商品ID
 * productShowItem[0].productName 商品名称
 * productShowItem[0].productSpecs 商品规格
 * productShowItem[0].productStatus 商品状态
 * productShowItem[0].showId  展示ID
 * productShowItem[0].skuId  sku
 * productShowItem[0].supplierName
 */
export function modifyProductShow(data) {
  return request({
    url: `api-product/productShow/modifyProductShow`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* 商品展示列表
 * showId 展示ID
 * showName 展示名称
 * showStatus 	展示状态0开启1关闭
 * limit
 * page
 */
export function productShowDetail(data) {
  return request({
    url: `api-product/productShow/detail`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* 修改排序
 * showId 展示ID
 * skuId skuId
 * sort 	排序数字
 */
export function productSort(data) {
  return request({
    url: `api-product/productShow/update/sort`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* app首页设置 -- 预团购设置:商品列表
 * limit
 * page
 */
export function groupProductSetting(data) {
  return request({
    url: `api-user/app/groupProductSetting`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* app首页设置 -- 预团购设置:保存首页商品(编辑排序)
 * groupProductList[0].sort
 * groupProductList[0].id
 */
export function addGroupProduct(data) {
  return request({
    url: `api-user/app/addGroupProduct`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* app首页设置 -- 预团购设置:商品删除
 * ids 首页预团购商品id
 */
export function groupProductDelete(data) {
  return request({
    url: `api-user/app/groupProductDelete`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}

/* app首页设置 -- 预团购设置:商品启用
 * ids 首页预团购商品id
 */
export function groupProductEnable(data) {
  return request({
    url: `api-user/app/groupProductEnable`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}


/* app首页设置 -- 预团购设置:商品禁用
 * ids 首页预团购商品id
 */
export function groupProductForbidden(data) {
  return request({
    url: `api-user/app/groupProductForbidden`,
    method: 'POST',
    data: Qs.stringify(data,{ arrayFormat: 'indices', allowDots: true })
  })
}
/* App首页列表详情
 * appHomeId 创建时间-结束
 */
export function appDetail(data) {
  return request({
    url: `api-user/app/appHomeArea/detail`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
