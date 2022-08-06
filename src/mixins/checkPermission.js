import store from "@/store";
export default {
  methods: {
    // 校验权限的方法
    checkPermission(str) {
      // 判断传入的权限标识是否在该用户的权限标识数组中
      if (!store.getters.token) return false;
      return store.getters.points.includes(str);
    },
  },
};
