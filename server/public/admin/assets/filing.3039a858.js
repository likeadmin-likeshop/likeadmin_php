import{_ as y}from"./index.429f9ace.js";import{B as k,C as V,w as A,D as U,I as x}from"./element-plus.317dd699.js";import{b as I,f as N}from"./index.565e6324.js";import{_ as L}from"./index.b2d8cbd8.js";import{g as S,s as $}from"./website.5ee03195.js";import{d as f,r as K,af as M,o as n,c as _,U as e,L as o,M as P,K as d,V as T,a7 as j,a as t,S as F}from"./@vue.e8706010.js";import"./@vueuse.1e5a6e21.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.f7363e4f.js";import"./axios.3af9fe4b.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.873faf2b.js";import"./vue-router.12d45bc3.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.6e1df87d.js";import"./color.3050aad5.js";import"./clone.3b081931.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./nprogress.fd69c5bf.js";import"./vue-clipboard3.9796a14d.js";import"./clipboard.2bdac801.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";const q={class:"website-filing"},z=t("div",{class:"mb-5"},"\u7AD9\u70B9\u5E95\u90E8\u7248\u6743\u5907\u6848\u4FE1\u606F\u8BBE\u7F6E",-1),G={class:"py-4 bg-fill-lighter"},H={class:"w-80"},J={class:"w-80"},O=t("div",{class:"form-tips"},"\u8DF3\u8F6C\u94FE\u63A5\u4E0D\u8BBE\u7F6E\uFF0C\u5219\u4E0D\u8DF3\u8F6C",-1),Q=F(" \u6DFB\u52A0 "),R=F("\u4FDD\u5B58"),W=f({name:"webFilling"}),Ne=f({...W,setup(X){const l=K([{key:"",value:""}]),r=async()=>{const a=await S();!a.length||(l.value=a)},h=()=>{l.value.push({key:"",value:""})},v=a=>{if(l.value.length<=1)return N.msgError("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A");l.value.splice(a,1)},E=async()=>{await $({config:l.value}),r()};return r(),(a,Y)=>{const i=k,p=V,g=L,w=I,m=A,D=U,b=x,C=y,B=M("perms");return n(),_("div",q,[e(b,{shadow:"never",class:"!border-none"},{default:o(()=>[z,e(D,{ref:"form",class:"ls-form","label-width":"100px"},{default:o(()=>[(n(!0),_(T,null,j(l.value,(s,c)=>(n(),d(g,{class:"mb-4",key:c,"show-close":l.value.length>1,onClose:u=>v(c)},{default:o(()=>[t("div",G,[e(p,{label:"\u663E\u793A\u540D\u79F0",prop:"icp_link"},{default:o(()=>[t("div",H,[t("div",null,[e(i,{modelValue:s.key,"onUpdate:modelValue":u=>s.key=u,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])])])]),_:2},1024),e(p,{label:"\u8DF3\u8F6C\u94FE\u63A5",prop:"icp_link"},{default:o(()=>[t("div",J,[t("div",null,[e(i,{modelValue:s.value,"onUpdate:modelValue":u=>s.value=u,placeholder:"\u8BF7\u8F93\u5165\u94FE\u63A5\uFF0C\u4F8B\u5982\uFF1Ahttp://www.beian.gov.cn"},null,8,["modelValue","onUpdate:modelValue"])]),O])]),_:2},1024)])]),_:2},1032,["show-close","onClose"]))),128)),t("div",null,[e(m,{type:"primary",onClick:h},{default:o(()=>[e(w,{name:"el-icon-Plus"}),Q]),_:1})])]),_:1},512)]),_:1}),P((n(),d(C,null,{default:o(()=>[e(m,{type:"primary",onClick:E},{default:o(()=>[R]),_:1})]),_:1})),[[B,["setting.web.web_setting/setCopyright"]]])])}}});export{Ne as default};
