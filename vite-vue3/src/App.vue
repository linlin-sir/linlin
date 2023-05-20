<script setup>
import HelloWorld from './components/HelloWorld.vue';
import { provide, ref } from 'vue';
const b = ref(100)
const unpdatab = () => {
  b.value++
}
provide('b', b)
provide('unpdatab', unpdatab)


</script>

<template>
  <HelloWorld></HelloWorld>
</template>

<style lang='scss'>
.box {
  padding: 20px;
  margin: 10px;
  border: 1px solid sandybrown;
}
</style>
