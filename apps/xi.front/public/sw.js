if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>i(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-495fd258"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1b4267fc13d8a9cd1d0abce30e033a61"},{url:"/_next/static/9squmQ7OmqBYOn76iV6wJ/_buildManifest.js",revision:"1d36db6a369bd35d5306ad941a7f140a"},{url:"/_next/static/9squmQ7OmqBYOn76iV6wJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/127-615c78f080bb2300.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/1336-08cf2d9588c110ec.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/1337-34ca64a6c9752640.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/1376.3647744064b60a7e.js",revision:"3647744064b60a7e"},{url:"/_next/static/chunks/1544.3c76a400a0930ef8.js",revision:"3c76a400a0930ef8"},{url:"/_next/static/chunks/1699.3c36607e7176d6de.js",revision:"3c36607e7176d6de"},{url:"/_next/static/chunks/1dd3208c-35b925996dfce215.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/2507-d064727188309c96.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/286-f993a9c43de7a736.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/2878.f1f3db572efff46c.js",revision:"f1f3db572efff46c"},{url:"/_next/static/chunks/3129.4c281bd71ac43547.js",revision:"4c281bd71ac43547"},{url:"/_next/static/chunks/3438-f17480723fd8910a.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/3857-0f7237946ac24212.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/3920.a8d96114138f4a0f.js",revision:"a8d96114138f4a0f"},{url:"/_next/static/chunks/39af6c14.481b6fb4ca15bc8a.js",revision:"481b6fb4ca15bc8a"},{url:"/_next/static/chunks/4154-6850109a5d51e141.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/4868.b9631e126539d214.js",revision:"b9631e126539d214"},{url:"/_next/static/chunks/5204.bcacad3a9a581981.js",revision:"bcacad3a9a581981"},{url:"/_next/static/chunks/5326-c173c098451939fa.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/5385.5276e2951d46617b.js",revision:"5276e2951d46617b"},{url:"/_next/static/chunks/5394.f27a8a98d4ef1540.js",revision:"f27a8a98d4ef1540"},{url:"/_next/static/chunks/5678-9a9afc3b189fe174.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/570.eafb208dc7f89ee4.js",revision:"eafb208dc7f89ee4"},{url:"/_next/static/chunks/5880-0632ab76263b8c21.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/6385-fcc43a118926e907.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/6445-c475b51bf0f82d36.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/6455-c2c328d02d256bfd.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/7030-5560fb4e42a83b9a.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/7270.071422d1050a9ca8.js",revision:"071422d1050a9ca8"},{url:"/_next/static/chunks/7325.bd661af8cd3603b8.js",revision:"bd661af8cd3603b8"},{url:"/_next/static/chunks/7465-96934f3987954418.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/7997.79d8c39817ea0ba5.js",revision:"79d8c39817ea0ba5"},{url:"/_next/static/chunks/8082-8ee51166fc29d407.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/8269.c125fe38a92d5fd5.js",revision:"c125fe38a92d5fd5"},{url:"/_next/static/chunks/8303-b0c8ac410d4cb8e9.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/8306-f953a0664e6b3a55.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/8475.2e5ebe9cfb29498f.js",revision:"2e5ebe9cfb29498f"},{url:"/_next/static/chunks/8547.d7a12fce9bd96fd8.js",revision:"d7a12fce9bd96fd8"},{url:"/_next/static/chunks/8bb4d8db.473ace53801bdb90.js",revision:"473ace53801bdb90"},{url:"/_next/static/chunks/9050-4c598a7a233944dd.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/907-4cc1dff9ba73fe0f.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/9174-8f72d6bc9cc81972.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/9488-a623a4335ba00507.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/9697-91f045b7b5e1c61d.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/9822.e40c41410098bd44.js",revision:"e40c41410098bd44"},{url:"/_next/static/chunks/9850-eb257d7968f4cb6f.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/9931.68b65b475b2c0a2d.js",revision:"68b65b475b2c0a2d"},{url:"/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-485f88d9b4ec08d6.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-af7aeb40ca40de85.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-afee978f639f5866.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-cb046e5246437947.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-af64b9d462f3f591.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-bfb604d97421bc19.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-bcc794f3c97bb46e.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-57de7c9b16eb3aa6.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-5ea3514561643a43.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-20219608ee0b9d85.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-de37da59ae9ead95.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/layout-b7cec95f131480bb.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/empty/page-0da10ffa56a6d0c2.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/communities/page-be80f62c56eec0f9.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/layout-6e7bce5e0517ce97.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/welcome/community-create/page-a4e6ff9478bedc6f.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/welcome/community-invite/page-97faaa4528769505.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/welcome/community/page-9067735a1ad4b3b4.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/welcome/final/page-4c7342c1e6fd33f7.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/welcome/layout-d92322f1de3fe534.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(protected)/welcome/user-info/page-d0f36de952bb6ea2.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(public)/confirm-email/%5Bid%5D/page-4f082395917dc98e.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(public)/layout-6956032562f77344.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-29eadf2e09f64544.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(public)/reset-password/page-05176ef9fc936e05.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(public)/signin/page-c146cf7fbf56a18f.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/(public)/signup/page-4fc32680639744bb.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/_not-found/page-0cee11dd6ee88741.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/error-8eaab9123c58bf61.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/global-error-d8cbc61929f5658a.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/layout-ab9ec6a4f3369ec4.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/loading-b8e8b815efb058f1.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/not-found-de2b9b1d106a42bc.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/app/page-26ec6c6594c06731.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/b6b9d1ec.8fab89d34513e0db.js",revision:"8fab89d34513e0db"},{url:"/_next/static/chunks/b7bbbec9.398b19488edffd7c.js",revision:"398b19488edffd7c"},{url:"/_next/static/chunks/f824c7d1.049751630cb76da0.js",revision:"049751630cb76da0"},{url:"/_next/static/chunks/fd8d879a.644d4659effeca71.js",revision:"644d4659effeca71"},{url:"/_next/static/chunks/framework-f67b0c50d92b2b9f.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/main-af7890b05c49f60e.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/main-app-3a66373db3afaf5b.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/pages/_app-985f9abd66cd8e91.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/pages/_error-29151b8311ee5445.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-9f14b2d36262c5e8.js",revision:"9squmQ7OmqBYOn76iV6wJ"},{url:"/_next/static/css/6f7c0ff9629c1f92.css",revision:"6f7c0ff9629c1f92"},{url:"/_next/static/css/9b0c6fec15e44400.css",revision:"9b0c6fec15e44400"},{url:"/_next/static/css/c376945ac5440df6.css",revision:"c376945ac5440df6"},{url:"/_next/static/css/c841b1dd90868ac3.css",revision:"c841b1dd90868ac3"},{url:"/_next/static/css/d00a8d9359ee1b88.css",revision:"d00a8d9359ee1b88"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.p.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/f1b810c250cac3b6-s.p.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/assets/avatarrep.svg",revision:"4277856ede8073aed18e907473ccb16b"},{url:"/assets/avatarrep2.svg",revision:"f0340143227cc3546b667fd9c4d1e1d8"},{url:"/assets/avatarrep3.svg",revision:"42ed55fd57254c4ca8e750fb808b3b3f"},{url:"/assets/brand/idlogo-default-dark.svg",revision:"b72b287391a7944409bd220aaef82763"},{url:"/assets/brand/idlogo-default-light.svg",revision:"f565500e24bc57cae2f52826f81b3e05"},{url:"/assets/brand/navigationlogo-default-dark.svg",revision:"57ef947eb72c3d4c82b0a636a860edf7"},{url:"/assets/brand/navigationlogo-default-light.svg",revision:"a15444008bc500a7f70fe6e8f9633ed2"},{url:"/assets/brand/navigationlogo-small-dark.svg",revision:"2988496d2e57ac969eaee0f66321501e"},{url:"/assets/brand/navigationlogo-small-light.svg",revision:"9be513feb04cf34e1ccf6aa2be706b5c"},{url:"/assets/community-home-page/change-community-screenshot.svg",revision:"7c1c1ceacbaf5d97d059fcfa0f24eb7a"},{url:"/assets/community-home-page/left-menu-screenshot.svg",revision:"a3597008a1f65a4b0e1432704e8d90cb"},{url:"/assets/community-home-page/manual-icon.svg",revision:"99d1181494955665822afd358d7cff80"},{url:"/assets/community-home-page/roles-screenshot.svg",revision:"6d2b9cfdb9243b230a5a9b5164f149bd"},{url:"/assets/community-home-page/support-box-heart.svg",revision:"f36be2899d56ed629224f7389b3c025f"},{url:"/assets/community-home-page/tg-filled-icon.svg",revision:"1b806891696de69b4276dc73bf85956a"},{url:"/assets/icons/apple-touch-icon-120x120-precomposed.png",revision:"a4c255fea139db3f9ed1fa8ee41d740e"},{url:"/assets/icons/apple-touch-icon-120x120.png",revision:"c1eb7682cfae37803b8c8a3f0c9023a3"},{url:"/assets/icons/apple-touch-icon-152x152-precomposed.png",revision:"f08c10a0bbd03b23e3aa2df8a7f28e58"},{url:"/assets/icons/apple-touch-icon-152x152.png",revision:"a9a10a1b6e85a906691b3ee61a81d64b"},{url:"/assets/icons/apple-touch-icon-180x180-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon-180x180.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/apple-touch-icon-60x60-precomposed.png",revision:"e1cf9f51d7b7c706b79c196b826204de"},{url:"/assets/icons/apple-touch-icon-60x60.png",revision:"85ed82806641b3de9246334d43581ad9"},{url:"/assets/icons/apple-touch-icon-76x76-precomposed.png",revision:"e6c2fdd100be720b0edceca3f9a24662"},{url:"/assets/icons/apple-touch-icon-76x76.png",revision:"5a2363031dafad468d3a52e0f3a7c1eb"},{url:"/assets/icons/apple-touch-icon-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/favicon-16x16.png",revision:"9b9c3bae0d66acae5035e72062ed9786"},{url:"/assets/icons/favicon-32x32.png",revision:"98e18c86655c72a2ee389b5f9d9f52c7"},{url:"/assets/icons/icon-144x144.png",revision:"c8b04135f67230d873a17dbe48037192"},{url:"/assets/icons/icon-192x192.png",revision:"5b009d152da14f621c3d58bfd0d96c93"},{url:"/assets/icons/icon-256x256.png",revision:"3e9cdcfe679d8188e2b360e313160fe0"},{url:"/assets/icons/icon-36x36.png",revision:"6cba026644288af5b1c9228e5e3eb8c6"},{url:"/assets/icons/icon-384x384.png",revision:"91912f5112c359f018046cc507adc9c5"},{url:"/assets/icons/icon-48x48.png",revision:"17f1219d11082910026ded56d610e1cc"},{url:"/assets/icons/icon-512x512.png",revision:"c2f0746e098e924b2bf0017432a3059b"},{url:"/assets/icons/icon-72x72.png",revision:"1e4f074faf2f924d2552db62d792b769"},{url:"/assets/icons/icon-96x96.png",revision:"19d956b0fef5336f51aa5ddfb62aadb5"},{url:"/assets/icons/mstile-144x144.png",revision:"f3b246ca663e3872c2c5e3c2c8328f58"},{url:"/assets/icons/mstile-150x150.png",revision:"2fe7e49a8ca19dd20d406569f83b2284"},{url:"/assets/icons/mstile-310x150.png",revision:"8b8b07cce22acee6f864658edbfaa7a3"},{url:"/assets/icons/mstile-310x310.png",revision:"9dc38c0afd454e811ab5c792fe9c01b9"},{url:"/assets/icons/mstile-70x70.png",revision:"c18b9fb768c5e03f4a53a594e617d16b"},{url:"/assets/icons/safari-pinned-tab.svg",revision:"5abcd4e192369d5df81a9210f53642b7"},{url:"/assets/welcome/community-add.png",revision:"87a7310d1105e3e2fac883d679c9b082"},{url:"/assets/welcome/community.png",revision:"5539467569ca4016a37ca14c7183d1a5"},{url:"/assets/welcome/final.png",revision:"2920aab69ae54b863976213ab22265c0"},{url:"/assets/welcome/user-info.png",revision:"42b8adbdbd02b52bedb482ac39203781"},{url:"/favicon-for-dark.svg",revision:"6825e74a748ef61f38418d0a77983974"},{url:"/favicon-for-light.svg",revision:"b1a97d320dba69a91e06391d5db81743"},{url:"/favicon.ico",revision:"501d94411940282fef1a69e6a8c1c0d7"},{url:"/fonts/MarkerHand-Regular.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/manifest.webmanifest",revision:"0e07ef18af0502a5ea38551e362c104a"},{url:"/test/avatar.svg",revision:"3b81fe6bbfcc5a70c922ff470c070f44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
