import { defineStore } from 'pinia';

export interface ITabsItem {
  name: string; // 路由名
  path: string; // 路径
  activePath?: string; // 激活的路由（用于左侧菜单样式）
  title: string; // 路由中文名
  query?: {
    [key: string]: any;
  };
  params?: {
    [key: string]: any;
  };
}

interface IState {
  tabs: ITabsItem[];
}

const NO_PUSH_ROUTES = ['404'];

const HOME_PAGE = {
  name: 'Home',
  path: '/home',
  title: '首页',
};

export const useTabsStore = defineStore({
  id: 'tabs',
  state: (): IState => ({
    tabs: JSON.parse(window.sessionStorage.getItem('tabs') as string) || [
      HOME_PAGE
    ],
  }),
  actions: {
    // 设置缓存
    setStorage() {
      window.sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
    },
    // 增加路由
    handleAddRoute(route: any) {
      if (!route.name) return;
      // 匹配不到路由
      if (NO_PUSH_ROUTES.includes(route.name)) return;
      this.tabs.push({
        name: route.name,
        path: route.path,
        title: route.meta.title,
        activePath: route.meta.activeMenu,
        query: route.query,
        params: route.params,
      });
      this.setStorage();
    },
    // 关闭路由
    handleClose(index: number) {
      this.tabs.splice(index, 1);
      this.setStorage();
    },
    // 关闭其他路由
    handleCloseOther(index: number) {
      // 通过传入的下标，保存该路由与首页
      const obj = JSON.parse(JSON.stringify(this.tabs[index]));
      this.tabs = obj.name === 'Home' ? [
        HOME_PAGE,
      ] : [
        HOME_PAGE,
        obj,
      ];
      this.setStorage();
    },
    // 关闭全部路由
    handleCloseAll() {
      this.tabs = [
        HOME_PAGE,
      ];
      this.setStorage();
    },
  },
});
