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
  self.define = (c, n) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let t = {};
    const b = (e) => a(e, i),
      d = { module: { uri: i }, exports: t, require: b };
    s[i] = Promise.all(c.map((e) => d[e] || b(e))).then((e) => (n(...e), t));
  };
}
define(['./workbox-495fd258'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '24b5545a5fc9268339706805312f6a5b' },
        { url: '/_next/static/chunks/1188.a685322d7c527881.js', revision: 'a685322d7c527881' },
        {
          url: '/_next/static/chunks/1188.a685322d7c527881.js.map',
          revision: '4f3926c8374da313e0ee9435be596fee',
        },
        { url: '/_next/static/chunks/127-8a692e8156dc9934.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/127-8a692e8156dc9934.js.map',
          revision: '40e6bfe2e5914c9fd83a64e02c472cb9',
        },
        { url: '/_next/static/chunks/1555.7611500136b21fb7.js', revision: '7611500136b21fb7' },
        {
          url: '/_next/static/chunks/1555.7611500136b21fb7.js.map',
          revision: '15044c8ba63e42b0cb4dab022b8a8326',
        },
        { url: '/_next/static/chunks/1602-9ea2af393dc603dc.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/1602-9ea2af393dc603dc.js.map',
          revision: '06befb436801920ac9bf38794d48b6f9',
        },
        { url: '/_next/static/chunks/1664-b275a83c88ac073e.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/1664-b275a83c88ac073e.js.map',
          revision: 'b1df0f6fb3a2fcb5240a1d396116c397',
        },
        { url: '/_next/static/chunks/1699.2004c16179c552f0.js', revision: '2004c16179c552f0' },
        {
          url: '/_next/static/chunks/1699.2004c16179c552f0.js.map',
          revision: 'd650e4309cc967afcff2b53b16104406',
        },
        {
          url: '/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js.map',
          revision: '70d6b41b10f7e944e9fac502012075e6',
        },
        { url: '/_next/static/chunks/2115.04206dcfd0638c7a.js', revision: '04206dcfd0638c7a' },
        {
          url: '/_next/static/chunks/2115.04206dcfd0638c7a.js.map',
          revision: '7d55ba8ab48387dd3159cdc19f42f2f5',
        },
        { url: '/_next/static/chunks/2497.238384ae873cfc67.js', revision: '238384ae873cfc67' },
        {
          url: '/_next/static/chunks/2497.238384ae873cfc67.js.map',
          revision: '0a79b9cb1510fa9b823a0fe34d1397d7',
        },
        { url: '/_next/static/chunks/2507-794c39b72f674aba.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/2507-794c39b72f674aba.js.map',
          revision: '7fe21b7e955d429edfae24d5c5aa9b54',
        },
        { url: '/_next/static/chunks/2574-b4c579873a8bbab4.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/2574-b4c579873a8bbab4.js.map',
          revision: '3a204b7c00ebd5a2bc205659c5890e34',
        },
        { url: '/_next/static/chunks/2578-9e1bc4d9760473e6.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/2578-9e1bc4d9760473e6.js.map',
          revision: '7f7b0806c9a425c8de967e9ecb766ffb',
        },
        { url: '/_next/static/chunks/3328-a6e77465835829a0.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/3328-a6e77465835829a0.js.map',
          revision: '2ba2c2be7b35531b408cd108661c30f1',
        },
        { url: '/_next/static/chunks/3438-d1de7d3fed477252.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/3438-d1de7d3fed477252.js.map',
          revision: 'c0d4c1da36d66c3c94d175a9d40848bf',
        },
        { url: '/_next/static/chunks/3968.60877ed43eae8de4.js', revision: '60877ed43eae8de4' },
        { url: '/_next/static/chunks/39af6c14.473e3c1b9869e477.js', revision: '473e3c1b9869e477' },
        {
          url: '/_next/static/chunks/39af6c14.473e3c1b9869e477.js.map',
          revision: '58dd00709569dfcc1f11895c91449de4',
        },
        { url: '/_next/static/chunks/4154-e9dd39a81ea03b9c.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/4154-e9dd39a81ea03b9c.js.map',
          revision: '87b33d8aa4240bb9ffff0834ddd07e8e',
        },
        { url: '/_next/static/chunks/4553-75c543ce4088994c.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/4553-75c543ce4088994c.js.map',
          revision: '4e62fb3e0ab5dfb321403f5a6c8bb9a0',
        },
        { url: '/_next/static/chunks/5018-4f5e6e443a2d09fe.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/5018-4f5e6e443a2d09fe.js.map',
          revision: '5d73b9b1c52fe2c63e18d54e97fc1567',
        },
        { url: '/_next/static/chunks/5191-23d01785e21a249a.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/5191-23d01785e21a249a.js.map',
          revision: '7cfe82ccb0d83a1c7b0011901173a1ea',
        },
        { url: '/_next/static/chunks/5265.34158664a935406f.js', revision: '34158664a935406f' },
        {
          url: '/_next/static/chunks/5265.34158664a935406f.js.map',
          revision: 'be07758a8bdcf28ab1575516f60bb301',
        },
        { url: '/_next/static/chunks/5674-d4e1e04bc09f2e41.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/5674-d4e1e04bc09f2e41.js.map',
          revision: '898496f33d75186a510f0d5f1978c170',
        },
        { url: '/_next/static/chunks/5767.274e1d6eb3a6bf0f.js', revision: '274e1d6eb3a6bf0f' },
        {
          url: '/_next/static/chunks/5767.274e1d6eb3a6bf0f.js.map',
          revision: 'c6201534c5aaf577dd0885b37042d2bf',
        },
        {
          url: '/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js.map',
          revision: 'f7e1836c084067ee5af391c0018b9349',
        },
        { url: '/_next/static/chunks/6231-3a3732027a40bc4a.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/6231-3a3732027a40bc4a.js.map',
          revision: '0931a0fd149112264368b9293c9dccd3',
        },
        { url: '/_next/static/chunks/6254-fc818227f4007336.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/6254-fc818227f4007336.js.map',
          revision: '0bcbf2192ac5d545514fa63f1913d91f',
        },
        { url: '/_next/static/chunks/6450.702fd6eb4032e2f9.js', revision: '702fd6eb4032e2f9' },
        {
          url: '/_next/static/chunks/6450.702fd6eb4032e2f9.js.map',
          revision: 'ccafa40f77fa1ddfb8aa83eb13f2e743',
        },
        { url: '/_next/static/chunks/6575.3349885d99073d07.js', revision: '3349885d99073d07' },
        {
          url: '/_next/static/chunks/6575.3349885d99073d07.js.map',
          revision: '2e361c514a13437e2faac2aeca27af42',
        },
        { url: '/_next/static/chunks/6687-d5952dfca716c56e.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/6687-d5952dfca716c56e.js.map',
          revision: '6901405fc129cbb5938047f50fbb09cd',
        },
        { url: '/_next/static/chunks/6745-1116b7a9a93f846e.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/6745-1116b7a9a93f846e.js.map',
          revision: 'e277351467f51918b6794eac49762040',
        },
        { url: '/_next/static/chunks/6935.06686a89e42079d2.js', revision: '06686a89e42079d2' },
        {
          url: '/_next/static/chunks/6935.06686a89e42079d2.js.map',
          revision: '736333b9c144036c2231174d41e06902',
        },
        { url: '/_next/static/chunks/7030-1b94b3e787bd881d.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/7030-1b94b3e787bd881d.js.map',
          revision: '0043864259489d1a8e31e5ce737a4b13',
        },
        { url: '/_next/static/chunks/7282.4e740408638aec87.js', revision: '4e740408638aec87' },
        {
          url: '/_next/static/chunks/7282.4e740408638aec87.js.map',
          revision: '38b23621527d1a3ca73d0299d780ace6',
        },
        { url: '/_next/static/chunks/7547.729753dc590d20a7.js', revision: '729753dc590d20a7' },
        {
          url: '/_next/static/chunks/7547.729753dc590d20a7.js.map',
          revision: '0314c9638caed16a856d765e09fc2f49',
        },
        { url: '/_next/static/chunks/7659-7f372d9e97015a6b.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/7659-7f372d9e97015a6b.js.map',
          revision: '6e7aa3fadef5ab8717ce26a7059bb1f4',
        },
        { url: '/_next/static/chunks/7693-21db52bda5eb1b8f.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/7693-21db52bda5eb1b8f.js.map',
          revision: '593143359b27976dfd90b985f72ddbfa',
        },
        { url: '/_next/static/chunks/7707-6dea004a28402af6.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/7707-6dea004a28402af6.js.map',
          revision: '346d9c0e3e57d38e22b93a589f27cef0',
        },
        { url: '/_next/static/chunks/8181-7fef62e5dcd006e5.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/8181-7fef62e5dcd006e5.js.map',
          revision: '1383c5967c39598e0fe1532708cafc96',
        },
        { url: '/_next/static/chunks/8303-fc1d31f0a7f0fbdb.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/8303-fc1d31f0a7f0fbdb.js.map',
          revision: 'a54ba410c1c1acd26a007a9a2839c7d2',
        },
        { url: '/_next/static/chunks/8306-7fadfaa7f0953cd0.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/8306-7fadfaa7f0953cd0.js.map',
          revision: 'eab1b2359295793f87624ccb490c0a60',
        },
        { url: '/_next/static/chunks/860-e6711f6fce8f02c8.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/860-e6711f6fce8f02c8.js.map',
          revision: 'f7ca650155163c2fb866e8e958a91fd9',
        },
        {
          url: '/_next/static/chunks/8bb4d8db-8f18a0312a0421e4.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/8bb4d8db-8f18a0312a0421e4.js.map',
          revision: '49938f0abdbff5c2c67776b026b97a9e',
        },
        { url: '/_next/static/chunks/9050-10ee657f64e674c1.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/9050-10ee657f64e674c1.js.map',
          revision: '9935a838601928f309d145e7a03c9160',
        },
        { url: '/_next/static/chunks/9697-29de1064a60b9e96.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/9697-29de1064a60b9e96.js.map',
          revision: 'f02c531f7445c4ce35b56d8f51fc1e6e',
        },
        { url: '/_next/static/chunks/97.3ae7b83dbd3fd845.js', revision: '3ae7b83dbd3fd845' },
        {
          url: '/_next/static/chunks/97.3ae7b83dbd3fd845.js.map',
          revision: '0a7bd851d086ffd996d83360c57c2121',
        },
        { url: '/_next/static/chunks/9727.409bdad284bfa8d5.js', revision: '409bdad284bfa8d5' },
        {
          url: '/_next/static/chunks/9727.409bdad284bfa8d5.js.map',
          revision: 'b7b839cd8fabdeec4e1ab5e3480ee0d6',
        },
        { url: '/_next/static/chunks/9822-cea4f02307aa435f.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/9822-cea4f02307aa435f.js.map',
          revision: 'e2120112e3b35482d46f3bb4ec7e2e75',
        },
        { url: '/_next/static/chunks/9850-48c6ff3614ccf195.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/9850-48c6ff3614ccf195.js.map',
          revision: 'beb57cb1861ac1883c85c9abd8c1b69a',
        },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-ab8ab5a37a93e376.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-ab8ab5a37a93e376.js.map',
          revision: 'ba1f7a476699c579ea04e089c0347406',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-5b18cfbd2c9393e8.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-5b18cfbd2c9393e8.js.map',
          revision: '78cf4905560d356f74109898fd2a6d63',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-6e468465e8a8b80f.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-6e468465e8a8b80f.js.map',
          revision: '22a409ae04bc79b9964c2dd029ad4d1e',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-b85fbeeb5cca40ac.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-92e03d490865bf7b.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-92e03d490865bf7b.js.map',
          revision: 'ece58ada0f2ca0c0bba2dbe456dcf5f3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-6055221236f2102c.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-6055221236f2102c.js.map',
          revision: '4d50d474c3ee3bcf07cb119355c3dea0',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-3e45d8c16329e70a.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-3e45d8c16329e70a.js.map',
          revision: '7d5915a7318d0576dbe6e5c00ceb52f3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-be206ea8fceb8e7d.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-be206ea8fceb8e7d.js.map',
          revision: '342844295dee819d603ed2866631c66a',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-fabcae82f68c57a7.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-fabcae82f68c57a7.js.map',
          revision: '087c27705e1dad89b01b6a749305694e',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-b35e869e4c3b6c44.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-b35e869e4c3b6c44.js.map',
          revision: '3b840570fbc8878ee59e08b4a28f2e05',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-f684eaa0c18f11da.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-f684eaa0c18f11da.js.map',
          revision: '5722fc0d5d19d30d361a8aabbe713870',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-15ed6c6cf31deab8.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-15ed6c6cf31deab8.js.map',
          revision: '282627ec3b6e1f0ee3d39c5ef763e49b',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-0d10209a69570ff1.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-0d10209a69570ff1.js.map',
          revision: '568986f7b40884a2f2c00744eb61efbe',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/empty/page-0f272fbe5703505b.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/empty/page-0f272fbe5703505b.js.map',
          revision: 'b793a37fb9ea5b5acf4ef9a366956cef',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-82f3962e2230f3b2.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-82f3962e2230f3b2.js.map',
          revision: '22cb0edd24083c86b68a0cab3827a608',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-f849bd8bf2176903.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-f849bd8bf2176903.js.map',
          revision: 'fa17ee2b179987c0358ca6d6c58f25f8',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-46b8b95b815c7da2.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-46b8b95b815c7da2.js.map',
          revision: 'e74fd48e812b00ba29b765768c4c4529',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-b9cb95d952f5e8c8.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-b9cb95d952f5e8c8.js.map',
          revision: '884960542eaf4211172e93a6db9ab3d5',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-ab94a2e3ad27f0ec.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-ab94a2e3ad27f0ec.js.map',
          revision: '18fd865c7f161baa965b98e71dbb02df',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-d29f0b59afeb68e9.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-d29f0b59afeb68e9.js.map',
          revision: 'f2287a96fe2ac3674e305d2ac60c2bfa',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-92c70dbfe352606b.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-92c70dbfe352606b.js.map',
          revision: '3841139541f1df0ee3ea9b439af2dbcc',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-f8738f5104acd1aa.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-f8738f5104acd1aa.js.map',
          revision: '48aa33cf27b1f839e7e418e65ae5222a',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-984752d04e6f638b.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-984752d04e6f638b.js.map',
          revision: '95db2f9c5029ef3336bd00e9651d25ab',
        },
        {
          url: '/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-b5dd172a16c52d3b.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-73ca559003494935.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-73ca559003494935.js.map',
          revision: '724384166022bcbf9865b078b4c0274f',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-ec6b1707b9e9dfc8.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-ec6b1707b9e9dfc8.js.map',
          revision: 'e71cdf84a8cd620f4f2c0c9d657285c4',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-a5f6787c3b90110f.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-a5f6787c3b90110f.js.map',
          revision: '8a3e7d5cc8ca4d1c15319483dd81a6f9',
        },
        {
          url: '/_next/static/chunks/app/(public)/signin/page-a79826a9d5e0bd47.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-ed38feeee12098a8.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-ed38feeee12098a8.js.map',
          revision: '84c7baa248b254301f29b3b4ad8f601b',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-9fdd7df41e8d95d8.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/error-e1ca633111e9c115.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/error-e1ca633111e9c115.js.map',
          revision: '6f8147821a5c429ff5835d61da09708a',
        },
        {
          url: '/_next/static/chunks/app/global-error-71cf847d87ca5ffb.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/global-error-71cf847d87ca5ffb.js.map',
          revision: '18b815553fe2fef7427043775d9638a3',
        },
        {
          url: '/_next/static/chunks/app/layout-05dde170b2461a8e.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/layout-05dde170b2461a8e.js.map',
          revision: 'a2fb1208fc90a12d4b65dc7098bf21c7',
        },
        {
          url: '/_next/static/chunks/app/loading-9b2f14df1ab03d65.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/not-found-913210f929a4b97d.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/not-found-913210f929a4b97d.js.map',
          revision: 'e7cd2c88be9da0bf1c995c6494e06442',
        },
        {
          url: '/_next/static/chunks/app/page-8480759676750f0e.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-5c8c7858d80f15b1.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-5c8c7858d80f15b1.js.map',
          revision: '7e82c8a5970f393dbf4ea8fa7c38e516',
        },
        {
          url: '/_next/static/chunks/b6b9d1ec-4d8d41e6c33fbd23.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/b6b9d1ec-4d8d41e6c33fbd23.js.map',
          revision: '76f3e48ddd7cc427679dc36124a23b96',
        },
        {
          url: '/_next/static/chunks/b7bbbec9-907d4e2158635934.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/b7bbbec9-907d4e2158635934.js.map',
          revision: 'e5bd5eff6329449d3078b2ed484e4ab0',
        },
        {
          url: '/_next/static/chunks/f824c7d1-af41fbfb2ae0ec5a.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/f824c7d1-af41fbfb2ae0ec5a.js.map',
          revision: '0deead6676438e592ba36a0b01983c52',
        },
        { url: '/_next/static/chunks/fd8d879a.7e9c0cf560717c78.js', revision: '7e9c0cf560717c78' },
        {
          url: '/_next/static/chunks/fd8d879a.7e9c0cf560717c78.js.map',
          revision: '2a3b4b4a019cbbd485f020b8e270918c',
        },
        {
          url: '/_next/static/chunks/framework-d967f747bf315ddf.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/framework-d967f747bf315ddf.js.map',
          revision: 'd0025696afe38e2a734529e5f5f7dae2',
        },
        {
          url: '/_next/static/chunks/main-app-d5ae4ae535db18d1.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/main-app-d5ae4ae535db18d1.js.map',
          revision: '9802f92928aa51618c67c7272ae0ca9e',
        },
        { url: '/_next/static/chunks/main-d4dd2d135b7fbeca.js', revision: 'hjb1bvVnwYAGs8w3RSjY4' },
        {
          url: '/_next/static/chunks/main-d4dd2d135b7fbeca.js.map',
          revision: '47f0885ecc117101729ed9a14f238d1e',
        },
        {
          url: '/_next/static/chunks/pages/_app-65665a881fa6c594.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/pages/_app-65665a881fa6c594.js.map',
          revision: '3353381bdd17aa5750a45ffcbfcdcc08',
        },
        {
          url: '/_next/static/chunks/pages/_error-b43021fcf80fd84b.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/pages/_error-b43021fcf80fd84b.js.map',
          revision: '7cd7c03370427718c13b5e83f5d2ca13',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-04129db81776557d.js',
          revision: 'hjb1bvVnwYAGs8w3RSjY4',
        },
        {
          url: '/_next/static/chunks/webpack-04129db81776557d.js.map',
          revision: '5efac3d830b37b20f08d1e601f923c6d',
        },
        { url: '/_next/static/css/74dec32b0e72e398.css', revision: '74dec32b0e72e398' },
        {
          url: '/_next/static/css/74dec32b0e72e398.css.map',
          revision: '13438af7213312795f40c6b0c999e649',
        },
        { url: '/_next/static/css/7e89ba826724d068.css', revision: '7e89ba826724d068' },
        {
          url: '/_next/static/css/7e89ba826724d068.css.map',
          revision: 'e601ea78926af7397332cc9b44b6cdc5',
        },
        { url: '/_next/static/css/87bd59dedf2f1989.css', revision: '87bd59dedf2f1989' },
        {
          url: '/_next/static/css/87bd59dedf2f1989.css.map',
          revision: 'ceb127fc2ce052765abf97d2052524bb',
        },
        { url: '/_next/static/css/b5412c8af41d9498.css', revision: 'b5412c8af41d9498' },
        {
          url: '/_next/static/css/b5412c8af41d9498.css.map',
          revision: 'e1fc53bf07e3f0cdba6b953e8b40701c',
        },
        { url: '/_next/static/css/d00a8d9359ee1b88.css', revision: 'd00a8d9359ee1b88' },
        {
          url: '/_next/static/css/d00a8d9359ee1b88.css.map',
          revision: '88e9429622e25cb82d0925ce41141bd1',
        },
        { url: '/_next/static/css/ffe77f91210d50f2.css', revision: 'ffe77f91210d50f2' },
        {
          url: '/_next/static/css/ffe77f91210d50f2.css.map',
          revision: '55795da6551f4508236b25494b1f319d',
        },
        {
          url: '/_next/static/hjb1bvVnwYAGs8w3RSjY4/_buildManifest.js',
          revision: 'bbe5400b7a0db2bc3bf6358cc4826072',
        },
        {
          url: '/_next/static/hjb1bvVnwYAGs8w3RSjY4/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
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
//# sourceMappingURL=sw.js.map
