(self.webpackChunkUV=self.webpackChunkUV||[]).push([[3045],{9292:(t,i,e)=>{e.d(i,{a:()=>n,b:()=>h,c:()=>a,d:()=>l,e:()=>c,f:()=>s,h:()=>o,i:()=>p,n:()=>u,p:()=>d,r:()=>r});var n=function(t){return typeof __zone_symbol__requestAnimationFrame==="function"?__zone_symbol__requestAnimationFrame(t):typeof requestAnimationFrame==="function"?requestAnimationFrame(t):setTimeout(t)}; var o=function(t){return!!t.shadowRoot&&!!t.attachShadow}; var s=function(t){const i=t.closest("ion-item");return i?i.querySelector("ion-label"):null}; var r=function(t,i,e,n,s){if(t||o(i)){let r=i.querySelector("input.aux-input");r||((r=i.ownerDocument.createElement("input")).type="hidden",r.classList.add("aux-input"),i.appendChild(r)),r.disabled=s,r.name=e,r.value=n||""}}; var a=function(t,i,e){return Math.max(t,Math.min(i,e))}; var h=function(t,i){if(!t){const e=`ASSERT: ${i}`;throw console.error(e),new Error(e)}}; var u=function(t){return t.timeStamp||Date.now()}; var d=function(t){if(t){const i=t.changedTouches;if(i&&i.length>0){const e=i[0];return{x:e.clientX,y:e.clientY}}if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY}}return{x:0,y:0}}; var p=function(t){const i=document.dir==="rtl";switch(t){case"start":return i;case"end":return!i;default:throw new Error(`"${t}" is not a valid value for [side]. Use "start" or "end" instead.`)}}; var l=function(t,i){const e=t._original||t;return{_original:t,emit:c(e.emit.bind(e),i)}}; var c=function(t,i){let e;return void 0===i&&(i=0),function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];clearTimeout(e),e=setTimeout.apply(void 0,[t,i].concat(n))}}},3045:(t,i,e)=>{e.r(i),e.d(i,{ion_item_sliding:()=>h});let n; const o=e(2085); const s=e(9292); const r=function(t,i,e,n){return new(e||(e=Promise))(((o,s) =>{function r(t){try{h(n.next(t))}catch(t){s(t)}}function a(t){try{h(n.throw(t))}catch(t){s(t)}}function h(t){t.done?o(t.value):new e(((i) =>{i(t.value)})).then(r,a)}h((n=n.apply(t,i||[])).next())}))}; const a=function(t,i){let e; let n; let o; let s; let r={label:0,sent(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(e)throw new TypeError("Generator is already executing.");for(;r;)try{if(e=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,n=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(!((o=(o=r.trys).length>0&&o[o.length-1])||s[0]!==6&&s[0]!==2)){r=0;continue}if(s[0]===3&&(!o||s[1]>o[0]&&s[1]<o[3])){r.label=s[1];break}if(s[0]===6&&r.label<o[1]){r.label=o[1],o=s;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(s);break}o[2]&&r.ops.pop(),r.trys.pop();continue}s=i.call(t,r)}catch(t){s=[6,t],n=0}finally{e=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}; var h=function(){function t(t){(0,o.r)(this,t),this.item=null,this.openAmount=0,this.initialOpenAmount=0,this.optsWidthRightSide=0,this.optsWidthLeftSide=0,this.sides=0,this.optsDirty=!0,this.state=2,this.disabled=!1,this.ionDrag=(0,o.c)(this,"ionDrag",7)}return t.prototype.disabledChanged=function(){this.gesture&&this.gesture.setDisabled(this.disabled)},t.prototype.connectedCallback=function(){return r(this,void 0,void 0,(function(){let t; const i=this;return a(this,(function(n){switch(n.label){case 0:return this.item=this.el.querySelector("ion-item"),[4,this.updateOptions()];case 1:return n.sent(),t=this,[4,e.e(4594).then(e.bind(e,4594))];case 2:return t.gesture=n.sent().createGesture({el:this.el,gestureName:"item-swipe",gesturePriority:100,threshold:5,canStart(){return i.canStart()},onStart(){return i.onStart()},onMove(t){return i.onMove(t)},onEnd(t){return i.onEnd(t)}}),this.disabledChanged(),[2]}}))}))},t.prototype.disconnectedCallback=function(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.item=null,this.leftOptions=this.rightOptions=void 0,n===this.el&&(n=void 0)},t.prototype.getOpenAmount=function(){return Promise.resolve(this.openAmount)},t.prototype.getSlidingRatio=function(){return Promise.resolve(this.getSlidingRatioSync())},t.prototype.open=function(t){return r(this,void 0,void 0,(function(){let i; let e; let o; const r=this;return a(this,(function(a){return this.item===null?[2]:(i=this.getOptions(t))?(void 0===t&&(t=i===this.leftOptions?"start":"end"),t=(0,s.i)(t)?"end":"start",e=this.openAmount<0,o=this.openAmount>0,e&&i===this.leftOptions||o&&i===this.rightOptions||(this.closeOpened(),this.state=4,requestAnimationFrame((() =>{r.calculateOptsWidth();const i=t==="end"?r.optsWidthRightSide:-r.optsWidthLeftSide;n=r.el,r.setOpenAmount(i,!1),r.state=t==="end"?8:16}))),[2]):[2]}))}))},t.prototype.close=function(){return r(this,void 0,void 0,(function(){return a(this,(function(t){return this.setOpenAmount(0,!0),[2]}))}))},t.prototype.closeOpened=function(){return r(this,void 0,void 0,(function(){return a(this,((t) =>void 0!==n?(n.close(),n=void 0,[2,!0]):[2,!1]))}))},t.prototype.getOptions=function(t){return void 0===t?this.leftOptions||this.rightOptions:t==="start"?this.leftOptions:this.rightOptions},t.prototype.updateOptions=function(){return r(this,void 0,void 0,(function(){let t; let i; let e; let n;return a(this,(function(o){switch(o.label){case 0:t=this.el.querySelectorAll("ion-item-options"),i=0,this.leftOptions=this.rightOptions=void 0,e=0,o.label=1;case 1:return e<t.length?[4,t.item(e).componentOnReady()]:[3,4];case 2:n=o.sent(),((0,s.i)(n.side)?"end":"start")=="start"?(this.leftOptions=n,i|=1):(this.rightOptions=n,i|=2),o.label=3;case 3:return e++,[3,1];case 4:return this.optsDirty=!0,this.sides=i,[2]}}))}))},t.prototype.canStart=function(){return n&&n!==this.el?(this.closeOpened(),!1):!(!this.rightOptions&&!this.leftOptions)},t.prototype.onStart=function(){n=this.el,void 0!==this.tmr&&(clearTimeout(this.tmr),this.tmr=void 0),this.openAmount===0&&(this.optsDirty=!0,this.state=4),this.initialOpenAmount=this.openAmount,this.item&&(this.item.style.transition="none")},t.prototype.onMove=function(t){this.optsDirty&&this.calculateOptsWidth();let i; let e=this.initialOpenAmount-t.deltaX;switch(this.sides){case 2:e=Math.max(0,e);break;case 1:e=Math.min(0,e);break;case 3:break;case 0:return;default:console.warn("invalid ItemSideFlags value",this.sides)}e>this.optsWidthRightSide?e=(i=this.optsWidthRightSide)+.55*(e-i):e<-this.optsWidthLeftSide&&(e=(i=-this.optsWidthLeftSide)+.55*(e-i)),this.setOpenAmount(e,!1)},t.prototype.onEnd=function(t){const i=t.velocityX; let e=this.openAmount>0?this.optsWidthRightSide:-this.optsWidthLeftSide; const n=this.openAmount>0==!(i<0); const o=Math.abs(i)>.3; const s=Math.abs(this.openAmount)<Math.abs(e/2);u(n,o,s)&&(e=0);const r=this.state;this.setOpenAmount(e,!0),(32&r)!=0&&this.rightOptions?this.rightOptions.fireSwipeEvent():(64&r)!=0&&this.leftOptions&&this.leftOptions.fireSwipeEvent()},t.prototype.calculateOptsWidth=function(){this.optsWidthRightSide=0,this.rightOptions&&(this.rightOptions.style.display="flex",this.optsWidthRightSide=this.rightOptions.offsetWidth,this.rightOptions.style.display=""),this.optsWidthLeftSide=0,this.leftOptions&&(this.leftOptions.style.display="flex",this.optsWidthLeftSide=this.leftOptions.offsetWidth,this.leftOptions.style.display=""),this.optsDirty=!1},t.prototype.setOpenAmount=function(t,i){const e=this;if(void 0!==this.tmr&&(clearTimeout(this.tmr),this.tmr=void 0),this.item){const o=this.item.style;if(this.openAmount=t,i&&(o.transition=""),t>0)this.state=t>=this.optsWidthRightSide+30?40:8;else{if(!(t<0))return this.tmr=setTimeout((() =>{e.state=2,e.tmr=void 0}),600),n=void 0,void(o.transform="");this.state=t<=-this.optsWidthLeftSide-30?80:16}o.transform=`translate3d(${-t}px,0,0)`,this.ionDrag.emit({amount:t,ratio:this.getSlidingRatioSync()})}},t.prototype.getSlidingRatioSync=function(){return this.openAmount>0?this.openAmount/this.optsWidthRightSide:this.openAmount<0?this.openAmount/this.optsWidthLeftSide:0},t.prototype.render=function(){let t; const i=(0,o.f)(this);return(0,o.h)(o.H,{class:(t={},t[i]=!0,t["item-sliding-active-slide"]=this.state!==2,t["item-sliding-active-options-end"]=(8&this.state)!=0,t["item-sliding-active-options-start"]=(16&this.state)!=0,t["item-sliding-active-swipe-end"]=(32&this.state)!=0,t["item-sliding-active-swipe-start"]=(64&this.state)!=0,t)})},Object.defineProperty(t.prototype,"el",{get(){return(0,o.d)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"watchers",{get(){return{disabled:["disabledChanged"]}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get(){return"ion-item-sliding{display:block;position:relative;width:100%;overflow:hidden}ion-item-sliding,ion-item-sliding .item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.item-sliding-active-slide .item{position:relative;-webkit-transition:-webkit-transform .5s cubic-bezier(.36,.66,.04,1);transition:-webkit-transform .5s cubic-bezier(.36,.66,.04,1);transition:transform .5s cubic-bezier(.36,.66,.04,1);transition:transform .5s cubic-bezier(.36,.66,.04,1),-webkit-transform .5s cubic-bezier(.36,.66,.04,1);opacity:1;z-index:2;pointer-events:none;will-change:transform}.item-sliding-active-swipe-end .item-options-end .item-option-expandable{padding-left:100%;-ms-flex-order:1;order:1;-webkit-transition-duration:.6s;transition-duration:.6s;-webkit-transition-property:padding-left;transition-property:padding-left}:host-context([dir=rtl]) .item-sliding-active-swipe-end .item-options-end .item-option-expandable,[dir=rtl] .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}.item-sliding-active-swipe-start .item-options-start .item-option-expandable{padding-right:100%;-ms-flex-order:-1;order:-1;-webkit-transition-duration:.6s;transition-duration:.6s;-webkit-transition-property:padding-right;transition-property:padding-right}:host-context([dir=rtl]) .item-sliding-active-swipe-start .item-options-start .item-option-expandable,[dir=rtl] .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}"},enumerable:!0,configurable:!0}),t}(); var u=function(t,i,e){return!i&&e||t&&i}}}]);