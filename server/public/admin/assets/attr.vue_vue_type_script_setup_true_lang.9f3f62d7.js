import{G as C,H as D,C as N,B as R,t as $,w as S,D as j}from"./element-plus.317dd699.js";import{_ as G}from"./index.b2d8cbd8.js";import{f as E,b as I}from"./index.565e6324.js";import{_ as O}from"./picker.759bc247.js";import{_ as z}from"./picker.3099ca58.js";import{D as H}from"./vuedraggable.eee17a05.js";import{d as K,o as d,c as L,U as l,L as t,K as c,R as i,a as s,u as T,S as r}from"./@vue.e8706010.js";const q=r("\u5F00\u542F"),J=r("\u505C\u7528"),M={class:"flex-1"},P=s("div",{class:"form-tips"},"\u6700\u591A\u6DFB\u52A05\u5F20\uFF0C\u5EFA\u8BAE\u56FE\u7247\u5C3A\u5BF8\uFF1A750px*340px",-1),Q={class:"bg-fill-light flex items-center w-full p-4 mt-4"},W={class:"ml-3 flex-1"},X={class:"flex-1 flex items-center"},Y={class:"drag-move cursor-move ml-auto"},Z=r("\u6DFB\u52A0\u56FE\u7247"),de=K({__name:"attr",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})},type:{type:String,default:"mobile"}},setup(a){const _=a,p=5,b=()=>{var m;((m=_.content.data)==null?void 0:m.length)<p?_.content.data.push({is_show:"1",image:"",name:"",link:{}}):E.msgError(`\u6700\u591A\u6DFB\u52A0${p}\u5F20\u56FE\u7247`)},g=m=>{var n;if(((n=_.content.data)==null?void 0:n.length)<=1)return E.msgError("\u6700\u5C11\u4FDD\u7559\u4E00\u5F20\u56FE\u7247");_.content.data.splice(m,1)};return(m,n)=>{const f=C,k=D,u=N,x=z,F=R,y=O,v=$,B=I,A=G,U=S,w=j;return d(),L("div",null,[l(w,{"label-width":"70px"},{default:t(()=>{var V;return[a.type=="mobile"?(d(),c(u,{key:0,label:"\u662F\u5426\u542F\u7528"},{default:t(()=>[l(k,{modelValue:a.content.enabled,"onUpdate:modelValue":n[0]||(n[0]=e=>a.content.enabled=e)},{default:t(()=>[l(f,{label:1},{default:t(()=>[q]),_:1}),l(f,{label:0},{default:t(()=>[J]),_:1})]),_:1},8,["modelValue"])]),_:1})):i("",!0),l(u,{label:"\u56FE\u7247\u8BBE\u7F6E"},{default:t(()=>[s("div",M,[P,l(T(H),{class:"draggable",modelValue:a.content.data,"onUpdate:modelValue":n[1]||(n[1]=e=>a.content.data=e),animation:"300",handle:".drag-move"},{item:t(({element:e,index:h})=>[(d(),c(A,{key:h,onClose:o=>g(h),class:"max-w-[400px]"},{default:t(()=>[s("div",Q,[l(x,{modelValue:e.image,"onUpdate:modelValue":o=>e.image=o,"upload-class":"bg-body","exclude-domain":""},null,8,["modelValue","onUpdate:modelValue"]),s("div",W,[l(u,{label:"\u56FE\u7247\u540D\u79F0"},{default:t(()=>[l(F,{modelValue:e.name,"onUpdate:modelValue":o=>e.name=o,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(u,{class:"mt-[18px]",label:"\u56FE\u7247\u94FE\u63A5"},{default:t(()=>[a.type=="mobile"?(d(),c(y,{key:0,modelValue:e.link,"onUpdate:modelValue":o=>e.link=o},null,8,["modelValue","onUpdate:modelValue"])):i("",!0),a.type=="pc"?(d(),c(F,{key:1,placeholder:"\u8BF7\u8F93\u5165\u94FE\u63A5",modelValue:e.link.path,"onUpdate:modelValue":o=>e.link.path=o},null,8,["modelValue","onUpdate:modelValue"])):i("",!0)]),_:2},1024),l(u,{label:"\u662F\u5426\u663E\u793A",class:"mt-[18px]"},{default:t(()=>[s("div",X,[l(v,{modelValue:e.is_show,"onUpdate:modelValue":o=>e.is_show=o,"active-value":"1","inactive-value":"0"},null,8,["modelValue","onUpdate:modelValue"]),s("div",Y,[l(B,{name:"el-icon-Rank",size:"18"})])])]),_:2},1024)])])]),_:2},1032,["onClose"]))]),_:1},8,["modelValue"])])]),_:1}),((V=a.content.data)==null?void 0:V.length)<p?(d(),c(u,{key:1},{default:t(()=>[l(U,{type:"primary",onClick:b},{default:t(()=>[Z]),_:1})]),_:1})):i("",!0)]}),_:1})])}}});export{de as _};
