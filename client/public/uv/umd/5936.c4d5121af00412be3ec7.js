(self.webpackChunkUV=self.webpackChunkUV||[]).push([[5936],{1491:(e,t,n)=>{n.d(t,{a:()=>N,b:()=>oe,c:()=>ie,g:()=>ae,h:()=>T,r:()=>d});let r; const o=(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(const n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},r(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}); let i=0; let a=!1; const l=window; const s=document; const u={$flags$:0,$resourcesUrl$:"",jmp(e){return e()},raf(e){return requestAnimationFrame(e)},ael(e,t,n,r){return e.addEventListener(t,n,r)},rel(e,t,n,r){return e.removeEventListener(t,n,r)}}; const c=function(){let e=!1;try{s.addEventListener("e",null,Object.defineProperty({},"passive",{get(){e=!0}}))}catch(e){}return e}(); const $=function(){try{return new CSSStyleSheet,!0}catch(e){}return!1}(); const f=new WeakMap; const h=function(e){return f.get(e)}; var d=function(e,t){return f.set(t.$lazyInstance$=e,t)}; const p=function(e,t){return t in e}; const m=function(e){return console.error(e)}; const v=new Map; const g=new Map; const y=[]; const b=[]; const w=[]; const S=function(e,t){return function(n){e.push(n),a||(a=!0,t&&4&u.$flags$?R(L):u.raf(L))}}; const E=function(e,t){for(var n=0,r=0;n<e.length&&(r=performance.now())<t;)try{e[n++](r)}catch(e){m(e)}n===e.length?e.length=0:n!==0&&e.splice(0,n)}; var L=function(){i++,function(e){for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){m(e)}e.length=0}(y);const e=(6&u.$flags$)==2?performance.now()+10*Math.ceil(i*(1/22)):1/0;E(b,e),E(w,e),b.length>0&&(w.push.apply(w,b),b.length=0),(a=y.length+b.length+w.length>0)?u.raf(L):i=0}; var R=function(e){return Promise.resolve().then(e)}; const k=S(b,!0); const P={}; const x=function(e){return(e=typeof e)=="object"||e==="function"}; var N=function(){return l.CSS&&l.CSS.supports&&l.CSS.supports("color","var(--c)")?Promise.resolve():n.e(74).then(n.t.bind(n,74,23)).then((() =>{if(u.$cssShim$=l.__stencil_cssshim,u.$cssShim$)return u.$cssShim$.initShim()}))}; const j="hydrated"; const C=function(e,t){return void 0===t&&(t=""),function(){}}; const _=new WeakMap; const M=function(e,t,n){const r=C(0,t.$tagName$);!function(e,t,n,r){let o=O(t.$tagName$); const i=g.get(o);if(e=e.nodeType===11?e:s,i)if(typeof i==="string"){e=e.head||e;let a=_.get(e); let l=void 0;if(a||_.set(e,a=new Set),!a.has(o)){if(u.$cssShim$){const c=(l=u.$cssShim$.createHostStyle(r,o,i,!!(10&t.$flags$)))["s-sc"];c&&(o=c,a=null)}else(l=s.createElement("style")).innerHTML=i;e.insertBefore(l,e.querySelector("link")),a&&a.add(o)}}else e.adoptedStyleSheets.includes(i)||(e.adoptedStyleSheets=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;const r=Array(e); let o=0;for(t=0;t<n;t++)for(let i=arguments[t],a=0,l=i.length;a<l;a++,o++)r[o]=i[a];return r}(e.adoptedStyleSheets,[i]))}(e.getRootNode(),t,0,e),r()}; var O=function(e,t){return`sc-${e}`}; var T=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];let o=null; let i=!1; let a=!1; const l=[]; const s=function(t){for(let n=0;n<t.length;n++)o=t[n],Array.isArray(o)?s(o):o!=null&&typeof o!=="boolean"&&((i=typeof e!=="function"&&!x(o))&&(o=String(o)),i&&a?l[l.length-1].$text$+=o:l.push(i?I(null,o):o),a=i)};if(s(n),t){const u=t.className||t.class;u&&(t.class=typeof u!=="object"?u:Object.keys(u).filter(((e) =>u[e])).join(" "))}const c=I(e,null);return c.$attrs$=t,l.length>0&&(c.$children$=l),c}; var I=function(e,t){return{$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null,$attrs$:null}}; const H={}; const A=function(e,t,n,r,o,i){if(n!==r){let a=p(e,t); const s=t.toLowerCase();if(t==="class"){const c=e.classList; const $=U(n); const f=U(r);c.remove.apply(c,$.filter(((e) =>e&&!f.includes(e)))),c.add.apply(c,f.filter(((e) =>e&&!$.includes(e))))}else if(t==="ref")r&&r(e);else if(a||t[0]!=="o"||t[1]!=="n"){const h=x(r);if((a||h&&r!==null)&&!o)try{if(e.tagName.includes("-"))e[t]=r;else{const d=r==null?"":r;t==="list"?a=!1:n!=null&&e[t]==d||(e[t]=d)}}catch(e){}r==null||!1===r?e.removeAttribute(t):(!a||4&i||o)&&!h&&(r=!0===r?"":r,e.setAttribute(t,r))}else t=t[2]==="-"?t.slice(3):p(l,s)?s.slice(2):s[2]+t.slice(3),n&&u.rel(e,t,n,!1),r&&u.ael(e,t,r,!1)}}; const q=/\s/; var U=function(e){return e?e.split(q):[]}; const z=function(e,t,n,r){const o=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$; const i=e&&e.$attrs$||P; const a=t.$attrs$||P;for(r in i)r in a||A(o,r,i[r],void 0,n,t.$flags$);for(r in a)A(o,r,i[r],a[r],n,t.$flags$)}; const B=function(e,t,n,r){let o; let i; const a=t.$children$[n]; let l=0;if(a.$text$!==null)o=a.$elm$=s.createTextNode(a.$text$);else if(o=a.$elm$=s.createElement(a.$tag$),z(null,a,!1),a.$children$)for(l=0;l<a.$children$.length;++l)(i=B(e,a,l))&&o.appendChild(i);return o}; const W=function(e,t,n,r,o,i){for(var a,l=e;o<=i;++o)r[o]&&(a=B(null,n,o))&&(r[o].$elm$=a,l.insertBefore(a,t))}; const V=function(e,t,n,r,o){for(;t<=n;++t)(r=e[t])&&(o=r.$elm$,G(r),o.remove())}; const D=function(e,t){return e.$tag$===t.$tag$}; const F=function(e,t){const n=t.$elm$=e.$elm$; const r=e.$children$; const o=t.$children$;t.$text$===null?(z(e,t,!1),r!==null&&o!==null?function(e,t,n,r){for(var o,i=0,a=0,l=t.length-1,s=t[0],u=t[l],c=r.length-1,$=r[0],f=r[c];i<=l&&a<=c;)s==null?s=t[++i]:u==null?u=t[--l]:$==null?$=r[++a]:f==null?f=r[--c]:D(s,$)?(F(s,$),s=t[++i],$=r[++a]):D(u,f)?(F(u,f),u=t[--l],f=r[--c]):D(s,f)?(F(s,f),e.insertBefore(s.$elm$,u.$elm$.nextSibling),s=t[++i],f=r[--c]):D(u,$)?(F(u,$),e.insertBefore(u.$elm$,s.$elm$),u=t[--l],$=r[++a]):(o=B(t&&t[a],n,a),$=r[++a],o&&s.$elm$.parentNode.insertBefore(o,s.$elm$));i>l?W(e,r[c+1]==null?null:r[c+1].$elm$,n,r,a,c):a>c&&V(t,i,l)}(n,r,t,o):o!==null?(e.$text$!==null&&(n.textContent=""),W(n,null,t,o,0,o.length-1)):r!==null&&V(r,0,r.length-1)):e.$text$!==t.$text$&&(n.data=t.$text$)}; var G=function(e){e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null),e.$children$&&e.$children$.forEach(G)}; const K=function(e,t){t&&!e.$onRenderResolve$&&t["s-p"].push(new Promise(((t) =>e.$onRenderResolve$=t)))}; const Q=function(e,t,n,r){if(t.$flags$|=16,!(4&t.$flags$)){const o=C(0,n.$tagName$); const i=t.$ancestorComponent$; const a=t.$lazyInstance$; const l=function(){return J(e,t,n,a,r)};return K(t,i),r&&(t.$flags$|=256,t.$queuedListeners$&&(t.$queuedListeners$.forEach(((e) =>{const t=e[0]; const n=e[1];return Z(a,t,n)})),t.$queuedListeners$=null)),o(),ee(void 0,(() =>k(l)))}t.$flags$|=512}; var J=function(e,t,n,r,o){const i=C(0,n.$tagName$); const a=e["s-rc"];o&&M(e,n,t.$modeName$);const l=C(0,n.$tagName$);try{!function(e,t,n,r){let o; const i=t.$vnode$||I(null,null); const a=(o=r)&&o.$tag$===H?r:T(null,null,r);a.$tag$=null,a.$flags$|=4,t.$vnode$=a,a.$elm$=i.$elm$=e,F(i,a)}(e,t,0,r.render())}catch(e){m(e)}u.$cssShim$&&u.$cssShim$.updateHost(e),t.$flags$&=-17,t.$flags$|=2,a&&(a.forEach(((e) =>e())),e["s-rc"]=void 0),l(),i();const s=e["s-p"]; const c=function(){return X(e,t,n)};s.length===0?c():(Promise.all(s).then(c),t.$flags$|=4,s.length=0)}; var X=function(e,t,n){const r=C(0,n.$tagName$); const o=t.$lazyInstance$; const i=t.$ancestorComponent$;64&t.$flags$?(Z(o,"componentDidUpdate"),r()):(t.$flags$|=64,e.classList.add(j),r(),t.$onReadyResolve$(e),i||Y()),t.$onInstanceResolve$(e),t.$onRenderResolve$&&(t.$onRenderResolve$(),t.$onRenderResolve$=void 0),512&t.$flags$&&R((() =>Q(e,t,n,!1))),t.$flags$&=-517}; var Y=function(e){s.documentElement.classList.add(j),u.$flags$|=2}; var Z=function(e,t,n){if(e&&e[t])try{return e[t](n)}catch(e){m(e)}}; var ee=function(e,t){return e&&e.then?e.then(t):t()}; const te=function(e,t,n){if(t.$members$){const r=Object.entries(t.$members$); const o=e.prototype;if(r.forEach(((e) =>{const r=e[0]; const i=e[1][0];31&i||2&n&&32&i?Object.defineProperty(o,r,{get(){return e=r,h(this).$instanceValues$.get(e);let e},set(e){!function(e,t,n,r){let o; let i; const a=h(e); const l=a.$hostElement$; const s=a.$instanceValues$.get(t); const u=a.$flags$; const c=a.$lazyInstance$;o=n,i=r.$members$[t][0],(n=o==null||x(o)?o:4&i?o!=="false"&&(o===""||!!o):2&i?parseFloat(o):1&i?String(o):o)===s||8&u&&void 0!==s||(a.$instanceValues$.set(t,n),c&&(18&u)==2&&Q(l,a,r,!1))}(this,r,e,t)},configurable:!0,enumerable:!0}):1&n&&64&i&&Object.defineProperty(o,r,{value(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];const n=h(this);return n.$onInstancePromise$.then((() =>{let t;return(t=n.$lazyInstance$)[r].apply(t,e)}))}})})),1&n){const i=new Map;o.attributeChangedCallback=function(e,t,n){const r=this;u.jmp((() =>{const t=i.get(e);r[t]=(n!==null||typeof r[t]!=="boolean")&&n}))},e.observedAttributes=r.filter(((e) =>(e[0],15&e[1][0]))).map(((e) =>{const t=e[0]; const n=e[1][1]||t;return i.set(n,t),n}))}}return e}; const ne=function(e,t,r,o,i){return a=void 0,l=void 0,u=function(){let o; let a; let l; let s; let u; let c; let f;return function(e,t){let n; let r; let o; let i; let a={label:0,sent(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||i[0]!==6&&i[0]!==2)){a=0;continue}if(i[0]===3&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(i[0]===6&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}(this,((h) =>{switch(h.label){case 0:return (32&t.$flags$)!=0?[3,3]:(t.$flags$|=32,i=function(e,t,r){const o=e.$tagName$.replace(/-/g,"_"); const i=e.$lazyBundleIds$; const a=v.get(i);return a?a[o]:n(5772)(`./${i}.entry.js`).then(((e) =>(v.set(i,e),e[o])),m)}(r),i.then?(o=function(){},[4,i]):[3,2]);case 1:i=h.sent(),o(),h.label=2;case 2:i.isProxied||(te(i,r,2),i.isProxied=!0),a=C(0,r.$tagName$),t.$flags$|=8;try{new i(t)}catch(e){m(e)}t.$flags$&=-9,a(),l=O(r.$tagName$),!g.has(l)&&i.style&&(s=C(0,r.$tagName$),u=i.style,function(e,t,n){let r=g.get(e);$&&n?(r=r||new CSSStyleSheet).replace(t):r=t,g.set(e,r)}(l,u,!!(1&r.$flags$)),s()),h.label=3;case 3:return c=t.$ancestorComponent$,f=function(){return Q(e,t,r,!0)},c&&c["s-rc"]?c["s-rc"].push(f):f(),[2]}}))},new((s=void 0)||(s=Promise))(((e,t) =>{function n(e){try{o(u.next(e))}catch(e){t(e)}}function r(e){try{o(u.throw(e))}catch(e){t(e)}}function o(t){let o;t.done?e(t.value):(o=t.value,o instanceof s?o:new s(((e) =>{e(o)}))).then(n,r)}o((u=u.apply(a,l||[])).next())}));let a; let l; let s; let u}; const re=function(e,t){if((1&u.$flags$)==0){const n=C(0,t.$tagName$); const r=h(e);if(t.$listeners$&&(r.$rmListeners$=function(e,t,n){t.$queuedListeners$=t.$queuedListeners$||[];const r=n.map(((n) =>{const r=n[0]; const o=n[1]; const i=n[2]; const a=function(e,t){return 8&t?l:e}(e,r); const s=function(e,t){return function(n){256&e.$flags$?e.$lazyInstance$[t](n):e.$queuedListeners$.push([t,n])}}(t,i); const $=function(e){return c?{passive:(1&e)!=0,capture:(2&e)!=0}:(2&e)!=0}(r);return u.ael(a,o,s,$),function(){return u.rel(a,o,s,$)}}));return function(){return r.forEach(((e) =>e()))}}(e,r,t.$listeners$)),!(1&r.$flags$)){r.$flags$|=1;for(let o=e;o=o.parentNode||o.host;)if(o["s-p"]){K(r,r.$ancestorComponent$=o);break}t.$members$&&Object.entries(t.$members$).forEach(((t) =>{const n=t[0];if(31&t[1][0]&&e.hasOwnProperty(n)){const r=e[n];delete e[n],e[n]=r}})),R((() =>ne(e,r,t)))}n()}}; var oe=function(e,t){void 0===t&&(t={});let n; const r=C(); const i=[]; const a=t.exclude||[]; const c=s.head; const $=l.customElements; const d=c.querySelector("meta[charset]"); const p=s.createElement("style"); const m=[]; let v=!0;Object.assign(u,t),u.$resourcesUrl$=new URL(t.resourcesUrl||"./",s.baseURI).href,t.syncQueue&&(u.$flags$|=4),e.forEach(((e) =>e[1].forEach(((t) =>{const r={$flags$:t[0],$tagName$:t[1],$members$:t[2],$listeners$:t[3]};r.$members$=t[2],r.$listeners$=t[3];const l=r.$tagName$; const s=function(e){function t(t){let n; let r; const o=e.call(this,t)||this;return(r={$flags$:0,$hostElement$:n=t=o,$instanceValues$:new Map}).$onInstancePromise$=new Promise(((e) =>r.$onInstanceResolve$=e)),r.$onReadyPromise$=new Promise(((e) =>r.$onReadyResolve$=e)),n["s-p"]=[],n["s-rc"]=[],f.set(n,r),o}return o(t,e),t.prototype.connectedCallback=function(){const e=this;n&&(clearTimeout(n),n=null),v?m.push(this):u.jmp((() =>re(e,r)))},t.prototype.disconnectedCallback=function(){const e=this;u.jmp((() =>function(e){if((1&u.$flags$)==0){const t=h(e);t.$rmListeners$&&(t.$rmListeners$(),t.$rmListeners$=void 0),u.$cssShim$&&u.$cssShim$.removeHost(e)}}(e)))},t.prototype["s-hmr"]=function(e){},t.prototype.forceUpdate=function(){!function(e,t){const n=h(e);(18&n.$flags$)==2&&Q(e,n,t,!1)}(this,r)},t.prototype.componentOnReady=function(){return h(this).$onReadyPromise$},t}(HTMLElement);r.$lazyBundleIds$=e[0],a.includes(l)||$.get(l)||(i.push(l),$.define(l,te(s,r,1)))})))),p.innerHTML=`${i}{visibility:hidden}.hydrated{visibility:inherit}`,p.setAttribute("data-styles",""),c.insertBefore(p,d?d.nextSibling:c.firstChild),v=!1,m.length>0?m.forEach(((e) =>e.connectedCallback())):u.jmp((() =>n=setTimeout(Y,30,"timeout"))),r()}; var ie=function(e,t,n){const r=ae(e);return{emit(e){return r.dispatchEvent(new CustomEvent(t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e}))}}}; var ae=function(e){return h(e).$hostElement$}},5936:(e,t,n)=>{function r(){const e=window; const t=[];return e.customElements&&(!e.Element||e.Element.prototype.closest&&e.Element.prototype.matches&&e.Element.prototype.remove)||t.push(n.e(4646).then(n.t.bind(n,4646,23))),typeof Object.assign==="function"&&Object.entries&&Array.prototype.find&&Array.prototype.includes&&String.prototype.startsWith&&String.prototype.endsWith&&(!e.NodeList||e.NodeList.prototype.forEach)&&e.fetch&&function(){try{const e=new URL("b","http://a");return e.pathname="c%20d",e.href==="http://a/c%20d"&&e.searchParams}catch(e){return!1}}()&&typeof WeakMap!=="undefined"||t.push(n.e(8941).then(n.t.bind(n,8941,23))),Promise.all(t)}n.d(t,{m:()=>r,q:()=>i});const o=n(1491); var i=function(e,t){return(0,o.a)().then((() =>{(0,o.b)([["uv-ebook-reader_2",[[0,"uv-ebook-reader",{width:[1],height:[1],mobileWidth:[2,"mobile-width"],minSpreadWidth:[2,"min-spread-width"],_bookPath:[32],_bookReady:[32],_prevEnabled:[32],_mobile:[32],_nextEnabled:[32],_showDivider:[32],load:[64],resize:[64],display:[64],getBook:[64]},[[8,"keydown","handleKeyDown"]]],[0,"uv-ebook-toc",{toc:[16],selected:[1025],disabled:[4]}]]]],t)}))};!function(){if(void 0!==window.Reflect&&void 0!==window.customElements){const e=HTMLElement;window.HTMLElement=function(){return Reflect.construct(e,[],this.constructor)},HTMLElement.prototype=e.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,e)}}()}}]);