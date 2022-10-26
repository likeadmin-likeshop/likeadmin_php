import{_ as L}from"./index.vue_vue_type_script_setup_true_lang.b696a6d7.js";import{J as D,K as V,a as b,ac as $,r as S,ad as z,a6 as H,o as r,f as d,S as I,T as f,u as e,U as N,W as K,N as M,aJ as J,h as s,c as k,j as c,D as O,G as R,t as l,a7 as q,am as G,aS as Q,bv as U,w as W,Q as X,m as i,i as n,p as Y,E as Z,k as ee,ba as te,bw as A}from"./entry.27aa371b.js";import{_ as se}from"./card.vue_vue_type_script_setup_true_lang.ba8142fd.js";import{u as ae}from"./useLockFn.09122067.js";import{g as oe,c as re,a as ne}from"./news.8d7c1cb1.js";import"./_plugin-vue_export-helper.a1a6add7.js";import"./items.vue_vue_type_script_setup_true_lang.9d2323c3.js";import"./empty_news.f8a9a4b4.js";import"./debounce.f7b0e0e6.js";const T=Symbol("breadcrumbKey"),ce=D({separator:{type:String,default:"/"},separatorIcon:{type:V}}),le=b({name:"ElBreadcrumb"}),ue=b({...le,props:ce,setup(h){const o=h,u=$("breadcrumb"),a=S();return z(T,o),H(()=>{const t=a.value.querySelectorAll(`.${u.e("item")}`);t.length&&t[t.length-1].setAttribute("aria-current","page")}),(t,x)=>(r(),d("div",{ref_key:"breadcrumb",ref:a,class:f(e(u).b()),"aria-label":"Breadcrumb",role:"navigation"},[I(t.$slots,"default")],2))}});var ie=N(ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/breadcrumb/src/breadcrumb.vue"]]);const de=D({to:{type:K([String,Object]),default:""},replace:{type:Boolean,default:!1}}),me=b({name:"ElBreadcrumbItem"}),pe=b({...me,props:de,setup(h){const o=h,u=q(),a=M(T,void 0),t=$("breadcrumb"),{separator:x,separatorIcon:y}=J(a),m=u.appContext.config.globalProperties.$router,F=S(),p=()=>{!o.to||!m||(o.replace?m.replace(o.to):m.push(o.to))};return(B,C)=>(r(),d("span",{class:f(e(t).e("item"))},[s("span",{ref_key:"link",ref:F,class:f([e(t).e("inner"),e(t).is("link",!!B.to)]),role:"link",onClick:p},[I(B.$slots,"default")],2),e(y)?(r(),k(e(R),{key:0,class:f(e(t).e("separator"))},{default:c(()=>[(r(),k(O(e(y))))]),_:1},8,["class"])):(r(),d("span",{key:1,class:f(e(t).e("separator")),role:"presentation"},l(e(x)),3))],2))}});var P=N(pe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/breadcrumb/src/breadcrumb-item.vue"]]);const _e=G(ie,{BreadcrumbItem:P}),g=Q(P),fe={class:"flex items-center"},be={class:"flex gap-4 mt-5"},he={class:"w-[750px] bg-body rounded-[8px] flex-none p-5"},xe={class:"border-b border-br pb-4"},ye={class:"font-medium text-[22px]"},ke={class:"mt-3 text-tx-secondary flex items-center flex-wrap"},Fe={key:0},Be={class:"mr-5"},Ce={class:"flex items-center"},ge=["innerHTML"],ve={class:"flex justify-center mt-[40px]"},Ee={class:"border-t border-br mt-[30px]"},we={class:"mt-5 flex"},Ae=s("span",{class:"text-tx-regular"},"\u4E0A\u4E00\u7BC7\uFF1A",-1),De={key:1},$e={class:"mt-5 flex"},Se=s("span",{class:"text-tx-regular"},"\u4E0B\u4E00\u7BC7\uFF1A",-1),Ie={key:1},Me=b({__name:"[id]",async setup(h){let o,u;const a=U(),{data:t,refresh:x}=([o,u]=W(()=>ee(()=>oe({id:a.params.id,source:a.params.source}),{initialCache:!1},"$OHlbjgrgll")),o=await o,u(),o),y=X(()=>{switch(a.params.source){case"hot":return"\u70ED\u95E8\u8D44\u8BAF";case"new":return" \u6700\u65B0\u8D44\u8BAF";default:return"\u5168\u90E8\u8D44\u8BAF"}}),m=async()=>{const p=a.params.id;t.value.collect?(await re({id:p}),A.msgSuccess("\u5DF2\u53D6\u6D88\u6536\u85CF")):(await ne({id:p}),A.msgSuccess("\u6536\u85CF\u6210\u529F")),x()},{lockFn:F}=ae(m);return(p,B)=>{var E,w;const C=L,v=te,j=se;return r(),d("div",null,[s("div",fe,[i(" \u5F53\u524D\u4F4D\u7F6E\uFF1A "),n(e(_e),{separator:"/"},{default:c(()=>[n(e(g),{to:{path:"/information"}},{default:c(()=>[i(" \u8D44\u8BAF\u4E2D\u5FC3 ")]),_:1}),n(e(g),{to:{path:`/information/${e(a).params.source}`}},{default:c(()=>[i(l(e(y)),1)]),_:1},8,["to"]),n(e(g),null,{default:c(()=>[i("\u6587\u7AE0\u8BE6\u60C5")]),_:1})]),_:1})]),s("div",be,[s("div",he,[s("div",xe,[s("span",ye,l(e(t).title),1),s("div",ke,[e(t).author?(r(),d("span",Fe,l(e(t).author)+"\xA0|\xA0 ",1)):Y("",!0),s("span",Be,l(e(t).create_time),1),s("div",Ce,[n(C,{name:"el-icon-View"}),s("span",null,"\xA0"+l(e(t).click)+"\u4EBA\u6D4F\u89C8",1)])])]),s("div",{class:"py-4",innerHTML:e(t).content},null,8,ge),s("div",ve,[n(e(Z),{size:"large",round:"",onClick:e(F)},{default:c(()=>[n(C,{name:`el-icon-${e(t).collect?"StarFilled":"Star"}`,size:16,color:e(t).collect?"#FF2C2F":"inherit"},null,8,["name","color"]),i(" \u70B9\u51FB\u6536\u85CF ")]),_:1},8,["onClick"])]),s("div",Ee,[s("div",we,[Ae,e(t).last.id?(r(),k(v,{key:0,class:"line-clamp-1 flex-1 text-primary",to:`/information/${e(a).params.source}/detail/${(E=e(t).last)==null?void 0:E.id}`},{default:c(()=>{var _;return[i(l((_=e(t).last)==null?void 0:_.title),1)]}),_:1},8,["to"])):(r(),d("span",De," \u6682\u65E0\u76F8\u5173\u6587\u7AE0 "))]),s("div",$e,[Se,e(t).next.id?(r(),k(v,{key:0,class:"line-clamp-1 flex-1 text-primary",to:`/information/${e(a).params.source}/detail/${(w=e(t).next)==null?void 0:w.id}`},{default:c(()=>{var _;return[i(l((_=e(t).next)==null?void 0:_.title),1)]}),_:1},8,["to"])):(r(),d("span",Ie," \u6682\u65E0\u76F8\u5173\u6587\u7AE0 "))])])]),n(j,{class:"flex-1",header:"\u6700\u65B0\u8D44\u8BAF",data:e(t).new,"only-title":!1,"image-size":"mini","show-author":!1,"show-desc":!1,"show-click":!1,border:!1,"title-line":2,source:"new"},null,8,["data"])])])}}});export{Me as default};