import{b as n,d as m}from"./index.6b52e89a.js";import{g as d}from"./decoration.c84ae3ab.js";import{d as l,r as _,o as s,c as i,T as x,a9 as f,u,a as t,Q as v,S as c,U as h,bl as y,bk as b}from"./@vue.90bde458.js";import"./element-plus.08b948e2.js";import"./lodash-es.151604d4.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.c9321399.js";import"./@element-plus.8a485a82.js";import"./dayjs.f6b311c4.js";import"./axios.0043c060.js";import"./@ctrl.b082b0c1.js";import"./normalize-wheel-es.8aeb3683.js";import"./@popperjs.36402333.js";import"./lodash.4558177f.js";import"./vue-router.1051b4fa.js";import"./pinia.8db5076b.js";import"./css-color-function.4c79dc15.js";import"./color.a28dd44c.js";import"./clone.238ad270.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.6fbc6031.js";import"./vue-clipboard3.f565fd84.js";import"./clipboard.a7169b77.js";import"./echarts.5016c48c.js";import"./zrender.58d022a1.js";import"./tslib.60310f1a.js";import"./highlight.js.31cd7941.js";import"./@highlightjs.f76f30bc.js";const w=o=>(y("data-v-eae5985d"),o=o(),b(),o),g={class:"news"},k=w(()=>t("div",{class:"flex items-center news-title mx-[10px] my-[15px] text-[17px] font-medium"}," \u6700\u65B0\u8D44\u8BAF ",-1)),j={key:0,class:"mr-[10px]"},B=["src"],D={class:"flex flex-col justify-between flex-1"},S={class:"text-[15px] font-medium line-clamp-2"},I={class:"line-clamp-1 text-sm mt-[8px]"},V={class:"text-[#999] text-xs w-full flex justify-between mt-[8px]"},N={class:"flex items-center"},A={class:"ml-[5px]"},C=l({__name:"content",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(o){const a=_([]);return(async()=>{const r=await d({limit:10});a.value=r})(),(r,L)=>{const p=n;return s(),i("div",g,[k,(s(!0),i(x,null,f(u(a),e=>(s(),i("div",{key:e.id,class:"news-card flex bg-white px-[10px] py-[16px] text-[#333] border-[#f2f2f2] border-b"},[e.image?(s(),i("div",j,[t("img",{src:e.image,class:"w-[120px] h-[90px] object-contain"},null,8,B)])):v("",!0),t("div",D,[t("div",S,c(e.title),1),t("div",I,c(e.desc),1),t("div",V,[t("div",null,c(e.create_time),1),t("div",N,[h(p,{name:"el-icon-View"}),t("div",A,c(e.click),1)])])])]))),128))])}}});const _t=m(C,[["__scopeId","data-v-eae5985d"]]);export{_t as default};