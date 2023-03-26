<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>编号</th>
          <th>英雄名称</th>
          <th>英雄性别</th>
          <th>年龄</th>
          <th>操作区</th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.age }}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="delhero(item.id)"
            >
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["list"]),
  },
  methods: {
      ...mapMutations(['Delhero']),
      delhero(id) {
        this.Delhero(id)
      }
  },
};
</script>

<style>
</style>