import{_ as v,K as w,I as b,L as k,w as y,M as x,N as L}from"./element-plus.4078815e.js";import{_ as N,s as T}from"./edit.vue_vue_type_script_setup_true_lang.17cc0546.js";import{d as B,s as R,a1 as V,an as S,o,c as $,X as t,P as u,Q as d,u as E,O as s,U as F,a as i}from"./@vue.b52708da.js";import"./@element-plus.35ec7429.js";import"./lodash-es.2b4cc642.js";import"./dayjs.3bccbd93.js";import"./axios.dc00a7f8.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.b082b0c1.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.9feff995.js";import"./@vueuse.e1a32ef4.js";import"./lodash.e6e9a684.js";import"./vue-router.48496b4b.js";import"./pinia.3f41eb90.js";import"./css-color-function.a728b5d4.js";import"./color.d7ae65d5.js";import"./clone.65443a5f.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.2274a56d.js";import"./vue-clipboard3.d9310b6d.js";import"./clipboard.cf95dd73.js";import"./echarts.004f4e72.js";import"./zrender.b56a9aa5.js";import"./tslib.60310f1a.js";import"./highlight.js.db90315f.js";import"./@highlightjs.0797cc3b.js";import"./index.6a7603c9.js";const q={class:"storage"},z=i("div",null," 1.\u4F7F\u7528\u5BF9\u8C61\u5B58\u50A8\uFF0C\u9700\u8981\u5C06public\u76EE\u5F55\u4E0B\u7684\u8D44\u6E90\u6587\u4EF6\u4FDD\u7559\u539F\u6765\u76EE\u5F55\u8DEF\u5F84\u4F20\u8F93\u5230\u5BF9\u8C61\u5B58\u50A8\u7A7A\u95F4\u3002 ",-1),I=i("div",null,"2.\u8BF7\u52FF\u968F\u610F\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\uFF0C\u53EF\u80FD\u5BFC\u81F4\u56FE\u7247\u65E0\u6CD5\u67E5\u770B\u3002",-1),K=i("div",null," 3.\u9700\u8981\u5728\u5BF9\u8C61\u5B58\u50A8\u540E\u53F0\u8BBE\u7F6E\u57DF\u540D\u8DE8\u57DF\uFF0C\u5426\u5219\u56FE\u7247\u751F\u6210\u573A\u666F\u65E0\u6CD5\u4F7F\u7528\uFF0C\u4F8B\u6D77\u62A5\u5408\u6210\u7B49\u3002 ",-1),M=i("div",null," 4.\u9700\u5C06\u5BF9\u8C61\u5B58\u50A8\u7684\u56FE\u7247\u57DF\u540D\u6DFB\u52A0\u5230\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5B98\u65B9\u540E\u53F0request\u5408\u6CD5\u57DF\u540D\u548CdownloadFile\u5408\u6CD5\u57DF\u540D\u3002 ",-1),O=B({name:"storage"}),wu=B({...O,setup(P){const p=R(),e=V({loading:!1,lists:[]}),c=async()=>{try{e.loading=!0,e.lists=await T(),e.loading=!1}catch{e.loading=!1}},f=r=>{var n;(n=p.value)==null||n.open(r)};return c(),(r,n)=>{const D=w,m=b,a=k,_=v,C=y,g=x,h=S("perms"),A=L;return o(),$("div",q,[t(m,{class:"!border-none",shadow:"never"},{default:u(()=>[t(D,{type:"warning",title:"\u6E29\u99A8\u63D0\u793A\uFF1A",closable:!1,"show-icon":""},{default:u(()=>[z,I,K,M]),_:1})]),_:1}),d((o(),s(m,{class:"!border-none mt-4",shadow:"never"},{default:u(()=>[t(g,{size:"large",data:E(e).lists},{default:u(()=>[t(a,{label:"\u50A8\u5B58\u65B9\u5F0F",prop:"name","min-width":"120"}),t(a,{label:"\u50A8\u5B58\u4F4D\u7F6E",prop:"path","min-width":"160"}),t(a,{label:"\u72B6\u6001","min-width":"80"},{default:u(({row:l})=>[l.status==1?(o(),s(_,{key:0},{default:u(()=>[F("\u5F00\u542F")]),_:1})):(o(),s(_,{key:1,type:"danger"},{default:u(()=>[F("\u5173\u95ED")]),_:1}))]),_:1}),t(a,{label:"\u64CD\u4F5C","min-width":"80",fixed:"right"},{default:u(({row:l})=>[d((o(),s(C,{type:"primary",link:"",onClick:Q=>f(l.engine)},{default:u(()=>[F(" \u8BBE\u7F6E ")]),_:2},1032,["onClick"])),[[h,["setting.storage/setup"]]])]),_:1})]),_:1},8,["data"])]),_:1})),[[A,E(e).loading]]),t(N,{ref_key:"editRef",ref:p,onSuccess:c},null,512)])}}});export{wu as default};
