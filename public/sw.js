if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_OFy9IQ6CPWDUs-Rhfl7v/_buildManifest.js",revision:"0ee5c560a0958ea9bc15705acb7914ea"},{url:"/_next/static/_OFy9IQ6CPWDUs-Rhfl7v/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/_OFy9IQ6CPWDUs-Rhfl7v/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/framework-a87821de553db91d.js",revision:"a87821de553db91d"},{url:"/_next/static/chunks/main-e380ed469c5a0a07.js",revision:"e380ed469c5a0a07"},{url:"/_next/static/chunks/pages/404-98e834286ab14134.js",revision:"98e834286ab14134"},{url:"/_next/static/chunks/pages/Hola-ee0ddf74cd0c6c1b.js",revision:"ee0ddf74cd0c6c1b"},{url:"/_next/static/chunks/pages/_app-62228667db31514b.js",revision:"62228667db31514b"},{url:"/_next/static/chunks/pages/_error-0a004b8b8498208d.js",revision:"0a004b8b8498208d"},{url:"/_next/static/chunks/pages/admin/sucursales-a73a17f481dc48cc.js",revision:"a73a17f481dc48cc"},{url:"/_next/static/chunks/pages/admin/sucursales/%5Bid%5D-6c13c1a5f2ef4726.js",revision:"6c13c1a5f2ef4726"},{url:"/_next/static/chunks/pages/admin/tipo-productos-db506815bc382c86.js",revision:"db506815bc382c86"},{url:"/_next/static/chunks/pages/admin/tipo-productos/%5Bid%5D-efb6d134ea87e169.js",revision:"efb6d134ea87e169"},{url:"/_next/static/chunks/pages/admin/usuarios-93a56b9c13d35d87.js",revision:"93a56b9c13d35d87"},{url:"/_next/static/chunks/pages/admin/usuarios/%5Bid%5D-dce3ee29c7e250cd.js",revision:"dce3ee29c7e250cd"},{url:"/_next/static/chunks/pages/index-b2267e2c6f388b4f.js",revision:"b2267e2c6f388b4f"},{url:"/_next/static/chunks/pages/login-775ed14b26f9c3e5.js",revision:"775ed14b26f9c3e5"},{url:"/_next/static/chunks/pages/paquetes/%5Bid%5D-5869dcb6e711118d.js",revision:"5869dcb6e711118d"},{url:"/_next/static/chunks/pages/paquetes/estado/%5Bestado%5D-5617733026b8fa6c.js",revision:"5617733026b8fa6c"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-42cdea76c8170223.js",revision:"42cdea76c8170223"},{url:"/_next/static/css/ab29cd1441c2ccdb.css",revision:"ab29cd1441c2ccdb"},{url:"/_next/static/media/logo.209e82ea.jpg",revision:"9e9833ca92fc394853a57c3ce6c7cd27"},{url:"/favicon.ico",revision:"e66262084da252d206b0b738bdf8247c"},{url:"/icon-192x192.png",revision:"c19eff0580c7126ac91bdc6099ec5f49"},{url:"/icon-256x256.png",revision:"b0e0d40970ba486570b0261fc4b1b925"},{url:"/icon-384x384.png",revision:"f0cdc3c219babca2aa30e80396cb194f"},{url:"/icon-512x512.png",revision:"c0c3a718d1359c2803d6271baad7dd9e"},{url:"/img/logo.jpg",revision:"9e9833ca92fc394853a57c3ce6c7cd27"},{url:"/manifest.webmanifest",revision:"90d1c2bdaba1592fa067ece65da9fb02"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
