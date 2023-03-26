<template>
  <div class="container">
    <div class="panel panel-primary">
      <!-- Default panel contents -->
      <div class="panel-heading">英雄列表管理</div>
      <div class="panel-body">
        <!-- 存放的搜索区域 -->
        <form action="" autocomplete="off">
          <div class="row">
            <div class="col-lg-3">
              <input
                type="text"
                class="form-control"
                placeholder="输入英雄名称"
                name="name"
                v-model="data.name"
              />
            </div>
            <div class="col-lg-3">
              <select class="form-control" name="gender" v-model="data.gender">
                <option value="">--选择性别--</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div class="col-lg-3">
              <input
                name="age"
                type="text"
                class="form-control"
                placeholder="输入年龄"
                v-model="data.age"
              />
            </div>
            <div class="col-lg-3">
              <button type="button" class="btn btn-success" id="search" @click="filterHero">
                搜索
              </button>
              <button type="button" class="btn btn-warning" id="reset">
                重置
              </button>
            </div>
          </div>
        </form>
        <hero-list></hero-list>
      </div>
    </div>
  </div>
</template>

<script>
import HeroList from "@/components/HeroList.vue";
import { mapMutations } from 'vuex';
export default {
  components: { HeroList },
  data() {
    return {
      data: {
        name: '',
        gender:'',
        age: '',
       }
    };
  },
  methods: {
    ...mapMutations(['filterhero']),
    filterHero() {
      this.filterhero(this.data)
    }
  }
};
</script>

<style sco
HeroListpe>
.panel {
  width: 900px;
  margin: 10px auto;
}
</style>