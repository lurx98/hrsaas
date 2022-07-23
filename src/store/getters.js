// 根getters 建立了对子模块state数据的快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state=>state.user.token,
  userId: state=>state.user.userInfo.userId,
}
export default getters
// store.state.user.token
// store.getters.token