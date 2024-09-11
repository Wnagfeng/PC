import request from './server'

/* eslint-disable */
export const listSearch = {
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    /*
     * 发送请求
     */
    sendReq (params, callback) {
      request({
        method: params.method || 'POST',
        url: params.url,
        data: params.data || {},
        withCredentials : true,
        params: params.payload || {},
        headers: {
          'Content-type': params.contentType || 'application/json;charset=utf-8'
        }
      }).then((res) => {
        if (res && res.data) {
          callback && callback(res.data)
        }
      }, (error) => {
      })
    }
  }
}
