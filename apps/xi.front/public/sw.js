if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>n(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-c9018aa3"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"f5cb1f51f449e62754ac7ab00be1b193"},{url:"/_next/static/chunks/13-4255afab71cbacfa.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/175.6e4ccffdf9b0ad1f.js",revision:"6e4ccffdf9b0ad1f"},{url:"/_next/static/chunks/1dd3208c-6233fa0de6086635.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/237-1128183141be6d32.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/268-5df466e72f616c7b.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/269-7d41973611d8516e.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/274-800a29d8fb4d839f.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/39af6c14.5948b584ab8a1ec8.js",revision:"5948b584ab8a1ec8"},{url:"/_next/static/chunks/441-fa56651d11fbe1e7.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/475.1764cc72832f3429.js",revision:"1764cc72832f3429"},{url:"/_next/static/chunks/53-e551738b813f55f5.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/609-048b6b7c61ef63f0.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/620.1f95290999575d3c.js",revision:"1f95290999575d3c"},{url:"/_next/static/chunks/622-11658b5a164997d5.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/72-93743faa5e8b8a89.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/733-991e9eacd6fe1064.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/934.74378b35d9eebc30.js",revision:"74378b35d9eebc30"},{url:"/_next/static/chunks/977-e1ddbf411e4fbdb3.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/_not-found-300ac2e0a71cef8c.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/community/%5Bcid%5D/home/page-0eb701db3aee1e79.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/community/%5Bcid%5D/videoconference/%5Bvid%5D/page-83a1f7e0165810a7.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/community/layout-79cbae2260d313c5.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/confirm-email/%5Bid%5D/page-1bd09fe1012b469f.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/error-2be59ebc22c66322.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/global-error-74b358587bf0d257.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/layout-dc6fbe5e76782be5.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/page-dd8908f6ad598d24.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/reset-password/%5Bid%5D/page-03c4fdd5ad7adbe0.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/reset-password/page-f361c8e3ce8d59bf.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/signin/page-3e6373ca92954a98.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/signup/page-5bf61d256f675edb.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/welcome/community-create/page-404bdb6db6ad76d5.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/welcome/community-invite/page-4b9833ca880d583a.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/welcome/community/page-311160c4708ae947.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/welcome/final/page-060b4d07314dd0da.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/app/welcome/user-info/page-542d8a034797332b.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/framework-0857c1c24dbfb1d6.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/main-app-cf9ae84b4ca27711.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/main-fdd8db81dcbbd77e.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/pages/_app-6d78d5637f780153.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/pages/_error-5b0140bb72da3221.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f62f57a83d833e6b.js",revision:"gzrq2t52mXLMfBj8omnY6"},{url:"/_next/static/css/ab4b5e6430d13148.css",revision:"ab4b5e6430d13148"},{url:"/_next/static/css/d38261e715b3739d.css",revision:"d38261e715b3739d"},{url:"/_next/static/gzrq2t52mXLMfBj8omnY6/_buildManifest.js",revision:"abe9b5a3f2ee253663daf5da7690299d"},{url:"/_next/static/gzrq2t52mXLMfBj8omnY6/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.p.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/assets/avatarrep.svg",revision:"4277856ede8073aed18e907473ccb16b"},{url:"/assets/brand/idlogo-default-dark.svg",revision:"b72b287391a7944409bd220aaef82763"},{url:"/assets/brand/idlogo-default-light.svg",revision:"f565500e24bc57cae2f52826f81b3e05"},{url:"/assets/brand/navigationlogo-default-dark.svg",revision:"57ef947eb72c3d4c82b0a636a860edf7"},{url:"/assets/brand/navigationlogo-default-light.svg",revision:"a15444008bc500a7f70fe6e8f9633ed2"},{url:"/assets/brand/navigationlogo-small-dark.svg",revision:"2988496d2e57ac969eaee0f66321501e"},{url:"/assets/brand/navigationlogo-small-light.svg",revision:"9be513feb04cf34e1ccf6aa2be706b5c"},{url:"/assets/community-home-page/change-community-screenshot.svg",revision:"7c1c1ceacbaf5d97d059fcfa0f24eb7a"},{url:"/assets/community-home-page/left-menu-screenshot.svg",revision:"a3597008a1f65a4b0e1432704e8d90cb"},{url:"/assets/community-home-page/manual-icon.svg",revision:"99d1181494955665822afd358d7cff80"},{url:"/assets/community-home-page/roles-screenshot.svg",revision:"6d2b9cfdb9243b230a5a9b5164f149bd"},{url:"/assets/community-home-page/support-box-heart.svg",revision:"f36be2899d56ed629224f7389b3c025f"},{url:"/assets/community-home-page/tg-filled-icon.svg",revision:"1b806891696de69b4276dc73bf85956a"},{url:"/assets/icons/apple-touch-icon-120x120-precomposed.png",revision:"a4c255fea139db3f9ed1fa8ee41d740e"},{url:"/assets/icons/apple-touch-icon-120x120.png",revision:"c1eb7682cfae37803b8c8a3f0c9023a3"},{url:"/assets/icons/apple-touch-icon-152x152-precomposed.png",revision:"f08c10a0bbd03b23e3aa2df8a7f28e58"},{url:"/assets/icons/apple-touch-icon-152x152.png",revision:"a9a10a1b6e85a906691b3ee61a81d64b"},{url:"/assets/icons/apple-touch-icon-180x180-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon-180x180.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/apple-touch-icon-60x60-precomposed.png",revision:"e1cf9f51d7b7c706b79c196b826204de"},{url:"/assets/icons/apple-touch-icon-60x60.png",revision:"85ed82806641b3de9246334d43581ad9"},{url:"/assets/icons/apple-touch-icon-76x76-precomposed.png",revision:"e6c2fdd100be720b0edceca3f9a24662"},{url:"/assets/icons/apple-touch-icon-76x76.png",revision:"5a2363031dafad468d3a52e0f3a7c1eb"},{url:"/assets/icons/apple-touch-icon-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/favicon-16x16.png",revision:"9b9c3bae0d66acae5035e72062ed9786"},{url:"/assets/icons/favicon-32x32.png",revision:"98e18c86655c72a2ee389b5f9d9f52c7"},{url:"/assets/icons/icon-144x144.png",revision:"c8b04135f67230d873a17dbe48037192"},{url:"/assets/icons/icon-192x192.png",revision:"5b009d152da14f621c3d58bfd0d96c93"},{url:"/assets/icons/icon-256x256.png",revision:"3e9cdcfe679d8188e2b360e313160fe0"},{url:"/assets/icons/icon-36x36.png",revision:"6cba026644288af5b1c9228e5e3eb8c6"},{url:"/assets/icons/icon-384x384.png",revision:"91912f5112c359f018046cc507adc9c5"},{url:"/assets/icons/icon-48x48.png",revision:"17f1219d11082910026ded56d610e1cc"},{url:"/assets/icons/icon-512x512.png",revision:"c2f0746e098e924b2bf0017432a3059b"},{url:"/assets/icons/icon-72x72.png",revision:"1e4f074faf2f924d2552db62d792b769"},{url:"/assets/icons/icon-96x96.png",revision:"19d956b0fef5336f51aa5ddfb62aadb5"},{url:"/assets/icons/mstile-144x144.png",revision:"f3b246ca663e3872c2c5e3c2c8328f58"},{url:"/assets/icons/mstile-150x150.png",revision:"2fe7e49a8ca19dd20d406569f83b2284"},{url:"/assets/icons/mstile-310x150.png",revision:"8b8b07cce22acee6f864658edbfaa7a3"},{url:"/assets/icons/mstile-310x310.png",revision:"9dc38c0afd454e811ab5c792fe9c01b9"},{url:"/assets/icons/mstile-70x70.png",revision:"c18b9fb768c5e03f4a53a594e617d16b"},{url:"/assets/icons/safari-pinned-tab.svg",revision:"5abcd4e192369d5df81a9210f53642b7"},{url:"/assets/welcome/community-add.png",revision:"87a7310d1105e3e2fac883d679c9b082"},{url:"/assets/welcome/community.png",revision:"5539467569ca4016a37ca14c7183d1a5"},{url:"/assets/welcome/final.png",revision:"2920aab69ae54b863976213ab22265c0"},{url:"/assets/welcome/user-info.png",revision:"42b8adbdbd02b52bedb482ac39203781"},{url:"/favicon-for-dark.svg",revision:"6825e74a748ef61f38418d0a77983974"},{url:"/favicon-for-light.svg",revision:"b1a97d320dba69a91e06391d5db81743"},{url:"/favicon.ico",revision:"501d94411940282fef1a69e6a8c1c0d7"},{url:"/manifest.webmanifest",revision:"0e07ef18af0502a5ea38551e362c104a"},{url:"/test/avatar.svg",revision:"3b81fe6bbfcc5a70c922ff470c070f44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
