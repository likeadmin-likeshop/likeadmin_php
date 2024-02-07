import{_ as V,w as O,L as z,M as P,I as S,N as G}from"./element-plus.5649e4ba.js";import{M as h,f as I,b as K}from"./index.221d66d0.js";import{e as Q,a as j}from"./menu.81069b04.js";import{u as q}from"./usePaging.63ca32b2.js";import{_ as H}from"./edit.vue_vue_type_script_setup_true_lang.9f466c35.js";import{d as N,s as x,r as J,am as W,o as i,c as v,U as n,L as t,a as D,M as c,K as r,R as m,u as p,Q as E,n as T}from"./@vue.90bde458.js";import"./lodash-es.151604d4.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.c9321399.js";import"./@element-plus.637a59d4.js";import"./dayjs.f6b311c4.js";import"./axios.0043c060.js";import"./@ctrl.b082b0c1.js";import"./normalize-wheel-es.8aeb3683.js";import"./@popperjs.36402333.js";import"./lodash.4558177f.js";import"./vue-router.1051b4fa.js";import"./pinia.8db5076b.js";import"./css-color-function.4c79dc15.js";import"./color.a28dd44c.js";import"./clone.238ad270.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.6fbc6031.js";import"./vue-clipboard3.f565fd84.js";import"./clipboard.a7169b77.js";import"./echarts.5016c48c.js";import"./zrender.58d022a1.js";import"./tslib.60310f1a.js";import"./highlight.js.31cd7941.js";import"./@highlightjs.f76f30bc.js";import"./picker.vue_vue_type_script_setup_true_lang.3307a9c8.js";import"./index.457fe352.js";const X={class:"menu-lists"},Y={key:0},Z={key:1},ee={key:2},te={class:"flex"},oe=N({name:"menu"}),Pe=N({...oe,setup(ae){const b=x(),d=x();let y=!1;const _=J(!1),{pager:k,getLists:C}=q({fetchFun:j,params:{page_type:0}}),g=async a=>{var o,s;_.value=!0,await T(),a&&((o=d.value)==null||o.setFormData({pid:a})),(s=d.value)==null||s.open("add")},R=async a=>{var o,s;_.value=!0,await T(),(o=d.value)==null||o.open("edit"),(s=d.value)==null||s.getDetail(a)},$=async a=>{await I.confirm("\u786E\u5B9A\u8981\u5220\u9664\uFF1F"),await Q({id:a}),C()},L=()=>{y=!y,w(k.lists,y)},w=(a,o=!0)=>{var s;for(const l in a)(s=b.value)==null||s.toggleRowExpansion(a[l],o),a[l].children&&w(a[l].children,o)};return C(),(a,o)=>{const s=K,l=O,u=z,B=V,A=P,M=S,f=W("perms"),U=G;return i(),v("div",X,[n(M,{class:"!border-none",shadow:"never"},{default:t(()=>[D("div",null,[c((i(),r(l,{type:"primary",onClick:o[0]||(o[0]=e=>g())},{icon:t(()=>[n(s,{name:"el-icon-Plus"})]),default:t(()=>[m(" \u65B0\u589E ")]),_:1})),[[f,["auth.menu/add"]]]),n(l,{onClick:L},{default:t(()=>[m(" \u5C55\u5F00/\u6298\u53E0 ")]),_:1})]),c((i(),r(A,{ref_key:"tableRef",ref:b,class:"mt-4",size:"large",data:p(k).lists,"row-key":"id","tree-props":{children:"children",hasChildren:"hasChildren"}},{default:t(()=>[n(u,{label:"\u83DC\u5355\u540D\u79F0",prop:"name","min-width":"150","show-overflow-tooltip":""}),n(u,{label:"\u7C7B\u578B",prop:"type","min-width":"80"},{default:t(({row:e})=>[e.type==p(h).CATALOGUE?(i(),v("div",Y,"\u76EE\u5F55")):e.type==p(h).MENU?(i(),v("div",Z,"\u83DC\u5355")):e.type==p(h).BUTTON?(i(),v("div",ee,"\u6309\u94AE")):E("",!0)]),_:1}),n(u,{label:"\u56FE\u6807",prop:"icon","min-width":"80"},{default:t(({row:e})=>[D("div",te,[n(s,{name:e.icon,size:20},null,8,["name"])])]),_:1}),n(u,{label:"\u6743\u9650\u6807\u8BC6",prop:"perms","min-width":"150","show-overflow-tooltip":""}),n(u,{label:"\u72B6\u6001",prop:"is_disable","min-width":"100"},{default:t(({row:e})=>[e.is_disable==0?(i(),r(B,{key:0},{default:t(()=>[m("\u6B63\u5E38")]),_:1})):(i(),r(B,{key:1,type:"danger"},{default:t(()=>[m("\u505C\u7528")]),_:1}))]),_:1}),n(u,{label:"\u6392\u5E8F",prop:"sort","min-width":"100"}),n(u,{label:"\u66F4\u65B0\u65F6\u95F4",prop:"update_time","min-width":"180"}),n(u,{label:"\u64CD\u4F5C",width:"160",fixed:"right"},{default:t(({row:e})=>[e.type!==p(h).BUTTON?c((i(),r(l,{key:0,type:"primary",link:"",onClick:F=>g(e.id)},{default:t(()=>[m(" \u65B0\u589E ")]),_:2},1032,["onClick"])),[[f,["auth.menu/add"]]]):E("",!0),c((i(),r(l,{type:"primary",link:"",onClick:F=>R(e)},{default:t(()=>[m(" \u7F16\u8F91 ")]),_:2},1032,["onClick"])),[[f,["auth.menu/edit"]]]),c((i(),r(l,{type:"danger",link:"",onClick:F=>$(e.id)},{default:t(()=>[m(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[f,["auth.menu/delete"]]])]),_:1})]),_:1},8,["data"])),[[U,p(k).loading]])]),_:1}),p(_)?(i(),r(H,{key:0,ref_key:"editRef",ref:d,onSuccess:p(C),onClose:o[1]||(o[1]=e=>_.value=!1)},null,8,["onSuccess"])):E("",!0)])}}});export{Pe as default};