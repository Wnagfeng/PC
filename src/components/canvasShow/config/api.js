const BASEURL = (process.env.NODE_ENV === 'production') ? '/api' : '/api'

export const api = {
  fileUpload: BASEURL + '/file/upload',
  getClassify: BASEURL + '/canvas/getClassify',
  getProducts: BASEURL + '/canvas/getProducts',
  saveCanvas: BASEURL + '/canvas/saveCanvas',
  getCanvas: BASEURL + '/canvas/getCanvas',
  getShops: BASEURL + '/canvas/getShops', 
  getCoupons: BASEURL + '/canvas/getCoupons',
  getShopCoupons: BASEURL + '/canvas/getShopCoupons', 
  takeCoupon: BASEURL + '/coupon/takeCoupon', 
  selectCanvasCustomList: BASEURL + '/canvas/selectCanvasCustomList',
  getSeckills: `${BASEURL}/renovation/getSeckills`,
  getGroupWorks: `${BASEURL}/renovation/getGroupWorks`,
  getDiscounts:`${BASEURL}/renovation/getDiscounts`
}
export default api
