import{ac as T,dZ as I,bJ as h,d as N,bI as V,O as $,P as A,r as P,e as p,j as a,Q as l,w as d,R as D,aP as F,l as k,n as e,aF as b,V as o,Z as M,Y as n,k as i,W as C,q as g,t as u,m as O,X as Z,ao as j,$ as q,a3 as z}from"./index.b6a20072.js";const J=["light","dark"],Q=T({title:{type:String,default:""},description:{type:String,default:""},type:{type:String,values:I(h),default:"info"},closable:{type:Boolean,default:!0},closeText:{type:String,default:""},showIcon:Boolean,center:Boolean,effect:{type:String,values:J,default:"light"}}),R={close:r=>r instanceof MouseEvent},W={name:"ElAlert"},X=N({...W,props:Q,emits:R,setup(r,{emit:S}){const c=r,{Close:w}=V,f=$(),t=A("alert"),m=P(!0),y=p(()=>h[c.type]),B=p(()=>[t.e("icon"),{[t.is("big")]:!!c.description||!!f.default}]),E=p(()=>c.description||{[t.is("bold")]:f.default}),v=s=>{m.value=!1,S("close",s)};return(s,G)=>(a(),l(j,{name:e(t).b("fade"),persisted:""},{default:d(()=>[D(k("div",{class:o([e(t).b(),e(t).m(s.type),e(t).is("center",s.center),e(t).is(s.effect)]),role:"alert"},[s.showIcon&&e(y)?(a(),l(e(b),{key:0,class:o(e(B))},{default:d(()=>[(a(),l(M(e(y))))]),_:1},8,["class"])):n("v-if",!0),k("div",{class:o(e(t).e("content"))},[s.title||s.$slots.title?(a(),i("span",{key:0,class:o([e(t).e("title"),e(E)])},[C(s.$slots,"title",{},()=>[g(u(s.title),1)])],2)):n("v-if",!0),s.$slots.default||s.description?(a(),i("p",{key:1,class:o(e(t).e("description"))},[C(s.$slots,"default",{},()=>[g(u(s.description),1)])],2)):n("v-if",!0),s.closable?(a(),i(Z,{key:2},[s.closeText?(a(),i("div",{key:0,class:o([e(t).e("close-btn"),e(t).is("customed")]),onClick:v},u(s.closeText),3)):(a(),l(e(b),{key:1,class:o(e(t).e("close-btn")),onClick:v},{default:d(()=>[O(e(w))]),_:1},8,["class"]))],64)):n("v-if",!0)],2)],2),[[F,m.value]])]),_:3},8,["name"]))}});var Y=q(X,[["__file","/home/runner/work/element-plus/element-plus/packages/components/alert/src/alert.vue"]]);const K=z(Y);export{K as E};