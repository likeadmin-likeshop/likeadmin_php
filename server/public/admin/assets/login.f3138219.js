import{B as q,C as T,D as z,F as P,w as M}from"./element-plus.317dd699.js";import{u as C,a as O,c as k,A as b,_ as X,b as Y,P as G,d as H}from"./index.565e6324.js";import{u as J,a as Q}from"./vue-router.12d45bc3.js";import{d as E,e as L,o as f,c as g,a as r,V as W,a7 as Z,u as m,T as D,r as R,s as B,$ as ee,j as oe,U as o,L as c,a9 as V,S as te}from"./@vue.e8706010.js";import"./@vueuse.1e5a6e21.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.f7363e4f.js";import"./axios.3af9fe4b.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.873faf2b.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.6e1df87d.js";import"./color.3050aad5.js";import"./clone.3b081931.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./nprogress.fd69c5bf.js";import"./vue-clipboard3.9796a14d.js";import"./clipboard.2bdac801.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";const se={class:"layout-footer"},ne={class:"text-center p-2 text-xs text-tx-secondary max-w-[900px] mx-auto"},re=["href"],ae=E({__name:"footer",setup(x){const t=C(),l=L(()=>t.config.copyright_config||[]);return(_,a)=>(f(),g("footer",se,[r("div",ne,[(f(!0),g(W,null,Z(m(l),u=>(f(),g("a",{class:"mx-1 hover:underline",href:u.value,target:"_blank",key:u.key},D(u.key),9,re))),128))])]))}});function ce(x){const t=R(!1);return{isLock:t,lockFn:async(..._)=>{if(!t.value){t.value=!0;try{const a=await x(..._);return t.value=!1,a}catch(a){throw t.value=!1,a}}}}}const le={class:"login flex flex-col"},ue={class:"flex-1 flex items-center justify-center"},ie={class:"login-card flex rounded-md"},pe={class:"flex-1 h-full hidden md:inline-block"},me={class:"login-form bg-body flex flex-col justify-center px-10 py-10 md:w-[400px] w-[375px] flex-none mx-auto"},_e={class:"text-center text-3xl font-medium mb-8"},de={class:"mb-5"},fe=te(" \u767B\u5F55 "),ge=E({__name:"login",setup(x){const t=B(),l=B(),_=C(),a=O(),u=J(),S=Q(),i=R(!1),y=L(()=>_.config),s=ee({account:"",password:""}),U={account:[{required:!0,message:"\u8BF7\u8F93\u5165\u8D26\u53F7",trigger:["blur"]}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:["blur"]}]},K=()=>{var e;if(!s.password)return(e=t.value)==null?void 0:e.focus();h()},h=async()=>{var d;await((d=l.value)==null?void 0:d.validate()),k.set(b,{remember:i.value,account:i.value?s.account:""}),await a.login(s);const{query:{redirect:e}}=u,n=typeof e=="string"?e:G.INDEX;S.push(n)},{isLock:$,lockFn:N}=ce(h);return oe(()=>{const e=k.get(b);e!=null&&e.remember&&(i.value=e.remember,s.account=e.account)}),(e,n)=>{const d=X,v=Y,w=q,F=T,A=z,I=P,j=M;return f(),g("div",le,[r("div",ue,[r("div",ie,[r("div",pe,[o(d,{src:m(y).login_image,width:400,height:"100%"},null,8,["src"])]),r("div",me,[r("div",_e,D(m(y).web_name),1),o(A,{ref_key:"formRef",ref:l,model:s,size:"large",rules:U},{default:c(()=>[o(F,{prop:"account"},{default:c(()=>[o(w,{modelValue:s.account,"onUpdate:modelValue":n[0]||(n[0]=p=>s.account=p),placeholder:"\u8BF7\u8F93\u5165\u8D26\u53F7",onKeyup:V(K,["enter"])},{prepend:c(()=>[o(v,{name:"el-icon-User"})]),_:1},8,["modelValue","onKeyup"])]),_:1}),o(F,{prop:"password"},{default:c(()=>[o(w,{ref_key:"passwordRef",ref:t,modelValue:s.password,"onUpdate:modelValue":n[1]||(n[1]=p=>s.password=p),"show-password":"",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",onKeyup:V(h,["enter"])},{prepend:c(()=>[o(v,{name:"el-icon-Lock"})]),_:1},8,["modelValue","onKeyup"])]),_:1})]),_:1},8,["model"]),r("div",de,[o(I,{modelValue:i.value,"onUpdate:modelValue":n[2]||(n[2]=p=>i.value=p),label:"\u8BB0\u4F4F\u8D26\u53F7"},null,8,["modelValue"])]),o(j,{type:"primary",size:"large",loading:m($),onClick:m(N)},{default:c(()=>[fe]),_:1},8,["loading","onClick"])])])]),o(ae)])}}});const Ge=H(ge,[["__scopeId","data-v-5a9bc6ac"]]);export{Ge as default};
