<script setup>
import { ref } from 'vue'
const list = ref(['金', '木', '水', '火', '土'])
const value = ref('')
const addlist = () => {
  list.value.push(value.value)
  value.value = ''
}
const dellist = (index) => {
   list.value.splice(index,1)
}
</script>

<template>
  <input type="text" v-model="value">
  <button @click="addlist">添加</button>
  <div>
    <ul>
      <li v-for="(item,index) in list" :key="item" @click="dellist(index)">{{ item }} </li>
    </ul>
  </div>
</template>

<style scoped>
input {
  height: 30px;
  outline: none;
}

li {
  list-style: none;
}
</style>
