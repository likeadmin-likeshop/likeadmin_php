import{w as B,J as g}from"./element-plus.317dd699.js";import{d as k,r as C,D as b,n as S,o as r,c as T,a as p,H as f,U as $,a8 as E,L as a,S as s,T as d,K as m,R as v}from"./@vue.e8706010.js";import{d as V}from"./index.565e6324.js";const w=k({props:{title:{type:String,default:""},content:{type:String,default:""},confirmButtonText:{type:[String,Boolean],default:"\u786E\u5B9A"},cancelButtonText:{type:[String,Boolean],default:"\u53D6\u6D88"},width:{type:String,default:"400px"},disabled:{type:Boolean,default:!1},async:{type:Boolean,default:!1},clickModalClose:{type:Boolean,default:!1},center:{type:Boolean,default:!1},customClass:{type:String,default:""}},emits:["confirm","cancel","close","open"],setup(e,{emit:o}){const t=C(!1),u=n=>{o(n),(!e.async||n==="cancel")&&i()},i=()=>{t.value=!1,S(()=>{o("close")})},c=()=>{e.disabled||(o("open"),t.value=!0)};return b("visible",t),{visible:t,handleEvent:u,close:i,open:c}}});const _={class:"dialog"},D={class:"dialog-footer"};function h(e,o,t,u,i,c){const n=B,y=g;return r(),T("div",_,[p("div",{class:"dialog__trigger",onClick:o[0]||(o[0]=(...l)=>e.open&&e.open(...l))},[f(e.$slots,"trigger",{},void 0,!0)]),$(y,{modelValue:e.visible,"onUpdate:modelValue":o[3]||(o[3]=l=>e.visible=l),"custom-class":e.customClass,center:e.center,"append-to-body":!0,width:e.width,"close-on-click-modal":e.clickModalClose,onClosed:e.close},E({footer:a(()=>[p("div",D,[e.cancelButtonText?(r(),m(n,{key:0,onClick:o[1]||(o[1]=l=>e.handleEvent("cancel"))},{default:a(()=>[s(d(e.cancelButtonText),1)]),_:1})):v("",!0),e.confirmButtonText?(r(),m(n,{key:1,type:"primary",onClick:o[2]||(o[2]=l=>e.handleEvent("confirm"))},{default:a(()=>[s(d(e.confirmButtonText),1)]),_:1})):v("",!0)])]),default:a(()=>[f(e.$slots,"default",{},()=>[s(d(e.content),1)],!0)]),_:2},[e.title?{name:"header",fn:a(()=>[s(d(e.title),1)])}:void 0]),1032,["modelValue","custom-class","center","width","close-on-click-modal","onClosed"])])}const U=V(w,[["render",h],["__scopeId","data-v-b8e715d9"]]);export{U as P};
