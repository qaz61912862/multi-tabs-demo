import router from '@/router'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const pathHandler = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const noMatchRouter = to.matched.length === 0;
  const validators = [
    // 没有匹配对应路由 直接调整404
    { rule: noMatchRouter, params: { path: '/redirect/404', replace: true } },
  ];
  const found = validators.find((valid) => {
    return valid.rule;
  });

  if (found && found.params) {
    next(found.params);
  } else {
    next();
  }
}

router.beforeEach(async (to, from, next) => {
  pathHandler(to, from, next);
})
