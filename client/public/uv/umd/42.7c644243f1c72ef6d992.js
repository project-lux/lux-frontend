(self.webpackChunkUV=self.webpackChunkUV||[]).push([[42],{9292:(t,e,r)=>{r.d(e,{a:()=>n,b:()=>c,c:()=>s,d:()=>b,e:()=>l,f:()=>a,h:()=>i,i:()=>u,n:()=>m,p:()=>f,r:()=>o});var n=function(t){return typeof __zone_symbol__requestAnimationFrame==="function"?__zone_symbol__requestAnimationFrame(t):typeof requestAnimationFrame==="function"?requestAnimationFrame(t):setTimeout(t)}; var i=function(t){return!!t.shadowRoot&&!!t.attachShadow}; var a=function(t){const e=t.closest("ion-item");return e?e.querySelector("ion-label"):null}; var o=function(t,e,r,n,a){if(t||i(e)){let o=e.querySelector("input.aux-input");o||((o=e.ownerDocument.createElement("input")).type="hidden",o.classList.add("aux-input"),e.appendChild(o)),o.disabled=a,o.name=r,o.value=n||""}}; var s=function(t,e,r){return Math.max(t,Math.min(e,r))}; var c=function(t,e){if(!t){const r=`ASSERT: ${e}`;throw console.error(r),new Error(r)}}; var m=function(t){return t.timeStamp||Date.now()}; var f=function(t){if(t){const e=t.changedTouches;if(e&&e.length>0){const r=e[0];return{x:r.clientX,y:r.clientY}}if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY}}return{x:0,y:0}}; var u=function(t){const e=document.dir==="rtl";switch(t){case"start":return e;case"end":return!e;default:throw new Error(`"${t}" is not a valid value for [side]. Use "start" or "end" instead.`)}}; var b=function(t,e){const r=t._original||t;return{_original:t,emit:l(r.emit.bind(r),e)}}; var l=function(t,e){let r;return void 0===e&&(e=0),function(){for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];clearTimeout(r),r=setTimeout.apply(void 0,[t,e].concat(n))}}},42:(t,e,r)=>{r.r(e),r.d(e,{ion_progress_bar:()=>o});const n=r(2085); const i=r(9292); const a=r(9114); var o=function(){function t(t){(0,n.r)(this,t),this.type="determinate",this.reversed=!1,this.value=0,this.buffer=1}return t.prototype.render=function(){let t; const e=this; const r=e.color; const i=e.type; const o=e.reversed; const m=e.value; const f=e.buffer; const u=n.i.getBoolean("_testing"); const b=(0,n.f)(this);return(0,n.h)(n.H,{role:"progressbar","aria-valuenow":i==="determinate"?m:null,"aria-valuemin":"0","aria-valuemax":"1",class:Object.assign(Object.assign({},(0,a.c)(r)),(t={},t[b]=!0,t[`progress-bar-${i}`]=!0,t["progress-paused"]=u,t["progress-bar-reversed"]=document.dir==="rtl"?!o:o,t))},i==="indeterminate"?s():c(m,f))},Object.defineProperty(t,"style",{get(){return':host{--background:rgba(var(--ion-color-primary-rgb,56,128,255),0.2);--progress-background:var(--ion-color-primary,#3880ff);--buffer-background:var(--background);display:block;position:relative;width:100%;contain:strict;direction:ltr;overflow:hidden}:host(.ion-color){--progress-background:var(--ion-color-base);--buffer-background:rgba(var(--ion-color-base-rgb),0.2)}:host(.progress-bar-indeterminate){background:var(--buffer-background)}.buffer-circles,.indeterminate-bar-primary,.indeterminate-bar-secondary,.progress,.progress-buffer-bar,.progress-buffer-bar:before,.progress-indeterminate{left:0;right:0;top:0;bottom:0;position:absolute;width:100%;height:100%}.progress,.progress-buffer-bar{-webkit-transform-origin:left top;transform-origin:left top;-webkit-transition:-webkit-transform .15s linear;transition:-webkit-transform .15s linear;transition:transform .15s linear;transition:transform .15s linear,-webkit-transform .15s linear}.progress,.progress-indeterminate{background:var(--progress-background);z-index:2}.progress-buffer-bar{background:#fff;z-index:1}.progress-buffer-bar:before{background:var(--buffer-background);content:""}.indeterminate-bar-primary{top:0;right:0;bottom:0;left:-145.166611%;-webkit-animation:primary-indeterminate-translate 2s linear infinite;animation:primary-indeterminate-translate 2s linear infinite}.indeterminate-bar-primary .progress-indeterminate{-webkit-animation:primary-indeterminate-scale 2s linear infinite;animation:primary-indeterminate-scale 2s linear infinite;-webkit-animation-play-state:inherit;animation-play-state:inherit}.indeterminate-bar-secondary{top:0;right:0;bottom:0;left:-54.888891%;-webkit-animation:secondary-indeterminate-translate 2s linear infinite;animation:secondary-indeterminate-translate 2s linear infinite}.indeterminate-bar-secondary .progress-indeterminate{-webkit-animation:secondary-indeterminate-scale 2s linear infinite;animation:secondary-indeterminate-scale 2s linear infinite;-webkit-animation-play-state:inherit;animation-play-state:inherit}.buffer-circles{background:radial-gradient(ellipse at center,var(--buffer-background) 0,var(--buffer-background) 30%,transparent 0) repeat-x 5px;background-size:10px 10px;z-index:0;-webkit-animation:buffering .45s linear infinite;animation:buffering .45s linear infinite}:host(.progress-bar-reversed) .progress,:host(.progress-bar-reversed) .progress-buffer-bar{-webkit-transform-origin:right top;transform-origin:right top}:host(.progress-bar-reversed) .buffer-circles,:host(.progress-bar-reversed) .indeterminate-bar-primary,:host(.progress-bar-reversed) .indeterminate-bar-secondary,:host(.progress-bar-reversed) .progress-indeterminate{animation-direction:reverse}:host(.progress-paused) .buffer-circles,:host(.progress-paused) .indeterminate-bar-primary,:host(.progress-paused) .indeterminate-bar-secondary{-webkit-animation-play-state:paused;animation-play-state:paused}@-webkit-keyframes primary-indeterminate-translate{0%{-webkit-transform:translateX(0);transform:translateX(0)}20%{-webkit-animation-timing-function:cubic-bezier(.5,0,.701732,.495819);animation-timing-function:cubic-bezier(.5,0,.701732,.495819);-webkit-transform:translateX(0);transform:translateX(0)}59.15%{-webkit-animation-timing-function:cubic-bezier(.302435,.381352,.55,.956352);animation-timing-function:cubic-bezier(.302435,.381352,.55,.956352);-webkit-transform:translateX(83.67142%);transform:translateX(83.67142%)}to{-webkit-transform:translateX(200.611057%);transform:translateX(200.611057%)}}@keyframes primary-indeterminate-translate{0%{-webkit-transform:translateX(0);transform:translateX(0)}20%{-webkit-animation-timing-function:cubic-bezier(.5,0,.701732,.495819);animation-timing-function:cubic-bezier(.5,0,.701732,.495819);-webkit-transform:translateX(0);transform:translateX(0)}59.15%{-webkit-animation-timing-function:cubic-bezier(.302435,.381352,.55,.956352);animation-timing-function:cubic-bezier(.302435,.381352,.55,.956352);-webkit-transform:translateX(83.67142%);transform:translateX(83.67142%)}to{-webkit-transform:translateX(200.611057%);transform:translateX(200.611057%)}}@-webkit-keyframes primary-indeterminate-scale{0%{-webkit-transform:scaleX(.08);transform:scaleX(.08)}36.65%{-webkit-animation-timing-function:cubic-bezier(.334731,.12482,.785844,1);animation-timing-function:cubic-bezier(.334731,.12482,.785844,1);-webkit-transform:scaleX(.08);transform:scaleX(.08)}69.15%{-webkit-animation-timing-function:cubic-bezier(.06,.11,.6,1);animation-timing-function:cubic-bezier(.06,.11,.6,1);-webkit-transform:scaleX(.661479);transform:scaleX(.661479)}to{-webkit-transform:scaleX(.08);transform:scaleX(.08)}}@keyframes primary-indeterminate-scale{0%{-webkit-transform:scaleX(.08);transform:scaleX(.08)}36.65%{-webkit-animation-timing-function:cubic-bezier(.334731,.12482,.785844,1);animation-timing-function:cubic-bezier(.334731,.12482,.785844,1);-webkit-transform:scaleX(.08);transform:scaleX(.08)}69.15%{-webkit-animation-timing-function:cubic-bezier(.06,.11,.6,1);animation-timing-function:cubic-bezier(.06,.11,.6,1);-webkit-transform:scaleX(.661479);transform:scaleX(.661479)}to{-webkit-transform:scaleX(.08);transform:scaleX(.08)}}@-webkit-keyframes secondary-indeterminate-translate{0%{-webkit-animation-timing-function:cubic-bezier(.15,0,.515058,.409685);animation-timing-function:cubic-bezier(.15,0,.515058,.409685);-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-animation-timing-function:cubic-bezier(.31033,.284058,.8,.733712);animation-timing-function:cubic-bezier(.31033,.284058,.8,.733712);-webkit-transform:translateX(37.651913%);transform:translateX(37.651913%)}48.35%{-webkit-animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);-webkit-transform:translateX(84.386165%);transform:translateX(84.386165%)}to{-webkit-transform:translateX(160.277782%);transform:translateX(160.277782%)}}@keyframes secondary-indeterminate-translate{0%{-webkit-animation-timing-function:cubic-bezier(.15,0,.515058,.409685);animation-timing-function:cubic-bezier(.15,0,.515058,.409685);-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-animation-timing-function:cubic-bezier(.31033,.284058,.8,.733712);animation-timing-function:cubic-bezier(.31033,.284058,.8,.733712);-webkit-transform:translateX(37.651913%);transform:translateX(37.651913%)}48.35%{-webkit-animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);-webkit-transform:translateX(84.386165%);transform:translateX(84.386165%)}to{-webkit-transform:translateX(160.277782%);transform:translateX(160.277782%)}}@-webkit-keyframes secondary-indeterminate-scale{0%{-webkit-animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);-webkit-transform:scaleX(.08);transform:scaleX(.08)}19.15%{-webkit-animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);-webkit-transform:scaleX(.457104);transform:scaleX(.457104)}44.15%{-webkit-animation-timing-function:cubic-bezier(.257759,-.003163,.211762,1.38179);animation-timing-function:cubic-bezier(.257759,-.003163,.211762,1.38179);-webkit-transform:scaleX(.72796);transform:scaleX(.72796)}to{-webkit-transform:scaleX(.08);transform:scaleX(.08)}}@keyframes secondary-indeterminate-scale{0%{-webkit-animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);-webkit-transform:scaleX(.08);transform:scaleX(.08)}19.15%{-webkit-animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);-webkit-transform:scaleX(.457104);transform:scaleX(.457104)}44.15%{-webkit-animation-timing-function:cubic-bezier(.257759,-.003163,.211762,1.38179);animation-timing-function:cubic-bezier(.257759,-.003163,.211762,1.38179);-webkit-transform:scaleX(.72796);transform:scaleX(.72796)}to{-webkit-transform:scaleX(.08);transform:scaleX(.08)}}@-webkit-keyframes buffering{to{-webkit-transform:translateX(-10px);transform:translateX(-10px)}}@keyframes buffering{to{-webkit-transform:translateX(-10px);transform:translateX(-10px)}}:host{height:3px}'},enumerable:!0,configurable:!0}),t}(); var s=function(){return[(0,n.h)("div",{class:"indeterminate-bar-primary"},(0,n.h)("span",{class:"progress-indeterminate"})),(0,n.h)("div",{class:"indeterminate-bar-secondary"},(0,n.h)("span",{class:"progress-indeterminate"}))]}; var c=function(t,e){const r=(0,i.c)(0,t,1); const a=(0,i.c)(0,e,1);return[(0,n.h)("div",{class:"progress",style:{transform:`scaleX(${r})`}}),a!==1&&(0,n.h)("div",{class:"buffer-circles"}),(0,n.h)("div",{class:"progress-buffer-bar",style:{transform:`scaleX(${a})`}})]}},9114:(t,e,r)=>{r.d(e,{c:()=>i,g:()=>a,h:()=>n,o:()=>s});var n=function(t,e){return e.closest(t)!==null}; var i=function(t){let e;return typeof t==="string"&&t.length>0?((e={"ion-color":!0})[`ion-color-${t}`]=!0,e):void 0}; var a=function(t){const e={};return function(t){return void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter(((t) =>t!=null)).map(((t) =>t.trim())).filter(((t) =>t!=="")):[]}(t).forEach(((t) =>e[t]=!0)),e}; const o=/^[a-z][a-z0-9+\-.]*:/; var s=function(t,e,r){return n=void 0,i=void 0,s=function(){let n;return function(t,e){let r; let n; let i; let a; let o={label:0,sent(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||a[0]!==6&&a[0]!==2)){o=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(a[0]===6&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(t){a=[6,t],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(this,((i) =>t!=null&&t[0]!=="#"&&!o.test(t)&&(n=document.querySelector("ion-router"))?(e!=null&&e.preventDefault(),[2,n.push(t,r)]):[2,!1]))},new((a=void 0)||(a=Promise))(((t,e) =>{function r(t){try{c(s.next(t))}catch(t){e(t)}}function o(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){e.done?t(e.value):new a(((t) =>{t(e.value)})).then(r,o)}c((s=s.apply(n,i||[])).next())}));let n; let i; let a; let s}}}]);