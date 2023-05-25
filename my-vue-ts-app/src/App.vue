<script setup lang="ts">
import ChannelNav from './components/ChannelNav.vue';
import ArticleList from './components/ArticleList.vue';
import { ref } from 'vue'
const channelId = ref(0)
</script>

<template>
    <ChannelNav :channelId="channelId" @changeChannel="channelId = $event"></ChannelNav>
    <ArticleList :channelId="channelId"></ArticleList>
</template>
