<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button
        :loading="loading"
        size="mini"
        type="primary"
        @click="handleUpload"
      >
        点击上传
      </el-button>
    </div>

    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>将文件拖到此处</span>
    </div>
  </div>
</template>

<script>
// 如何查看一个模块里面所有的信息（按需的、默认的）
// import * as 名称 from "路径"
import * as XLSX from "xlsx";
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
    };
  },
  methods: {
    // 整理数据
    generateData({ header, results }) {
      // 将头和表格数据放在了excelData进行存储
      this.excelData.header = header;
      this.excelData.results = results;
      //  如果onSuccess存在，就执行onSuccess 并且 将数据放入在里面
      this.onSuccess && this.onSuccess(this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    //  【核心】
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        // FileReader 是JS内置的对象，叫做文件阅读器
        // 1. 实例化得到文件阅读器
        const reader = new FileReader();
        // 2. 当读取完成之后
        reader.onload = (e) => {
          const data = e.target.result;
          //   使用第三方模块XLSX读取buffer数据
          const workbook = XLSX.read(data, { type: "array" });
          //   读取第一个sheet表格
          const firstSheetName = workbook.SheetNames[0];
          //   找到第一个sheet表格内容
          const worksheet = workbook.Sheets[firstSheetName];
          //   读取第一个sheet表格的头部内容  【核心方法】
          const header = this.getHeaderRow(worksheet);
          //    读取第一个sheet表格的内容 【核心方法】
          const results = XLSX.utils.sheet_to_json(worksheet);
          //  整理数据，向外传递
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        // 3. 读取某个文件  readAsArrayBuffer 把文件作为一个数组Buffer流去读取
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
  },
};
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 80px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
