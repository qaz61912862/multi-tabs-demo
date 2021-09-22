<template>
  <div>cutting-order-list</div>
  <router-link
    :to="{
      name: 'ExternalCommodityDetail',
      params: {
        id: '12345'
      }
    }"
  >点我到外部版费商品详情页</router-link>
</template>