if (!self.define) {
  let e,
    a = {};
  const c = (c, s) => (
    (c = new URL(c + '.js', s).href),
    a[c] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = c), (e.onload = a), document.head.appendChild(e);
        } else (e = c), importScripts(c), a();
      }).then(() => {
        let e = a[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[i]) return;
    let n = {};
    const d = (e) => c(e, i),
      f = { module: { uri: i }, exports: n, require: d };
    a[i] = Promise.all(s.map((e) => f[e] || d(e))).then((e) => (t(...e), n));
  };
}
define(['./workbox-495fd258'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '4f966b7639e912a98f0a9d346353f87c' },
        { url: '/_next/static/chunks/1130.caa387254298c600.js', revision: 'caa387254298c600' },
        {
          url: '/_next/static/chunks/1130.caa387254298c600.js.map',
          revision: 'e01571f07248c9ca2422f592db1886a8',
        },
        { url: '/_next/static/chunks/1170-c7db54b106e0a7cc.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/1170-c7db54b106e0a7cc.js.map',
          revision: 'ff4109e94aaf85b43a899dc15d937991',
        },
        { url: '/_next/static/chunks/1188.a685322d7c527881.js', revision: 'a685322d7c527881' },
        {
          url: '/_next/static/chunks/1188.a685322d7c527881.js.map',
          revision: '4f3926c8374da313e0ee9435be596fee',
        },
        { url: '/_next/static/chunks/1215.7f05b29b5c90356c.js', revision: '7f05b29b5c90356c' },
        {
          url: '/_next/static/chunks/1215.7f05b29b5c90356c.js.map',
          revision: '641f3fc04bdcf89f0edfc2a8750435da',
        },
        { url: '/_next/static/chunks/127-8a692e8156dc9934.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/127-8a692e8156dc9934.js.map',
          revision: '40e6bfe2e5914c9fd83a64e02c472cb9',
        },
        { url: '/_next/static/chunks/1555.1bbf5f9dcef8afcb.js', revision: '1bbf5f9dcef8afcb' },
        {
          url: '/_next/static/chunks/1555.1bbf5f9dcef8afcb.js.map',
          revision: 'f8f9886a762b823dacd330848f82cfe6',
        },
        { url: '/_next/static/chunks/1664-b275a83c88ac073e.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/1664-b275a83c88ac073e.js.map',
          revision: 'b1df0f6fb3a2fcb5240a1d396116c397',
        },
        {
          url: '/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js.map',
          revision: '70d6b41b10f7e944e9fac502012075e6',
        },
        { url: '/_next/static/chunks/2033-29f4cfdd67a700d2.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/2033-29f4cfdd67a700d2.js.map',
          revision: '1c4d6dd684610d60790271ce7e5a8e0c',
        },
        { url: '/_next/static/chunks/2115.30b3992fd79c12f6.js', revision: '30b3992fd79c12f6' },
        {
          url: '/_next/static/chunks/2115.30b3992fd79c12f6.js.map',
          revision: '03448a1ce01b930b75613db2704b75c1',
        },
        { url: '/_next/static/chunks/2414-65823f6bfa46639a.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/2414-65823f6bfa46639a.js.map',
          revision: 'f92e1210681dcbd8e62a82e19a4dc82c',
        },
        { url: '/_next/static/chunks/2507-5f3803c725cf82ab.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/2507-5f3803c725cf82ab.js.map',
          revision: 'feff3acba53188406a0c98d88c4f4a3b',
        },
        { url: '/_next/static/chunks/2578-9e1bc4d9760473e6.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/2578-9e1bc4d9760473e6.js.map',
          revision: '7f7b0806c9a425c8de967e9ecb766ffb',
        },
        { url: '/_next/static/chunks/2741.7a61437aece8f3ce.js', revision: '7a61437aece8f3ce' },
        {
          url: '/_next/static/chunks/2741.7a61437aece8f3ce.js.map',
          revision: '9a168734b829c8040e2cd46025485120',
        },
        { url: '/_next/static/chunks/2836.4049c69f22c4239b.js', revision: '4049c69f22c4239b' },
        { url: '/_next/static/chunks/3025.b98c0d52884f1dda.js', revision: 'b98c0d52884f1dda' },
        {
          url: '/_next/static/chunks/3025.b98c0d52884f1dda.js.map',
          revision: '71675b8102de1823c99db1d6acb822be',
        },
        { url: '/_next/static/chunks/3438-2e33c418ba5b8f03.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/3438-2e33c418ba5b8f03.js.map',
          revision: '7bd474425ccc9ec29dec31350cf0cdb4',
        },
        { url: '/_next/static/chunks/3531.ae279f3fe78def1e.js', revision: 'ae279f3fe78def1e' },
        {
          url: '/_next/static/chunks/3531.ae279f3fe78def1e.js.map',
          revision: '0d2eed5978e93f33bc5bbc540de73b0a',
        },
        { url: '/_next/static/chunks/3731.62cc84cb145dbf88.js', revision: '62cc84cb145dbf88' },
        {
          url: '/_next/static/chunks/3731.62cc84cb145dbf88.js.map',
          revision: '5040e90034ab03bec1423fd035d66918',
        },
        { url: '/_next/static/chunks/39af6c14.473e3c1b9869e477.js', revision: '473e3c1b9869e477' },
        {
          url: '/_next/static/chunks/39af6c14.473e3c1b9869e477.js.map',
          revision: '58dd00709569dfcc1f11895c91449de4',
        },
        { url: '/_next/static/chunks/4154-e9dd39a81ea03b9c.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/4154-e9dd39a81ea03b9c.js.map',
          revision: '87b33d8aa4240bb9ffff0834ddd07e8e',
        },
        { url: '/_next/static/chunks/4173.99d86928e49f46ca.js', revision: '99d86928e49f46ca' },
        {
          url: '/_next/static/chunks/4173.99d86928e49f46ca.js.map',
          revision: 'c4870f56be2b5a86fc3a956d9336333b',
        },
        { url: '/_next/static/chunks/4553.bfe2fc67d5bc43dc.js', revision: 'bfe2fc67d5bc43dc' },
        {
          url: '/_next/static/chunks/4553.bfe2fc67d5bc43dc.js.map',
          revision: 'd4d990cbe3cdaba17cd09e196abea0e4',
        },
        { url: '/_next/static/chunks/4869.879af961aba6b473.js', revision: '879af961aba6b473' },
        {
          url: '/_next/static/chunks/4869.879af961aba6b473.js.map',
          revision: '8c6d61e7ea2158666986436fef8c09fc',
        },
        { url: '/_next/static/chunks/5018-4f5e6e443a2d09fe.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/5018-4f5e6e443a2d09fe.js.map',
          revision: '5d73b9b1c52fe2c63e18d54e97fc1567',
        },
        { url: '/_next/static/chunks/5332.642005eaf93a994d.js', revision: '642005eaf93a994d' },
        {
          url: '/_next/static/chunks/5332.642005eaf93a994d.js.map',
          revision: '6f7890d4608594429a93dcbeb3f3f7b6',
        },
        { url: '/_next/static/chunks/5453.86cc1524cff3f6fb.js', revision: '86cc1524cff3f6fb' },
        {
          url: '/_next/static/chunks/5453.86cc1524cff3f6fb.js.map',
          revision: '70b7a3db2f6b72fdfe2fafd5df033a7c',
        },
        { url: '/_next/static/chunks/5724.135c35d06e0fa2a7.js', revision: '135c35d06e0fa2a7' },
        {
          url: '/_next/static/chunks/5724.135c35d06e0fa2a7.js.map',
          revision: '7e4b034205137e6c4606ebe4fa4846d0',
        },
        {
          url: '/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js.map',
          revision: 'f7e1836c084067ee5af391c0018b9349',
        },
        { url: '/_next/static/chunks/6231-3a3732027a40bc4a.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/6231-3a3732027a40bc4a.js.map',
          revision: '0931a0fd149112264368b9293c9dccd3',
        },
        { url: '/_next/static/chunks/654-fb179c8f4d4eedd3.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/654-fb179c8f4d4eedd3.js.map',
          revision: '32374814c16ae858cd8dc509255fa6b4',
        },
        { url: '/_next/static/chunks/6600.f86138a53934a213.js', revision: 'f86138a53934a213' },
        {
          url: '/_next/static/chunks/6600.f86138a53934a213.js.map',
          revision: 'a5bd817b9e209e85e1e08e0f432b09bf',
        },
        { url: '/_next/static/chunks/6687-1b9ebb1ba2d9a1d0.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/6687-1b9ebb1ba2d9a1d0.js.map',
          revision: '40ed257bb4e2249a9fb4d2fbfe8daf7c',
        },
        { url: '/_next/static/chunks/6745-1116b7a9a93f846e.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/6745-1116b7a9a93f846e.js.map',
          revision: 'e277351467f51918b6794eac49762040',
        },
        { url: '/_next/static/chunks/7030-5e920bf053a2e1a1.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/7030-5e920bf053a2e1a1.js.map',
          revision: 'c8ab58becc9fa2dfdd0968a5a4482ec5',
        },
        { url: '/_next/static/chunks/7282.4e740408638aec87.js', revision: '4e740408638aec87' },
        {
          url: '/_next/static/chunks/7282.4e740408638aec87.js.map',
          revision: '38b23621527d1a3ca73d0299d780ace6',
        },
        { url: '/_next/static/chunks/7465-ca5bdb7eda96a293.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/7465-ca5bdb7eda96a293.js.map',
          revision: 'e84978608089c4780d3ab696fd374ad4',
        },
        { url: '/_next/static/chunks/7659-7f372d9e97015a6b.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/7659-7f372d9e97015a6b.js.map',
          revision: '6e7aa3fadef5ab8717ce26a7059bb1f4',
        },
        { url: '/_next/static/chunks/860-e6711f6fce8f02c8.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/860-e6711f6fce8f02c8.js.map',
          revision: 'f7ca650155163c2fb866e8e958a91fd9',
        },
        { url: '/_next/static/chunks/8bb4d8db.6b870d0eb4ff5c40.js', revision: '6b870d0eb4ff5c40' },
        {
          url: '/_next/static/chunks/8bb4d8db.6b870d0eb4ff5c40.js.map',
          revision: 'd03f0b65519cdf64641792b518ba84d8',
        },
        { url: '/_next/static/chunks/9050-23cc09ad63423d2b.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/9050-23cc09ad63423d2b.js.map',
          revision: 'bf4f06805f2e1246056976277e38bc41',
        },
        { url: '/_next/static/chunks/9180-79116441a24e72c9.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/9180-79116441a24e72c9.js.map',
          revision: 'eca3e06f44e313a44ce0d04b4823fec8',
        },
        { url: '/_next/static/chunks/9368.d18c1029101517d5.js', revision: 'd18c1029101517d5' },
        {
          url: '/_next/static/chunks/9368.d18c1029101517d5.js.map',
          revision: 'c90f44b74c1833e5bb7d64e137923ebc',
        },
        { url: '/_next/static/chunks/97.eb5059e05442e615.js', revision: 'eb5059e05442e615' },
        {
          url: '/_next/static/chunks/97.eb5059e05442e615.js.map',
          revision: '9e32e264e3a2fac26f15dc3e52adcbaa',
        },
        { url: '/_next/static/chunks/9801.a66988fcaf1a18e7.js', revision: 'a66988fcaf1a18e7' },
        {
          url: '/_next/static/chunks/9801.a66988fcaf1a18e7.js.map',
          revision: 'c4f95df6e5d0ffd085e47264d79b3399',
        },
        { url: '/_next/static/chunks/9822.282659481f17ee5f.js', revision: '282659481f17ee5f' },
        {
          url: '/_next/static/chunks/9822.282659481f17ee5f.js.map',
          revision: '952ae47fa7247cea74c31780bb5f254a',
        },
        { url: '/_next/static/chunks/9850-48c6ff3614ccf195.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/9850-48c6ff3614ccf195.js.map',
          revision: 'beb57cb1861ac1883c85c9abd8c1b69a',
        },
        { url: '/_next/static/chunks/abe5329a.b8c5ea4a9200a74d.js', revision: 'b8c5ea4a9200a74d' },
        {
          url: '/_next/static/chunks/abe5329a.b8c5ea4a9200a74d.js.map',
          revision: '26d109dd84a5205d9731769e845f7fc9',
        },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-1dfe74c5e4dc509d.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-1dfe74c5e4dc509d.js.map',
          revision: '4c4ebe1fb4b91dbfb0b6d9eb6c91a4d4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-3c2f60696b93185c.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-3c2f60696b93185c.js.map',
          revision: '8320d2e23ee319859be13df6b79d144e',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-6dc82b68d4b1cea5.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-6dc82b68d4b1cea5.js.map',
          revision: '5811002616dba43344e6df6250476f18',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-b85fbeeb5cca40ac.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-12ca12c9cf8fa5d2.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-12ca12c9cf8fa5d2.js.map',
          revision: 'bb159d141bdd8d375180872572bec64a',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-2676895ef621157c.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-2676895ef621157c.js.map',
          revision: '41d20c8dd02b2e5d61a83e1d3c729ad9',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-bbf82b8eb96a7c56.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-bbf82b8eb96a7c56.js.map',
          revision: '580436c96e97cb6ed93f029f29520f6e',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-34558a2ab734019a.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-34558a2ab734019a.js.map',
          revision: 'de5c6420fd2b2aacb50446c8467d7742',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-9a442d113faa7e34.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-9a442d113faa7e34.js.map',
          revision: 'b680d41f0b89e01f765216d12259d630',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-3a355d9c6e2aedd4.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-3a355d9c6e2aedd4.js.map',
          revision: '719af1015b05d90393b689c828db2a2f',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-c9f6cbf0771f3f8c.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-c9f6cbf0771f3f8c.js.map',
          revision: 'e5adb924e11022842e3ead8298bd09f9',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-ef8450d081545194.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-ef8450d081545194.js.map',
          revision: 'ea6f8c870f34b10d435fd198f531fcc7',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-c1c90fd1c983c10f.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-c1c90fd1c983c10f.js.map',
          revision: 'ee2ca06757ca74f7c7aa5f71a261a6c1',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-9efeebc2ae7a0424.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-9efeebc2ae7a0424.js.map',
          revision: 'ec1be468970ef08b982af845531c32cf',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-12a0ef9305326794.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-12a0ef9305326794.js.map',
          revision: '503a67ee572a3b5ca90816379358b5e1',
        },
        {
          url: '/_next/static/chunks/app/(protected)/empty/page-5c3538520a3270bb.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/empty/page-5c3538520a3270bb.js.map',
          revision: 'fdc102bfc79725841728ce9a14224762',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-8f22e2949cbf349b.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-8f22e2949cbf349b.js.map',
          revision: '887ab4b496004c516b21aedb832f2b86',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-e58f6238c91a318e.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-e58f6238c91a318e.js.map',
          revision: '23f22e34730bf0425e83de0c0cdda788',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-62d5502c3f879ff3.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-62d5502c3f879ff3.js.map',
          revision: 'a29777e8be187c215bc342e27991ed1f',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-25e0b2c2f25e72a3.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-25e0b2c2f25e72a3.js.map',
          revision: 'a55961bc1057fe6571a032f5423441be',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-98550448537b676b.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-98550448537b676b.js.map',
          revision: 'a4386de8faf08bceadf1c2ea14f24507',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-9c87af09e6ecc476.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-9c87af09e6ecc476.js.map',
          revision: '9e877fde8ca513f94a5d89642c6e5885',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-d405e91acbb71110.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-d405e91acbb71110.js.map',
          revision: 'c3c04cf52c7c874813a7d1fca3c65f14',
        },
        {
          url: '/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-30bc2687365f9209.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-093d737e441f78b3.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-093d737e441f78b3.js.map',
          revision: '323f998b80460e6be934d21da498e1b2',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-a2047ea5ea4ca6d7.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-a2047ea5ea4ca6d7.js.map',
          revision: '6291515793c0f3467affbfd23447a0bb',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-fe5ada25fde018be.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-fe5ada25fde018be.js.map',
          revision: '8de5ff9604163539c88b35bf9dc0c316',
        },
        {
          url: '/_next/static/chunks/app/(public)/signin/page-3cdf97ae632d4c8b.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-fb05b49e52e8b1de.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-fb05b49e52e8b1de.js.map',
          revision: '06ed9bc0ac1ce56ee1a68230d1836eb6',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-9fdd7df41e8d95d8.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/error-ed06fd9433174fa7.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/error-ed06fd9433174fa7.js.map',
          revision: 'd87b0547df55685f0c721dbfa8124082',
        },
        {
          url: '/_next/static/chunks/app/global-error-8ea542fe6adc778e.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/global-error-8ea542fe6adc778e.js.map',
          revision: '225d4cae539c056b35acba90da89dcef',
        },
        {
          url: '/_next/static/chunks/app/layout-cdb9f08cb8f84f06.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/layout-cdb9f08cb8f84f06.js.map',
          revision: '38f3f6555c84bc50e47b6597df24af87',
        },
        {
          url: '/_next/static/chunks/app/loading-9b2f14df1ab03d65.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/not-found-63b0ed977bbab586.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/not-found-63b0ed977bbab586.js.map',
          revision: 'c66beaddae08831cf1e75c25d6a3481c',
        },
        {
          url: '/_next/static/chunks/app/page-8480759676750f0e.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-5c8c7858d80f15b1.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-5c8c7858d80f15b1.js.map',
          revision: '7e82c8a5970f393dbf4ea8fa7c38e516',
        },
        { url: '/_next/static/chunks/b6b9d1ec.89c2c68484b19812.js', revision: '89c2c68484b19812' },
        {
          url: '/_next/static/chunks/b6b9d1ec.89c2c68484b19812.js.map',
          revision: 'a76084cbbf3e9f098c837ecbb1e3787c',
        },
        { url: '/_next/static/chunks/b7bbbec9.05d9ffe5a9d9beb4.js', revision: '05d9ffe5a9d9beb4' },
        {
          url: '/_next/static/chunks/b7bbbec9.05d9ffe5a9d9beb4.js.map',
          revision: '661225da28d11ea60f2d57dc63828c2d',
        },
        { url: '/_next/static/chunks/ee3bbf09.79c9cfe5e16b1bbd.js', revision: '79c9cfe5e16b1bbd' },
        {
          url: '/_next/static/chunks/ee3bbf09.79c9cfe5e16b1bbd.js.map',
          revision: '8cc5d45eadde0f2ce9575fc72957c583',
        },
        {
          url: '/_next/static/chunks/framework-d967f747bf315ddf.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/framework-d967f747bf315ddf.js.map',
          revision: 'd0025696afe38e2a734529e5f5f7dae2',
        },
        { url: '/_next/static/chunks/main-42b2151aa26a7b86.js', revision: 'wWh7SBytkNGNUtaRb-CQC' },
        {
          url: '/_next/static/chunks/main-42b2151aa26a7b86.js.map',
          revision: 'a4c2fa5310a96ce87836c9cc0e6035d3',
        },
        {
          url: '/_next/static/chunks/main-app-91ed26d008d1f195.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/main-app-91ed26d008d1f195.js.map',
          revision: '6885d7543487ce234dbe257cf967c1d6',
        },
        {
          url: '/_next/static/chunks/pages/_app-9ccb174230d35837.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/pages/_app-9ccb174230d35837.js.map',
          revision: 'fd550647f8e4a0e2077e3715334ae361',
        },
        {
          url: '/_next/static/chunks/pages/_error-b43021fcf80fd84b.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
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
          url: '/_next/static/chunks/webpack-2d8e2866380debbe.js',
          revision: 'wWh7SBytkNGNUtaRb-CQC',
        },
        {
          url: '/_next/static/chunks/webpack-2d8e2866380debbe.js.map',
          revision: '25c48a40c0514edaa24f2b4cccaca6d0',
        },
        { url: '/_next/static/css/7e89ba826724d068.css', revision: '7e89ba826724d068' },
        {
          url: '/_next/static/css/7e89ba826724d068.css.map',
          revision: 'e601ea78926af7397332cc9b44b6cdc5',
        },
        { url: '/_next/static/css/9259012b97e9f000.css', revision: '9259012b97e9f000' },
        {
          url: '/_next/static/css/9259012b97e9f000.css.map',
          revision: 'ecce0b520990b5a907dcdf76c6e86f22',
        },
        { url: '/_next/static/css/c26951a01fec6b15.css', revision: 'c26951a01fec6b15' },
        {
          url: '/_next/static/css/c26951a01fec6b15.css.map',
          revision: 'c2a1382b6a22e43c5c4264e4677bbfb3',
        },
        { url: '/_next/static/css/c6f3f9820782a9e0.css', revision: 'c6f3f9820782a9e0' },
        {
          url: '/_next/static/css/c6f3f9820782a9e0.css.map',
          revision: '5b13a57a060991ce19e5ae4157b96317',
        },
        { url: '/_next/static/css/d00a8d9359ee1b88.css', revision: 'd00a8d9359ee1b88' },
        {
          url: '/_next/static/css/d00a8d9359ee1b88.css.map',
          revision: '88e9429622e25cb82d0925ce41141bd1',
        },
        { url: '/_next/static/css/d999a9bdb9ff1209.css', revision: 'd999a9bdb9ff1209' },
        {
          url: '/_next/static/css/d999a9bdb9ff1209.css.map',
          revision: 'd9e38d6d2256103acbb9c566b2bafcbc',
        },
        { url: '/_next/static/css/ffe77f91210d50f2.css', revision: 'ffe77f91210d50f2' },
        {
          url: '/_next/static/css/ffe77f91210d50f2.css.map',
          revision: '84056ee3ab2b8f94f7b296cae83e946d',
        },
        {
          url: '/_next/static/media/01721b474504e7d6-s.woff2',
          revision: '9a8fb93af48de3d981543d8c2e7d6d03',
        },
        {
          url: '/_next/static/media/19fc70611c7ee6d5-s.woff2',
          revision: 'dc3987f3f26f8c9919dcb46e9aeeb7c6',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.p.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/2e1b830192b7974a-s.woff2',
          revision: 'fb3eb2a5b724bc3de2f18496da5fbe70',
        },
        {
          url: '/_next/static/media/3281a323710833ec-s.woff2',
          revision: 'f63709fe0c055814b5235e27ff98ae45',
        },
        {
          url: '/_next/static/media/3478b6abef19b3b3-s.p.woff2',
          revision: 'eeee8726f3b4ae9d8c710efba031ca6a',
        },
        {
          url: '/_next/static/media/3aa27b2eb5f698f7-s.woff2',
          revision: '1179dffca057f6b40e5d71311c94bd3f',
        },
        {
          url: '/_next/static/media/3ccf24bed29cbb82-s.woff2',
          revision: '5a74c5d2cf127a6c8774988f7431df51',
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
          url: '/_next/static/media/684e5662d94c69e1-s.p.woff2',
          revision: 'a1e11d00feb82d3b4f7cd3f2f7c26d34',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/97b12f7b815cdf76-s.woff2',
          revision: 'caa4a0a1120700ed2785d82baf69a108',
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
          url: '/_next/static/media/b6f2eee8808a2bb4-s.woff2',
          revision: 'fd7827ded4b7d182c9710967aeb9984b',
        },
        {
          url: '/_next/static/media/bc2003170c651d45-s.woff2',
          revision: 'b03ab30f8297c5c12e7746701cd1ee74',
        },
        {
          url: '/_next/static/media/be2416cbb012c256-s.p.woff2',
          revision: 'd2712b7a0f090540f1308cb3ceff15a6',
        },
        {
          url: '/_next/static/media/d43ef4503e5571d0-s.woff2',
          revision: '9b04a0dd785bb71b83dd94fa3af20d71',
        },
        {
          url: '/_next/static/media/d607327a37a507c7-s.woff2',
          revision: '7ea53cc9d5ec4534e4281b9723b23786',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/ebec2867f40f78ec-s.woff2',
          revision: 'efc6f6cd1a9d1db1ee8e37b34d6430df',
        },
        {
          url: '/_next/static/media/f1b810c250cac3b6-s.p.woff2',
          revision: 'd8a496bce02f6c8cfeca582fde2f35b4',
        },
        {
          url: '/_next/static/wWh7SBytkNGNUtaRb-CQC/_buildManifest.js',
          revision: 'bbe5400b7a0db2bc3bf6358cc4826072',
        },
        {
          url: '/_next/static/wWh7SBytkNGNUtaRb-CQC/_ssgManifest.js',
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
            cacheWillUpdate: async ({ request: e, response: a, event: c, state: s }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
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
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
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
