if (!self.define) {
  let e,
    c = {};
  const s = (s, a) => (
    (s = new URL(s + '.js', a).href),
    c[s] ||
      new Promise((c) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = c), document.head.appendChild(e);
        } else (e = s), importScripts(s), c();
      }).then(() => {
        let e = c[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (c[n]) return;
    let t = {};
    const f = (e) => s(e, n),
      d = { module: { uri: n }, exports: t, require: f };
    c[n] = Promise.all(a.map((e) => d[e] || f(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-495fd258'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'dd1d1a8b150f78a810e1938d8af30507' },
        {
          url: '/_next/static/3PyeRQJH9Y2cYqOcXGkf3/_buildManifest.js',
          revision: 'bbe5400b7a0db2bc3bf6358cc4826072',
        },
        {
          url: '/_next/static/3PyeRQJH9Y2cYqOcXGkf3/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1170-c7db54b106e0a7cc.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
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
        { url: '/_next/static/chunks/127-8a692e8156dc9934.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/127-8a692e8156dc9934.js.map',
          revision: '40e6bfe2e5914c9fd83a64e02c472cb9',
        },
        { url: '/_next/static/chunks/1555.1bbf5f9dcef8afcb.js', revision: '1bbf5f9dcef8afcb' },
        {
          url: '/_next/static/chunks/1555.1bbf5f9dcef8afcb.js.map',
          revision: 'f8f9886a762b823dacd330848f82cfe6',
        },
        { url: '/_next/static/chunks/1664-b275a83c88ac073e.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/1664-b275a83c88ac073e.js.map',
          revision: 'b1df0f6fb3a2fcb5240a1d396116c397',
        },
        { url: '/_next/static/chunks/174-96a4ce9d3051f177.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/174-96a4ce9d3051f177.js.map',
          revision: '049046000b634058aff229c557bf335a',
        },
        {
          url: '/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js.map',
          revision: '70d6b41b10f7e944e9fac502012075e6',
        },
        { url: '/_next/static/chunks/2033-29f4cfdd67a700d2.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/2033-29f4cfdd67a700d2.js.map',
          revision: '1c4d6dd684610d60790271ce7e5a8e0c',
        },
        { url: '/_next/static/chunks/2115.30b3992fd79c12f6.js', revision: '30b3992fd79c12f6' },
        {
          url: '/_next/static/chunks/2115.30b3992fd79c12f6.js.map',
          revision: '03448a1ce01b930b75613db2704b75c1',
        },
        { url: '/_next/static/chunks/2507-5f3803c725cf82ab.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/2507-5f3803c725cf82ab.js.map',
          revision: 'feff3acba53188406a0c98d88c4f4a3b',
        },
        { url: '/_next/static/chunks/2578-9e1bc4d9760473e6.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/2578-9e1bc4d9760473e6.js.map',
          revision: '7f7b0806c9a425c8de967e9ecb766ffb',
        },
        { url: '/_next/static/chunks/2741.7a61437aece8f3ce.js', revision: '7a61437aece8f3ce' },
        {
          url: '/_next/static/chunks/2741.7a61437aece8f3ce.js.map',
          revision: '9a168734b829c8040e2cd46025485120',
        },
        { url: '/_next/static/chunks/3025.b98c0d52884f1dda.js', revision: 'b98c0d52884f1dda' },
        {
          url: '/_next/static/chunks/3025.b98c0d52884f1dda.js.map',
          revision: '71675b8102de1823c99db1d6acb822be',
        },
        { url: '/_next/static/chunks/3438-650f77da5a33f9f0.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/3438-650f77da5a33f9f0.js.map',
          revision: '560fb7a4186766947166a2d40548d4ae',
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
        { url: '/_next/static/chunks/4124.f33cbad8bbdb417a.js', revision: 'f33cbad8bbdb417a' },
        {
          url: '/_next/static/chunks/4124.f33cbad8bbdb417a.js.map',
          revision: 'f2f4d9a8e212953017aa943825bbe208',
        },
        { url: '/_next/static/chunks/4154-e9dd39a81ea03b9c.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/4154-e9dd39a81ea03b9c.js.map',
          revision: '87b33d8aa4240bb9ffff0834ddd07e8e',
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
        { url: '/_next/static/chunks/4920.660d3cf5c97f166b.js', revision: '660d3cf5c97f166b' },
        {
          url: '/_next/static/chunks/4920.660d3cf5c97f166b.js.map',
          revision: '36e8b2acecd408348aad1ef1cc93ea42',
        },
        { url: '/_next/static/chunks/5018-4f5e6e443a2d09fe.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/5018-4f5e6e443a2d09fe.js.map',
          revision: '5d73b9b1c52fe2c63e18d54e97fc1567',
        },
        { url: '/_next/static/chunks/5432.91047e7023688e16.js', revision: '91047e7023688e16' },
        {
          url: '/_next/static/chunks/5432.91047e7023688e16.js.map',
          revision: 'c7dccee6c21dba24fc216392b98203d5',
        },
        { url: '/_next/static/chunks/5453.86cc1524cff3f6fb.js', revision: '86cc1524cff3f6fb' },
        {
          url: '/_next/static/chunks/5453.86cc1524cff3f6fb.js.map',
          revision: '70b7a3db2f6b72fdfe2fafd5df033a7c',
        },
        {
          url: '/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js.map',
          revision: '41f950213e1096c186a78cf72d420774',
        },
        { url: '/_next/static/chunks/6231-3a3732027a40bc4a.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/6231-3a3732027a40bc4a.js.map',
          revision: '0931a0fd149112264368b9293c9dccd3',
        },
        { url: '/_next/static/chunks/6687-d5952dfca716c56e.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/6687-d5952dfca716c56e.js.map',
          revision: '7bcc16d444c755249d66b3d22665c061',
        },
        { url: '/_next/static/chunks/6745-1116b7a9a93f846e.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/6745-1116b7a9a93f846e.js.map',
          revision: 'e277351467f51918b6794eac49762040',
        },
        { url: '/_next/static/chunks/7030-5e920bf053a2e1a1.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/7030-5e920bf053a2e1a1.js.map',
          revision: 'c8ab58becc9fa2dfdd0968a5a4482ec5',
        },
        { url: '/_next/static/chunks/7282.4e740408638aec87.js', revision: '4e740408638aec87' },
        {
          url: '/_next/static/chunks/7282.4e740408638aec87.js.map',
          revision: '38b23621527d1a3ca73d0299d780ace6',
        },
        { url: '/_next/static/chunks/740.ff57ee37ee1af0c7.js', revision: 'ff57ee37ee1af0c7' },
        {
          url: '/_next/static/chunks/740.ff57ee37ee1af0c7.js.map',
          revision: 'bef1a4d4c59683f34a6812dea717bf51',
        },
        { url: '/_next/static/chunks/7659-7f372d9e97015a6b.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/7659-7f372d9e97015a6b.js.map',
          revision: '6e7aa3fadef5ab8717ce26a7059bb1f4',
        },
        { url: '/_next/static/chunks/7924-c58ff7b8480d2618.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/7924-c58ff7b8480d2618.js.map',
          revision: '1d9de42a544ab89592c7ad359dce23e2',
        },
        { url: '/_next/static/chunks/860-e6711f6fce8f02c8.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/860-e6711f6fce8f02c8.js.map',
          revision: 'f7ca650155163c2fb866e8e958a91fd9',
        },
        { url: '/_next/static/chunks/8bb4d8db.6b870d0eb4ff5c40.js', revision: '6b870d0eb4ff5c40' },
        {
          url: '/_next/static/chunks/8bb4d8db.6b870d0eb4ff5c40.js.map',
          revision: 'd03f0b65519cdf64641792b518ba84d8',
        },
        { url: '/_next/static/chunks/9050-23cc09ad63423d2b.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/9050-23cc09ad63423d2b.js.map',
          revision: 'bf4f06805f2e1246056976277e38bc41',
        },
        { url: '/_next/static/chunks/9180-79116441a24e72c9.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/9180-79116441a24e72c9.js.map',
          revision: 'eca3e06f44e313a44ce0d04b4823fec8',
        },
        { url: '/_next/static/chunks/9368.f679c9b619b09b23.js', revision: 'f679c9b619b09b23' },
        {
          url: '/_next/static/chunks/9368.f679c9b619b09b23.js.map',
          revision: '71428aa8f88eb29987c80075cc532919',
        },
        { url: '/_next/static/chunks/9488.73fe773dd52ccbde.js', revision: '73fe773dd52ccbde' },
        {
          url: '/_next/static/chunks/9488.73fe773dd52ccbde.js.map',
          revision: '12af92e03841e3a3220c3ebb74b21d41',
        },
        { url: '/_next/static/chunks/9667.bdaef2659034d7f7.js', revision: 'bdaef2659034d7f7' },
        { url: '/_next/static/chunks/97.4fc092bc396a1eff.js', revision: '4fc092bc396a1eff' },
        {
          url: '/_next/static/chunks/97.4fc092bc396a1eff.js.map',
          revision: 'd806f2128d980787c7967495a6bb14ff',
        },
        { url: '/_next/static/chunks/9822.282659481f17ee5f.js', revision: '282659481f17ee5f' },
        {
          url: '/_next/static/chunks/9822.282659481f17ee5f.js.map',
          revision: '952ae47fa7247cea74c31780bb5f254a',
        },
        { url: '/_next/static/chunks/9850-48c6ff3614ccf195.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/9850-48c6ff3614ccf195.js.map',
          revision: 'beb57cb1861ac1883c85c9abd8c1b69a',
        },
        { url: '/_next/static/chunks/abe5329a.99f3b554f1745b6a.js', revision: '99f3b554f1745b6a' },
        {
          url: '/_next/static/chunks/abe5329a.99f3b554f1745b6a.js.map',
          revision: 'a19ce48c8086c21b9621fab936da6bd2',
        },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-92394d308d40fef7.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-92394d308d40fef7.js.map',
          revision: '72df922f26a85657365162a4654c8c45',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-c45360f8fc228b0b.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-c45360f8fc228b0b.js.map',
          revision: '5695b092315bd4d8c8622ec91f110a5c',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-483a981433612404.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-483a981433612404.js.map',
          revision: '681cc9a29c750fc503969158938a8da5',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-b85fbeeb5cca40ac.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-c6f8dfa6e2a00171.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-c6f8dfa6e2a00171.js.map',
          revision: '43134dc40d4e92f74a439f7ccea1e813',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-62f4186b667e1749.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-62f4186b667e1749.js.map',
          revision: 'f2ad7fae80a418849d9ffa38b1e19cd7',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-3f8292137d7a690a.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-3f8292137d7a690a.js.map',
          revision: 'bedc37d980afd8b49e57baadd9f6bc64',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-0faec1578907e879.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-0faec1578907e879.js.map',
          revision: '4fdfaf7c6803a07972ef048c5a41b087',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-52b7dfc42eb68be2.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-52b7dfc42eb68be2.js.map',
          revision: 'ab2a2cf0c5034f8c4007c657e2acd982',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-2596d2eb221bff9f.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-2596d2eb221bff9f.js.map',
          revision: 'd2370adefe2f347b13fa4974809ece24',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-bafce75c5da931cc.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-bafce75c5da931cc.js.map',
          revision: '074495c7425afe653f617b0ac50931b4',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-458ccbe710b0c575.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-458ccbe710b0c575.js.map',
          revision: 'b2f644f4437436310ecfef23ae92f379',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-730f335a6eadd366.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-730f335a6eadd366.js.map',
          revision: '9ea503e58b7ee1c1797a8f0faa3f99d1',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/empty/page-fa97af355efc5b5a.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/empty/page-fa97af355efc5b5a.js.map',
          revision: 'f4d469bfdf81e977e020a156a6b3b11f',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-28196ec6a57a648a.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/layout-28196ec6a57a648a.js.map',
          revision: '3732907c303a76e4f537ab95be8d5c65',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-7d2e03220b7051be.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/communities/page-7d2e03220b7051be.js.map',
          revision: 'd5e6b290302c9f5f2fb74b323c5257d6',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-071061e28ab25411.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/layout-071061e28ab25411.js.map',
          revision: '3cd02ee63791db0b53dc1d12b60e81dc',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-80900baf4acc1738.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-create/page-80900baf4acc1738.js.map',
          revision: 'b92796afffb0536daa598b5711ce3d8b',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-f21c181bfaf9d684.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community-invite/page-f21c181bfaf9d684.js.map',
          revision: 'f113d7860d657e1502ae46a279d76d61',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-9f7e29413dbf367f.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/community/page-9f7e29413dbf367f.js.map',
          revision: '8332db1c930c8a215c3c2eb1d22e8c07',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-8b1949dc4c24467b.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/final/page-8b1949dc4c24467b.js.map',
          revision: '00f406f6bed39e8088505bba04b28d72',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-3dc193c20e1b8848.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/layout-3dc193c20e1b8848.js.map',
          revision: '67cc7a6812df127c4f752370f72bbac1',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-9aa7c27f8c8407e0.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(protected)/welcome/user-info/page-9aa7c27f8c8407e0.js.map',
          revision: '13306c2eee30fb915f838d9fab72cc78',
        },
        {
          url: '/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-ab0b92ab928adcb4.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-7f2adc9b37152f0a.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(public)/layout-7f2adc9b37152f0a.js.map',
          revision: '2e688871c5ef87232a1479adff8ac28a',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-70230af5442de2c8.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-70230af5442de2c8.js.map',
          revision: '79ea83dda3968449e960d09c1564ab3d',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-52ebbbca5f31b073.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(public)/reset-password/page-52ebbbca5f31b073.js.map',
          revision: '537bcd467bc9b0ed7025b98b575d0833',
        },
        {
          url: '/_next/static/chunks/app/(public)/signin/page-0d5fdf885a890feb.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-f83c92f6786d2622.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/(public)/signup/page-f83c92f6786d2622.js.map',
          revision: '02cd4837b222f96a1878ba91a3427e53',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-9fdd7df41e8d95d8.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/error-bfcc6a8bc62d9849.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/error-bfcc6a8bc62d9849.js.map',
          revision: '69fbc36e5b395aa3df66821776e4c193',
        },
        {
          url: '/_next/static/chunks/app/global-error-9f3241ba05463114.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/global-error-9f3241ba05463114.js.map',
          revision: '053eabb7197bff436dd30f980d8bfe6f',
        },
        {
          url: '/_next/static/chunks/app/layout-1ba7cba79ba64c47.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/layout-1ba7cba79ba64c47.js.map',
          revision: 'a81573faf31dc7cccde344c5ef289026',
        },
        {
          url: '/_next/static/chunks/app/loading-9b2f14df1ab03d65.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/not-found-acfa3c0c355678a2.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/not-found-acfa3c0c355678a2.js.map',
          revision: 'b4dd068c41f0aa9954c397e60b6897d5',
        },
        {
          url: '/_next/static/chunks/app/page-8480759676750f0e.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-a46143f6b90da0a5.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/app/sentry-example-page/page-a46143f6b90da0a5.js.map',
          revision: '51112762b9440c9a6d38d859a466ae0c',
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
        { url: '/_next/static/chunks/f824c7d1.c3e0bdd1c72640c9.js', revision: 'c3e0bdd1c72640c9' },
        {
          url: '/_next/static/chunks/f824c7d1.c3e0bdd1c72640c9.js.map',
          revision: '692edd61c385f15b586d773fe683493f',
        },
        { url: '/_next/static/chunks/fd8d879a.7e9c0cf560717c78.js', revision: '7e9c0cf560717c78' },
        {
          url: '/_next/static/chunks/fd8d879a.7e9c0cf560717c78.js.map',
          revision: '2a3b4b4a019cbbd485f020b8e270918c',
        },
        {
          url: '/_next/static/chunks/framework-d967f747bf315ddf.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/framework-d967f747bf315ddf.js.map',
          revision: 'd0025696afe38e2a734529e5f5f7dae2',
        },
        {
          url: '/_next/static/chunks/main-app-06f2e7523475ed89.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/main-app-06f2e7523475ed89.js.map',
          revision: '8457da76572502fca81aa3f949f220a1',
        },
        { url: '/_next/static/chunks/main-d4dd2d135b7fbeca.js', revision: '3PyeRQJH9Y2cYqOcXGkf3' },
        {
          url: '/_next/static/chunks/main-d4dd2d135b7fbeca.js.map',
          revision: 'fc6df7f2f86abddff7914196a23b4ca7',
        },
        {
          url: '/_next/static/chunks/pages/_app-9a872a13059a0258.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/pages/_app-9a872a13059a0258.js.map',
          revision: '5d8b85915ae2ce193cf3e8be26613578',
        },
        {
          url: '/_next/static/chunks/pages/_error-b43021fcf80fd84b.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
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
          url: '/_next/static/chunks/webpack-1feada8146379e2a.js',
          revision: '3PyeRQJH9Y2cYqOcXGkf3',
        },
        {
          url: '/_next/static/chunks/webpack-1feada8146379e2a.js.map',
          revision: '1ffa6aec8f96174a61bd8a72ebdd9744',
        },
        { url: '/_next/static/css/54472c5ebc29f50d.css', revision: '54472c5ebc29f50d' },
        {
          url: '/_next/static/css/54472c5ebc29f50d.css.map',
          revision: 'd0e93527dcdba2251565fc5116dafa08',
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
          revision: 'e7cbb4f62f300ca78f492aa25a39467f',
        },
        { url: '/_next/static/css/d00a8d9359ee1b88.css', revision: 'd00a8d9359ee1b88' },
        {
          url: '/_next/static/css/d00a8d9359ee1b88.css.map',
          revision: '88e9429622e25cb82d0925ce41141bd1',
        },
        { url: '/_next/static/css/d999a9bdb9ff1209.css', revision: 'd999a9bdb9ff1209' },
        {
          url: '/_next/static/css/d999a9bdb9ff1209.css.map',
          revision: '86ff15085fa6a65c972eba0dc118a5ee',
        },
        { url: '/_next/static/css/ffe77f91210d50f2.css', revision: 'ffe77f91210d50f2' },
        {
          url: '/_next/static/css/ffe77f91210d50f2.css.map',
          revision: 'cf814eec8889c04e6a4a54fa7bf0e40f',
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
            cacheWillUpdate: async ({ request: e, response: c, event: s, state: a }) =>
              c && 'opaqueredirect' === c.type
                ? new Response(c.body, { status: 200, statusText: 'OK', headers: c.headers })
                : c,
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
        const c = e.pathname;
        return !c.startsWith('/api/auth/') && !!c.startsWith('/api/');
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
