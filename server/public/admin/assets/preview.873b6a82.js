import{w as S,a as P,E as T}from"./element-plus.08b948e2.js";import{d as z,r as L,b,o as i,K as k,L as s,c as f,U as l,R as O,Q as C,a as c,T as U,a9 as j,O as V,H,P as J,u,a3 as B}from"./@vue.90bde458.js";import{e as K}from"./index.a6b31917.js";import{v as Q,h as R,I as W,J as q}from"./@element-plus.8a485a82.js";import{d as G}from"./index.6b52e89a.js";import"./lodash-es.151604d4.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.c9321399.js";import"./dayjs.f6b311c4.js";import"./axios.0043c060.js";import"./@ctrl.b082b0c1.js";import"./normalize-wheel-es.8aeb3683.js";import"./@popperjs.36402333.js";import"./attr.8c937d3e.js";import"./index.d8426e3f.js";import"./picker.1d812053.js";import"./index.4e9f0d61.js";import"./picker.58095d5e.js";import"./index.fc95fd93.js";import"./index.vue_vue_type_script_setup_true_lang.8822ac4c.js";import"./index.85f7e998.js";import"./index.vue_vue_type_script_setup_true_lang.da8cee7e.js";import"./usePaging.63ca32b2.js";import"./vue3-video-play.6ca8fb7a.js";import"./vuedraggable.6cb4d830.js";import"./vue.e147f0f4.js";import"./sortablejs.f52b587b.js";import"./lodash.4558177f.js";import"./vue-router.1051b4fa.js";import"./pinia.8db5076b.js";import"./css-color-function.4c79dc15.js";import"./color.a28dd44c.js";import"./clone.238ad270.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.6fbc6031.js";import"./vue-clipboard3.f565fd84.js";import"./clipboard.a7169b77.js";import"./echarts.5016c48c.js";import"./zrender.58d022a1.js";import"./tslib.60310f1a.js";import"./highlight.js.31cd7941.js";import"./@highlightjs.f76f30bc.js";import"./content.vue_vue_type_script_setup_true_lang.89c9167f.js";import"./decoration-img.7226dd9c.js";import"./attr.vue_vue_type_script_setup_true_lang.98e90453.js";import"./content.a891fc39.js";import"./attr.vue_vue_type_script_setup_true_lang.7c32978c.js";import"./content.vue_vue_type_script_setup_true_lang.928f8d8e.js";import"./attr.vue_vue_type_script_setup_true_lang.b2f16b55.js";import"./add-nav.vue_vue_type_script_setup_true_lang.0d9e1c1f.js";import"./content.dd9cbabc.js";import"./attr.vue_vue_type_script_setup_true_lang.cf5d4713.js";import"./content.vue_vue_type_script_setup_true_lang.89ff5502.js";import"./attr.vue_vue_type_script_setup_true_lang.50d47f58.js";import"./content.416daca1.js";import"./decoration.c84ae3ab.js";import"./attr.vue_vue_type_script_setup_true_lang.3a1f7ba7.js";import"./index.vue_vue_type_script_setup_true_lang.f14a3dba.js";import"./content.b7ec4667.js";import"./attr.vue_vue_type_script_setup_true_lang.60ccbea9.js";import"./content.10e1722b.js";import"./attr.vue_vue_type_script_setup_true_lang.e62ebc9e.js";import"./content.vue_vue_type_script_setup_true_lang.660b8c8e.js";import"./attr.vue_vue_type_script_setup_true_lang.bed25cc5.js";import"./content.bf4eb888.js";const X={class:"shadow mx-[30px] pages-preview"},Y=["onClick"],Z={key:0,class:"widget-btns py-[5px]"},g=z({__name:"preview",props:{pageMete:{type:Object,default:()=>{}},pageData:{type:Array,default:()=>[]},modelValue:{type:Number,default:0}},emits:["update:modelValue"],setup(m,{emit:E}){const a=m,d=E,y=L(-1),D=()=>{a.modelValue===-1?d("update:modelValue",y.value):(y.value=a.modelValue,d("update:modelValue",-1))},M=(e,o)=>{e.disabled||d("update:modelValue",o)},F=b(()=>e=>e===0),N=b(()=>e=>{var o;return((o=a.pageData)==null?void 0:o.length)===e+1}),_=b(()=>e=>(e==null?void 0:e.enabled)==0),$=e=>{e.enabled!==void 0&&(e.enabled=e.enabled?0:1)},h=(e,o)=>{if(e<0||e>=a.pageData.length||o<0||o>=a.pageData.length)return;const p=a.pageData.splice(e,1)[0];a.pageData.splice(o,0,p),d("update:modelValue",o)};return(e,o)=>{const p=S,v=P,A=T;return i(),k(A,{class:"pages-preview-container"},{default:s(()=>[m.pageMete!==null?(i(),f("div",{key:0,class:"absolute right-4 top-4",onClick:D},[l(p,null,{default:s(()=>[O("\u9875\u9762\u8BBE\u7F6E")]),_:1})])):C("",!0),c("div",X,[(i(!0),f(U,null,j(m.pageData,(t,r)=>(i(),f("div",{key:t.id,class:V(["relative",{"cursor-pointer":!(t!=null&&t.disabled)}]),onClick:n=>M(t,r)},[c("div",{class:V(["absolute w-full h-full z-[100] border-dashed",{select:r==m.modelValue,hide:_.value(t.content),"border-[#dcdfe6] border-2":!(t!=null&&t.disabled)}])},null,2),H(e.$slots,"default",{},()=>{var n;return[(i(),k(J((n=u(K)[t==null?void 0:t.name])==null?void 0:n.content),{content:t.content,styles:t.styles,key:t.id},null,8,["content","styles"]))]},!0),r==m.modelValue?(i(),f("div",Z,[c("div",null,[l(v,{effect:"dark",content:_.value(t.content)?"\u663E\u793A":"\u9690\u85CF",placement:"right"},{default:s(()=>[l(p,{class:"py-[5px]",type:"primary",icon:_.value(t.content)?u(Q):u(R),onClick:n=>$(t.content)},null,8,["icon","onClick"])]),_:2},1032,["content"])]),c("div",null,[l(v,{effect:"dark",content:"\u4E0A\u79FB",placement:"right"},{default:s(()=>[l(p,{class:"py-[5px]",type:"primary",icon:u(W),disabled:F.value(r),onClick:B(n=>h(r,r-1),["stop"])},null,8,["icon","disabled","onClick"])]),_:2},1024)]),c("div",null,[l(v,{effect:"dark",content:"\u4E0B\u79FB",placement:"right"},{default:s(()=>[l(p,{class:"py-[5px]",type:"primary",icon:u(q),disabled:N.value(r),onClick:B(n=>h(r,r+1),["stop"])},null,8,["icon","disabled","onClick"])]),_:2},1024)])])):C("",!0)],10,Y))),128))])]),_:3})}}});const ut=G(g,[["__scopeId","data-v-02898f5f"]]);export{ut as default};