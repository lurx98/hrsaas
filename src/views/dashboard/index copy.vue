<template>
  <div class="dashboard-container">
    <!-- 上传组件 -->
    <!-- 默认选择完了图片之后会自动触发上传操作; 注意 所有的上传是 element-ui的JS自己完成的和项目中的请求实例没有关系-->
    <!-- action 是上传的地址 -->
    <!-- name 是文件的字段名 -->
    <!-- headers 是请求头 -->
    <!-- on-success 是上传成功之后执行的函数 -->
    <!-- on-remove  是移除相关图片的时候执行的函数 -->
    <!-- on-preview  预览图片，会出现放大镜，且点击就执行钩子 -->
    <!-- on-change  选择文件、上传成功或失败执行 -->
    <!-- before-upload  上传前执行，返回false或Promise且reject则取消上传 -->
    <el-upload
      list-type="picture-card"
      action="http://192.168.19.78:8060/admin/common/upload?type=images"
      name="file"
      :headers="{ 'x-token': token }"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :on-change="onChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="预览图片" :visible.sync="showDialog">
      <img :src="imgUrl" width="300px" alt="" />
    </el-dialog>
  </div>
</template>
<script>
// 上传接口
// http://192.168.19.78:8060/admin/common/upload?type=images
// x-token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJpZCI6IjEiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6Ijk2ZTc5MjE4OTY1ZWI3MmM5MmE1NDlkZDVhMzMwMTEyIiwibmFtZSI6IlRoaW5rSlPkuIDlk6UiLCJlbWFpbCI6Imhld3UxMTIyQDE2My5jb20iLCJwaG9uZSI6IjE3MzQyMDY1OTA5IiwibG9naW5faXAiOiI6OjEiLCJsb2dpbl9kYXRlIjoiMjAxOC0wMS0wOCAxNjoyMjo1MSIsImNyZWF0ZV9kYXRlIjoiMjAxNy0xMi0xNCAxMTo1Mjo0NiIsInVwZGF0ZV9kYXRlIjoiMjAyMS0wOS0wOCAxOTo0MzowMyIsImRlbF9mbGFnIjoiMCIsInJvbGVfaWQiOlsiMWM1NGUwMDNjMWZjNGRjZDliMDg3ZWY4ZDQ4YWJhYzMiXSwic3RhdHVzIjoxLCJkZWZhdWx0X2RhdGEiOiIxIiwicm9sZW5hbWUiOlsi6LaF57qn566h55CG5ZGYIl19LCJpYXQiOjE2NTk0MDk4NTF9.BkVxx8x3V6B51Td2qY3WVMzxnbSCdboTBg3_Aoj9q5w
// 字段：file  请求方式 post
export default {
  name: "Dashboard",
  data() {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJpZCI6IjEiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6Ijk2ZTc5MjE4OTY1ZWI3MmM5MmE1NDlkZDVhMzMwMTEyIiwibmFtZSI6IlRoaW5rSlPkuIDlk6UiLCJlbWFpbCI6Imhld3UxMTIyQDE2My5jb20iLCJwaG9uZSI6IjE3MzQyMDY1OTA5IiwibG9naW5faXAiOiI6OjEiLCJsb2dpbl9kYXRlIjoiMjAxOC0wMS0wOCAxNjoyMjo1MSIsImNyZWF0ZV9kYXRlIjoiMjAxNy0xMi0xNCAxMTo1Mjo0NiIsInVwZGF0ZV9kYXRlIjoiMjAyMS0wOS0wOCAxOTo0MzowMyIsImRlbF9mbGFnIjoiMCIsInJvbGVfaWQiOlsiMWM1NGUwMDNjMWZjNGRjZDliMDg3ZWY4ZDQ4YWJhYzMiXSwic3RhdHVzIjoxLCJkZWZhdWx0X2RhdGEiOiIxIiwicm9sZW5hbWUiOlsi6LaF57qn566h55CG5ZGYIl19LCJpYXQiOjE2NTk0MDk4NTF9.BkVxx8x3V6B51Td2qY3WVMzxnbSCdboTBg3_Aoj9q5w",
      imgUrl: "",
      showDialog: false,
    };
  },
  methods: {
    onSuccess(res) {
      console.log(res);
    },
    onRemove() {
      console.log("onRemove");
    },
    onPreview(file) {
      console.log(file);
      this.showDialog = true;
      this.imgUrl = file.url;
    },
    onChange(file, fileList) {
      // file 是对象（处理了，包含了文件上传的状态、原生的文件信息等）
      // 文件状态改变时的钩子，添加文件、上传成功或上传失败时都会被调用
      console.log(JSON.stringify(file));
    },
    beforeUpload(file) {
      // 这里一般做 体积的判断、类型的校验
      // file 是原生的文件信息
      console.log("beforeUpload", file);
      // return false;
      return Promise.reject("取消");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
