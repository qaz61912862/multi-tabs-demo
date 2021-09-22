<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="menu.map((item, index) => index)">
        <el-sub-menu v-for="(item, index) in menu" :key="index" :index="index">
          <template #title>
            <i class="el-icon-menu"></i>
            <span v-if="item.meta">{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group v-for="(child, childIndex) in item.children || []" :key="childIndex">
            <router-link
              :class="{
                active: child.name === currentRouteName || child.name === currentRouteActiveMenu,
              }"
              v-if="child.meta && child.meta.isNav"
              :to="{
                name: child.name,
              }"
            >{{ child.meta.title }}</router-link>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <tabs />
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component
              v-if="(route && route.meta && route.meta.isCache)"
              :is="Component"
              :key="viewKey"
            />
          </keep-alive>
          <component
            v-if="(route && route.meta && !route.meta.isCache)"
            :is="Component"
            :key="viewKey"
          />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, RouteRecordRaw } from 'vue-router';
import { routes } from '@/router';
import tabs from '@/components/tabs/index.vue';

export default defineComponent({
  components: {
    tabs,
  },
  setup() {
    const currentRoute = useRoute();
    const viewKey = computed(() => {
      return currentRoute.path || Date.now();
    });
    const menu = computed(() => {
      return routes.filter((item: RouteRecordRaw) => {
        return !['Redirect', '404'].includes(item.name as string)
      })
    })
    const currentRouteName = computed(() => {
      console.log(currentRoute);
      return currentRoute.name;
    })
    const currentRouteActiveMenu = computed(() => {
      return currentRoute.meta?.activeMenu || '';
    })
    return {
      viewKey,
      menu,
      currentRouteName,
      currentRouteActiveMenu
    };
  },
})
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
a {
  text-decoration: none;
  color: #303133;
  font-size: 14px;
  padding: 10px 0;
  display: block;
  text-align: center;
  &.active {
    background: #409eff;
    color: #fff;
  }
}
:deep(.el-menu-item-group__title) {
  display: none;
}
.el-main {
  padding: 20px 10px;
  :deep(.el-scrollbar) {
    text-align: left;
    padding: 0;
  }
}
</style>
