<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="$emit('update:title','迪迦奥特曼')">点我切换</button>
  </div>
</template>

<script>
export default {
    props:['title']
}
</script>

<style>

</style>