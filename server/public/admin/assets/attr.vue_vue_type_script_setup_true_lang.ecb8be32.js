import{G as D,H as U,C as y,B as v,w,D as N}from"./element-plus.317dd699.js";import{_ as R}from"./index.3e5f41c9.js";import{_ as $}from"./picker.511f7b34.js";import{_ as j}from"./picker.363c218e.js";import{f as F}from"./index.1c2713e1.js";import{D as G}from"./vuedraggable.eee17a05.js";import{d as I,o as _,c as O,U as e,L as t,a as m,u as H,K as E,R as K,S as r}from"./@vue.e8706010.js";const L=r("\u5F00\u542F"),S=r("\u505C\u7528"),T={class:"flex-1"},q=m("div",{class:"form-tips"},"\u6700\u591A\u6DFB\u52A05\u5F20\uFF0C\u5EFA\u8BAE\u56FE\u7247\u5C3A\u5BF8\uFF1A750px*200px",-1),z={class:"bg-fill-light flex items-center w-full p-4 mt-4 cursor-move"},J={class:"ml-3 flex-1"},M=r("\u6DFB\u52A0\u56FE\u7247"),te=I({__name:"attr",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(a){const s=a,c=5,V=()=>{var u;((u=s.content.data)==null?void 0:u.length)<c?s.content.data.push({image:"",name:"",link:{}}):F.msgError(`\u6700\u591A\u6DFB\u52A0${c}\u5F20\u56FE\u7247`)},g=u=>{var l;if(((l=s.content.data)==null?void 0:l.length)<=1)return F.msgError("\u6700\u5C11\u4FDD\u7559\u4E00\u5F20\u56FE\u7247");s.content.data.splice(u,1)};return(u,l)=>{const i=D,b=U,d=y,h=j,B=v,k=$,x=R,A=w,C=N;return _(),O("div",null,[e(C,{"label-width":"70px"},{default:t(()=>{var p;return[e(d,{label:"\u662F\u5426\u542F\u7528"},{default:t(()=>[e(b,{modelValue:a.content.enabled,"onUpdate:modelValue":l[0]||(l[0]=o=>a.content.enabled=o)},{default:t(()=>[e(i,{label:1},{default:t(()=>[L]),_:1}),e(i,{label:0},{default:t(()=>[S]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(d,{label:"\u56FE\u7247\u8BBE\u7F6E"},{default:t(()=>[m("div",T,[q,e(H(G),{class:"draggable",modelValue:a.content.data,"onUpdate:modelValue":l[1]||(l[1]=o=>a.content.data=o),animation:"300"},{item:t(({element:o,index:f})=>[(_(),E(x,{key:f,onClose:n=>g(f),class:"max-w-[400px]"},{default:t(()=>[m("div",z,[e(h,{modelValue:o.image,"onUpdate:modelValue":n=>o.image=n,"upload-class":"bg-body","exclude-domain":""},null,8,["modelValue","onUpdate:modelValue"]),m("div",J,[e(d,{label:"\u56FE\u7247\u540D\u79F0"},{default:t(()=>[e(B,{modelValue:o.name,"onUpdate:modelValue":n=>o.name=n,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(d,{class:"mt-[18px]",label:"\u56FE\u7247\u94FE\u63A5"},{default:t(()=>[e(k,{modelValue:o.link,"onUpdate:modelValue":n=>o.link=n},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)])])]),_:2},1032,["onClose"]))]),_:1},8,["modelValue"])])]),_:1}),((p=a.content.data)==null?void 0:p.length)<c?(_(),E(d,{key:0},{default:t(()=>[e(A,{type:"primary",onClick:V},{default:t(()=>[M]),_:1})]),_:1})):K("",!0)]}),_:1})])}}});export{te as _};