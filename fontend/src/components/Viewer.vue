<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useKeyStore } from '../store';
import { useRouter, useRoute } from 'vue-router';
import APlayer from 'APlayer';
import 'APlayer/dist/APlayer.min.css';
import { useUrlSearchParams } from '@vueuse/core';
const params = useUrlSearchParams('hash')
const router = useRouter();
const route = useRoute();
const keyStore = useKeyStore();
const is_login_sucss = ref(true);
if (!keyStore.key || keyStore.key === 'null') {
  keyStore.setKey(null);
  console.log('未登录,跳转登录');
  router.push('/');
  is_login_sucss.value = false;
}

const metadata = ref({});
const pictures = ref([]);

async function fetchData() {
  try {
    const response = await fetch(`/api/get_data?key=${keyStore.key}`);
    if (!response.ok) {
      if (response.status === 404 || keyStore.key !== null) {
        console.log("Key无效");
        alert("Key无效,将返回登录");
        await router.push('/');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    const data = await response.json();
    metadata.value = data;
    pictures.value = data.pictures;
    initAPlayer(data.bgmart, data.bgmcover, data.bgmname, data.bgmurl);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

let aplayer;

function initAPlayer(artist, cover, title, url) {
  aplayer = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    audio: [{
      name: title,
      artist: artist,
      url: url,
      cover: cover,
    }]
  });
}

onMounted(() => {
  if (is_login_sucss.value) {
    fetchData();
  }
});

onUnmounted(() => {
  try {
    aplayer.destroy();
  } catch (e) {
    console.log('aplayer not initialized');
  }
})
</script>

<template>
  <a-watermark :content="['晚江右海 版权所有', keyStore.key, new Date().getTime()]"
               style="min-height:75vh; position: relative;">
    <div id="aplayer"></div>
    <div v-if="metadata.description" style="margin-bottom: 20px;">
      <h2>描述:</h2>
      <p>{{ metadata.description }}</p>
    </div>
    <div class="gallery">
      <a-image-preview-group>
        <a-watermark :content="['晚江右海 版权所有', keyStore.key, new Date().getTime()]">
          <a-image
              v-for="(picture, index) in pictures"
              :key="index"
              :src="picture"
              :width="150"
              :height="150"
              style="margin-right: 10px; margin-bottom: 10px;"
          />
        </a-watermark>
      </a-image-preview-group>
    </div>
  </a-watermark>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
}
</style>
