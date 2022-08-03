<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <!-- 左边 -->
      <el-col>
        <div class="before" v-if="text">
          <i class="el-icon-info" />{{ text }}
        </div>
      </el-col>
      <!-- 右边 -->
      <div style="display: flex; justify-content: end">
        <!-- 默认插槽 -->
        <slot />
      </div>
    </el-row>
  </el-card>
</template>
<script>
// 组件封装的目的：为了实现一些相同功能的复用
// 组件封装需要注意的： 设计props 【数据不同，结构样式相同】，设计插槽 【html结构不同】
export default {
  name: "PageTools",
  props: {
    text: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
