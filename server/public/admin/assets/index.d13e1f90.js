import{Z as C,D as b,F as v,X as w,t as A,I as D,M as k}from"./element-plus.6014d9af.js";import{_ as y,s as x}from"./edit.vue_vue_type_script_setup_true_lang.03b0f061.js";import{d as L,s as T,$ as R,o as a,c as S,U as t,L as e,M as d,K as i,S as l,ad as $}from"./@vue.67e62321.js";import"./@vueuse.4608b35b.js";import"./dayjs.fb6e5f02.js";import"./axios.cb90d22e.js";import"./@element-plus.1892f8d7.js";import"./lodash-es.29c53eac.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.78f53bc3.js";import"./lodash.badb96a8.js";import"./vue-router.4c2c9e7d.js";import"./pinia.45d0690c.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.f9583570.js";import"./color.853bf74c.js";import"./clone.dc5b293d.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.a2dcc347.js";import"./ms.a9ae1d6d.js";import"./nprogress.68de8c98.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.a46c5e2c.js";import"./index.50733217.js";const M={class:"storage"},N=l("\u5F00\u542F"),V=l("\u5173\u95ED"),z=l(" \u8BBE\u7F6E "),Ct=L({__name:"index",setup(I){const m=T(),o=R({loading:!1,lists:[]}),p=async()=>{try{o.loading=!0,o.lists=await x(),o.loading=!1}catch{o.loading=!1}},F=s=>{var r;(r=m.value)==null||r.open(s)};return p(),(s,r)=>{const f=C,c=b,u=v,_=w,B=A,E=D,g=$("perms"),h=k;return a(),S("div",M,[t(c,{class:"!border-none",shadow:"never"},{default:e(()=>[t(f,{type:"warning",title:"\u6E29\u99A8\u63D0\u793A\uFF1A1.\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\u540E\uFF0C\u9700\u8981\u5C06\u8D44\u6E90\u6587\u4EF6\u4F20\u8F93\u81F3\u65B0\u7684\u5B58\u50A8\u7AEF\uFF1B2.\u8BF7\u52FF\u968F\u610F\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\uFF0C\u53EF\u80FD\u5BFC\u81F4\u56FE\u7247\u65E0\u6CD5\u67E5\u770B",closable:!1,"show-icon":""})]),_:1}),d((a(),i(c,{class:"!border-none mt-4",shadow:"never"},{default:e(()=>[t(E,{size:"large",data:o.lists},{default:e(()=>[t(u,{label:"\u50A8\u5B58\u65B9\u5F0F",prop:"name","min-width":"120"}),t(u,{label:"\u50A8\u5B58\u4F4D\u7F6E",prop:"path","min-width":"160"}),t(u,{label:"\u72B6\u6001","min-width":"80"},{default:e(({row:n})=>[n.status==1?(a(),i(_,{key:0},{default:e(()=>[N]),_:1})):(a(),i(_,{key:1,type:"danger"},{default:e(()=>[V]),_:1}))]),_:1}),t(u,{label:"\u64CD\u4F5C","min-width":"80",fixed:"right"},{default:e(({row:n})=>[d((a(),i(B,{type:"primary",link:"",onClick:K=>F(n.engine)},{default:e(()=>[z]),_:2},1032,["onClick"])),[[g,["setting.storage/setup"]]])]),_:1})]),_:1},8,["data"])]),_:1})),[[h,o.loading]]),t(y,{ref_key:"editRef",ref:m,onSuccess:p},null,512)])}}});export{Ct as default};