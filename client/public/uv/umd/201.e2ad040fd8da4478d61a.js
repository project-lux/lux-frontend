(self.webpackChunkUV=self.webpackChunkUV||[]).push([[201],{201:(t,e,n)=>{n.r(e),n.d(e,{ion_tabs:()=>s});const i=n(2085); const o=function(t,e,n,i){return new(n||(n=Promise))(((o,r) =>{function s(t){try{u(i.next(t))}catch(t){r(t)}}function a(t){try{u(i.throw(t))}catch(t){r(t)}}function u(t){t.done?o(t.value):new n(((e) =>{e(t.value)})).then(s,a)}u((i=i.apply(t,e||[])).next())}))}; const r=function(t,e){let n; let i; let o; let r; let s={label:0,sent(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,i=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||r[0]!==6&&r[0]!==2)){s=0;continue}if(r[0]===3&&(!o||r[1]>o[0]&&r[1]<o[3])){s.label=r[1];break}if(r[0]===6&&s.label<o[1]){s.label=o[1],o=r;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(r);break}o[2]&&s.ops.pop(),s.trys.pop();continue}r=e.call(t,s)}catch(t){r=[6,t],i=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}}; var s=function(){function t(t){const e=this;(0,i.r)(this,t),this.transitioning=!1,this.useRouter=!1,this.onTabClicked=function(t){const n=t.detail; const i=n.href; const o=n.tab;if(e.useRouter&&void 0!==i){const r=document.querySelector("ion-router");r&&r.push(i)}else e.select(o)},this.ionNavWillLoad=(0,i.c)(this,"ionNavWillLoad",7),this.ionTabsWillChange=(0,i.c)(this,"ionTabsWillChange",3),this.ionTabsDidChange=(0,i.c)(this,"ionTabsDidChange",3)}return t.prototype.componentWillLoad=function(){return o(this,void 0,void 0,(function(){let t;return r(this,(function(e){switch(e.label){case 0:return this.useRouter||(this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]")),this.useRouter?[3,2]:(t=this.tabs,[4,this.select(t[0])]);case 1:e.sent(),e.label=2;case 2:return this.ionNavWillLoad.emit(),[2]}}))}))},t.prototype.componentWillRender=function(){const t=this.el.querySelector("ion-tab-bar");if(t){const e=this.selectedTab?this.selectedTab.tab:void 0;t.selectedTab=e}},t.prototype.select=function(t){return o(this,void 0,void 0,(function(){let e;return r(this,(function(n){switch(n.label){case 0:return e=a(this.tabs,t),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,!1];case 1:return n.sent(),[4,this.notifyRouter()];case 2:return n.sent(),this.tabSwitch(),[2,!0]}}))}))},t.prototype.getTab=function(t){return o(this,void 0,void 0,(function(){return r(this,(function(e){return[2,a(this.tabs,t)]}))}))},t.prototype.getSelected=function(){return Promise.resolve(this.selectedTab?this.selectedTab.tab:void 0)},t.prototype.setRouteId=function(t){return o(this,void 0,void 0,(function(){let e; const n=this;return r(this,(function(i){switch(i.label){case 0:return e=a(this.tabs,t),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,{changed:!1,element:this.selectedTab}];case 1:return i.sent(),[2,{changed:!0,element:this.selectedTab,markVisible(){return n.tabSwitch()}}]}}))}))},t.prototype.getRouteId=function(){return o(this,void 0,void 0,(function(){let t;return r(this,(function(e){return[2,void 0!==(t=this.selectedTab&&this.selectedTab.tab)?{id:t,element:this.selectedTab}:void 0]}))}))},t.prototype.setActive=function(t){return this.transitioning?Promise.reject("transitioning already happening"):(this.transitioning=!0,this.leavingTab=this.selectedTab,this.selectedTab=t,this.ionTabsWillChange.emit({tab:t.tab}),t.setActive())},t.prototype.tabSwitch=function(){const t=this.selectedTab; const e=this.leavingTab;this.leavingTab=void 0,this.transitioning=!1,t&&e!==t&&(e&&(e.active=!1),this.ionTabsDidChange.emit({tab:t.tab}))},t.prototype.notifyRouter=function(){if(this.useRouter){const t=document.querySelector("ion-router");if(t)return t.navChanged("forward")}return Promise.resolve(!1)},t.prototype.shouldSwitch=function(t){const e=this.selectedTab;return void 0!==t&&t!==e&&!this.transitioning},Object.defineProperty(t.prototype,"tabs",{get(){return Array.from(this.el.querySelectorAll("ion-tab"))},enumerable:!0,configurable:!0}),t.prototype.render=function(){return(0,i.h)(i.H,{onIonTabButtonClick:this.onTabClicked},(0,i.h)("slot",{name:"top"}),(0,i.h)("div",{class:"tabs-inner"},(0,i.h)("slot",null)),(0,i.h)("slot",{name:"bottom"}))},Object.defineProperty(t.prototype,"el",{get(){return(0,i.d)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get(){return":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}"},enumerable:!0,configurable:!0}),t}(); var a=function(t,e){const n=typeof e==="string"?t.find(((t) =>t.tab===e)):e;return n||console.error(`tab with id: "${n}" does not exist`),n}}}]);