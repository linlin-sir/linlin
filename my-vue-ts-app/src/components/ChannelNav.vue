<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ChannelItem, ChannelResData } from '../type/data'
const channels = ref<ChannelItem[]>([])
onMounted(async () => {
    const res = await axios.get<ChannelResData>('http://geek.itheima.net/v1_0/channels')
    channels.value = res.data.data.channels
})
defineProps<{ channelId: number }>()
const emit = defineEmits<{
    (e: 'changeChannel', id: number): void
}>()
</script>

<template>
    <div class="channel-nav">
        <nav class="list">
            <a class="item" :class="{ active: channelId === item.id }" href="javascript:;" v-for="item in channels"
                :key="item.id" @click="emit('changeChannel', item.id)">
                {{ item.name }}
            </a>
        </nav>
    </div>
</template>
