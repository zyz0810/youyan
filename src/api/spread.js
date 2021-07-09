import request from "@/utils/request";
import Qs from "qs";

/* 商品推广列表
 *
 */
export function getProductAdvertisementList(data) {
  return request({
    url: `api-product/productAdvertisement/product/list`,
    method: "post",
    data: Qs.stringify(data)
  });
}

/* 商品推广审核
 *
 */
export function updateAdvertisementApprove(data) {
  return request({
    url: `api-product/productAdvertisement/product/updateAdvertisementApprove`,
    method: "post",
    data: Qs.stringify(data, {
      arrayFormat: "indices",
      allowDots: true
    })
  });
}


/* 商品推广查询详情
 *
 */
export function findById(data) {
  return request({
    url: `api-product/productAdvertisement/product/findById`,
    method: "post",
    data: Qs.stringify(data, {
      arrayFormat: "indices",
      allowDots: true
    })
  });
}

/* 商品推广更新状态
 *
 */
export function updateAdvertisementStatus(data) {
  return request({
    url: `api-product/productAdvertisement/product/updateAdvertisementStatus`,
    method: "post",
    data: Qs.stringify(data, {
      arrayFormat: "indices",
      allowDots: true
    })
  });
}
