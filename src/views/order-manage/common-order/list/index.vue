<template>
  <div>common-order-list</div>
  <el-input v-model="content" />
  <router-link
    :to="{
      name: 'ExternalCommodityDetail',
      params: {
        id: '12345'
      }
    }"
  >点我到外部版费商品详情页</router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('');
    return {
      content,
    }
  }
});
</script>