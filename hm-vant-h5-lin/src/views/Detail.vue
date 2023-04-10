<template>
  <div class="detail-page">
    <van-nav-bar left-text="返回" @click-left="$router.back()" fixed title="面经详情" />
    <header class="header">
      <h1>面经标题</h1>
      <p>
        创建时间 | {{ detail.createdAt }} 浏览量 | {{ detail.views }} 点赞数
        {{ detail.likeCount }}
      </p>
      <p>
        <img :src="detail.avatar" alt="" />
        <span>{{ detail.creator }}</span>
      </p>
    </header>
    <main class="body" v-html="detail.content"></main>
    <div class="opt">
      <van-icon :class="{ active: detail.likeFlag }" name="like-o" @click="updataLike(1)" />
      <van-icon :class="{ active: detail.collectFlag }" name="star-o" @click="updataLike(2)" />
    </div>
  </div>
</template>


<script>


import { getDetailByIdAPI, updateDetailAPI } from "@/api/article";
export default {
  data() {
    return {
      detail: {},
    };
  },
  async created() {
    const res = await getDetailByIdAPI(this.$route.params.id);
    this.detail = res.data.data;
  },
  methods: {
    async updataLike(optType) {
      await updateDetailAPI(this.detail.id, optType);
      if (optType == 1) {
        if (this.detail.likeFlag == 1) {
          this.$toast("取消点赞");
          this.detail.likeFlag = 0;
        } else {
          this.$toast("点赞成功");
          this.detail.likeFlag = 1;
        }
      } else {
        if (this.detail.collectFlag == 1) {
          this.$toast("取消收藏");
          this.detail.collectFlag = 0;
        } else {
          this.$toast("收藏成功");
          this.detail.collectFlag = 1;
        }
      }
    },

    // active:detail.likeFlag
    // active:detail.collectFlag
  },
};
</script>



<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;

  .header {
    h1 {
      font-size: 24px;
    }

    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;

    >.van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;

      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
