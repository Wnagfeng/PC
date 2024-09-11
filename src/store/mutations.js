import * as types from './mutation-types'

const mutations = {
  [types.SET_SEARCHOBJ] (state, searchObj) {
    state.searchObj = searchObj
  },
  [types.SET_NEWADDRESS] (state, obj) {
    state.newAddress = obj
  },
  [types.SET_AREACODE] (state, arr) {
    state.areaCode = arr
  },
  [types.SET_USERINFO] (state, obj) {
    state.userInfo = obj
  },
  [types.SET_AVATAR] (state, img) {
    state.userInfo.headImage = img
  },
  [types.SET_CURRENTPRO] (state, obj) {
    state.currentPro = obj
  },
  [types.SET_SHOPPINGCART] (state, obj) {
    state.shoppingCart = obj
  },
  [types.SET_CARTNUMBER] (state, num) {
    state.cartNumber = num
  },
  [types.SET_NOTICEID] (state, num) {
    state.noticeId = num
  },
  [types.SET_COLLECTDATA] (state, obj) {
    state.collectData = obj
  },
  resetVuex (state) {
    state.searchObj = {}
    state.newAddress = {}
    state.areaCode = []
    state.currentPro = {}
    state.userInfo = {
      headImage: ''
    }
    state.shoppingCart = {}
    state.cartNumber = ''
    state.evaluateOrders = {}
    state.noticeId = {}
    state.collectData = {}
  }
}

export default mutations
