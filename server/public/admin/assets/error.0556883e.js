import{_ as u,d as i,r as _,u as v,b as m,o as c,c as p,e as o,t as a,f,w as h,g,h as x,i as y,E as B}from"./index.ee88eab4.js";const E={class:"error"},w={class:"error-code blue"},b={class:"lighter mt-30 m-b-30"},k=i({__name:"error",props:{code:String,title:String,showBtn:{type:Boolean,default:!0}},setup(e){const l=e;let t=null;const r=_(5),n=v();return l.showBtn&&(t=setInterval(()=>{r.value===0?(clearInterval(t),n.go(-1)):r.value--},1e3)),m(()=>{t&&clearInterval(t)}),(C,s)=>{const d=B;return c(),p("div",E,[o("div",null,[o("div",w,a(e.code),1),o("div",b,a(e.title),1),e.showBtn?(c(),f(d,{key:0,type:"primary",onClick:s[0]||(s[0]=D=>x(n).go(-1))},{default:h(()=>[g(a(r.value)+" \u79D2\u540E\u8FD4\u56DE\u4E0A\u4E00\u9875",1)]),_:1})):y("",!0)])])}}});var N=u(k,[["__scopeId","data-v-d30a727c"]]);export{N as default};