<template>
  <div>inner-commodity</div>
  <router-link
    :to="{
      name: 'InnerCommodityDetail',
      params: {
        id: '12345'
      }
    }"
  >点我到内部版费商品详情页</router-link>
</template>