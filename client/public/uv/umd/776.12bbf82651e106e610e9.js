(self.webpackChunkUV=self.webpackChunkUV||[]).push([[776],{776:()=>{const t=function(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""};function e(e){return r(function(e){const r=new t;r.start=0,r.end=e.length;for(let n=r,a=0,o=e.length;a<o;a++)if(e[a]===s){n.rules||(n.rules=[]);const u=n; const l=u.rules[u.rules.length-1]||null;(n=new t).start=a+1,n.parent=u,n.previous=l,u.rules.push(n)}else e[a]===i&&(n.end=a+1,n=n.parent||r);return r}(e=e.replace(a.comments,"").replace(a.port,"")),e)}function r(t,e){let s=e.substring(t.start,t.end-1);if(t.parsedCssText=t.cssText=s.trim(),t.parent){const i=t.previous?t.previous.end:t.parent.start;s=function(t){return t.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){for(var t=arguments[1],e=6-t.length;e--;)t=`0${t}`;return`\\${t}`}))}(s=e.substring(i,t.start-1)),s=(s=s.replace(a.multipleSpaces," ")).substring(s.lastIndexOf(";")+1);const c=t.parsedSelector=t.selector=s.trim();t.atRule=c.indexOf(l)===0,t.atRule?c.indexOf(u)===0?t.type=n.MEDIA_RULE:c.match(a.keyframesRule)&&(t.type=n.KEYFRAMES_RULE,t.keyframesName=t.selector.split(a.multipleSpaces).pop()):c.indexOf(o)===0?t.type=n.MIXIN_RULE:t.type=n.STYLE_RULE}const p=t.rules;if(p)for(let f=0,h=p.length,v=void 0;f<h&&(v=p[f]);f++)r(v,e);return t}var n={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3}; var s="{"; var i="}"; var a={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g}; var o="--"; var u="@media"; var l="@";function c(t,e,r){t.lastIndex=0;const n=e.substring(r).match(t);if(n){const s=r+n.index;return{start:s,end:s+n[0].length}}return null}const p=/\bvar\(/; const f=/\B--[\w-]+\s*:/; const h=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim; const v=/^[\t ]+\n/gm;function m(t,e,r){const n=function(t,e){const r=c(p,t,e);if(!r)return null;const n=function(t,e){for(var r=0,n=e;n<t.length;n++){const s=t[n];if(s==="(")r++;else if(s===")"&&--r<=0)return n+1}return n}(t,r.start); const s=t.substring(r.end,n-1).split(","); const i=s[0]; const a=s.slice(1);return{start:r.start,end:n,propName:i.trim(),fallback:a.length>0?a.join(",").trim():void 0}}(t,r);if(!n)return e.push(t.substring(r,t.length)),t.length;const s=n.propName; const i=n.fallback!=null?y(n.fallback):void 0;return e.push(t.substring(r,n.start),((t) =>function(t,e,r){return t[e]?t[e]:r?d(r,t):""}(t,s,i))),n.end}function d(t,e){for(var r="",n=0;n<t.length;n++){const s=t[n];r+=typeof s==="string"?s:s(e)}return r}function g(t,e){for(var r=!1,n=!1,s=e;s<t.length;s++){const i=t[s];if(r)n&&i==='"'&&(r=!1),n||i!=="'"||(r=!1);else if(i==='"')r=!0,n=!0;else if(i==="'")r=!0,n=!1;else{if(i===";")return s+1;if(i==="}")return s}}return s}function y(t){let e=0;t=function(t){for(var e="",r=0;;){const n=c(f,t,r); const s=n?n.start:t.length;if(e+=t.substring(r,s),!n)break;r=g(t,s)}return e}(t=t.replace(h,"")).replace(v,"");for(var r=[];e<t.length;)e=m(t,r,e);return r}function S(t){const e={};t.forEach(((t) =>{t.declarations.forEach(((t) =>{e[t.prop]=t.value}))}));for(var r={},n=Object.entries(e),s=function(t){let e=!1;if(n.forEach(((t) =>{const n=t[0]; const s=d(t[1],r);s!==r[n]&&(r[n]=s,e=!0)})),!e)return"break"},i=0;i<10&&s()!=="break";i++);return r}function E(t,e){if(void 0===e&&(e=0),!t.rules)return[];const r=[];return t.rules.filter(((t) =>t.type===n.STYLE_RULE)).forEach(((t) =>{const n=function(t){for(var e,r=[];e=M.exec(t.trim());){const n=L(e[2]); const s=n.value; const i=n.important;r.push({prop:e[1].trim(),value:y(s),important:i})}return r}(t.cssText);n.length>0&&t.parsedSelector.split(",").forEach(((t) =>{t=t.trim(),r.push({selector:t,declarations:n,specificity:1,nu:e})})),e++})),r}const b="!important"; var M=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gm;function L(t){const e=(t=t.replace(/\s+/gim," ").trim()).endsWith(b);return e&&(t=t.substr(0,t.length-b.length).trim()),{value:t,important:e}}function k(t){const e=[];return t.forEach(((t) =>{e.push.apply(e,t.selectors)})),e}function w(t){const r=e(t); const n=y(t);return{original:t,template:n,selectors:E(r),usesCssVars:n.length>1}}function x(t,e){const r=w(e.innerHTML);r.styleEl=e,t.push(r)}function R(t,e,r){let n; let s;return n=`\\.${e}`,s=`.${r}`,t.replace(new RegExp(n,"g"),s)}function T(t,e,r){const n=r.href;return fetch(n).then(((t) =>t.text())).then(((s) =>{if(((a=s).indexOf("var(")>-1||_.test(a))&&r.parentNode){(function(t){return I.lastIndex=0,I.test(t)})(s)&&(s=function(t,e){const r=e.replace(/[^/]*$/,"");return t.replace(I,((t,e) =>{const n=r+e;return t.replace(e,n)}))}(s,n));const i=t.createElement("style");i.setAttribute("data-styles",""),i.innerHTML=s,x(e,i),r.parentNode.insertBefore(i,r),r.remove()}let a})).catch(((t) =>{console.error(t)}))}var _=/[\s;{]--[-a-zA-Z0-9]+\s*:/m; var I=/url[\s]*\([\s]*['"]?(?![http|/])([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim; const C=function(){function t(t,e){this.win=t,this.doc=e,this.count=0,this.hostStyleMap=new WeakMap,this.hostScopeMap=new WeakMap,this.globalScopes=[],this.scopesMap=new Map}return t.prototype.initShim=function(){const t=this;return new Promise(((e) =>{t.win.requestAnimationFrame((() =>{let r; let n;(r=t.doc,n=t.globalScopes,function(t,e){for(let r=t.querySelectorAll("style:not([data-styles])"),n=0;n<r.length;n++)x(e,r[n])}(r,n),function(t,e){for(var r=[],n=t.querySelectorAll('link[rel="stylesheet"][href]'),s=0;s<n.length;s++)r.push(T(t,e,n[s]));return Promise.all(r)}(r,n)).then((() =>e()))}))}))},t.prototype.addLink=function(t){const e=this;return T(this.doc,this.globalScopes,t).then((() =>{e.updateGlobal()}))},t.prototype.addGlobalStyle=function(t){x(this.globalScopes,t),this.updateGlobal()},t.prototype.createHostStyle=function(t,e,r,n){if(this.hostScopeMap.has(t))throw new Error("host style already created");let s; let i; let a; let o; const u=this.registerHostTemplate(r,e,n); const l=this.doc.createElement("style");return u.usesCssVars?n?(l["s-sc"]=e=`${u.scopeId}-${this.count}`,l.innerHTML="/*needs update*/",this.hostStyleMap.set(t,l),this.hostScopeMap.set(t,(i=e,a=(s=u).template.map(((t) =>typeof t==="string"?R(t,s.scopeId,i):t)),o=s.selectors.map(((t) =>Object.assign({},t,{selector:R(t.selector,s.scopeId,i)}))),Object.assign({},s,{template:a,selectors:o,scopeId:i}))),this.count++):(u.styleEl=l,u.usesCssVars||(l.innerHTML=d(u.template,{})),this.globalScopes.push(u),this.updateGlobal(),this.hostScopeMap.set(t,u)):l.innerHTML=r,l},t.prototype.removeHost=function(t){const e=this.hostStyleMap.get(t);e&&e.remove(),this.hostStyleMap.delete(t),this.hostScopeMap.delete(t)},t.prototype.updateHost=function(t){const e=this.hostScopeMap.get(t);if(e&&e.usesCssVars&&e.isScoped){const r=this.hostStyleMap.get(t);if(r){const n=function(t,e,r){let n; const s=[]; const i=function(t,e){for(var r=[];e;){const n=t.get(e);n&&r.push(n),e=e.parentElement}return r}(e,t);return r.forEach(((t) =>s.push(t))),i.forEach(((t) =>s.push(t))),(n=k(s).filter(((e) =>function(t,e){return e===":root"||e==="html"||t.matches(e)}(t,e.selector)))).sort(((t,e) =>t.specificity===e.specificity?t.nu-e.nu:t.specificity-e.specificity)),n}(t,this.hostScopeMap,this.globalScopes); const s=S(n);r.innerHTML=d(e.template,s)}}},t.prototype.updateGlobal=function(){let t; let e;t=this.globalScopes,e=S(k(t)),t.forEach(((t) =>{t.usesCssVars&&(t.styleEl.innerHTML=d(t.template,e))}))},t.prototype.registerHostTemplate=function(t,e,r){let n=this.scopesMap.get(e);return n||((n=w(t)).scopeId=e,n.isScoped=r,this.scopesMap.set(e,n)),n},t}(); const H=window;H.__stencil_cssshim||H.CSS&&H.CSS.supports&&H.CSS.supports("color","var(--c)")||(H.__stencil_cssshim=new C(H,document))}}]);