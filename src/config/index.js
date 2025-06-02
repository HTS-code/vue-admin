export default {
  // 登录页路由
  LOGIN_URL: '/login',
  // 路由白名单，不需要验证token
  ROUTER_WHITE_LIST: ['/login'],
  // 是否通过 menu 返回动态路由,默认使用全部注册路由
  ISASYNCROUTER: false,
  // pinia持久化地址，可选 sessionStorage 与 localStorage
  PINIASTORY: sessionStorage,
  // 代理地址
  TARGETURL: '/api'
}
