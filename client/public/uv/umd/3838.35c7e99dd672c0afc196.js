(self.webpackChunkUV=self.webpackChunkUV||[]).push([[3838],{5318:(n,t,e)=>{e.d(t,{m:()=>f});const r=e(2974); const i=function(n,t,e,r){return new(e||(e=Promise))(((i,o) =>{function u(n){try{a(r.next(n))}catch(n){o(n)}}function c(n){try{a(r.throw(n))}catch(n){o(n)}}function a(n){n.done?i(n.value):new e(((t) =>{t(n.value)})).then(u,c)}a((r=r.apply(n,t||[])).next())}))}; const o=function(n,t){let e; let r; let i; let o; let u={label:0,sent(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||o[0]!==6&&o[0]!==2)){u=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(o[0]===6&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=t.call(n,u)}catch(n){o=[6,n],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}; const u=void 0; const c=function(){return(0,r.c)().easing("cubic-bezier(0.0, 0.0, 0.2, 1)").duration(300)}; const a=function(n){let t; let e; const i=n.width+8; const o=(0,r.c)(); const u=(0,r.c)();return n.isEndSide?(t=`${i}px`,e="0px"):(t=`${-i}px`,e="0px"),o.addElement(n.menuInnerEl).fromTo("transform",`translateX(${t})`,`translateX(${e})`),u.addElement(n.backdropEl).fromTo("opacity",.01,.32),c().addAnimation([o,u])}; const s=function(n){let t; let e; const i=n.width;n.isEndSide?(t=`${-i}px`,e=`${i}px`):(t=`${i}px`,e=`${-i}px`);const o=(0,r.c)().addElement(n.menuInnerEl).fromTo("transform",`translateX(${e})`,"translateX(0px)"); const u=(0,r.c)().addElement(n.contentEl).fromTo("transform","translateX(0px)",`translateX(${t})`); const a=(0,r.c)().addElement(n.backdropEl).fromTo("opacity",.01,.32);return c().addAnimation([o,a,u])}; const l=function(n){const t=`${n.width*(n.isEndSide?-1:1)}px`; const e=(0,r.c)().addElement(n.contentEl).fromTo("transform","translateX(0px)",`translateX(${t})`);return c().addAnimation(e)}; var f=function(){const n=new Map; const t=[]; const e=function(n){return i(u,void 0,void 0,(function(){let e; let r;return o(this,((i) =>{switch(i.label){case 0:return[4,h()];case 1:return i.sent(),n==="start"||n==="end"?(e=v(((t) =>t.side===n&&!t.disabled)))?[2,e]:[2,v(((t) =>t.side===n))]:n!=null?[2,v(((t) =>t.menuId===n))]:(r=v(((n) =>!n.disabled)))?[2,r]:[2,t.length>0?t[0].el:void 0]}}))}))}; const r=function(){return i(u,void 0,void 0,(function(){return o(this,((n) =>{switch(n.label){case 0:return[4,h()];case 1:return n.sent(),[2,d()]}}))}))}; const c=function(t,e){n.set(t,e)}; const f=function(n){const e=n.side;t.filter(((t) =>t.side===e&&t!==n)).forEach(((n) =>n.disabled=!0))}; var d=function(){return v(((n) =>n._isOpen))}; const p=function(){return t.some(((n) =>n.isAnimating))}; var v=function(n){const e=t.find(n);if(void 0!==e)return e.el}; var h=function(){return Promise.all(Array.from(document.querySelectorAll("ion-menu")).map(((n) =>n.componentOnReady())))};return c("reveal",l),c("push",s),c("overlay",a),{registerAnimation:c,get:e,getMenus(){return i(u,void 0,void 0,(function(){return o(this,((n) =>{switch(n.label){case 0:return[4,h()];case 1:return n.sent(),[2,t.map(((n) =>n.el))]}}))}))},getOpen:r,isEnabled(n){return i(u,void 0,void 0,(function(){let t;return o(this,((r) =>{switch(r.label){case 0:return[4,e(n)];case 1:return(t=r.sent())?[2,!t.disabled]:[2,!1]}}))}))},swipeGesture(n,t){return i(u,void 0,void 0,(function(){let r;return o(this,((i) =>{switch(i.label){case 0:return[4,e(t)];case 1:return(r=i.sent())&&(r.swipeGesture=n),[2,r]}}))}))},isAnimating(){return i(u,void 0,void 0,(function(){return o(this,((n) =>{switch(n.label){case 0:return[4,h()];case 1:return n.sent(),[2,p()]}}))}))},isOpen(n){return i(u,void 0,void 0,(function(){let t;return o(this,((i) =>{switch(i.label){case 0:return n==null?[3,2]:[4,e(n)];case 1:return[2,void 0!==(t=i.sent())&&t.isOpen()];case 2:return[4,r()];case 3:return[2,void 0!==(t=i.sent())]}}))}))},enable(n,t){return i(u,void 0,void 0,(function(){let r;return o(this,((i) =>{switch(i.label){case 0:return[4,e(t)];case 1:return(r=i.sent())&&(r.disabled=!n),[2,r]}}))}))},toggle(n){return i(u,void 0,void 0,(function(){let t;return o(this,((r) =>{switch(r.label){case 0:return[4,e(n)];case 1:return(t=r.sent())?[2,t.toggle()]:[2,!1]}}))}))},close(n){return i(u,void 0,void 0,(function(){let t;return o(this,((i) =>{switch(i.label){case 0:return[4,void 0!==n?e(n):r()];case 1:return void 0!==(t=i.sent())?[2,t.close()]:[2,!1]}}))}))},open(n){return i(u,void 0,void 0,(function(){let t;return o(this,((r) =>{switch(r.label){case 0:return[4,e(n)];case 1:return(t=r.sent())?[2,t.open()]:[2,!1]}}))}))},_getOpenSync:d,_createAnimation(t,e){const r=n.get(t);if(!r)throw new Error("animation not registered");return r(e)},_register(n){t.indexOf(n)<0&&(n.disabled||f(n),t.push(n))},_unregister(n){const e=t.indexOf(n);e>-1&&t.splice(e,1)},_setOpen(n,t,e){return i(u,void 0,void 0,(function(){let i;return o(this,((o) =>{switch(o.label){case 0:return p()?[2,!1]:t?[4,r()]:[3,3];case 1:return(i=o.sent())&&n.el!==i?[4,i.setOpen(!1,!1)]:[3,3];case 2:o.sent(),o.label=3;case 3:return[2,n._setOpen(t,e)]}}))}))},_setActiveMenu:f}}()},3838:(n,t,e)=>{e.r(t),e.d(t,{ion_menu_controller:()=>o});const r=e(2085); const i=e(5318); var o=function(){function n(n){(0,r.r)(this,n)}return n.prototype.open=function(n){return i.m.open(n)},n.prototype.close=function(n){return i.m.close(n)},n.prototype.toggle=function(n){return i.m.toggle(n)},n.prototype.enable=function(n,t){return i.m.enable(n,t)},n.prototype.swipeGesture=function(n,t){return i.m.swipeGesture(n,t)},n.prototype.isOpen=function(n){return i.m.isOpen(n)},n.prototype.isEnabled=function(n){return i.m.isEnabled(n)},n.prototype.get=function(n){return i.m.get(n)},n.prototype.getOpen=function(){return i.m.getOpen()},n.prototype.getMenus=function(){return i.m.getMenus()},n.prototype.isAnimating=function(){return i.m.isAnimating()},n.prototype.registerAnimation=function(n,t){return e=this,r=void 0,u=function(){return function(n,t){let e; let r; let i; let o; let u={label:0,sent(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||o[0]!==6&&o[0]!==2)){u=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(o[0]===6&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=t.call(n,u)}catch(n){o=[6,n],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}(this,((e) =>[2,i.m.registerAnimation(n,t)]))},new((o=void 0)||(o=Promise))(((n,t) =>{function i(n){try{a(u.next(n))}catch(n){t(n)}}function c(n){try{a(u.throw(n))}catch(n){t(n)}}function a(t){t.done?n(t.value):new o(((n) =>{n(t.value)})).then(i,c)}a((u=u.apply(e,r||[])).next())}));let e; let r; let o; let u},n}()}}]);