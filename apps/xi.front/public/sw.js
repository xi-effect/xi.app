if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let t={};const f=e=>s(e,i),d={module:{uri:i},exports:t,require:f};a[i]=Promise.all(c.map((e=>d[e]||f(e)))).then((e=>(n(...e),t)))}}define(["./workbox-495fd258"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1215de57463230ba6955e94ec8effb40"},{url:"/_next/static/aXTZO9ejy4PWanANfeSVO/_buildManifest.js",revision:"bbe5400b7a0db2bc3bf6358cc4826072"},{url:"/_next/static/aXTZO9ejy4PWanANfeSVO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1170-c7db54b106e0a7cc.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/1170-c7db54b106e0a7cc.js.map",revision:"ff4109e94aaf85b43a899dc15d937991"},{url:"/_next/static/chunks/1188.a685322d7c527881.js",revision:"a685322d7c527881"},{url:"/_next/static/chunks/1188.a685322d7c527881.js.map",revision:"4f3926c8374da313e0ee9435be596fee"},{url:"/_next/static/chunks/1215-0ae9d3272ffa3b6d.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/1215-0ae9d3272ffa3b6d.js.map",revision:"69413050ec816c9a44fb7e736b920120"},{url:"/_next/static/chunks/127-8a692e8156dc9934.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/127-8a692e8156dc9934.js.map",revision:"40e6bfe2e5914c9fd83a64e02c472cb9"},{url:"/_next/static/chunks/1555.1bbf5f9dcef8afcb.js",revision:"1bbf5f9dcef8afcb"},{url:"/_next/static/chunks/1555.1bbf5f9dcef8afcb.js.map",revision:"f8f9886a762b823dacd330848f82cfe6"},{url:"/_next/static/chunks/1664-b275a83c88ac073e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/1664-b275a83c88ac073e.js.map",revision:"b1df0f6fb3a2fcb5240a1d396116c397"},{url:"/_next/static/chunks/174-96a4ce9d3051f177.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/174-96a4ce9d3051f177.js.map",revision:"049046000b634058aff229c557bf335a"},{url:"/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/1dd3208c-55177e18b87aeb5e.js.map",revision:"70d6b41b10f7e944e9fac502012075e6"},{url:"/_next/static/chunks/2115.30b3992fd79c12f6.js",revision:"30b3992fd79c12f6"},{url:"/_next/static/chunks/2115.30b3992fd79c12f6.js.map",revision:"03448a1ce01b930b75613db2704b75c1"},{url:"/_next/static/chunks/2414-24530abd785261ad.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/2414-24530abd785261ad.js.map",revision:"f8fd138ae55771b00edc9a3f0ab1fc9b"},{url:"/_next/static/chunks/2507-794c39b72f674aba.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/2507-794c39b72f674aba.js.map",revision:"7fe21b7e955d429edfae24d5c5aa9b54"},{url:"/_next/static/chunks/2578-9e1bc4d9760473e6.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/2578-9e1bc4d9760473e6.js.map",revision:"7f7b0806c9a425c8de967e9ecb766ffb"},{url:"/_next/static/chunks/2707-41407bc3ee874dbf.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/2707-41407bc3ee874dbf.js.map",revision:"96e387abefbd60df8f05eb22207b6f0a"},{url:"/_next/static/chunks/3025.b98c0d52884f1dda.js",revision:"b98c0d52884f1dda"},{url:"/_next/static/chunks/3025.b98c0d52884f1dda.js.map",revision:"71675b8102de1823c99db1d6acb822be"},{url:"/_next/static/chunks/3438-650f77da5a33f9f0.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/3438-650f77da5a33f9f0.js.map",revision:"560fb7a4186766947166a2d40548d4ae"},{url:"/_next/static/chunks/3493.b43a5a851acc90f5.js",revision:"b43a5a851acc90f5"},{url:"/_next/static/chunks/3493.b43a5a851acc90f5.js.map",revision:"c6fbcd9eba49506d6bebe218d1d285b7"},{url:"/_next/static/chunks/3531.d0d84380cfd9b6ba.js",revision:"d0d84380cfd9b6ba"},{url:"/_next/static/chunks/3531.d0d84380cfd9b6ba.js.map",revision:"77c9b4228ea83c2a2a16d6bd85475443"},{url:"/_next/static/chunks/3731-4f6f3ef8f4525611.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/3731-4f6f3ef8f4525611.js.map",revision:"cdacecd07f717ccb6560e0ce7848b1b2"},{url:"/_next/static/chunks/39af6c14.473e3c1b9869e477.js",revision:"473e3c1b9869e477"},{url:"/_next/static/chunks/39af6c14.473e3c1b9869e477.js.map",revision:"58dd00709569dfcc1f11895c91449de4"},{url:"/_next/static/chunks/4124-948d2a52c4aac0a3.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/4124-948d2a52c4aac0a3.js.map",revision:"00cd68ee6750aebbdc072d33110ee0e4"},{url:"/_next/static/chunks/4154-e9dd39a81ea03b9c.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/4154-e9dd39a81ea03b9c.js.map",revision:"87b33d8aa4240bb9ffff0834ddd07e8e"},{url:"/_next/static/chunks/4553-75c543ce4088994c.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/4553-75c543ce4088994c.js.map",revision:"4e62fb3e0ab5dfb321403f5a6c8bb9a0"},{url:"/_next/static/chunks/4561-ac03afed517de1a1.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/4561-ac03afed517de1a1.js.map",revision:"50c294749d14df02b768fe91cf903577"},{url:"/_next/static/chunks/5018-4f5e6e443a2d09fe.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/5018-4f5e6e443a2d09fe.js.map",revision:"5d73b9b1c52fe2c63e18d54e97fc1567"},{url:"/_next/static/chunks/5432.91047e7023688e16.js",revision:"91047e7023688e16"},{url:"/_next/static/chunks/5432.91047e7023688e16.js.map",revision:"c7dccee6c21dba24fc216392b98203d5"},{url:"/_next/static/chunks/5453.86cc1524cff3f6fb.js",revision:"86cc1524cff3f6fb"},{url:"/_next/static/chunks/5453.86cc1524cff3f6fb.js.map",revision:"70b7a3db2f6b72fdfe2fafd5df033a7c"},{url:"/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/59c6eb5a-1ae11c492df202ea.js.map",revision:"f7e1836c084067ee5af391c0018b9349"},{url:"/_next/static/chunks/6231-3a3732027a40bc4a.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/6231-3a3732027a40bc4a.js.map",revision:"0931a0fd149112264368b9293c9dccd3"},{url:"/_next/static/chunks/6687-d5952dfca716c56e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/6687-d5952dfca716c56e.js.map",revision:"6901405fc129cbb5938047f50fbb09cd"},{url:"/_next/static/chunks/6745-1116b7a9a93f846e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/6745-1116b7a9a93f846e.js.map",revision:"e277351467f51918b6794eac49762040"},{url:"/_next/static/chunks/7030-1b94b3e787bd881d.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/7030-1b94b3e787bd881d.js.map",revision:"0043864259489d1a8e31e5ce737a4b13"},{url:"/_next/static/chunks/7047.15625e20d258b42c.js",revision:"15625e20d258b42c"},{url:"/_next/static/chunks/7047.15625e20d258b42c.js.map",revision:"5e9ba05ba6ebd48b3b9d4bbc808553ba"},{url:"/_next/static/chunks/7282.4e740408638aec87.js",revision:"4e740408638aec87"},{url:"/_next/static/chunks/7282.4e740408638aec87.js.map",revision:"38b23621527d1a3ca73d0299d780ace6"},{url:"/_next/static/chunks/740.e9ea4c7f0e7f4923.js",revision:"e9ea4c7f0e7f4923"},{url:"/_next/static/chunks/740.e9ea4c7f0e7f4923.js.map",revision:"14097cfda1b2bac3e73ecb6f3fdd1aa8"},{url:"/_next/static/chunks/7659-7f372d9e97015a6b.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/7659-7f372d9e97015a6b.js.map",revision:"6e7aa3fadef5ab8717ce26a7059bb1f4"},{url:"/_next/static/chunks/860-e6711f6fce8f02c8.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/860-e6711f6fce8f02c8.js.map",revision:"f7ca650155163c2fb866e8e958a91fd9"},{url:"/_next/static/chunks/8bb4d8db-8f18a0312a0421e4.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/8bb4d8db-8f18a0312a0421e4.js.map",revision:"49938f0abdbff5c2c67776b026b97a9e"},{url:"/_next/static/chunks/9050-23cc09ad63423d2b.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/9050-23cc09ad63423d2b.js.map",revision:"bf4f06805f2e1246056976277e38bc41"},{url:"/_next/static/chunks/9180-79116441a24e72c9.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/9180-79116441a24e72c9.js.map",revision:"eca3e06f44e313a44ce0d04b4823fec8"},{url:"/_next/static/chunks/9368.f679c9b619b09b23.js",revision:"f679c9b619b09b23"},{url:"/_next/static/chunks/9368.f679c9b619b09b23.js.map",revision:"71428aa8f88eb29987c80075cc532919"},{url:"/_next/static/chunks/9667.bdaef2659034d7f7.js",revision:"bdaef2659034d7f7"},{url:"/_next/static/chunks/97.d1774f0b4fbcc211.js",revision:"d1774f0b4fbcc211"},{url:"/_next/static/chunks/97.d1774f0b4fbcc211.js.map",revision:"5e207ab6859d179090e07df5255fa0f1"},{url:"/_next/static/chunks/9822-cea4f02307aa435f.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/9822-cea4f02307aa435f.js.map",revision:"e2120112e3b35482d46f3bb4ec7e2e75"},{url:"/_next/static/chunks/9850-48c6ff3614ccf195.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/9850-48c6ff3614ccf195.js.map",revision:"beb57cb1861ac1883c85c9abd8c1b69a"},{url:"/_next/static/chunks/abe5329a-73fbdafdbe0249bd.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/abe5329a-73fbdafdbe0249bd.js.map",revision:"553cc1bbba38af27b2dccaa36de2081f"},{url:"/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-435edb4ec74de82f.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-435edb4ec74de82f.js.map",revision:"4aef2a61edf1eb74e5ae40e700109fc3"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-3d30c4978431b641.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-3d30c4978431b641.js.map",revision:"2cfd9f80bfc15bf4ebacabc2fbdcb642"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-cb69391ea639b833.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-cb69391ea639b833.js.map",revision:"b741843d1bab6e4b2422a07bd2b267f1"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-b85fbeeb5cca40ac.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-fa032cc2734f1e71.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-fa032cc2734f1e71.js.map",revision:"47be1a0a60ec498ddd79f0770b93e30e"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-a94fe3f20027dfee.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-a94fe3f20027dfee.js.map",revision:"bf5d6d0805d05698a25b65977e1fc874"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-c0a98e02a7b2aa33.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-c0a98e02a7b2aa33.js.map",revision:"537f0c6d61bb7eb8eaa0c63169d9ace8"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-d56a82df557dd231.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-d56a82df557dd231.js.map",revision:"6e38d0c42329a888dddb300095c63a12"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-9a442d113faa7e34.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-9a442d113faa7e34.js.map",revision:"b680d41f0b89e01f765216d12259d630"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-3a355d9c6e2aedd4.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-3a355d9c6e2aedd4.js.map",revision:"719af1015b05d90393b689c828db2a2f"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-a0c91eca112ffebb.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-a0c91eca112ffebb.js.map",revision:"d32065fc72a4e83deec0f63d526fed24"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-40a468587386add2.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-40a468587386add2.js.map",revision:"950421de8b8657b813db37e040c96422"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-45e48ca50a3ca34a.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-45e48ca50a3ca34a.js.map",revision:"0c9867063d3926e5589692f923c015e4"},{url:"/_next/static/chunks/app/(protected)/communities/empty/page-4ae630417da70c6b.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/empty/page-4ae630417da70c6b.js.map",revision:"e6befbcccfc5d7f0fcddd1572d7deb97"},{url:"/_next/static/chunks/app/(protected)/communities/layout-781b4b063bd6c71d.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/layout-781b4b063bd6c71d.js.map",revision:"6ae2a83e242deeb73c9f3cb8cbc30e34"},{url:"/_next/static/chunks/app/(protected)/communities/page-8076a990ad320d9f.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/communities/page-8076a990ad320d9f.js.map",revision:"6ac8613b6f346720ade712eab50fa6f7"},{url:"/_next/static/chunks/app/(protected)/layout-14572071b325403b.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/layout-14572071b325403b.js.map",revision:"7c1d7afab61dc6e403768b51bf49f277"},{url:"/_next/static/chunks/app/(protected)/welcome/community-create/page-6f41ed68f7f69d9c.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/welcome/community-create/page-6f41ed68f7f69d9c.js.map",revision:"c69fa57b6188b3d36df6970704680219"},{url:"/_next/static/chunks/app/(protected)/welcome/community-invite/page-c3edb655498a8015.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/welcome/community-invite/page-c3edb655498a8015.js.map",revision:"2934c0fdca2bb9552d0459cfc85dc913"},{url:"/_next/static/chunks/app/(protected)/welcome/community/page-5becf1892273ebe1.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/welcome/community/page-5becf1892273ebe1.js.map",revision:"1269db320d07b52fc4f38808f59483f4"},{url:"/_next/static/chunks/app/(protected)/welcome/final/page-a0c17e2a80206fd1.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/welcome/final/page-a0c17e2a80206fd1.js.map",revision:"370addc35690eb05590e01204724c93d"},{url:"/_next/static/chunks/app/(protected)/welcome/layout-69a8afa8e4965c7e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/welcome/layout-69a8afa8e4965c7e.js.map",revision:"186dd72454eec9010ca4870b972d30b5"},{url:"/_next/static/chunks/app/(protected)/welcome/user-info/page-af5eefa420f31f06.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(protected)/welcome/user-info/page-af5eefa420f31f06.js.map",revision:"56100be2b5a0d9be0152faa6c7f0cd5c"},{url:"/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-30bc2687365f9209.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(public)/layout-111e5c3a3bb8cf6e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(public)/layout-111e5c3a3bb8cf6e.js.map",revision:"29bee7f4f40ffe2fb64543d56692aaf9"},{url:"/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-710355b9798b09a4.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-710355b9798b09a4.js.map",revision:"caf76c7ed41470ba83d8d47ce2be217b"},{url:"/_next/static/chunks/app/(public)/reset-password/page-52e7e65f8185f471.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(public)/reset-password/page-52e7e65f8185f471.js.map",revision:"ac37449f86c9f3eb68b94b8e012595e0"},{url:"/_next/static/chunks/app/(public)/signin/page-3cdf97ae632d4c8b.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(public)/signup/page-ec4fcefa7aead764.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/(public)/signup/page-ec4fcefa7aead764.js.map",revision:"4008086c4013d479f1bd17392cefc35c"},{url:"/_next/static/chunks/app/_not-found/page-9fdd7df41e8d95d8.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/error-ed06fd9433174fa7.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/error-ed06fd9433174fa7.js.map",revision:"d87b0547df55685f0c721dbfa8124082"},{url:"/_next/static/chunks/app/global-error-aa74e5c965a188f1.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/global-error-aa74e5c965a188f1.js.map",revision:"52175c52fdf8e7eea05c6ae47838f977"},{url:"/_next/static/chunks/app/layout-01c5c6ef982b257e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/layout-01c5c6ef982b257e.js.map",revision:"27d263b1b223154aab1f83cf0c35f316"},{url:"/_next/static/chunks/app/loading-9b2f14df1ab03d65.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/not-found-a1e704c79fc4ba78.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/not-found-a1e704c79fc4ba78.js.map",revision:"85040da3ebc54aea4b77b7733c5119c7"},{url:"/_next/static/chunks/app/page-8480759676750f0e.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/sentry-example-page/page-5c8c7858d80f15b1.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/app/sentry-example-page/page-5c8c7858d80f15b1.js.map",revision:"7e82c8a5970f393dbf4ea8fa7c38e516"},{url:"/_next/static/chunks/b6b9d1ec-18058a9ac33ce6aa.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/b6b9d1ec-18058a9ac33ce6aa.js.map",revision:"f8abab1ea770e9abc806139908a4716b"},{url:"/_next/static/chunks/b7bbbec9-3fab542298af0c5c.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/b7bbbec9-3fab542298af0c5c.js.map",revision:"42dedfe1e031a20bb8b4527af3c06f12"},{url:"/_next/static/chunks/f824c7d1-af41fbfb2ae0ec5a.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/f824c7d1-af41fbfb2ae0ec5a.js.map",revision:"0deead6676438e592ba36a0b01983c52"},{url:"/_next/static/chunks/fd8d879a.7e9c0cf560717c78.js",revision:"7e9c0cf560717c78"},{url:"/_next/static/chunks/fd8d879a.7e9c0cf560717c78.js.map",revision:"2a3b4b4a019cbbd485f020b8e270918c"},{url:"/_next/static/chunks/framework-d967f747bf315ddf.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/framework-d967f747bf315ddf.js.map",revision:"d0025696afe38e2a734529e5f5f7dae2"},{url:"/_next/static/chunks/main-app-9b20106b7eecf9ca.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/main-app-9b20106b7eecf9ca.js.map",revision:"91359d814a78f441a778c92575637526"},{url:"/_next/static/chunks/main-d4dd2d135b7fbeca.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/main-d4dd2d135b7fbeca.js.map",revision:"47f0885ecc117101729ed9a14f238d1e"},{url:"/_next/static/chunks/pages/_app-430dbb3645639061.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/pages/_app-430dbb3645639061.js.map",revision:"67bc81f40d51a9eb23d1f981a8dc34b0"},{url:"/_next/static/chunks/pages/_error-b43021fcf80fd84b.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/pages/_error-b43021fcf80fd84b.js.map",revision:"7cd7c03370427718c13b5e83f5d2ca13"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-29819184bc508958.js",revision:"aXTZO9ejy4PWanANfeSVO"},{url:"/_next/static/chunks/webpack-29819184bc508958.js.map",revision:"12c2d811693cbc9ee8501615c17d2495"},{url:"/_next/static/css/54472c5ebc29f50d.css",revision:"54472c5ebc29f50d"},{url:"/_next/static/css/54472c5ebc29f50d.css.map",revision:"68ff0cfa15284607f3f8e96f1888c650"},{url:"/_next/static/css/74dec32b0e72e398.css",revision:"74dec32b0e72e398"},{url:"/_next/static/css/74dec32b0e72e398.css.map",revision:"13438af7213312795f40c6b0c999e649"},{url:"/_next/static/css/7e89ba826724d068.css",revision:"7e89ba826724d068"},{url:"/_next/static/css/7e89ba826724d068.css.map",revision:"e601ea78926af7397332cc9b44b6cdc5"},{url:"/_next/static/css/87bd59dedf2f1989.css",revision:"87bd59dedf2f1989"},{url:"/_next/static/css/87bd59dedf2f1989.css.map",revision:"e7cbb4f62f300ca78f492aa25a39467f"},{url:"/_next/static/css/d00a8d9359ee1b88.css",revision:"d00a8d9359ee1b88"},{url:"/_next/static/css/d00a8d9359ee1b88.css.map",revision:"88e9429622e25cb82d0925ce41141bd1"},{url:"/_next/static/css/d999a9bdb9ff1209.css",revision:"d999a9bdb9ff1209"},{url:"/_next/static/css/d999a9bdb9ff1209.css.map",revision:"1122977219f38aa28080a5ed70a40d0e"},{url:"/_next/static/css/ffe77f91210d50f2.css",revision:"ffe77f91210d50f2"},{url:"/_next/static/css/ffe77f91210d50f2.css.map",revision:"343eed2390211be051f6f20e1255c2b6"},{url:"/_next/static/media/01721b474504e7d6-s.woff2",revision:"9a8fb93af48de3d981543d8c2e7d6d03"},{url:"/_next/static/media/19fc70611c7ee6d5-s.woff2",revision:"dc3987f3f26f8c9919dcb46e9aeeb7c6"},{url:"/_next/static/media/26a46d62cd723877-s.p.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/2e1b830192b7974a-s.woff2",revision:"fb3eb2a5b724bc3de2f18496da5fbe70"},{url:"/_next/static/media/3281a323710833ec-s.woff2",revision:"f63709fe0c055814b5235e27ff98ae45"},{url:"/_next/static/media/3478b6abef19b3b3-s.p.woff2",revision:"eeee8726f3b4ae9d8c710efba031ca6a"},{url:"/_next/static/media/3aa27b2eb5f698f7-s.woff2",revision:"1179dffca057f6b40e5d71311c94bd3f"},{url:"/_next/static/media/3ccf24bed29cbb82-s.woff2",revision:"5a74c5d2cf127a6c8774988f7431df51"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/684e5662d94c69e1-s.p.woff2",revision:"a1e11d00feb82d3b4f7cd3f2f7c26d34"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97b12f7b815cdf76-s.woff2",revision:"caa4a0a1120700ed2785d82baf69a108"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b6f2eee8808a2bb4-s.woff2",revision:"fd7827ded4b7d182c9710967aeb9984b"},{url:"/_next/static/media/bc2003170c651d45-s.woff2",revision:"b03ab30f8297c5c12e7746701cd1ee74"},{url:"/_next/static/media/be2416cbb012c256-s.p.woff2",revision:"d2712b7a0f090540f1308cb3ceff15a6"},{url:"/_next/static/media/d43ef4503e5571d0-s.woff2",revision:"9b04a0dd785bb71b83dd94fa3af20d71"},{url:"/_next/static/media/d607327a37a507c7-s.woff2",revision:"7ea53cc9d5ec4534e4281b9723b23786"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/ebec2867f40f78ec-s.woff2",revision:"efc6f6cd1a9d1db1ee8e37b34d6430df"},{url:"/_next/static/media/f1b810c250cac3b6-s.p.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/assets/avatarrep.svg",revision:"4277856ede8073aed18e907473ccb16b"},{url:"/assets/avatarrep2.svg",revision:"6c8076316bbe74b5b34ca5cb46462a16"},{url:"/assets/avatarrep3.svg",revision:"42ed55fd57254c4ca8e750fb808b3b3f"},{url:"/assets/brand/idlogo-default-dark.svg",revision:"b72b287391a7944409bd220aaef82763"},{url:"/assets/brand/idlogo-default-light.svg",revision:"f565500e24bc57cae2f52826f81b3e05"},{url:"/assets/brand/navigationlogo-default-dark.svg",revision:"57ef947eb72c3d4c82b0a636a860edf7"},{url:"/assets/brand/navigationlogo-default-light.svg",revision:"a15444008bc500a7f70fe6e8f9633ed2"},{url:"/assets/brand/navigationlogo-small-dark.svg",revision:"2988496d2e57ac969eaee0f66321501e"},{url:"/assets/brand/navigationlogo-small-light.svg",revision:"9be513feb04cf34e1ccf6aa2be706b5c"},{url:"/assets/community-home-page/change-community-screenshot.svg",revision:"7c1c1ceacbaf5d97d059fcfa0f24eb7a"},{url:"/assets/community-home-page/left-menu-screenshot.svg",revision:"a3597008a1f65a4b0e1432704e8d90cb"},{url:"/assets/community-home-page/manual-icon.svg",revision:"99d1181494955665822afd358d7cff80"},{url:"/assets/community-home-page/roles-screenshot.svg",revision:"6d2b9cfdb9243b230a5a9b5164f149bd"},{url:"/assets/community-home-page/support-box-heart.svg",revision:"f36be2899d56ed629224f7389b3c025f"},{url:"/assets/community-home-page/tg-filled-icon.svg",revision:"1b806891696de69b4276dc73bf85956a"},{url:"/assets/icons/apple-touch-icon-120x120-precomposed.png",revision:"a4c255fea139db3f9ed1fa8ee41d740e"},{url:"/assets/icons/apple-touch-icon-120x120.png",revision:"c1eb7682cfae37803b8c8a3f0c9023a3"},{url:"/assets/icons/apple-touch-icon-152x152-precomposed.png",revision:"f08c10a0bbd03b23e3aa2df8a7f28e58"},{url:"/assets/icons/apple-touch-icon-152x152.png",revision:"a9a10a1b6e85a906691b3ee61a81d64b"},{url:"/assets/icons/apple-touch-icon-180x180-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon-180x180.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/apple-touch-icon-60x60-precomposed.png",revision:"e1cf9f51d7b7c706b79c196b826204de"},{url:"/assets/icons/apple-touch-icon-60x60.png",revision:"85ed82806641b3de9246334d43581ad9"},{url:"/assets/icons/apple-touch-icon-76x76-precomposed.png",revision:"e6c2fdd100be720b0edceca3f9a24662"},{url:"/assets/icons/apple-touch-icon-76x76.png",revision:"5a2363031dafad468d3a52e0f3a7c1eb"},{url:"/assets/icons/apple-touch-icon-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/favicon-16x16.png",revision:"9b9c3bae0d66acae5035e72062ed9786"},{url:"/assets/icons/favicon-32x32.png",revision:"98e18c86655c72a2ee389b5f9d9f52c7"},{url:"/assets/icons/icon-144x144.png",revision:"c8b04135f67230d873a17dbe48037192"},{url:"/assets/icons/icon-192x192.png",revision:"5b009d152da14f621c3d58bfd0d96c93"},{url:"/assets/icons/icon-256x256.png",revision:"3e9cdcfe679d8188e2b360e313160fe0"},{url:"/assets/icons/icon-36x36.png",revision:"6cba026644288af5b1c9228e5e3eb8c6"},{url:"/assets/icons/icon-384x384.png",revision:"91912f5112c359f018046cc507adc9c5"},{url:"/assets/icons/icon-48x48.png",revision:"17f1219d11082910026ded56d610e1cc"},{url:"/assets/icons/icon-512x512.png",revision:"c2f0746e098e924b2bf0017432a3059b"},{url:"/assets/icons/icon-72x72.png",revision:"1e4f074faf2f924d2552db62d792b769"},{url:"/assets/icons/icon-96x96.png",revision:"19d956b0fef5336f51aa5ddfb62aadb5"},{url:"/assets/icons/mstile-144x144.png",revision:"f3b246ca663e3872c2c5e3c2c8328f58"},{url:"/assets/icons/mstile-150x150.png",revision:"2fe7e49a8ca19dd20d406569f83b2284"},{url:"/assets/icons/mstile-310x150.png",revision:"8b8b07cce22acee6f864658edbfaa7a3"},{url:"/assets/icons/mstile-310x310.png",revision:"9dc38c0afd454e811ab5c792fe9c01b9"},{url:"/assets/icons/mstile-70x70.png",revision:"c18b9fb768c5e03f4a53a594e617d16b"},{url:"/assets/icons/safari-pinned-tab.svg",revision:"5abcd4e192369d5df81a9210f53642b7"},{url:"/assets/welcome/community-add.png",revision:"87a7310d1105e3e2fac883d679c9b082"},{url:"/assets/welcome/community.png",revision:"5539467569ca4016a37ca14c7183d1a5"},{url:"/assets/welcome/final.png",revision:"2920aab69ae54b863976213ab22265c0"},{url:"/assets/welcome/user-info.png",revision:"42b8adbdbd02b52bedb482ac39203781"},{url:"/assets/welcome/welcome-modal-image.webp",revision:"e1ae72c5df28a06b0482fd689c286f03"},{url:"/favicon-for-dark.svg",revision:"6825e74a748ef61f38418d0a77983974"},{url:"/favicon-for-light.svg",revision:"b1a97d320dba69a91e06391d5db81743"},{url:"/favicon.ico",revision:"501d94411940282fef1a69e6a8c1c0d7"},{url:"/fonts/MarkerHand-Regular.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/manifest.webmanifest",revision:"0e07ef18af0502a5ea38551e362c104a"},{url:"/test/avatar.svg",revision:"3b81fe6bbfcc5a70c922ff470c070f44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
