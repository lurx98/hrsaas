// 根getters 建立了对子模块state数据的快捷访问
const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  userId: (state) => state.user.userInfo.userId,
  username: (state) => state.user.userInfo.username,
  departmentName: (state) => state.user.userInfo.departmentName,
  companyName: (state) => state.user.userInfo.companyName,
  staffPhoto: (state) => state.user.userInfo.staffPhoto,
  companyId: (state) => state.user.userInfo.companyId,
  points: (state) => {
    if (state.user.userInfo.roles) {
      return state.user.userInfo.roles.points;
    } else {
      return [];
    }
    // return state.user.userInfo?.roles.points;
  },
};
export default getters;
// store.state.user.token
// store.getters.token
