<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :class="{ hidden: fileList.length === uploadMaxNum }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 进度条 -->
    <el-progress
      v-if="showPercent"
      :percentage="percentage"
      style="width: 180px"
    ></el-progress>
    <!-- 弹框 -->
    <el-dialog title="预览图片" width="600px" :visible.sync="showDialog">
      <img :src="imgUrl" width="100%" alt="" />
    </el-dialog>
  </div>
</template>
<script>
// 导入腾讯的sdk （sdk就是一个JS文件里面帮助你实现了特定的一些功能）
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDA8vUo57vUpvnQoxtbAqIXaP1PYS7Xjgi",
  SecretKey: "sVw97sPileKoFRQAh05wYv51iW5QXSEn",
});
export default {
  name: "ImageUpload",
  props: {
    uploadMaxNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      showDialog: false,
      imgUrl: "",
      fileList: [],
      currentFileUid: "", // 记录正在上传的这个文件的uid
      showPercent: false,
      percentage: 0,
    };
  },
  methods: {
    onPreview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    onRemove(file, fileList) {
      //   this.fileList = fileList;  // fileList 的数据结构比较复杂，污染了data里面的数据结构
      // file就是移除的图片  file.uid 是唯一的
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    onChange(file, fileList) {
      // 新的数组返回给fileList
      // 执行时机： 选择文件的时候、上传成功或失败的时候
      this.fileList = fileList.map((item) => item);
    },
    beforeUpload(file) {
      // 体积、格式的校验
      const maxSize = 1024 * 1024 * 12; // 最大2M
      if (file.size > maxSize) {
        this.$message.warning("体积不允许超过2M");
        return false;
      }
      const typeArr = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
      if (!typeArr.includes(file.type)) {
        this.$message.warning("格式不正确");
        return false;
      }
      // 走到这里就可以实现上传操作
      this.currentFileUid = file.uid;
      this.showPercent = true;
      this.percentage = 0;
      return true;
    },
    // 覆盖默认的上传行为，自定义上传功能
    httpRequest({ file }) {
      // file 就是原生的文件信息
      //   调用自己封装的 上传请求方法，提交数据即可；数据上传成功记得放入到fileList中
      //   人资没有自己的上传接口，上传到第三方的服务器(腾讯云)
      cos.putObject(
        {
          Bucket: "chenkun-1313178975" /* 填入您自己的存储桶，必须字段 */,
          Region: "ap-nanjing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: (progressData) => {
            this.percentage = progressData.percent * 100;
          },
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return this.$message.error("上传失败");
          }
          // 成功处理图片
          this.fileList = this.fileList.map((item) => {
            if (item.uid === this.currentFileUid) {
              item.url = "http://" + data.Location;
              item.upload = true;
            }
            return item;
          });
          this.currentFileUid = "";
          // 延迟关闭
          setTimeout(() => {
            this.showPercent = false;
          }, 400);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .hidden {
  .el-upload {
    display: none;
  }
}
</style>
