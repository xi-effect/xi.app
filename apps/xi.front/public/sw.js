if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const o=e=>n(e,t),r={module:{uri:t},exports:a,require:o};s[t]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(i(...e),a)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"97a306b1b31ee53706b1d8d651a92bf6"},{url:"/_next/static/El8dMygCOiCMocLYA4PBc/_buildManifest.js",revision:"52321b10a9a400247c586f9accc69e84"},{url:"/_next/static/El8dMygCOiCMocLYA4PBc/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/294-eb9c5491bf348552.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/676-23fb73113c6c2161.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/705-c75e52cc5a39691f.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/7d8153d6-0d791af5b0a834d5.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/847-38a2aae303a92d9a.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/app/@auth/page-c11b9ce44f4b84e7.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/app/@main/page-74bd57034855951a.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/app/error-d4b3dbb56a90ec77.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/app/global-error-b19dac4f6d2f7ebe.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/app/layout-e797d8a984daedc4.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/app/loading-31e5ec22d9d807b8.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/framework-0857c1c24dbfb1d6.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/main-6e88f97703f39c08.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/main-app-62b41701f243a475.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/pages/_app-98cbc3e51a53b395.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/pages/_error-2ef9d8eba889871b.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a8ba63f2417b26c7.js",revision:"El8dMygCOiCMocLYA4PBc"},{url:"/xieffect-logo-for-light.svg",revision:"7d0121a354f2569ced0ff62bf52493a3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
