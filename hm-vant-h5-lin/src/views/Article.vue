<template>
  <div>
    <template>
      <div class="article-page">
        <van-nav-bar fixed placeholder>
          <template #left>
            <van-tabs
              color="#000"
              title-inactive-color="#aaa"
              line-width="12px"
              @click="sortclick"
            >
              <van-tab title="推荐"></van-tab>
              <van-tab title="最新"></van-tab>
            </van-tabs>
          </template>
          <template #right>
            <div class="logo">
              <img src="@/assets/images/logo.png" alt="" />
            </div>
          </template>
        </van-nav-bar>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article-item
            v-for="item in list"
            :key="item.id"
            :item="item"
          ></article-item>
        </van-list>
      </div>
    </template>
  </div>
</template>


<script>
import { getArticlesAPI } from "@/api/article";
export default {
  name: "article-page",
  data() {
    return {
      loading: false,
      list: [],
      finished: false,
      current: 1,
      pageTotal: 10,
    };
  },
  // async created() {

  // },
  methods: {
    sortclick() {
      
    },
    async onLoad() {
      if (this.current < this.pageTotal) {
        const res = await getArticlesAPI({ current: this.current++ });
        this.list = [...this.list, ...res.data.data.rows];
        this.loading = false;
        this.pageTotal = res.data.data.pageTotal;
      } else {
        this.finished=true
      }
    },
  },
};
</script>
<style lang="less" scoped>
.article-page {
  .logo {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    > img {
      width: 64px;
      height: 28px;
      display: block;
      margin-right: 10px;
    }
  }
}
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
