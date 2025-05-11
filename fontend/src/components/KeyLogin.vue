<script setup>
import { ref } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
const params = useUrlSearchParams('history')
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { useKeyStore } from '../store';
const keyStore = useKeyStore();
const key = ref('');
const login = () => {
  // 处理登录逻辑
  keyStore.setKey(key.value); // Setting a new key value
  console.log(keyStore.key); // Accessing the stored key
  router.push('/view');
};
if(keyStore.key !== null){
  console.log('跳转图片页面')
}
// params.status = 'ok'
if(params.key !== undefined){
  keyStore.setKey(params.key)
  console.log("触发")
  router.push('/view')
}

</script>

<template>
  <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }">
    <a-card :style="{ width: '360px' }" title="登录您的Key">
      <h2>登录RainWindowKey</h2>
      <br>
      <div :style="{ display: 'flex', alignItems: 'center' }">
        <a-input v-model="key" placeholder="请输入Key" style="flex: 1; margin-right: 10px;" />
        <a-button type="primary" @click="login">登录</a-button>
      </div>
    </a-card>
  </div>
</template>

<style scoped>

</style>
