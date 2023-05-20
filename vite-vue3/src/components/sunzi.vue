<script setup>
import { inject } from 'vue';
const b = inject('b')
const unpdatab = inject('unpdatab')
</script>

<template>
    <div class="box" @click="unpdatab">孙子</div>
    <h1>{{ b }}</h1>
</template>

<style lang='scss' scoped></style>
