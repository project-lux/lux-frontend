(self.webpackChunkUV=self.webpackChunkUV||[]).push([[220],{220:(n,e,o)=>{o.r(e),o.d(e,{ion_nav_push:()=>i});const t=o(2085); const r=o(536); var i=function(){function n(n){const e=this;(0,t.r)(this,n),this.push=function(){return(0,r.n)(e.el,"forward",e.component,e.componentProps)}}return n.prototype.componentDidLoad=function(){console.warn('[DEPRECATED][ion-nav-push] `<ion-nav-push component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent">` instead.')},n.prototype.render=function(){return(0,t.h)(t.H,{onClick:this.push})},Object.defineProperty(n.prototype,"el",{get(){return(0,t.d)(this)},enumerable:!0,configurable:!0}),n}()},536:(n,e,o)=>{o.d(e,{n:()=>t});var t=function(n,e,o,t){const r=n.closest("ion-nav");if(r)if(e==="forward"){if(void 0!==o)return r.push(o,t,{skipIfBusy:!0})}else if(e==="root"){if(void 0!==o)return r.setRoot(o,t,{skipIfBusy:!0})}else if(e==="back")return r.pop({skipIfBusy:!0});return Promise.resolve(!1)}}}]);