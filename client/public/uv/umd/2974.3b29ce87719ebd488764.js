(self.webpackChunkUV=self.webpackChunkUV||[]).push([[2974],{2974:(n,t,i)=>{i.d(t,{c:()=>f});const e=i(9292); const o=function(n,t,i){n.style.setProperty(t,i)}; const r=function(n,t){n.style.removeProperty(t)}; const a=[]; const u=function(n,t){if(void 0===n&&(n=[]),void 0!==t){const i=Array.isArray(t)?t:[t];return n.concat(i)}return n}; var f=function(){let n; let t; let i; let f; let c; let l; let s; let d; let m; let h; let v; let p; let g; let y=[]; let E=[]; let A=[]; let b=!1; let w={}; let S=[]; let C=[]; let T={}; let k=0; let _=!1; let x=!1; let D=!0; let F=!1; let q=!0; const L=[]; const R=[]; const P=[]; const M=[]; const O=[]; const I=[]; const N=[]; const U=[]; const W=[]; const X=[]; const j=typeof AnimationEffect==="function"||typeof window.AnimationEffect==="function"; const z=typeof Element==="function"&&typeof Element.prototype.animate==="function"&&j; const V=function(n,t){return(t&&t.oneTimeCallback?R:L).push({c:n,o:t}),g}; const Y=function(){if(z)X.forEach(((n) =>{n.cancel()})),X.length=0;else{const n=P.slice();(0,e.a)((() =>{n.forEach(((n) =>{r(n,"animation-name"),r(n,"animation-duration"),r(n,"animation-timing-function"),r(n,"animation-iteration-count"),r(n,"animation-delay"),r(n,"animation-play-state"),r(n,"animation-fill-mode"),r(n,"animation-direction")}))}))}}; const K=function(){O.forEach(((n) =>{n&&n.parentNode&&n.parentNode.removeChild(n)})),O.length=0}; const B=function(){return void 0!==c?c:s?s.getFill():"both"}; const G=function(){return void 0!==m?m:void 0!==l?l:s?s.getDirection():"normal"}; const H=function(){return _?"linear":void 0!==i?i:s?s.getEasing():"linear"}; const J=function(){return x?0:void 0!==h?h:void 0!==t?t:s?s.getDuration():0}; const Q=function(){return void 0!==f?f:s?s.getIterations():1}; const Z=function(){return void 0!==v?v:void 0!==n?n:s?s.getDelay():0}; const $=function(){k!==0&&--k==0&&(function(){let n; let t; let i;un(),U.forEach(((n) =>{n()})),W.forEach(((n) =>{n()})),n=S,t=C,i=T,P.forEach(((e) =>{const r=e.classList;for(const a in n.forEach(((n) =>r.add(n))),t.forEach(((n) =>r.remove(n))),i)i.hasOwnProperty(a)&&o(e,a,i[a])}));const e=D?1:0;L.forEach(((n) =>n.c(e,g))),R.forEach(((n) =>n.c(e,g))),R.length=0,q=!0,F=!0}(),s&&s.animationFinish())}; const nn=function(n){let t; let i; let r;void 0===n&&(n=!0),I.forEach(((n) =>{n()})),N.forEach(((n) =>{n()})),t=E,i=A,r=w,P.forEach(((n) =>{const e=n.classList;for(const a in t.forEach(((n) =>e.add(n))),i.forEach(((n) =>e.remove(n))),r)r.hasOwnProperty(a)&&o(n,a,r[a])})),y.length>0&&(z?(P.forEach(((n) =>{const t=n.animate(y,{delay:Z(),duration:J(),easing:H(),iterations:Q(),fill:B(),direction:G()});t.pause(),X.push(t)})),X.length>0&&(X[0].onfinish=function(){$()})):function(n){void 0===n&&(n=!0),K(),P.forEach(((t) =>{if(y.length>0){const i=(void 0===(f=y)&&(f=[]),f.map(((n) =>{const t=n.offset; const i=[];for(const e in n)n.hasOwnProperty(e)&&e!=="offset"&&i.push(`${e}: ${n[e]};`);return `${100*t}% { ${i.join(" ")} }`})).join(" "));p=function(n){let t=a.indexOf(n);return t<0&&(t=a.push(n)-1),`ion-animation-${t}`}(i);const r=function(n,t,i){const e=function(n){const t=n.getRootNode();return t.head||t}(i); const o=e.querySelector(`#${n}`);if(o)return o;const r=(i.ownerDocument||document).createElement("style");return r.id=n,r.textContent=`@keyframes ${n} { ${t} } @keyframes ${n}-alt { ${t} }`,e.appendChild(r),r}(p,i,t);O.push(r),o(t,"animation-duration",`${J()}ms`),o(t,"animation-timing-function",H()),o(t,"animation-delay",`${Z()}ms`),o(t,"animation-fill-mode",B()),o(t,"animation-direction",G());const u=Q()===1/0?"infinite":Q().toString();o(t,"animation-iteration-count",u),o(t,"animation-play-state","paused"),n&&o(t,"animation-name",`${r.id}-alt`),(0,e.a)((() =>{o(t,"animation-name",r.id||null)}))}let f}))}(n)),b=!0}; const tn=function(n){if(n=Math.min(Math.max(n,0),.999),z)X.forEach(((t) =>{t.currentTime=t.effect.getComputedTiming().delay+J()*n,t.pause()}));else{const t=`-${(Z()||0)+J()*n}ms`;P.forEach(((n) =>{y.length>0&&(o(n,"animation-delay",t),o(n,"animation-play-state","paused"))}))}}; const en=function(n){void 0===n&&(n=!0),P.forEach(((t) =>{(0,e.a)((() =>{o(t,"animation-name",p||null),o(t,"animation-duration",`${J()}ms`),o(t,"animation-timing-function",H()),o(t,"animation-delay",`${Z()}ms`),o(t,"animation-fill-mode",B()||null),o(t,"animation-direction",G()||null);const i=Q()===1/0?"infinite":Q().toString();o(t,"animation-iteration-count",i),n&&o(t,"animation-name",`${p}-alt`),(0,e.a)((() =>{o(t,"animation-name",p||null)}))}))}))}; const on=function(n,t){return void 0===n&&(n=!1),void 0===t&&(t=!0),n&&M.forEach(((t) =>{t.update(n)})),z?X.forEach(((n) =>{n.effect.updateTiming({delay:Z(),duration:J(),easing:H(),iterations:Q(),fill:B(),direction:G()})})):en(t),g}; const rn=function(){b&&(z?X.forEach(((n) =>{n.pause()})):P.forEach(((n) =>{o(n,"animation-play-state","paused")})))}; const an=function(){d=void 0,$()}; var un=function(){d&&clearTimeout(d)}; const fn=function(n){return new Promise(((t) =>{n&&n.sync&&(x=!0,V((() =>x=!1),{oneTimeCallback:!0})),b||nn(),F&&(z?tn(0):en(),F=!1),q&&(k=M.length+1,q=!1),V((() =>t()),{oneTimeCallback:!0}),M.forEach(((n) =>{n.play()})),z?(X.forEach(((n) =>{n.play()})),y.length!==0&&P.length!==0||$()):function(){if(un(),P.forEach(((n) =>{y.length>0&&(0,e.a)((() =>{o(n,"animation-play-state","running")}))})),y.length===0||P.length===0)$();else{const n=Z()||0; const t=J()||0; const i=Q()||1;d=setTimeout(an,n+t*i+100),a=P[0],u=function(){un(),(0,e.a)((() =>{P.forEach(((n) =>{r(n,"animation-duration"),r(n,"animation-delay"),r(n,"animation-play-state")})),(0,e.a)($)}))},c={passive:!0},l=function(){f&&f()},s=function(n){a===n.target&&(l(),u())},a&&(a.addEventListener("webkitAnimationEnd",s,c),a.addEventListener("animationend",s,c),f=function(){a.removeEventListener("webkitAnimationEnd",s,c),a.removeEventListener("animationend",s,c)})}let a; let u; let f; let c; let l; let s}()}))}; const cn=function(n,t){let i; const e=y[0];return void 0!==e&&e.offset===0?e[n]=t:y=[(i={offset:0},i[n]=t,i)].concat(y),g};return g={parentAnimation:s,elements:P,childAnimations:M,animationFinish:$,from:cn,to(n,t){let i; const e=y[y.length-1];return void 0!==e&&e.offset===1?e[n]=t:y=y.concat([(i={offset:1},i[n]=t,i)]),g},fromTo(n,t,i){return cn(n,t).to(n,i)},parent(n){return s=n,g},play:fn,playAsync(){return fn()},playSync(){return fn({sync:!0}),g},pause(){return M.forEach(((n) =>{n.pause()})),rn(),g},stop(){M.forEach(((n) =>{n.stop()})),b&&(Y(),b=!1)},destroy(){return M.forEach(((n) =>{n.destroy()})),Y(),K(),P.length=0,M.length=0,y.length=0,L.length=0,R.length=0,b=!1,q=!0,g},keyframes(n){return y=n,g},addAnimation(n){if(n!=null)if(Array.isArray(n))for(let t=0,i=n;t<i.length;t++){const e=i[t];e.parent(g),M.push(e)}else n.parent(g),M.push(n);return g},addElement(n){if(n!=null)if(n.nodeType===1)P.push(n);else if(n.length>=0)for(let t=0;t<n.length;t++)P.push(n[t]);else console.error("Invalid addElement value");return g},update:on,fill(n){return c=n,on(!0),g},direction(n){return l=n,on(!0),g},iterations(n){return f=n,on(!0),g},duration(n){return z||n!==0||(n=1),t=n,on(!0),g},easing(n){return i=n,on(!0),g},delay(t){return n=t,on(!0),g},getWebAnimations(){return X},getKeyframes(){return y},getFill:B,getDirection:G,getDelay:Z,getIterations:Q,getEasing:H,getDuration:J,afterAddRead(n){return U.push(n),g},afterAddWrite(n){return W.push(n),g},afterClearStyles(n){void 0===n&&(n=[]);for(let t=0,i=n;t<i.length;t++){const e=i[t];T[e]=""}return g},afterStyles(n){return void 0===n&&(n={}),T=n,g},afterRemoveClass(n){return C=u(C,n),g},afterAddClass(n){return S=u(S,n),g},beforeAddRead(n){return I.push(n),g},beforeAddWrite(n){return N.push(n),g},beforeClearStyles(n){void 0===n&&(n=[]);for(let t=0,i=n;t<i.length;t++){const e=i[t];w[e]=""}return g},beforeStyles(n){return void 0===n&&(n={}),w=n,g},beforeRemoveClass(n){return A=u(A,n),g},beforeAddClass(n){return E=u(E,n),g},onFinish:V,progressStart(n){return void 0===n&&(n=!1),M.forEach(((t) =>{t.progressStart(n)})),rn(),_=n,b?(on(),tn(0)):nn(),g},progressStep(n){return M.forEach(((t) =>{t.progressStep(n)})),tn(n),g},progressEnd(n,t,i){return _=!1,M.forEach(((e) =>{e.progressEnd(n,t,i)})),void 0!==i&&(h=i),F=!1,(D=n===1)?z||(v=t*J()*-1,on(!1,!1)):(m=G()==="reverse"?"normal":"reverse",z?(on(),tn(1-t)):(v=(1-t)*J()*-1,on(!1,!1))),V((() =>{D=!0,h=void 0,m=void 0,v=void 0}),{oneTimeCallback:!0}),s||fn(),g}}}},9292:(n,t,i)=>{i.d(t,{a:()=>e,b:()=>f,c:()=>u,d:()=>d,e:()=>m,f:()=>r,h:()=>o,i:()=>s,n:()=>c,p:()=>l,r:()=>a});var e=function(n){return typeof __zone_symbol__requestAnimationFrame==="function"?__zone_symbol__requestAnimationFrame(n):typeof requestAnimationFrame==="function"?requestAnimationFrame(n):setTimeout(n)}; var o=function(n){return!!n.shadowRoot&&!!n.attachShadow}; var r=function(n){const t=n.closest("ion-item");return t?t.querySelector("ion-label"):null}; var a=function(n,t,i,e,r){if(n||o(t)){let a=t.querySelector("input.aux-input");a||((a=t.ownerDocument.createElement("input")).type="hidden",a.classList.add("aux-input"),t.appendChild(a)),a.disabled=r,a.name=i,a.value=e||""}}; var u=function(n,t,i){return Math.max(n,Math.min(t,i))}; var f=function(n,t){if(!n){const i=`ASSERT: ${t}`;throw console.error(i),new Error(i)}}; var c=function(n){return n.timeStamp||Date.now()}; var l=function(n){if(n){const t=n.changedTouches;if(t&&t.length>0){const i=t[0];return{x:i.clientX,y:i.clientY}}if(void 0!==n.pageX)return{x:n.pageX,y:n.pageY}}return{x:0,y:0}}; var s=function(n){const t=document.dir==="rtl";switch(n){case"start":return t;case"end":return!t;default:throw new Error(`"${n}" is not a valid value for [side]. Use "start" or "end" instead.`)}}; var d=function(n,t){const i=n._original||n;return{_original:n,emit:m(i.emit.bind(i),t)}}; var m=function(n,t){let i;return void 0===t&&(t=0),function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];clearTimeout(i),i=setTimeout.apply(void 0,[n,t].concat(e))}}}}]);