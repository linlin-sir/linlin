<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="openDrawer('add')"
          >
            添加面经
          </el-button>
        </div>
      </template>
    </el-card>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="stem" label="标题" width="400"> </el-table-column>
      <el-table-column prop="creator" label="作者"> </el-table-column>
      <el-table-column prop="likeCount" label="点赞"> </el-table-column>
      <el-table-column prop="views" label="浏览数"> </el-table-column>
      <el-table-column prop="createdAt" label="更新时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template #default="{ row }">
          <div class="actions">
            <i class="el-icon-view" @click="openDrawer('preview', row.id)"> </i>
            <i class="el-icon-edit-outline" @click="openDrawer('edit',row.id)"> </i>
            <i class="el-icon-delete" @click="del(row.id)"> </i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <el-drawer
      :visible.sync="isShowDrawer"
      :before-close="handleClose"
      :title="drawerTitle"
      direction="rtl"
      size="50%"
    >
      <div v-if="drawerType === 'preview'" class="article-preview">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>
      <el-form
        v-else
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem" placeholder="输入面经标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="form.content"
            @blur="$refs.form.validateField('content')"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import {
  getArticleList,
  createArticle,
  removeArticle,
  getArticleDetail,
  updateArticle
} from "@/api/article";
export default {
  // 注册quillEditor
  components: { quillEditor },
  name: "article-page",
  // 定义变量
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      isShowDrawer: false,
      drawerType: "",
      form: {
        stem: "",
        content: "",
      },
      rules: {
        stem: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      ID: "",
    };
  },
  // 创建结构后
  created() {
    this.initData();
  },

  // 方法
  methods: {
    async del(id) {
      await removeArticle(id);
      this.initData();
      this.$message.success("删除成功");
    },

    handleCurrentChange(val) {
      // 处理当前页变化
      this.current = val;
      this.initData();
    },

    async initData() {
      const { data } = await getArticleList({
        current: this.current,
        pageSize: this.pageSize,
      });
      this.list = data.rows;
      this.total = data.total;
    },

    async openDrawer(type, id) {
      this.ID = id;
      this.drawerType = type;
      const res = await getArticleDetail(id);
      const { stem, content } = res.data;
      this.form.stem = stem;
      this.form.content = content;
      this.drawerType = type;
      this.isShowDrawer = true;
    },

    handleClose() {
      this.isShowDrawer = false;
    },

    async submit() {
      await this.$refs.form.validate();
      if (this.drawerType === "add") {
        await createArticle(this.form);
      } else if(this.drawerType==="edit") {
        await updateArticle({...this.form,id:this.ID})
      }
      this.$refs.form.resetFields();
      this.$message.success("操作成功");
      this.current = 1;
      this.initData();
      this.handleClose();
    },
  },

  // 计算
  computed: {
    drawerTitle() {
      let title = "大标题";
      if (this.drawerType === "add") title = "添加面经";
      if (this.drawerType === "preview") title = "面经预览";
      if (this.drawerType === "edit") title = "修改面经";
      return title;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>