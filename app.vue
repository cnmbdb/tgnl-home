<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 设置页面标题和元数据
useHead({
  title: 'TG nl Admin - Telegram机器人管理后台',
  meta: [
    { name: 'description', content: 'Telegram机器人nl管理后台系统' }
  ]
})
</script>