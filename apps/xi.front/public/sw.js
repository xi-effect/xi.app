if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[n]) return;
    let t = {};
    const u = (e) => a(e, n),
      r = { module: { uri: n }, exports: t, require: u };
    s[n] = Promise.all(c.map((e) => r[e] || u(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-495fd258'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'c36b451ae0861181767f9e3225837981' },
        { url: '/_next/static/chunks/1188.9de2d8ea36e60658.js', revision: '9de2d8ea36e60658' },
        { url: '/_next/static/chunks/127-615c78f080bb2300.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/1544.83cad4031d454644.js', revision: '83cad4031d454644' },
        { url: '/_next/static/chunks/1602-66b95043feba4610.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/1664-0df7b1ca43f8df37.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/1699.7a978c01e3922444.js', revision: '7a978c01e3922444' },
        {
          url: '/_next/static/chunks/1dd3208c-35b925996dfce215.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        { url: '/_next/static/chunks/2115.afcedc8a485a4339.js', revision: 'afcedc8a485a4339' },
        { url: '/_next/static/chunks/2473-3e3cb29d251466fa.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/2497.3ec7d5ecb1cf8254.js', revision: '3ec7d5ecb1cf8254' },
        { url: '/_next/static/chunks/2507-a9e27d8c3f163c22.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/2578-31d26d80538ba1a8.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/286-6174ecf77c331f7e.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/3328-7568ca37c27f0abb.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/3438-498502503c356ef1.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/4154-b534fa472d5b992a.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/4309.6421d15b6631f662.js', revision: '6421d15b6631f662' },
        { url: '/_next/static/chunks/4553-56b32192034e3f27.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/4914-3d6744349581eabc.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/5018-5af71c04a3cb6058.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/5191-789cb01d98647c04.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/5265.b4708b38262fde2f.js', revision: 'b4708b38262fde2f' },
        { url: '/_next/static/chunks/5674-6bc6cb0145eb75e0.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/6231-f86c9ccfc0b33689.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/6254-20083a2a4740ea96.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/6385-fcc43a118926e907.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/6450.7a7bbd70b6802f16.js', revision: '7a7bbd70b6802f16' },
        { url: '/_next/static/chunks/6575.779ed0639bd42e44.js', revision: '779ed0639bd42e44' },
        { url: '/_next/static/chunks/6745-3151d210f94d032a.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/6935.efecc6225c8d3126.js', revision: 'efecc6225c8d3126' },
        { url: '/_next/static/chunks/7030-5bdeb6a021e30de9.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/7282.6858c0a41cb3c976.js', revision: '6858c0a41cb3c976' },
        { url: '/_next/static/chunks/7659-fb500ae1837c3110.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/7693-8214fce75d311d79.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/7707-d9f2194c66129382.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/8044.d5c292442aa7699c.js', revision: 'd5c292442aa7699c' },
        { url: '/_next/static/chunks/8181-ba13352110234bd2.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/8303-c26e642f809221c0.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/860-9ad92c386d94e6bc.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        {
          url: '/_next/static/chunks/8bb4d8db-e8b09f85c4e7225c.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        { url: '/_next/static/chunks/9050-49c0a84c2903d24d.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/9106.a28b66b5cbf867c7.js', revision: 'a28b66b5cbf867c7' },
        { url: '/_next/static/chunks/9255.501c9ea2887035fd.js', revision: '501c9ea2887035fd' },
        { url: '/_next/static/chunks/9697-91f045b7b5e1c61d.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/97.ae8c29f3d8114c5d.js', revision: 'ae8c29f3d8114c5d' },
        { url: '/_next/static/chunks/9725-92d285729f388c37.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/9822-bcbfeadff1f3d2d8.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        { url: '/_next/static/chunks/9850-eb257d7968f4cb6f.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-f8dd38675e700717.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-4c0be5535e4e9b3e.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-b6ccdd10c22db022.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-cb046e5246437947.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-21327389f5d2dd6d.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-3d30a253eb165e42.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-5e559d1f82466e76.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-6269b3eac8e44d95.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-86dc599ef8e89b9d.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-8673bce1dcbbfecd.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-edfa6f6703dd710f.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-f1593f02e6e8419a.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-cc937f101c378261.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/empty/page-9e0fb0ebeda9dc88.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-56e8a5f55b93511b.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-96e1e7944934439e.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-0ccead52334fa1cc.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-92beb60d21bed38b.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-23f206fba6cf9d92.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-34f1e1c60841dc40.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-04edba5a6d942446.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-2511f84df6aaf8b2.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-da2e98d8703963ac.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-a500f4f5ade9fccc.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-95dd2adb8dbd9696.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-020cd24aeae6e4e3.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-15d7b55e392e30af.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(public)/signin/page-413f519a1902ce45.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-abaf55d99dfff5a4.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-0cee11dd6ee88741.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/error-f544b86fbc7e7377.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/global-error-0f57c3192cd3cfdc.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/layout-f7f76a169433710c.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/loading-b8e8b815efb058f1.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/not-found-32f3bdb0b7ce7e34.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/app/page-26ec6c6594c06731.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/b6b9d1ec-870f54f5ee748fdb.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/b7bbbec9-ab2aac6d4ad6508b.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        { url: '/_next/static/chunks/e9539084.af78c9c253f3ec51.js', revision: 'af78c9c253f3ec51' },
        {
          url: '/_next/static/chunks/f824c7d1-a149baa96e7a5ba1.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        { url: '/_next/static/chunks/fd8d879a.e28c800c881457fd.js', revision: 'e28c800c881457fd' },
        {
          url: '/_next/static/chunks/framework-f67b0c50d92b2b9f.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        { url: '/_next/static/chunks/main-3881590b966c83ff.js', revision: 'xeQa02GkuY6xG0QRugv7U' },
        {
          url: '/_next/static/chunks/main-app-cd4c0e97a3ac99a8.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/pages/_app-985f9abd66cd8e91.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/pages/_error-29151b8311ee5445.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-83169a9211704484.js',
          revision: 'xeQa02GkuY6xG0QRugv7U',
        },
        { url: '/_next/static/css/74dec32b0e72e398.css', revision: '74dec32b0e72e398' },
        { url: '/_next/static/css/7e89ba826724d068.css', revision: '7e89ba826724d068' },
        { url: '/_next/static/css/d00a8d9359ee1b88.css', revision: 'd00a8d9359ee1b88' },
        { url: '/_next/static/css/e491673d208f939b.css', revision: 'e491673d208f939b' },
        { url: '/_next/static/css/ef9ab8e51fe65706.css', revision: 'ef9ab8e51fe65706' },
        { url: '/_next/static/css/ffe77f91210d50f2.css', revision: 'ffe77f91210d50f2' },
        {
          url: '/_next/static/media/26a46d62cd723877-s.p.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/f1b810c250cac3b6-s.p.woff2',
          revision: 'd8a496bce02f6c8cfeca582fde2f35b4',
        },
        {
          url: '/_next/static/xeQa02GkuY6xG0QRugv7U/_buildManifest.js',
          revision: '1d36db6a369bd35d5306ad941a7f140a',
        },
        {
          url: '/_next/static/xeQa02GkuY6xG0QRugv7U/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/assets/avatarrep.svg', revision: '4277856ede8073aed18e907473ccb16b' },
        { url: '/assets/avatarrep2.svg', revision: '6c8076316bbe74b5b34ca5cb46462a16' },
        { url: '/assets/avatarrep3.svg', revision: '42ed55fd57254c4ca8e750fb808b3b3f' },
        {
          url: '/assets/brand/idlogo-default-dark.svg',
          revision: 'b72b287391a7944409bd220aaef82763',
        },
        {
          url: '/assets/brand/idlogo-default-light.svg',
          revision: 'f565500e24bc57cae2f52826f81b3e05',
        },
        {
          url: '/assets/brand/navigationlogo-default-dark.svg',
          revision: '57ef947eb72c3d4c82b0a636a860edf7',
        },
        {
          url: '/assets/brand/navigationlogo-default-light.svg',
          revision: 'a15444008bc500a7f70fe6e8f9633ed2',
        },
        {
          url: '/assets/brand/navigationlogo-small-dark.svg',
          revision: '2988496d2e57ac969eaee0f66321501e',
        },
        {
          url: '/assets/brand/navigationlogo-small-light.svg',
          revision: '9be513feb04cf34e1ccf6aa2be706b5c',
        },
        {
          url: '/assets/community-home-page/change-community-screenshot.svg',
          revision: '7c1c1ceacbaf5d97d059fcfa0f24eb7a',
        },
        {
          url: '/assets/community-home-page/left-menu-screenshot.svg',
          revision: 'a3597008a1f65a4b0e1432704e8d90cb',
        },
        {
          url: '/assets/community-home-page/manual-icon.svg',
          revision: '99d1181494955665822afd358d7cff80',
        },
        {
          url: '/assets/community-home-page/roles-screenshot.svg',
          revision: '6d2b9cfdb9243b230a5a9b5164f149bd',
        },
        {
          url: '/assets/community-home-page/support-box-heart.svg',
          revision: 'f36be2899d56ed629224f7389b3c025f',
        },
        {
          url: '/assets/community-home-page/tg-filled-icon.svg',
          revision: '1b806891696de69b4276dc73bf85956a',
        },
        {
          url: '/assets/icons/apple-touch-icon-120x120-precomposed.png',
          revision: 'a4c255fea139db3f9ed1fa8ee41d740e',
        },
        {
          url: '/assets/icons/apple-touch-icon-120x120.png',
          revision: 'c1eb7682cfae37803b8c8a3f0c9023a3',
        },
        {
          url: '/assets/icons/apple-touch-icon-152x152-precomposed.png',
          revision: 'f08c10a0bbd03b23e3aa2df8a7f28e58',
        },
        {
          url: '/assets/icons/apple-touch-icon-152x152.png',
          revision: 'a9a10a1b6e85a906691b3ee61a81d64b',
        },
        {
          url: '/assets/icons/apple-touch-icon-180x180-precomposed.png',
          revision: '8d2663ab80b84b1363da506a3dbcd2e0',
        },
        {
          url: '/assets/icons/apple-touch-icon-180x180.png',
          revision: '54938157042b9e94517bf7332e6dc7fc',
        },
        {
          url: '/assets/icons/apple-touch-icon-60x60-precomposed.png',
          revision: 'e1cf9f51d7b7c706b79c196b826204de',
        },
        {
          url: '/assets/icons/apple-touch-icon-60x60.png',
          revision: '85ed82806641b3de9246334d43581ad9',
        },
        {
          url: '/assets/icons/apple-touch-icon-76x76-precomposed.png',
          revision: 'e6c2fdd100be720b0edceca3f9a24662',
        },
        {
          url: '/assets/icons/apple-touch-icon-76x76.png',
          revision: '5a2363031dafad468d3a52e0f3a7c1eb',
        },
        {
          url: '/assets/icons/apple-touch-icon-precomposed.png',
          revision: '8d2663ab80b84b1363da506a3dbcd2e0',
        },
        { url: '/assets/icons/apple-touch-icon.png', revision: '54938157042b9e94517bf7332e6dc7fc' },
        { url: '/assets/icons/favicon-16x16.png', revision: '9b9c3bae0d66acae5035e72062ed9786' },
        { url: '/assets/icons/favicon-32x32.png', revision: '98e18c86655c72a2ee389b5f9d9f52c7' },
        { url: '/assets/icons/icon-144x144.png', revision: 'c8b04135f67230d873a17dbe48037192' },
        { url: '/assets/icons/icon-192x192.png', revision: '5b009d152da14f621c3d58bfd0d96c93' },
        { url: '/assets/icons/icon-256x256.png', revision: '3e9cdcfe679d8188e2b360e313160fe0' },
        { url: '/assets/icons/icon-36x36.png', revision: '6cba026644288af5b1c9228e5e3eb8c6' },
        { url: '/assets/icons/icon-384x384.png', revision: '91912f5112c359f018046cc507adc9c5' },
        { url: '/assets/icons/icon-48x48.png', revision: '17f1219d11082910026ded56d610e1cc' },
        { url: '/assets/icons/icon-512x512.png', revision: 'c2f0746e098e924b2bf0017432a3059b' },
        { url: '/assets/icons/icon-72x72.png', revision: '1e4f074faf2f924d2552db62d792b769' },
        { url: '/assets/icons/icon-96x96.png', revision: '19d956b0fef5336f51aa5ddfb62aadb5' },
        { url: '/assets/icons/mstile-144x144.png', revision: 'f3b246ca663e3872c2c5e3c2c8328f58' },
        { url: '/assets/icons/mstile-150x150.png', revision: '2fe7e49a8ca19dd20d406569f83b2284' },
        { url: '/assets/icons/mstile-310x150.png', revision: '8b8b07cce22acee6f864658edbfaa7a3' },
        { url: '/assets/icons/mstile-310x310.png', revision: '9dc38c0afd454e811ab5c792fe9c01b9' },
        { url: '/assets/icons/mstile-70x70.png', revision: 'c18b9fb768c5e03f4a53a594e617d16b' },
        {
          url: '/assets/icons/safari-pinned-tab.svg',
          revision: '5abcd4e192369d5df81a9210f53642b7',
        },
        { url: '/assets/welcome/community-add.png', revision: '87a7310d1105e3e2fac883d679c9b082' },
        { url: '/assets/welcome/community.png', revision: '5539467569ca4016a37ca14c7183d1a5' },
        { url: '/assets/welcome/final.png', revision: '2920aab69ae54b863976213ab22265c0' },
        { url: '/assets/welcome/user-info.png', revision: '42b8adbdbd02b52bedb482ac39203781' },
        {
          url: '/assets/welcome/welcome-modal-image.webp',
          revision: 'e1ae72c5df28a06b0482fd689c286f03',
        },
        { url: '/favicon-for-dark.svg', revision: '6825e74a748ef61f38418d0a77983974' },
        { url: '/favicon-for-light.svg', revision: 'b1a97d320dba69a91e06391d5db81743' },
        { url: '/favicon.ico', revision: '501d94411940282fef1a69e6a8c1c0d7' },
        { url: '/fonts/MarkerHand-Regular.woff2', revision: 'd8a496bce02f6c8cfeca582fde2f35b4' },
        { url: '/manifest.webmanifest', revision: '0e07ef18af0502a5ea38551e362c104a' },
        { url: '/test/avatar.svg', revision: '3b81fe6bbfcc5a70c922ff470c070f44' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: c }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
