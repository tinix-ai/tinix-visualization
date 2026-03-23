import { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum'
import { loginCheck } from '@/utils'

export function createRouterGuards(router: Router) {
  // tiền tố
  router.beforeEach(async (to, from, next) => {
    // http://localhost:3000/#/chart/preview/792622755697790976?t=123
    // Đặt các thông số động bên ngoài vàowindow.route.params, theo dõiAPIGiao diện động có thể được sử dụngwindow.route?.params?.tghép các thông số
    // @ts-ignore
    if (!window.route) window.route = {params: {}}
    // @ts-ignore
    Object.assign(window.route.params, to.query)

    const Loading = window['$loading'];
    Loading && Loading.start();
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 })
      return
    }

    if (!loginCheck()) {
      if (to.name === PageEnum.BASE_LOGIN_NAME) {
        next()
        return
      }
      next({ name: PageEnum.BASE_LOGIN_NAME })
      return
    }
    next()
  })

  router.afterEach((to, _, failure) => {
    const Loading = window['$loading'];
    document.title = (to?.meta?.title as string) || document.title;
    Loading && Loading.finish();
  })

  // sai lầm
  router.onError((error) => {
    console.log(error, '[VI] Lỗi định tuyến');
  });
}