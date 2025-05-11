<template>
  <a-layout class="layout">
    <!-- 顶部菜单 -->
    <a-layout-header class="header">
      <div class="menu">
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <h2 style="color:#000000">RainWindow</h2>
          </a-menu-item>
          <a-menu-item key="1"><router-link to="/">首页</router-link></a-menu-item>
          <a-menu-item key="2" to="/view"><router-link to="/view">照片页</router-link></a-menu-item>
          <a-space></a-space>
          <a-button @click="clearKey" v-if="keyStore.key != null">退出当前Key登录</a-button>
        </a-menu>
      </div>
    </a-layout-header>

    <!-- 主内容区域 -->
    <a-layout-content class="content">
      <div class="main-content">
        <router-view />
      </div>
    </a-layout-content>

    <!-- 底部信息区域 -->
    <a-layout-footer class="footer">
      <!-- 底部信息 -->
      <p>Copyright © 2020-{{ new Date().getFullYear()}} 晚江右海 RainWindow. All rights reserved.</p>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

import { useKeyStore } from './store';
const keyStore = useKeyStore();
const clearKey = () => {
  keyStore.setKey(null);
  router.push('/');
  location.reload();
}

</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
}

.content {
  padding: 24px;
  background-color: #f0f2f5;
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #f0f1f2;
}
</style>