(self.webpackChunkUV=self.webpackChunkUV||[]).push([[1034],{1034:(t,e,r)=>{r.r(e),r.d(e,{ion_fab:()=>o});const n=r(2085); var o=function(){function t(t){const e=this;(0,n.r)(this,t),this.edge=!1,this.activated=!1,this.onClick=function(){const t=!!e.el.querySelector("ion-fab-list"); const r=e.getFab(); const n=r&&r.disabled;t&&!n&&(e.activated=!e.activated)}}return t.prototype.activatedChanged=function(){const t=this.activated; const e=this.getFab();e&&(e.activated=t),Array.from(this.el.querySelectorAll("ion-fab-list")).forEach(((e) =>{e.activated=t}))},t.prototype.componentDidLoad=function(){this.activated&&this.activatedChanged()},t.prototype.close=function(){return t=this,e=void 0,n=function(){return function(t,e){let r; let n; let o; let a; let i={label:0,sent(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||a[0]!==6&&a[0]!==2)){i=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(a[0]===6&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(t){a=[6,t],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}(this,(function(t){return this.activated=!1,[2]}))},new((r=void 0)||(r=Promise))(((o,a) =>{function i(t){try{c(n.next(t))}catch(t){a(t)}}function l(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){t.done?o(t.value):new r(((e) =>{e(t.value)})).then(i,l)}c((n=n.apply(t,e||[])).next())}));let t; let e; let r; let n},t.prototype.getFab=function(){return this.el.querySelector("ion-fab-button")},t.prototype.render=function(){let t; const e=this; const r=e.horizontal; const o=e.vertical; const a=e.edge; const i=(0,n.f)(this);return(0,n.h)(n.H,{onClick:this.onClick,class:(t={},t[i]=!0,t[`fab-horizontal-${r}`]=void 0!==r,t[`fab-vertical-${o}`]=void 0!==o,t["fab-edge"]=a,t)},(0,n.h)("slot",null))},Object.defineProperty(t.prototype,"el",{get(){return(0,n.d)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"watchers",{get(){return{activated:["activatedChanged"]}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get(){return":host{position:absolute;z-index:999}:host(.fab-horizontal-center){left:50%;margin-left:-28px}:host-context([dir=rtl]).fab-horizontal-center,:host-context([dir=rtl]):host(.fab-horizontal-center){left:unset;right:unset;right:50%}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.fab-horizontal-center){margin-left:unset;-webkit-margin-start:-28px;margin-inline-start:-28px}}:host(.fab-horizontal-start){left:calc(10px + var(--ion-safe-area-left, 0px))}:host-context([dir=rtl]).fab-horizontal-start,:host-context([dir=rtl]):host(.fab-horizontal-start){left:unset;right:unset;right:calc(10px + var(--ion-safe-area-left, 0px))}:host(.fab-horizontal-end){right:calc(10px + var(--ion-safe-area-right, 0px))}:host-context([dir=rtl]).fab-horizontal-end,:host-context([dir=rtl]):host(.fab-horizontal-end){left:unset;right:unset;left:calc(10px + var(--ion-safe-area-right, 0px))}:host(.fab-vertical-top){top:10px}:host(.fab-vertical-top.fab-edge){top:-28px}:host(.fab-vertical-bottom){bottom:10px}:host(.fab-vertical-bottom.fab-edge){bottom:-28px}:host(.fab-vertical-center){margin-top:-28px;top:50%}"},enumerable:!0,configurable:!0}),t}()}}]);