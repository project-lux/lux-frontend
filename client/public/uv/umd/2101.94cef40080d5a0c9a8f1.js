(self.webpackChunkUV=self.webpackChunkUV||[]).push([[2101],{2101:(n,t,o)=>{o.r(t),o.d(t,{ion_back_button:()=>r});const i=o(2085); const e=o(9114); var r=function(){function n(n){const t=this;(0,i.r)(this,n),this.mode=(0,i.f)(this),this.disabled=!1,this.type="button",this.onClick=function(n){return o=t,i=void 0,a=function(){let t; let o;return function(n,t){let o; let i; let e; let r; let a={label:0,sent(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function c(r){return function(c){return function(r){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(e=2&r[0]?i.return:r[0]?i.throw||((e=i.return)&&e.call(i),0):i.next)&&!(e=e.call(i,r[1])).done)return e;switch(i=0,e&&(r=[2&r[0],e.value]),r[0]){case 0:case 1:e=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,i=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!((e=(e=a.trys).length>0&&e[e.length-1])||r[0]!==6&&r[0]!==2)){a=0;continue}if(r[0]===3&&(!e||r[1]>e[0]&&r[1]<e[3])){a.label=r[1];break}if(r[0]===6&&a.label<e[1]){a.label=e[1],e=r;break}if(e&&a.label<e[2]){a.label=e[2],a.ops.push(r);break}e[2]&&a.ops.pop(),a.trys.pop();continue}r=t.call(n,a)}catch(n){r=[6,n],i=0}finally{o=e=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,c])}}}(this,(function(i){switch(i.label){case 0:return t=this.el.closest("ion-nav"),n.preventDefault(),(o=t)?[4,t.canGoBack()]:[3,2];case 1:o=i.sent(),i.label=2;case 2:return o?[2,t.pop({skipIfBusy:!0})]:[2,(0,e.o)(this.defaultHref,n,"back")]}}))},new((r=void 0)||(r=Promise))(((n,t) =>{function e(n){try{s(a.next(n))}catch(n){t(n)}}function c(n){try{s(a.throw(n))}catch(n){t(n)}}function s(t){t.done?n(t.value):new r(((n) =>{n(t.value)})).then(e,c)}s((a=a.apply(o,i||[])).next())}));let o; let i; let r; let a}}return Object.defineProperty(n.prototype,"backButtonIcon",{get(){return this.icon!=null?this.icon:i.i.get("backButtonIcon","arrow-back")},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"backButtonText",{get(){const n=this.mode==="ios"?"Back":null;return this.text!=null?this.text:i.i.get("backButtonText",n)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"hasIconOnly",{get(){return this.backButtonIcon&&!this.backButtonText},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"rippleType",{get(){return this.hasIconOnly?"unbounded":"bounded"},enumerable:!0,configurable:!0}),n.prototype.render=function(){let n; const t=this; const o=t.color; const r=t.defaultHref; const a=t.disabled; const c=t.type; const s=t.mode; const u=t.hasIconOnly; const l=t.backButtonIcon; const b=t.backButtonText; const d=void 0!==r;return(0,i.h)(i.H,{onClick:this.onClick,class:Object.assign(Object.assign({},(0,e.c)(o)),(n={},n[s]=!0,n.button=!0,n["back-button-disabled"]=a,n["back-button-has-icon-only"]=u,n["ion-activatable"]=!0,n["ion-focusable"]=!0,n["show-back-button"]=d,n))},(0,i.h)("button",{type:c,disabled:a,class:"button-native"},(0,i.h)("span",{class:"button-inner"},l&&(0,i.h)("ion-icon",{icon:l,lazy:!1}),b&&(0,i.h)("span",{class:"button-text"},b)),s==="md"&&(0,i.h)("ion-ripple-effect",{type:this.rippleType})))},Object.defineProperty(n.prototype,"el",{get(){return(0,i.d)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(n,"style",{get(){return".sc-ion-back-button-ios-h{--background:transparent;--color-focused:var(--color);--color-hover:var(--color);--icon-margin-top:0;--icon-margin-bottom:0;--icon-padding-top:0;--icon-padding-end:0;--icon-padding-bottom:0;--icon-padding-start:0;--margin-top:0;--margin-end:0;--margin-bottom:0;--margin-start:0;--min-width:auto;--min-height:auto;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--opacity:1;--ripple-color:currentColor;--transition:background-color,opacity 100ms linear;display:none;min-width:var(--min-width);min-height:var(--min-height);color:var(--color);font-family:var(--ion-font-family,inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-font-kerning:none;font-kerning:none}.ion-color.sc-ion-back-button-ios-h .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}.show-back-button.sc-ion-back-button-ios-h, .can-go-back.sc-ion-back-button-ios-h > ion-header.sc-ion-back-button-ios, .can-go-back > ion-header .sc-ion-back-button-ios-h{display:block}.back-button-disabled.sc-ion-back-button-ios-h{cursor:default;opacity:.5;pointer-events:none}.button-native.sc-ion-back-button-ios{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;min-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;opacity:var(--opacity);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native.sc-ion-back-button-ios{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner.sc-ion-back-button-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}ion-icon.sc-ion-back-button-ios{padding-left:var(--icon-padding-start);padding-right:var(--icon-padding-end);padding-top:var(--icon-padding-top);padding-bottom:var(--icon-padding-bottom);margin-left:var(--icon-margin-start);margin-right:var(--icon-margin-end);margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:inherit;font-size:var(--icon-font-size);font-weight:var(--icon-font-weight);pointer-events:none}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){ion-icon.sc-ion-back-button-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--icon-padding-start);padding-inline-start:var(--icon-padding-start);-webkit-padding-end:var(--icon-padding-end);padding-inline-end:var(--icon-padding-end);margin-left:unset;margin-right:unset;-webkit-margin-start:var(--icon-margin-start);margin-inline-start:var(--icon-margin-start);-webkit-margin-end:var(--icon-margin-end);margin-inline-end:var(--icon-margin-end)}}@media (any-hover:hover){.sc-ion-back-button-ios-h:hover .button-native.sc-ion-back-button-ios{background:var(--background-hover);color:var(--color-hover)}}.ion-focused.sc-ion-back-button-ios-h .button-native.sc-ion-back-button-ios{background:var(--background-focused);color:var(--color-focused)}@media (any-hover:hover){.ion-color.sc-ion-back-button-ios-h:hover .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}}.ion-color.ion-focused.sc-ion-back-button-ios-h .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}ion-toolbar.sc-ion-back-button-ios-h:not(.ion-color):not(.ion-color), ion-toolbar:not(.ion-color) .sc-ion-back-button-ios-h:not(.ion-color){color:var(--ion-toolbar-color,var(--color))}.sc-ion-back-button-ios-h{--background-focused:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--border-radius:4px;--color:var(--ion-color-primary,#3880ff);--icon-margin-end:-5px;--icon-margin-start:-4px;--icon-font-size:1.85em;--min-height:32px;font-size:17px}.button-native.sc-ion-back-button-ios{-webkit-transform:translateZ(0);transform:translateZ(0);overflow:visible;z-index:99}.activated.sc-ion-back-button-ios-h .button-native.sc-ion-back-button-ios{opacity:.4}@media (any-hover:hover){.sc-ion-back-button-ios-h:hover{--opacity:.6}}.ion-color.ion-focused.sc-ion-back-button-ios-h .button-native.sc-ion-back-button-ios{background:rgba(var(--ion-color-base-rgb),.1)}"},enumerable:!0,configurable:!0}),n}()},9114:(n,t,o)=>{o.d(t,{c:()=>e,g:()=>r,h:()=>i,o:()=>c});var i=function(n,t){return t.closest(n)!==null}; var e=function(n){let t;return typeof n==="string"&&n.length>0?((t={"ion-color":!0})[`ion-color-${n}`]=!0,t):void 0}; var r=function(n){const t={};return function(n){return void 0!==n?(Array.isArray(n)?n:n.split(" ")).filter(((n) =>n!=null)).map(((n) =>n.trim())).filter(((n) =>n!=="")):[]}(n).forEach(((n) =>t[n]=!0)),t}; const a=/^[a-z][a-z0-9+\-.]*:/; var c=function(n,t,o){return i=void 0,e=void 0,c=function(){let i;return function(n,t){let o; let i; let e; let r; let a={label:0,sent(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function c(r){return function(c){return function(r){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(e=2&r[0]?i.return:r[0]?i.throw||((e=i.return)&&e.call(i),0):i.next)&&!(e=e.call(i,r[1])).done)return e;switch(i=0,e&&(r=[2&r[0],e.value]),r[0]){case 0:case 1:e=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,i=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!((e=(e=a.trys).length>0&&e[e.length-1])||r[0]!==6&&r[0]!==2)){a=0;continue}if(r[0]===3&&(!e||r[1]>e[0]&&r[1]<e[3])){a.label=r[1];break}if(r[0]===6&&a.label<e[1]){a.label=e[1],e=r;break}if(e&&a.label<e[2]){a.label=e[2],a.ops.push(r);break}e[2]&&a.ops.pop(),a.trys.pop();continue}r=t.call(n,a)}catch(n){r=[6,n],i=0}finally{o=e=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,c])}}}(this,((e) =>n!=null&&n[0]!=="#"&&!a.test(n)&&(i=document.querySelector("ion-router"))?(t!=null&&t.preventDefault(),[2,i.push(n,o)]):[2,!1]))},new((r=void 0)||(r=Promise))(((n,t) =>{function o(n){try{s(c.next(n))}catch(n){t(n)}}function a(n){try{s(c.throw(n))}catch(n){t(n)}}function s(t){t.done?n(t.value):new r(((n) =>{n(t.value)})).then(o,a)}s((c=c.apply(i,e||[])).next())}));let i; let e; let r; let c}}}]);