if(!self.define){let e,a={};const c=(c,s)=>(c=new URL(c+".js",s).href,a[c]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=a,document.head.appendChild(e)}else e=c,importScripts(c),a()})).then((()=>{let e=a[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let t={};const d=e=>c(e,i),f={module:{uri:i},exports:t,require:d};a[i]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(n(...e),t)))}}define(["./workbox-495fd258"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"6b25765ecef7720439901af6e5a65e70"},{url:"/_next/static/TPObaIhFzRev5zkDln9Hk/_buildManifest.js",revision:"0b002a9b958ca0a740db613addef1915"},{url:"/_next/static/TPObaIhFzRev5zkDln9Hk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1199208c.531b10adc253dc76.js",revision:"531b10adc253dc76"},{url:"/_next/static/chunks/1199208c.531b10adc253dc76.js.map",revision:"676740bd7ccf30ff0451f3564a8875f7"},{url:"/_next/static/chunks/11aea392.df31cc2dfd003b58.js",revision:"df31cc2dfd003b58"},{url:"/_next/static/chunks/11aea392.df31cc2dfd003b58.js.map",revision:"06d369fd6a68ea95ccda7c6312e7b1f6"},{url:"/_next/static/chunks/1316-92643c08e1ed42f9.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/1316-92643c08e1ed42f9.js.map",revision:"5ef183d5ce181b39018d05f1861610e8"},{url:"/_next/static/chunks/1501.ef6b39bbc526a011.js",revision:"ef6b39bbc526a011"},{url:"/_next/static/chunks/1501.ef6b39bbc526a011.js.map",revision:"34660b5281dd22677233e2cf020bc1dc"},{url:"/_next/static/chunks/1803.8a58beee8a83f431.js",revision:"8a58beee8a83f431"},{url:"/_next/static/chunks/1803.8a58beee8a83f431.js.map",revision:"3def86dce0b453fd5d3bfb363fe0b279"},{url:"/_next/static/chunks/1870-bddc97e45f19d900.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/1870-bddc97e45f19d900.js.map",revision:"9ad0aa4d97ef4fa8b5b1b2a7ed7a185e"},{url:"/_next/static/chunks/2063-34d8214c3208c490.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/2063-34d8214c3208c490.js.map",revision:"1783de60552f02c5bd8ce3b20d0fba15"},{url:"/_next/static/chunks/2412.6b9f92bd4ac41064.js",revision:"6b9f92bd4ac41064"},{url:"/_next/static/chunks/2412.6b9f92bd4ac41064.js.map",revision:"885fd6b8e6771f7ea6b0b5e26baf06ce"},{url:"/_next/static/chunks/3036-5c89223e6736bb78.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/3036-5c89223e6736bb78.js.map",revision:"2faddbf1c591c1770fd0a9c0d7413385"},{url:"/_next/static/chunks/3136-05eb330ece7394a7.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/3136-05eb330ece7394a7.js.map",revision:"34c308f273dc7193fbe511e362fc8218"},{url:"/_next/static/chunks/3186-79728632bf812f49.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/3186-79728632bf812f49.js.map",revision:"f652e5a2be260f8342f471a3831c3fd2"},{url:"/_next/static/chunks/3276-5f6acc354dabc268.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/3276-5f6acc354dabc268.js.map",revision:"0c7519d12457b2e01c5a9f542d09ad7b"},{url:"/_next/static/chunks/3494.1fc765a9de13ee38.js",revision:"1fc765a9de13ee38"},{url:"/_next/static/chunks/3494.1fc765a9de13ee38.js.map",revision:"914201fad3b9b344aa5b2b2e35eb526c"},{url:"/_next/static/chunks/3660-8e91d6a4c46393bb.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/3660-8e91d6a4c46393bb.js.map",revision:"a29e55ed45236a8aa50c57610946230b"},{url:"/_next/static/chunks/3844.a13b303184fff3fa.js",revision:"a13b303184fff3fa"},{url:"/_next/static/chunks/3844.a13b303184fff3fa.js.map",revision:"073ac1ae2780aea5291d0d594e0b8da8"},{url:"/_next/static/chunks/39af6c14.389d1b2b804ebb52.js",revision:"389d1b2b804ebb52"},{url:"/_next/static/chunks/39af6c14.389d1b2b804ebb52.js.map",revision:"5889752f4e03d6d91957139cd39ae7a3"},{url:"/_next/static/chunks/4049-8d3e12f8876ee285.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/4049-8d3e12f8876ee285.js.map",revision:"b81540b143a5fc211a1cc2eaf6136632"},{url:"/_next/static/chunks/4187.21535f3f0344978c.js",revision:"21535f3f0344978c"},{url:"/_next/static/chunks/4187.21535f3f0344978c.js.map",revision:"4d91154abdfca78539fe174492fca5de"},{url:"/_next/static/chunks/4741.24d1e9f82e120c97.js",revision:"24d1e9f82e120c97"},{url:"/_next/static/chunks/4741.24d1e9f82e120c97.js.map",revision:"18ab1f10caf4fe3b761b1eeb008adb75"},{url:"/_next/static/chunks/4841.39ecb99c38b11e00.js",revision:"39ecb99c38b11e00"},{url:"/_next/static/chunks/4841.39ecb99c38b11e00.js.map",revision:"f014ae68f177f775c9dc753d3a5ff7ba"},{url:"/_next/static/chunks/4900.d0932d876d037a36.js",revision:"d0932d876d037a36"},{url:"/_next/static/chunks/4900.d0932d876d037a36.js.map",revision:"0d930341eececcf443868b3a6e222120"},{url:"/_next/static/chunks/4995.7a760f496dbf33e2.js",revision:"7a760f496dbf33e2"},{url:"/_next/static/chunks/4995.7a760f496dbf33e2.js.map",revision:"0bd815e780921158f446975c2347c368"},{url:"/_next/static/chunks/4a17c1f9.28fc09a38e78bf03.js",revision:"28fc09a38e78bf03"},{url:"/_next/static/chunks/4a17c1f9.28fc09a38e78bf03.js.map",revision:"520aae97c33ed94dcc83ffa677b12ec3"},{url:"/_next/static/chunks/5002.995449d8864bc762.js",revision:"995449d8864bc762"},{url:"/_next/static/chunks/5002.995449d8864bc762.js.map",revision:"2088a70e971575068863910b285ff448"},{url:"/_next/static/chunks/5054.858af15aeebb31c9.js",revision:"858af15aeebb31c9"},{url:"/_next/static/chunks/5054.858af15aeebb31c9.js.map",revision:"6d3a0b9128eb33be6702805c44a1841c"},{url:"/_next/static/chunks/517-d78f8cc20b5a3cbc.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/517-d78f8cc20b5a3cbc.js.map",revision:"bd90ba8f1491de7df1f0db8a945bb9a9"},{url:"/_next/static/chunks/5381-3758d75433043a06.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/5381-3758d75433043a06.js.map",revision:"45231d4d8ebadeb224d2929552986f7f"},{url:"/_next/static/chunks/5405.a649e58516d54c86.js",revision:"a649e58516d54c86"},{url:"/_next/static/chunks/5405.a649e58516d54c86.js.map",revision:"a3d585f57e75b26dee44c866cdfae08f"},{url:"/_next/static/chunks/5415-0f42d9b37ff204dd.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/5415-0f42d9b37ff204dd.js.map",revision:"bc0488c20964987bf62ac69f387bacc1"},{url:"/_next/static/chunks/558-fd1ddbd78a07351b.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/558-fd1ddbd78a07351b.js.map",revision:"1a36b49d59658d16405a6fff6b2064b9"},{url:"/_next/static/chunks/5709-281936115bfaf522.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/5709-281936115bfaf522.js.map",revision:"cc0a80eabc05f30dd243aff4cf72fe19"},{url:"/_next/static/chunks/5770-d317ac1ab9f6b809.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/5770-d317ac1ab9f6b809.js.map",revision:"8610b42902884d31d1190e443dd1760b"},{url:"/_next/static/chunks/59c6eb5a-0f2de5564b015105.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/59c6eb5a-0f2de5564b015105.js.map",revision:"74ba048e886b5c632450934547371798"},{url:"/_next/static/chunks/6091.0d2f8d3bf77a180e.js",revision:"0d2f8d3bf77a180e"},{url:"/_next/static/chunks/6091.0d2f8d3bf77a180e.js.map",revision:"40fec313d4b4f987ad29dc8c65468560"},{url:"/_next/static/chunks/6101.e985b87ee58caae5.js",revision:"e985b87ee58caae5"},{url:"/_next/static/chunks/6101.e985b87ee58caae5.js.map",revision:"5da1378b62dfd7ac1604d4aadf19cc04"},{url:"/_next/static/chunks/6123.c0ca697d0fa6ffb6.js",revision:"c0ca697d0fa6ffb6"},{url:"/_next/static/chunks/6123.c0ca697d0fa6ffb6.js.map",revision:"4a49ea6e949b7bb30c6cdb4555d55072"},{url:"/_next/static/chunks/62627a4d.3b3e0c862901c848.js",revision:"3b3e0c862901c848"},{url:"/_next/static/chunks/62627a4d.3b3e0c862901c848.js.map",revision:"05ebfc0ff30676f364eca7c625a4e90a"},{url:"/_next/static/chunks/6507-5a0b2879cac478c1.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/6507-5a0b2879cac478c1.js.map",revision:"b29f4ac165a339fd9f476781202a5a1c"},{url:"/_next/static/chunks/6533-4dfac72db8d36fda.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/6533-4dfac72db8d36fda.js.map",revision:"1cc62b502d34c96a528273e3120f9a63"},{url:"/_next/static/chunks/6547-c86fc4b9887512c9.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/6547-c86fc4b9887512c9.js.map",revision:"df7d3583ca5f890b8b6986645c3a9c47"},{url:"/_next/static/chunks/6703.1f7f12c50c8c8bff.js",revision:"1f7f12c50c8c8bff"},{url:"/_next/static/chunks/6733.8fc324328d770cb8.js",revision:"8fc324328d770cb8"},{url:"/_next/static/chunks/6733.8fc324328d770cb8.js.map",revision:"6c2cf0c7c62fd5c222aadbd7a13676c3"},{url:"/_next/static/chunks/6956.94d30e4a9f08ba25.js",revision:"94d30e4a9f08ba25"},{url:"/_next/static/chunks/6956.94d30e4a9f08ba25.js.map",revision:"29cc05f7c264f6be48e49d6e1fa199cb"},{url:"/_next/static/chunks/7126.7799a153ad349fce.js",revision:"7799a153ad349fce"},{url:"/_next/static/chunks/7126.7799a153ad349fce.js.map",revision:"efb1d5b2b2cbdb20c78aa1581f146153"},{url:"/_next/static/chunks/7540-bd48631a892a4b38.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/7540-bd48631a892a4b38.js.map",revision:"a9cce2fda1d983972497d8ae99be2e9b"},{url:"/_next/static/chunks/7557.8733f300dfc934ee.js",revision:"8733f300dfc934ee"},{url:"/_next/static/chunks/7557.8733f300dfc934ee.js.map",revision:"b6f883151d3bee85f293f9872410e59a"},{url:"/_next/static/chunks/7711.8f55fb59c7c6c385.js",revision:"8f55fb59c7c6c385"},{url:"/_next/static/chunks/7711.8f55fb59c7c6c385.js.map",revision:"c57efab39dadb38fde052a1885b08b7c"},{url:"/_next/static/chunks/7763.48ec76d36a2d5537.js",revision:"48ec76d36a2d5537"},{url:"/_next/static/chunks/7763.48ec76d36a2d5537.js.map",revision:"6e7c05cf74cb1581cd097309fa74fbf9"},{url:"/_next/static/chunks/8507.e046ec11aba50d66.js",revision:"e046ec11aba50d66"},{url:"/_next/static/chunks/8507.e046ec11aba50d66.js.map",revision:"f66120708113738fca895763ad38ecb3"},{url:"/_next/static/chunks/8774-e4101a8994136862.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/8774-e4101a8994136862.js.map",revision:"06bedf3a45189de84b2be754076d09c4"},{url:"/_next/static/chunks/87c73c54-c70fad8f52745726.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/87c73c54-c70fad8f52745726.js.map",revision:"1ad26651e10cdb1c2f605a53cdcf6118"},{url:"/_next/static/chunks/8bb4d8db.dde740c644764793.js",revision:"dde740c644764793"},{url:"/_next/static/chunks/8bb4d8db.dde740c644764793.js.map",revision:"44e1e9b329691576ec51384df91aa0a4"},{url:"/_next/static/chunks/9112.e76b52a9a148112e.js",revision:"e76b52a9a148112e"},{url:"/_next/static/chunks/9112.e76b52a9a148112e.js.map",revision:"7a879dfe6b2f1c5d709a64a9dbd5fccf"},{url:"/_next/static/chunks/9314-e24ac76e18501e1e.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/9314-e24ac76e18501e1e.js.map",revision:"a1171689b35ef4e7eda644fea81b832d"},{url:"/_next/static/chunks/9693.b815740a747f6bf9.js",revision:"b815740a747f6bf9"},{url:"/_next/static/chunks/9693.b815740a747f6bf9.js.map",revision:"13529e35d54729fdc2afc0f0432c1182"},{url:"/_next/static/chunks/9841-9661205933c6ea3d.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/9841-9661205933c6ea3d.js.map",revision:"78a91b6642b59cb591a9215a8c0b8eac"},{url:"/_next/static/chunks/9876-003f33388d720c2e.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/9876-003f33388d720c2e.js.map",revision:"4b5ceb2a832fc4ff9949c1c6fbb7dec7"},{url:"/_next/static/chunks/9907-53fe9ffe19d7266f.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/9907-53fe9ffe19d7266f.js.map",revision:"0fc44f1fc04a10c0a83bbed973088a2c"},{url:"/_next/static/chunks/abe5329a.cfad7c8fd7fe633b.js",revision:"cfad7c8fd7fe633b"},{url:"/_next/static/chunks/abe5329a.cfad7c8fd7fe633b.js.map",revision:"ecbfb719aeb5068572e10b7b0bbe9f39"},{url:"/_next/static/chunks/app/(common)/confirm-email/%5Bid%5D/page-773b908182f3705d.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(common)/confirm-email/%5Bid%5D/page-773b908182f3705d.js.map",revision:"c4895eda0707a182d930c53825670c73"},{url:"/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-32f91254a833cfb3.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(common)/invite/%5Biid%5D/page-32f91254a833cfb3.js.map",revision:"c419d32f3433a538c44f28713858aca5"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-d2c3e4a406ae274f.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/board/page-d2c3e4a406ae274f.js.map",revision:"1ad0c4fffa3f2794f9008bb1d51fb50d"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-504f0acd82755f19.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/call/page-504f0acd82755f19.js.map",revision:"cddfafc9a226fbfc1301428acf5f166f"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-35e813b822f7c248.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/chat/page-35e813b822f7c248.js.map",revision:"0dc5eee57b2f73a23373ef67eec1ad9d"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-c0f8a131c4581913.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/editor/page-c0f8a131c4581913.js.map",revision:"b240283f475dca7252b4f6467addc3a2"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-428e6d78d5eddfdc.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/%5Bpost-id%5D/page-428e6d78d5eddfdc.js.map",revision:"2074d1b88c5c7a4002b0cf3afbd5c4ba"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-97b173e51c9825de.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/add-post/page-97b173e51c9825de.js.map",revision:"c4ef4e3a457253967517271771303398"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-8bc818c8c7dc33fa.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/posts/page-8bc818c8c7dc33fa.js.map",revision:"91505bb46b7397096af65abca3843bad"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-6d7e1f1b0bc57d4b.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/create/page-6d7e1f1b0bc57d4b.js.map",revision:"f82ce450f809b03409326d4088d63075"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-dc348f49ae1ca1a9.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks-admin/page-dc348f49ae1ca1a9.js.map",revision:"fc6a9906c748f5c5128c4b2957fe1699"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-0f7b540cce0ed85c.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/%5Btask-id%5D/page-0f7b540cce0ed85c.js.map",revision:"7921e381a31360fb6f090f739985a58f"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-0b387492dee3b88f.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/channels/%5Bchannel-id%5D/tasks/page-0b387492dee3b88f.js.map",revision:"dd5d394dfe4c9a8b9ed420bc46c94766"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-ab57a0fa2503f76b.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/%5Bcommunity-id%5D/home/page-ab57a0fa2503f76b.js.map",revision:"33961279ec837ac2c54a7c49f4093fd6"},{url:"/_next/static/chunks/app/(protected)/communities/layout-9c8e6da0516ac368.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/layout-9c8e6da0516ac368.js.map",revision:"c5946e351ea071c870b3c2b2187a3546"},{url:"/_next/static/chunks/app/(protected)/communities/page-e43fedbc9d4a1c88.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/communities/page-e43fedbc9d4a1c88.js.map",revision:"554653ad20d209094bf5b377fac641c5"},{url:"/_next/static/chunks/app/(protected)/empty/page-a53a4707ec812b79.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/empty/page-a53a4707ec812b79.js.map",revision:"0d89242fd60a7140c4e00b913e24ff84"},{url:"/_next/static/chunks/app/(protected)/layout-386ad5a2956ac4d2.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/layout-386ad5a2956ac4d2.js.map",revision:"f24706b5b323b700b3f740162d93bf96"},{url:"/_next/static/chunks/app/(protected)/welcome/community-create/page-2cf7b13b37885394.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/welcome/community-create/page-2cf7b13b37885394.js.map",revision:"3574f05715447e65564c8cf7092ec40d"},{url:"/_next/static/chunks/app/(protected)/welcome/community-invite/page-9792c02d4967dfd7.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/welcome/community-invite/page-9792c02d4967dfd7.js.map",revision:"41bfaf1fdc3ae9bcca7e66ab0513175a"},{url:"/_next/static/chunks/app/(protected)/welcome/community/page-c82ea1d431320bda.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/welcome/community/page-c82ea1d431320bda.js.map",revision:"cd534a00c0bdd5b239358fbdf4b1345b"},{url:"/_next/static/chunks/app/(protected)/welcome/layout-5d6ce7fe1dc38d71.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/welcome/layout-5d6ce7fe1dc38d71.js.map",revision:"18224bef6b33c45aca9f0f5b89082b1d"},{url:"/_next/static/chunks/app/(protected)/welcome/user-info/page-a23c72b5a3a8365e.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(protected)/welcome/user-info/page-a23c72b5a3a8365e.js.map",revision:"2281beab85f5ea8b1c39bc89652ccdab"},{url:"/_next/static/chunks/app/(public)/layout-0f8fa5d130a8be6b.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(public)/layout-0f8fa5d130a8be6b.js.map",revision:"f60441048b99dceee65032422a8f2fe5"},{url:"/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-aafacc3a5d2544d5.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(public)/reset-password/%5Bid%5D/page-aafacc3a5d2544d5.js.map",revision:"d37304a9e1211d240e287dfa4673af17"},{url:"/_next/static/chunks/app/(public)/reset-password/page-047cf06c15c9f266.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(public)/reset-password/page-047cf06c15c9f266.js.map",revision:"c10e2714ef63ea893abf629cc8ebe4a5"},{url:"/_next/static/chunks/app/(public)/signin/page-4ee196668bd979b5.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(public)/signin/page-4ee196668bd979b5.js.map",revision:"7cf878f0ea855e30ed4978efc8dff797"},{url:"/_next/static/chunks/app/(public)/signup/page-dc1dfbfdaec635d3.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/(public)/signup/page-dc1dfbfdaec635d3.js.map",revision:"190008f87279a7d0ad1bb71d4a59711e"},{url:"/_next/static/chunks/app/_not-found/page-9a97539b7a639d26.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/api/sentry-example-api/route-3f4f87d0b8fb0d93.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/error-5800f26099badb8d.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/error-5800f26099badb8d.js.map",revision:"d6557e8aca552292f003db51825034a3"},{url:"/_next/static/chunks/app/forbidden-8013f0ae6545c213.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/forbidden-8013f0ae6545c213.js.map",revision:"34ae26af79bd9929f96341dd4685a906"},{url:"/_next/static/chunks/app/global-error-36dc896284fafe34.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/global-error-36dc896284fafe34.js.map",revision:"b2937f67dfcb8b703044b78e0e6daeda"},{url:"/_next/static/chunks/app/layout-f3e737dcc7b78562.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/layout-f3e737dcc7b78562.js.map",revision:"2cb8416e701900bde9acaa8e1d0ac238"},{url:"/_next/static/chunks/app/loading-54778dfcc95b2f99.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/not-found-5728e67dbff93aac.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/not-found-5728e67dbff93aac.js.map",revision:"48b3a23cce1a7928fc3e350d807778c1"},{url:"/_next/static/chunks/app/page-d0c76b9384373c86.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/sentry-example-page/page-154b71ad5567c836.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/sentry-example-page/page-154b71ad5567c836.js.map",revision:"357c87b11498b70c5dc364d0c7eedbff"},{url:"/_next/static/chunks/app/top-secret-tests/tests-create/page-f632ee7bbe33a5f8.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/app/top-secret-tests/tests-create/page-f632ee7bbe33a5f8.js.map",revision:"3580c7f7fca9f79f9fab8db28efa1661"},{url:"/_next/static/chunks/b6b9d1ec.904a7c546555e00c.js",revision:"904a7c546555e00c"},{url:"/_next/static/chunks/b6b9d1ec.904a7c546555e00c.js.map",revision:"3b6f538127cc5fee6bcaf1949c822955"},{url:"/_next/static/chunks/b7bbbec9.6836157e410595cb.js",revision:"6836157e410595cb"},{url:"/_next/static/chunks/b7bbbec9.6836157e410595cb.js.map",revision:"b595e6e1c0287bdd7532ae3d99b99ae8"},{url:"/_next/static/chunks/ee3bbf09.30130f3e37a650fb.js",revision:"30130f3e37a650fb"},{url:"/_next/static/chunks/ee3bbf09.30130f3e37a650fb.js.map",revision:"85435394f06d5f056e53ccfc6055b3f0"},{url:"/_next/static/chunks/framework-7b86bc9730864559.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/framework-7b86bc9730864559.js.map",revision:"6b8065db5b0f3be7f1b529af12ba3ddd"},{url:"/_next/static/chunks/main-585e1791155f76f3.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/main-585e1791155f76f3.js.map",revision:"2df4a6794a39baa5bea9b11c878117a6"},{url:"/_next/static/chunks/main-app-98bfcc754de45ef0.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/main-app-98bfcc754de45ef0.js.map",revision:"76ae4415651e882638cc07909dc8631d"},{url:"/_next/static/chunks/pages/_app-416d58659b1331aa.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/pages/_app-416d58659b1331aa.js.map",revision:"dde30ba2b03b210f7443384a4081a99a"},{url:"/_next/static/chunks/pages/_error-6a781c1f65da9020.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/pages/_error-6a781c1f65da9020.js.map",revision:"e79905f1cb1f67459f1d6e80f58890f6"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a46e1da1396f5ace.js",revision:"TPObaIhFzRev5zkDln9Hk"},{url:"/_next/static/chunks/webpack-a46e1da1396f5ace.js.map",revision:"7bccd576a3d7e0b64ba35dba992c0170"},{url:"/_next/static/css/0fcfcff0b1db3552.css",revision:"0fcfcff0b1db3552"},{url:"/_next/static/css/0fcfcff0b1db3552.css.map",revision:"0b4d3aed718a8b7da9fabaccb2041aa8"},{url:"/_next/static/css/1130b04a6da2968c.css",revision:"1130b04a6da2968c"},{url:"/_next/static/css/1130b04a6da2968c.css.map",revision:"a322599ea0347d3e727db06b2ae629d2"},{url:"/_next/static/css/406c20fe664679f9.css",revision:"406c20fe664679f9"},{url:"/_next/static/css/406c20fe664679f9.css.map",revision:"a14a35e2f5bcacf06e138dffbdf5c8b6"},{url:"/_next/static/css/c6f3f9820782a9e0.css",revision:"c6f3f9820782a9e0"},{url:"/_next/static/css/c6f3f9820782a9e0.css.map",revision:"5b13a57a060991ce19e5ae4157b96317"},{url:"/_next/static/css/e928431bd66c4775.css",revision:"e928431bd66c4775"},{url:"/_next/static/css/e928431bd66c4775.css.map",revision:"187182f6de748f3632ba6dae909ea722"},{url:"/_next/static/css/e92ea5702e562841.css",revision:"e92ea5702e562841"},{url:"/_next/static/css/e92ea5702e562841.css.map",revision:"3bb3cc4c3d5841c15a47ce1b4e60a8d9"},{url:"/_next/static/css/fd54201dd3fe417e.css",revision:"fd54201dd3fe417e"},{url:"/_next/static/css/fd54201dd3fe417e.css.map",revision:"f5c58e963d3faf760da56856668a2773"},{url:"/_next/static/media/01721b474504e7d6-s.woff2",revision:"9a8fb93af48de3d981543d8c2e7d6d03"},{url:"/_next/static/media/19fc70611c7ee6d5-s.woff2",revision:"dc3987f3f26f8c9919dcb46e9aeeb7c6"},{url:"/_next/static/media/26a46d62cd723877-s.p.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/2e1b830192b7974a-s.woff2",revision:"fb3eb2a5b724bc3de2f18496da5fbe70"},{url:"/_next/static/media/3281a323710833ec-s.woff2",revision:"f63709fe0c055814b5235e27ff98ae45"},{url:"/_next/static/media/3478b6abef19b3b3-s.p.woff2",revision:"eeee8726f3b4ae9d8c710efba031ca6a"},{url:"/_next/static/media/3aa27b2eb5f698f7-s.woff2",revision:"1179dffca057f6b40e5d71311c94bd3f"},{url:"/_next/static/media/3ccf24bed29cbb82-s.woff2",revision:"5a74c5d2cf127a6c8774988f7431df51"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/684e5662d94c69e1-s.p.woff2",revision:"a1e11d00feb82d3b4f7cd3f2f7c26d34"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97b12f7b815cdf76-s.woff2",revision:"caa4a0a1120700ed2785d82baf69a108"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b6f2eee8808a2bb4-s.woff2",revision:"fd7827ded4b7d182c9710967aeb9984b"},{url:"/_next/static/media/bc2003170c651d45-s.woff2",revision:"b03ab30f8297c5c12e7746701cd1ee74"},{url:"/_next/static/media/be2416cbb012c256-s.p.woff2",revision:"d2712b7a0f090540f1308cb3ceff15a6"},{url:"/_next/static/media/d43ef4503e5571d0-s.woff2",revision:"9b04a0dd785bb71b83dd94fa3af20d71"},{url:"/_next/static/media/d607327a37a507c7-s.woff2",revision:"7ea53cc9d5ec4534e4281b9723b23786"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/ebec2867f40f78ec-s.woff2",revision:"efc6f6cd1a9d1db1ee8e37b34d6430df"},{url:"/_next/static/media/f1b810c250cac3b6-s.p.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/assets/avatarrep.svg",revision:"4277856ede8073aed18e907473ccb16b"},{url:"/assets/avatarrep2.svg",revision:"6c8076316bbe74b5b34ca5cb46462a16"},{url:"/assets/avatarrep3.svg",revision:"42ed55fd57254c4ca8e750fb808b3b3f"},{url:"/assets/brand/idlogo-default-dark.svg",revision:"b72b287391a7944409bd220aaef82763"},{url:"/assets/brand/idlogo-default-light.svg",revision:"f565500e24bc57cae2f52826f81b3e05"},{url:"/assets/brand/navigationlogo-default-dark.svg",revision:"57ef947eb72c3d4c82b0a636a860edf7"},{url:"/assets/brand/navigationlogo-default-light.svg",revision:"a15444008bc500a7f70fe6e8f9633ed2"},{url:"/assets/brand/navigationlogo-small-dark.svg",revision:"2988496d2e57ac969eaee0f66321501e"},{url:"/assets/brand/navigationlogo-small-light.svg",revision:"9be513feb04cf34e1ccf6aa2be706b5c"},{url:"/assets/community-home-page/change-community-screenshot.svg",revision:"7c1c1ceacbaf5d97d059fcfa0f24eb7a"},{url:"/assets/community-home-page/left-menu-screenshot.svg",revision:"a3597008a1f65a4b0e1432704e8d90cb"},{url:"/assets/community-home-page/manual-icon.svg",revision:"99d1181494955665822afd358d7cff80"},{url:"/assets/community-home-page/roles-screenshot.svg",revision:"6d2b9cfdb9243b230a5a9b5164f149bd"},{url:"/assets/community-home-page/support-box-heart.svg",revision:"f36be2899d56ed629224f7389b3c025f"},{url:"/assets/community-home-page/tg-filled-icon.svg",revision:"1b806891696de69b4276dc73bf85956a"},{url:"/assets/icons/apple-touch-icon-120x120-precomposed.png",revision:"a4c255fea139db3f9ed1fa8ee41d740e"},{url:"/assets/icons/apple-touch-icon-120x120.png",revision:"c1eb7682cfae37803b8c8a3f0c9023a3"},{url:"/assets/icons/apple-touch-icon-152x152-precomposed.png",revision:"f08c10a0bbd03b23e3aa2df8a7f28e58"},{url:"/assets/icons/apple-touch-icon-152x152.png",revision:"a9a10a1b6e85a906691b3ee61a81d64b"},{url:"/assets/icons/apple-touch-icon-180x180-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon-180x180.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/apple-touch-icon-60x60-precomposed.png",revision:"e1cf9f51d7b7c706b79c196b826204de"},{url:"/assets/icons/apple-touch-icon-60x60.png",revision:"85ed82806641b3de9246334d43581ad9"},{url:"/assets/icons/apple-touch-icon-76x76-precomposed.png",revision:"e6c2fdd100be720b0edceca3f9a24662"},{url:"/assets/icons/apple-touch-icon-76x76.png",revision:"5a2363031dafad468d3a52e0f3a7c1eb"},{url:"/assets/icons/apple-touch-icon-precomposed.png",revision:"8d2663ab80b84b1363da506a3dbcd2e0"},{url:"/assets/icons/apple-touch-icon.png",revision:"54938157042b9e94517bf7332e6dc7fc"},{url:"/assets/icons/favicon-16x16.png",revision:"9b9c3bae0d66acae5035e72062ed9786"},{url:"/assets/icons/favicon-32x32.png",revision:"98e18c86655c72a2ee389b5f9d9f52c7"},{url:"/assets/icons/icon-144x144.png",revision:"c8b04135f67230d873a17dbe48037192"},{url:"/assets/icons/icon-192x192.png",revision:"5b009d152da14f621c3d58bfd0d96c93"},{url:"/assets/icons/icon-256x256.png",revision:"3e9cdcfe679d8188e2b360e313160fe0"},{url:"/assets/icons/icon-36x36.png",revision:"6cba026644288af5b1c9228e5e3eb8c6"},{url:"/assets/icons/icon-384x384.png",revision:"91912f5112c359f018046cc507adc9c5"},{url:"/assets/icons/icon-48x48.png",revision:"17f1219d11082910026ded56d610e1cc"},{url:"/assets/icons/icon-512x512.png",revision:"c2f0746e098e924b2bf0017432a3059b"},{url:"/assets/icons/icon-72x72.png",revision:"1e4f074faf2f924d2552db62d792b769"},{url:"/assets/icons/icon-96x96.png",revision:"19d956b0fef5336f51aa5ddfb62aadb5"},{url:"/assets/icons/mstile-144x144.png",revision:"f3b246ca663e3872c2c5e3c2c8328f58"},{url:"/assets/icons/mstile-150x150.png",revision:"2fe7e49a8ca19dd20d406569f83b2284"},{url:"/assets/icons/mstile-310x150.png",revision:"8b8b07cce22acee6f864658edbfaa7a3"},{url:"/assets/icons/mstile-310x310.png",revision:"9dc38c0afd454e811ab5c792fe9c01b9"},{url:"/assets/icons/mstile-70x70.png",revision:"c18b9fb768c5e03f4a53a594e617d16b"},{url:"/assets/icons/safari-pinned-tab.svg",revision:"5abcd4e192369d5df81a9210f53642b7"},{url:"/assets/welcome/community-add.png",revision:"87a7310d1105e3e2fac883d679c9b082"},{url:"/assets/welcome/community.png",revision:"5539467569ca4016a37ca14c7183d1a5"},{url:"/assets/welcome/final.png",revision:"2920aab69ae54b863976213ab22265c0"},{url:"/assets/welcome/user-info.png",revision:"42b8adbdbd02b52bedb482ac39203781"},{url:"/assets/welcome/welcome-modal-image.webp",revision:"e1ae72c5df28a06b0482fd689c286f03"},{url:"/favicon-for-dark.svg",revision:"6825e74a748ef61f38418d0a77983974"},{url:"/favicon-for-light.svg",revision:"b1a97d320dba69a91e06391d5db81743"},{url:"/favicon.ico",revision:"501d94411940282fef1a69e6a8c1c0d7"},{url:"/fonts/MarkerHand-Regular.woff2",revision:"d8a496bce02f6c8cfeca582fde2f35b4"},{url:"/manifest.webmanifest",revision:"0e07ef18af0502a5ea38551e362c104a"},{url:"/test/avatar.svg",revision:"3b81fe6bbfcc5a70c922ff470c070f44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:c,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
