import{_ as f}from"./items.vue_vue_type_script_setup_true_lang.9d2323c3.js";import{a as y,bv as h,e as k,w,Q as x,a4 as v,o as r,f as n,h as p,t as B,u as t,H as E,b6 as A,i as m,k as D,c as C}from"./entry.27aa371b.js";import{a as b,e as q}from"./empty_news.f8a9a4b4.js";import{b as z}from"./news.8d7c1cb1.js";import{E as F}from"./index.9ca14bad.js";import"./debounce.f7b0e0e6.js";import"./index.c9c6ef4c.js";import"./index.dcb1c0f5.js";import"./_getTag.3390a3ae.js";const S={class:"min-h-full flex flex-col"},$={class:"text-4xl mb-5"},j={key:0,class:"bg-white px-5 rounded overflow-hidden"},I={class:"py-4 flex justify-end"},L={key:1,class:"flex-1 flex justify-center items-center"},J=y({__name:"index",async setup(N){let o,u;const s=h(),a=k({page_no:1,page_size:15,keyword:s.query.keywords,cid:s.query.cid||"",sort:s.params.source}),{data:c,refresh:l}=([o,u]=w(()=>D(()=>z(a),{initialCache:!1},"$ewxCUYuASd")),o=await o,u(),o),_=x(()=>{switch(s.params.source){case"hot":return"\u70ED\u95E8\u8D44\u8BAF";case"new":return" \u6700\u65B0\u8D44\u8BAF";default:return"\u5168\u90E8\u8D44\u8BAF"}});return v(()=>s.query.keywords,d=>{a.keyword=d,l()}),(d,i)=>{const g=f;return r(),n("div",S,[p("div",$,B(t(s).query.keywords||t(s).query.name||t(_)),1),t(c).lists.length?(r(),n("div",j,[(r(!0),n(E,null,A(t(c).lists,e=>(r(),C(g,{key:e.id,id:e.id,title:e.title,desc:e.desc,click:e.click,author:e.author,"create-time":e.create_time,image:e.image,"only-title":!1},null,8,["id","title","desc","click","author","create-time","image"]))),128)),p("div",I,[m(t(F),{"current-page":a.page_no,"onUpdate:current-page":i[0]||(i[0]=e=>a.page_no=e),total:t(c).count,"page-size":a.page_size,"hide-on-single-page":"",onCurrentChange:i[1]||(i[1]=e=>t(l)())},null,8,["current-page","total","page-size"])])])):(r(),n("div",L,[m(t(b),{image:t(q),description:"\u6682\u65E0\u8D44\u8BAF","image-size":250},null,8,["image"])]))])}}});export{J as default};