import{_ as b}from"./index.c81082b0.js";import{I as E,w as B}from"./element-plus.5649e4ba.js";import P from"./menu.ff20fd4b.js";import C from"./preview-pc.c68ffb41.js";import{_ as I}from"./attr-setting.vue_vue_type_script_setup_true_lang.40a654b2.js";import"./index.8df4c3ae.js";import{s as N,a as h}from"./decoration.c20c539b.js";import"./lodash.4558177f.js";import{d as v,Z as k,r as d,b as u,w as M,am as S,o as _,c as O,U as i,L as n,a as U,u as p,j as f,M as F,K as J,R}from"./@vue.90bde458.js";import{d as T}from"./index.221d66d0.js";import"./lodash-es.151604d4.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.c9321399.js";import"./@element-plus.637a59d4.js";import"./dayjs.f6b311c4.js";import"./axios.0043c060.js";import"./@ctrl.b082b0c1.js";import"./normalize-wheel-es.8aeb3683.js";import"./@popperjs.36402333.js";import"./vue-router.1051b4fa.js";import"./pinia.8db5076b.js";import"./css-color-function.4c79dc15.js";import"./color.a28dd44c.js";import"./clone.238ad270.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.6fbc6031.js";import"./vue-clipboard3.f565fd84.js";import"./clipboard.a7169b77.js";import"./echarts.5016c48c.js";import"./zrender.58d022a1.js";import"./tslib.60310f1a.js";import"./highlight.js.31cd7941.js";import"./@highlightjs.f76f30bc.js";import"./attr.vue_vue_type_script_setup_true_lang.a65904c3.js";import"./index.4c5b160f.js";import"./picker.b42cc12b.js";import"./index.457fe352.js";import"./picker.0fe63622.js";import"./index.7830c723.js";import"./index.vue_vue_type_script_setup_true_lang.ca18352a.js";import"./index.825eaa5b.js";import"./index.vue_vue_type_script_setup_true_lang.a48e4341.js";import"./usePaging.63ca32b2.js";import"./vue3-video-play.6ca8fb7a.js";import"./vuedraggable.6cb4d830.js";import"./vue.e147f0f4.js";import"./sortablejs.f52b587b.js";import"./content.vue_vue_type_script_setup_true_lang.4dc8e10e.js";import"./decoration-img.7acef31d.js";import"./attr.vue_vue_type_script_setup_true_lang.ec7b7b1f.js";import"./content.3f66f5b1.js";import"./attr.vue_vue_type_script_setup_true_lang.a623916e.js";import"./add-nav.vue_vue_type_script_setup_true_lang.12587889.js";import"./content.aed82447.js";import"./attr.vue_vue_type_script_setup_true_lang.be1af4dc.js";import"./content.vue_vue_type_script_setup_true_lang.82738732.js";import"./attr.vue_vue_type_script_setup_true_lang.50d47f58.js";import"./content.86467b82.js";import"./attr.vue_vue_type_script_setup_true_lang.60ccbea9.js";import"./content.cbd2472a.js";import"./attr.vue_vue_type_script_setup_true_lang.fce06ff2.js";import"./content.vue_vue_type_script_setup_true_lang.ad2d1fae.js";import"./attr.vue_vue_type_script_setup_true_lang.bed25cc5.js";import"./content.22bc7ffe.js";const W={class:"decoration-pages min-w-[1100px]"},j={class:"flex h-full items-start"},H=v({name:"decorationPc"}),K=v({...H,setup(L){let l;(t=>{t.HOME="4"})(l||(l={}));const a=k({[4]:{id:4,type:4,name:"\u9996\u9875\u88C5\u4FEE",pageData:[]}}),o=d("4"),r=d(0),m=u(()=>{var t,e;return(e=(t=a[o.value])==null?void 0:t.pageData)!=null?e:[]}),g=u(()=>{var t,e;return(e=(t=a[o.value])==null?void 0:t.pageData[r.value])!=null?e:""}),c=async()=>{const t=await h({id:o.value});a[String(t.id)].pageData=JSON.parse(t.data),r.value=m.value.findIndex(e=>!e.disabled)},x=async()=>{await N({...a[o.value],data:JSON.stringify(a[o.value].pageData)}),c()};return M(o,()=>{r.value=m.value.findIndex(t=>!t.disabled),c()},{immediate:!0}),(t,e)=>{const D=E,w=B,y=b,V=S("perms");return _(),O("div",W,[i(D,{shadow:"never",class:"!border-none flex-1 flex","body-style":{flex:1}},{default:n(()=>[U("div",j,[i(P,{modelValue:p(o),"onUpdate:modelValue":e[0]||(e[0]=s=>f(o)?o.value=s:null),menus:p(a)},null,8,["modelValue","menus"]),i(C,{class:"mx-4",modelValue:p(r),"onUpdate:modelValue":e[1]||(e[1]=s=>f(r)?r.value=s:null),pageData:p(m)},null,8,["modelValue","pageData"]),i(I,{class:"flex-1",widget:p(g),type:"pc"},null,8,["widget"])])]),_:1}),F((_(),J(y,{class:"mt-4",fixed:!1},{default:n(()=>[i(w,{type:"primary",onClick:x},{default:n(()=>[R("\u4FDD\u5B58")]),_:1})]),_:1})),[[V,["decorate:pages:save"]]])])}}});const ie=T(K,[["__scopeId","data-v-63d3cf8a"]]);export{ie as default};