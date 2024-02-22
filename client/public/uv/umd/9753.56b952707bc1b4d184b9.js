"use strict";(self.webpackChunkUV=self.webpackChunkUV||[]).push([[9753],{9753:(r,t,i)=>{i.r(t),i.d(t,{ion_card:()=>e});var n=i(2085),o=i(9114),e=function(){function r(r){(0,n.r)(this,r),this.button=!1,this.type="button",this.disabled=!1,this.routerDirection="forward"}return r.prototype.isClickable=function(){return void 0!==this.href||this.button},r.prototype.renderCard=function(r){var t=this.isClickable();if(!t)return[(0,n.h)("slot",null)];var i=this.href,e=this.routerDirection,a=t?void 0===i?"button":"a":"div",s="button"===a?{type:this.type}:{download:this.download,href:this.href,rel:this.rel,target:this.target};return(0,n.h)(a,Object.assign({},s,{class:"card-native",disabled:this.disabled,onClick:function(r){return(0,o.o)(i,r,e)}}),(0,n.h)("slot",null),t&&"md"===r&&(0,n.h)("ion-ripple-effect",null))},r.prototype.render=function(){var r,t=(0,n.f)(this);return(0,n.h)(n.H,{class:Object.assign(Object.assign((r={},r[t]=!0,r),(0,o.c)(this.color)),{"card-disabled":this.disabled,"ion-activatable":this.isClickable()})},this.renderCard(t))},Object.defineProperty(r,"style",{get:function(){return".sc-ion-card-ios-h{--ion-safe-area-left:0px;--ion-safe-area-right:0px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);overflow:hidden}.ion-color.sc-ion-card-ios-h{background:var(--ion-color-base)}.ion-color.sc-ion-card-ios-h, .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-header , .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-subtitle , .sc-ion-card-ios-h.ion-color.sc-ion-card-ios-s  ion-card-title {color:var(--ion-color-contrast)}.sc-ion-card-ios-s  img {display:block;width:100%}.sc-ion-card-ios-s  ion-list {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.card-disabled.sc-ion-card-ios-h{cursor:default;opacity:.3;pointer-events:none}.card-native.sc-ion-card-ios{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;min-height:var(--min-height);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background)}.card-native.sc-ion-card-ios::-moz-focus-inner{border:0}a.sc-ion-card-ios, button.sc-ion-card-ios{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}ion-ripple-effect.sc-ion-card-ios{color:var(--ripple-color)}.sc-ion-card-ios-h{--background:var(--ion-item-background,transparent);--color:var(--ion-color-step-600,#666);margin-left:16px;margin-right:16px;margin-top:24px;margin-bottom:24px;border-radius:8px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:-webkit-transform .5s cubic-bezier(.12,.72,.29,1);transition:-webkit-transform .5s cubic-bezier(.12,.72,.29,1);transition:transform .5s cubic-bezier(.12,.72,.29,1);transition:transform .5s cubic-bezier(.12,.72,.29,1),-webkit-transform .5s cubic-bezier(.12,.72,.29,1);font-size:14px;-webkit-box-shadow:0 4px 16px rgba(0,0,0,.12);box-shadow:0 4px 16px rgba(0,0,0,.12)}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-card-ios-h{margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}.activated.sc-ion-card-ios-h{-webkit-transform:scale3d(.97,.97,1);transform:scale3d(.97,.97,1)}"},enumerable:!0,configurable:!0}),r}()},9114:(r,t,i)=>{i.d(t,{c:()=>o,g:()=>e,h:()=>n,o:()=>s});var n=function(r,t){return null!==t.closest(r)},o=function(r){var t;return"string"==typeof r&&r.length>0?((t={"ion-color":!0})["ion-color-"+r]=!0,t):void 0},e=function(r){var t={};return function(r){return void 0!==r?(Array.isArray(r)?r:r.split(" ")).filter((function(r){return null!=r})).map((function(r){return r.trim()})).filter((function(r){return""!==r})):[]}(r).forEach((function(r){return t[r]=!0})),t},a=/^[a-z][a-z0-9+\-.]*:/,s=function(r,t,i){return n=void 0,o=void 0,s=function(){var n;return function(r,t){var i,n,o,e,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return e={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function s(e){return function(s){return function(e){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,n&&(o=2&e[0]?n.return:e[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,e[1])).done)return o;switch(n=0,o&&(e=[2&e[0],o.value]),e[0]){case 0:case 1:o=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,n=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==e[0]&&2!==e[0])){a=0;continue}if(3===e[0]&&(!o||e[1]>o[0]&&e[1]<o[3])){a.label=e[1];break}if(6===e[0]&&a.label<o[1]){a.label=o[1],o=e;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(e);break}o[2]&&a.ops.pop(),a.trys.pop();continue}e=t.call(r,a)}catch(r){e=[6,r],n=0}finally{i=o=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,s])}}}(this,(function(o){return null!=r&&"#"!==r[0]&&!a.test(r)&&(n=document.querySelector("ion-router"))?(null!=t&&t.preventDefault(),[2,n.push(r,i)]):[2,!1]}))},new((e=void 0)||(e=Promise))((function(r,t){function i(r){try{c(s.next(r))}catch(r){t(r)}}function a(r){try{c(s.throw(r))}catch(r){t(r)}}function c(t){t.done?r(t.value):new e((function(r){r(t.value)})).then(i,a)}c((s=s.apply(n,o||[])).next())}));var n,o,e,s}}}]);