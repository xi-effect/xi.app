if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const o=e=>i(e,a),r={module:{uri:a},exports:t,require:o};s[a]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(c(...e),t)))}}define(["./workbox-495fd258"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"e432991cea7ec3e045186033ff040cdd"},{url:"/_next/static/D7EOlhezQACy_iELANoen/_buildManifest.js",revision:"1d36db6a369bd35d5306ad941a7f140a"},{url:"/_next/static/D7EOlhezQACy_iELANoen/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/127-615c78f080bb2300.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/1336-08cf2d9588c110ec.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/1337-34ca64a6c9752640.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/1376.c71ff616e4a3f816.js",revision:"c71ff616e4a3f816"},{url:"/_next/static/chunks/1544.bbe6483d70cb52aa.js",revision:"bbe6483d70cb52aa"},{url:"/_next/static/chunks/1699.a9ee2c45a08d4462.js",revision:"a9ee2c45a08d4462"},{url:"/_next/static/chunks/1dd3208c-35b925996dfce215.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/2497.3cbaaaee3b885cd5.js",revision:"3cbaaaee3b885cd5"},{url:"/_next/static/chunks/2507-d064727188309c96.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/2578-31d26d80538ba1a8.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/286-f993a9c43de7a736.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/2911.9eb7f58434bb60f5.js",revision:"9eb7f58434bb60f5"},{url:"/_next/static/chunks/3438-2514f6b908e81baf.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/3857-af928f624ef8ba53.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/39af6c14.7c78790fecda6034.js",revision:"7c78790fecda6034"},{url:"/_next/static/chunks/4154-6850109a5d51e141.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/4553-0df5456b3907bee7.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/5141-a54353ec080b5914.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/5191-ec2d4ea795842c77.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/5674-6f47e70dca9f20a6.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/5864.c418b95881e91af9.js",revision:"c418b95881e91af9"},{url:"/_next/static/chunks/6182-7051ea3625a139ba.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/6231-62b708863b1f50c3.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/6385-fcc43a118926e907.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/6450.bfb730cd7b53e729.js",revision:"bfb730cd7b53e729"},{url:"/_next/static/chunks/6745-d813cf874e9c7bb5.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/7270.071422d1050a9ca8.js",revision:"071422d1050a9ca8"},{url:"/_next/static/chunks/7282.6858c0a41cb3c976.js",revision:"6858c0a41cb3c976"},{url:"/_next/static/chunks/7325.52a8b21a4ceb0ce2.js",revision:"52a8b21a4ceb0ce2"},{url:"/_next/static/chunks/7465-b35335542cad0ea9.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/7659-fb500ae1837c3110.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/7663.568c39bd679c8684.js",revision:"568c39bd679c8684"},{url:"/_next/static/chunks/8082-8ee51166fc29d407.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/8303-b0c8ac410d4cb8e9.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/8306-575eb2e4de45dfd2.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/860-9ad92c386d94e6bc.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/8776.37947bafa3a3ee12.js",revision:"37947bafa3a3ee12"},{url:"/_next/static/chunks/8bb4d8db-1c1d132d03816959.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/9050-4c598a7a233944dd.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/9067-de9895b0f9e67a04.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/9164-449107ca0645fe15.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/9174-8f72d6bc9cc81972.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/9506.6b81b1a5a52d9978.js",revision:"6b81b1a5a52d9978"},{url:"/_next/static/chunks/9697-91f045b7b5e1c61d.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/97.df2d309d425b6b58.js",revision:"df2d309d425b6b58"},{url:"/_next/static/chunks/9822-fe207596661f430e.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/9850-eb257d7968f4cb6f.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-f60fba521f17e93a.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-a76dd1409750df11.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-a56e22c71378195d.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-23cfb69cc5bc59b1.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-f8eb9f2d5cfdd313.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-0863dca3170f1b67.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-161016d45ae597b5.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-0a0053fe1594fee9.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-ac91fa75c6876ace.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-2b45d1ac3efa32fe.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-582b0c8f2b13923a.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/empty/page-819339eb4060c526.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/layout-9ff969a0f117bad9.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/communities/page-deb1c5f6b0fdd6ad.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/layout-a9771fa3d48499b6.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/welcome/community-create/page-10952790831157e7.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/welcome/community-invite/page-1ec3fc921205f67e.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/welcome/community/page-bd37b75736aedc66.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/welcome/final/page-f6698ba7b9381b4b.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/welcome/layout-f80793496ba10e38.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(protected)/welcome/user-info/page-4215a792fbd1ed0f.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-2d4ee2dac5abeee4.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(public)/layout-6956032562f77344.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-aef1a1ac5ead2ec4.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(public)/reset-password/page-a1f7dd68b0aa5595.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(public)/signin/page-0757282c808768a8.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/(public)/signup/page-99608f2c137fc286.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/_not-found/page-0cee11dd6ee88741.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/error-7d2945b539452a38.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/global-error-cad067109db74305.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/layout-b1bfac9b6e50a340.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/loading-b8e8b815efb058f1.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/not-found-4fbb97e9d53b603d.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/app/page-65d9cb5565f6b1b4.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/b6b9d1ec-870f54f5ee748fdb.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/b7bbbec9-ab2aac6d4ad6508b.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/f824c7d1-a149baa96e7a5ba1.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/fd8d879a.644d4659effeca71.js",revision:"644d4659effeca71"},{url:"/_next/static/chunks/framework-f67b0c50d92b2b9f.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/main-af7890b05c49f60e.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/main-app-3a66373db3afaf5b.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/pages/_app-985f9abd66cd8e91.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/pages/_error-29151b8311ee5445.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-9ebc4399a24b3fd9.js",revision:"D7EOlhezQACy_iELANoen"},{url:"/_next/static/css/3286d53aaaa7c3b1.css",revision:"3286d53aaaa7c3b1"},{url:"/_next/static/css/6cc25b18ace3be22.css",revision:"6cc25b18ace3be22"},{url:"/_next/static/css/6f7c0ff9629c1f92.css",revision:"6f7c0ff9629c1f92"},{url:"/_next/static/css/87bd59dedf2f1989.css",revision:"87bd59dedf2f1989"},{url:"/_next/static/css/c841b1dd90868ac3.css",revision:"c841b1dd90868ac3"},{url:"/_next/static/css/d00a8d9359ee1b88.css",revision:"d00a8d9359ee1b88"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.p.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/f1b810c250cac3b6-s.p.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/assets/avatarrep.svg",revision:"4277856ede8073aed18e907473ccb16b"},{url:"/assets/avatarrep2.svg",revision:"f0340143227cc3546b667fd9c4d1e1d8"},{url:"/assets/avatarrep3.svg",revision:"42ed55fd57254c4ca8e750fb808b3b3f"},{url:"/assets/brand/idlogo-default-dark.svg",revision:"b72b287391a7944409bd220aaef82763"},{url:"/assets/brand/idlogo-default-light.svg",revision:"f565500e24bc57cae2f52826f81b3e05"},{url:"/assets/brand/navigationlogo-default-dark.svg",revision:"57ef947eb72c3d4c82b0a636a860edf7"},{url:"/assets/brand/navigationlogo-default-light.svg",revision:"a15444008bc500a7f70fe6e8f9633ed2"},{url:"/assets/brand/navigationlogo-small-dark.svg",revision:"2988496d2e57ac969eaee0f66321501e"},{url:"/assets/brand/navigationlogo-small-light.svg",revision:"9be513feb04cf34e1ccf6aa2be706b5c"},{url:"/assets/community-home-page/change-community-screenshot.svg",revision:"7c1c1ceacbaf5d97d059fcfa0f24eb7a"},{url:"/assets/community-home-page/left-menu-screenshot.svg",revision:"a3597008a1f65a4b0e1432704e8d90cb"},{url:"/assets/community-home-page/manual-icon.svg",revision:"99d1181494955665822afd358d7cff80"},{url:"/assets/community-home-page/roles-screenshot.svg",revision:"6d2b9cfdb9243b230a5a9b5164f149bd"},{url:"/assets/community-home-page/support-box-heart.svg",revision:"f36be2899d56ed629224f7389b3c025f"},{url:"/assets/community-home-page/tg-filled-icon.svg",revision:"1b806891696de69b4276dc73bf85956a"},{url:"/assets/icons/apple-touch-icon-120x120-precomposed.png",revision:"a4c255fea139db3f9ed1fa8ee41d740e"},{url:"/assets/icons/apple-touch-icon-120x120.png",revision:"c1eb7682cfae37803b8c8a3f0c9023a3"},{url:"/assets/icons/apple-touch-icon-152x152-precomposed.png",revision:"f08c10a0bbd03b23e3aa2df8a7f28e58"},{url:"/assets/icons/apple-touch-icon-152x152.png",revision:"a9a10a1b6e85a906691b3ee61a81d64b"},{url:"/assets/icons/apple-touch-icon-180x180-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon-180x180.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/apple-touch-icon-60x60-precomposed.png",revision:"e1cf9f51d7b7c706b79c196b826204de"},{url:"/assets/icons/apple-touch-icon-60x60.png",revision:"85ed82806641b3de9246334d43581ad9"},{url:"/assets/icons/apple-touch-icon-76x76-precomposed.png",revision:"e6c2fdd100be720b0edceca3f9a24662"},{url:"/assets/icons/apple-touch-icon-76x76.png",revision:"5a2363031dafad468d3a52e0f3a7c1eb"},{url:"/assets/icons/apple-touch-icon-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/favicon-16x16.png",revision:"9b9c3bae0d66acae5035e72062ed9786"},{url:"/assets/icons/favicon-32x32.png",revision:"98e18c86655c72a2ee389b5f9d9f52c7"},{url:"/assets/icons/icon-144x144.png",revision:"c8b04135f67230d873a17dbe48037192"},{url:"/assets/icons/icon-192x192.png",revision:"5b009d152da14f621c3d58bfd0d96c93"},{url:"/assets/icons/icon-256x256.png",revision:"3e9cdcfe679d8188e2b360e313160fe0"},{url:"/assets/icons/icon-36x36.png",revision:"6cba026644288af5b1c9228e5e3eb8c6"},{url:"/assets/icons/icon-384x384.png",revision:"91912f5112c359f018046cc507adc9c5"},{url:"/assets/icons/icon-48x48.png",revision:"17f1219d11082910026ded56d610e1cc"},{url:"/assets/icons/icon-512x512.png",revision:"c2f0746e098e924b2bf0017432a3059b"},{url:"/assets/icons/icon-72x72.png",revision:"1e4f074faf2f924d2552db62d792b769"},{url:"/assets/icons/icon-96x96.png",revision:"19d956b0fef5336f51aa5ddfb62aadb5"},{url:"/assets/icons/mstile-144x144.png",revision:"f3b246ca663e3872c2c5e3c2c8328f58"},{url:"/assets/icons/mstile-150x150.png",revision:"2fe7e49a8ca19dd20d406569f83b2284"},{url:"/assets/icons/mstile-310x150.png",revision:"8b8b07cce22acee6f864658edbfaa7a3"},{url:"/assets/icons/mstile-310x310.png",revision:"9dc38c0afd454e811ab5c792fe9c01b9"},{url:"/assets/icons/mstile-70x70.png",revision:"c18b9fb768c5e03f4a53a594e617d16b"},{url:"/assets/icons/safari-pinned-tab.svg",revision:"5abcd4e192369d5df81a9210f53642b7"},{url:"/assets/welcome/community-add.png",revision:"87a7310d1105e3e2fac883d679c9b082"},{url:"/assets/welcome/community.png",revision:"5539467569ca4016a37ca14c7183d1a5"},{url:"/assets/welcome/final.png",revision:"2920aab69ae54b863976213ab22265c0"},{url:"/assets/welcome/user-info.png",revision:"42b8adbdbd02b52bedb482ac39203781"},{url:"/assets/welcome/welcome-modal-image.webp",revision:"e1ae72c5df28a06b0482fd689c286f03"},{url:"/favicon-for-dark.svg",revision:"6825e74a748ef61f38418d0a77983974"},{url:"/favicon-for-light.svg",revision:"b1a97d320dba69a91e06391d5db81743"},{url:"/favicon.ico",revision:"501d94411940282fef1a69e6a8c1c0d7"},{url:"/fonts/MarkerHand-Regular.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/manifest.webmanifest",revision:"0e07ef18af0502a5ea38551e362c104a"},{url:"/test/avatar.svg",revision:"3b81fe6bbfcc5a70c922ff470c070f44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
