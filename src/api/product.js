import request from '@/utils/request'
import Qs from 'qs'
/* 商品列表
 * limit
 * page
 * categoryId 分类id
 * brandId 品牌id
 * mnemonicCode 助记码
 * name 商品名称
 * goodsSn 商品编码
 *
 */
export function productList(data) {
  return request({
    url: `api-product/product/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
  })
}
/* 商品列表
 * limit
 * page
 * categoryId 分类id
 * brandId 品牌id
 * mnemonicCode 助记码
 * name 商品名称
 * goodsSn 商品编码
 *
 */
export function productSkuList(data) {
  return request({
    url: `api-product/product/productSkuList`,
    method: 'post',
    // params: query
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 根据商品id查询
 * id
 */
export function productView(query) {
  return request({
    url: `api-product/product/findById`,
    method: 'get',
    // params: Qs.stringify(query)
    params: query
  })
}
/* 批量启用|禁用
 * enable true/false
 * productIds []
 */
export function enableOrDisable(data) {
  return request({
    url: `api-product/product/enableOrDisable`,
    method: 'post',
    data: Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
  })
}

/* 审核
 * comments 备注，原因（审核不通过）
 * productId 商品id
 * result
 */
export function productApprove(data) {
  return request({
    url: `api-product/product/approve`,
    method: 'post',
    data: Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
  })
}

/* 批量上架
 * productIds 商品ID列表
 */
export function putOnSale(data) {
  return request({
    url: `/api-product/product/putOnSale`,
    method: 'post',
    data: Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
  })
}

/* 批量下架
 * productIds 商品ID列表
 */
export function putDownSale(data) {
  return request({
    url: `/api-product/product/putDownSale`,
    method: 'post',
    data: Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
  })
}

/* 商品v2开始
 */
/* 根据商品id查询
 * id
 */
export function productViewV2(query) {
  return request({
    url: `api-product/product/v2/findById`,
    method: 'get',
    // params: Qs.stringify(query)
    params: query
  })
}

/* 商品详情（供应商后台更改商品管理-编辑价格/图片/商品简介/详细描述后，需要被重新审核）
 */
/* 根据商品id查询
 * id
 */
export function findProductByIdForAdmin(query) {
  return request({
    url: `api-product/product/v2/findProductByIdForAdmin`,
    method: 'get',
    // params: Qs.stringify(query)
    params: query
  })
}

/* 添加商品
 *
 */
export function productSaveV2(data) {
  return request({
    url: `api-product/product/v2/save`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}
/* 修改商品
 *
 */
export function productUpdateV2(data) {
  return request({
    url: `api-product/product/v2/update`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务审核
 *
 */
export function operatorProductServiceCheckListByPage(data) {
  return request({
    url: `/api-product/product/service/operatorProductServiceCheckListByPage`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务审核
 *
 */
export function operatorProductServiceCheckModify(data) {
  return request({
    url: `/api-product/product/service/operatorProductServiceCheckModify`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务分配列表
 *
 */
export function operatorProductServiceAllocationListByPage(data) {
  return request({
    url: `/api-product/product/service/operatorProductServiceAllocationListByPage`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务分配 编辑 撤销
 *
 */
export function productServiceAllocationModify(data) {
  return request({
    url: `/api-product/product/service/productServiceAllocationModify`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务分配 服务商列表
 *
 */
export function crmProviderListByPage(data) {
  return request({
    url: `/api-product/product/service/crmProviderListByPage`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务分配 商品服务未分配列表
 *
 */
export function productServiceUnAllocationListByPage(data) {
  return request({
    url: `/api-product/product/service/productServiceUnAllocationListByPage`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务详情
 *
 */
export function productServiceAllocationDetail(data) {
  return request({
    url: `/api-product/product/service/productServiceAllocationDetail`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品服务查询日志
 *
 */
export function operatorProductServiceSearchLog(data) {
  return request({
    url: `/api-product/product/service/operatorProductServiceSearchLog`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}


/* 价格策略列表
 * areaPriceList[0].areaIds
 * areaPriceList[0].customerTypeId
 * areaPriceList[0].id
 * areaPriceList[0].discount 折扣
 * customerPriceList[0].customerStoreId  客户id
 * customerPriceList[0].id  id
 * customerPriceList[0].productId 商品id
 * customerPriceList[0].type 是否指定参与,0:指定不参与，1：指定参与,可用值:0,1
 * endTime 结束时间
 * page
 * limit
 * name 名称
 * productIds productId
 * startTime 	开始时间
 * status 状态： 未开始，进行中，禁用
 */
export function productPriceList(data) {
  return request({
    url: `api-product/platform/productPriceStrategy/list`,
    method: 'post',
    // params: query
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 添加价格策略
 * brandId 品牌id
 * categoryId 分类id
 * createBeginTime 创建时间:开始时间
 * createLastTime 创建时间:结束时间
 * goodsSn 商品编码
 * mnemonicCode 助记码
 * name 商品名称
 * status 状态:1上架、0下架、2售罄、3删除
 * page
 * limit
 */
export function productPriceAdd(data) {
  return request({
    url: `api-product/platform/productPriceStrategy/add`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 编辑价格策略
 * brandId 品牌id
 * categoryId 分类id
 * createBeginTime 创建时间:开始时间
 * createLastTime 创建时间:结束时间
 * goodsSn 商品编码
 * mnemonicCode 助记码
 * name 商品名称
 * status 状态:1上架、0下架、2售罄、3删除
 * page
 * limit
 */
export function productPriceUpdate(data) {
  return request({
    url: `api-product/platform/productPriceStrategy/updateStrategy`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}


/* 查看价格策略
 * id
 */
export function productPriceView(data) {
  return request({
    url: `api-product/platform/productPriceStrategy/findById`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 启用、禁用价格策略
 * id
 * status 禁用0，启用 1
 */
export function productPriceStatus(data) {
  return request({
    url: `api-product/platform/productPriceStrategy/updateStatus`,
    method: 'post',
    // params: Qs.stringify(query)
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}



/* 价格策略操作日志查看
 * productId
 */
export function productPriceLog(data) {
  return request({
    url: `api-product/platform/productPriceStrategy/strategyLog`,
    method: 'post',
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 所有商品服务审核通过且对应的供应商没有被禁用的商品列表
 * limit
 * page
 * productName 商品名称
 * manufacturerName 生产厂家
 * checkStatus 审核状态0待提交1待审核2通过3未通过
 * serviceStatus 服务状态0待分配1已分配2已撤销
 * goodsSn 商品编码
 * supplierName 供应商名称
 * skuIds skuId
 */
export function supplierProductServiceList(data) {
  return request({
    url: `api-product/product/service/supplierProductServicePage`,
    method: 'post',
    // params: query
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}

/* 商品列表（所有预团购商品）
 * limit
 * page
 * productName 商品名称
 * productSn 商品编码
 * skuIds 商品skuIds
 */
export function centerProductList(data) {
  return request({
    url: `api-market/groupPurchase/centerProductList`,
    method: 'post',
    // params: query
    data: Qs.stringify(data, {
      arrayFormat: 'indices',
      allowDots: true
    })
  })
}
