import{_ as v}from"./items.vue_vue_type_script_setup_true_lang.431c3035.js";import{_ as C}from"./card.vue_vue_type_script_setup_true_lang.bc608bdb.js";import{a as b,w as z,o as t,f as a,h as s,G as n,b8 as l,u as m,c as A,j as d,i as f,t as k}from"./entry.06e31900.js";import{u as B}from"./asyncData.01194602.js";import{d as D}from"./news.50c5a1de.js";import"./empty_news.85a64063.js";import"./debounce.7064df80.js";const $=""+new URL("placeholder.1ccc50b9.png",import.meta.url).href,F=s("div",{class:"text-4xl mb-5"},"\u8D44\u8BAF\u4E2D\u5FC3",-1),I={class:"flex flex-wrap gap-4"},L={class:"px-4 py-5"},V={class:"flex gap-2.5"},E={class:"line-clamp-2"},G={class:"line-clamp-1"},U=b({__name:"index",async setup(N){let i,_;const{data:w}=([i,_]=z(()=>B(()=>D(),"$zJ3VKA3QFG")),i=await i,_(),i),p=o=>({topThree:o.slice(0,3),remain:o.slice(3)});return(o,g)=>{const u=v,x=C;return t(),a("div",null,[F,s("div",I,[(t(!0),a(n,null,l(m(w),c=>(t(),A(x,{style:{width:"calc(50% - 8px)"},key:c.id,header:c.name,data:c.article,link:`/information/default?cid=${c.id}&name=${c.name}`},{content:d(({data:h})=>[s("div",L,[s("div",V,[(t(!0),a(n,null,l(p(h).topThree,(e,r)=>(t(),a("div",{class:"w-[180px] bg-page rounded overflow-hidden",key:e.id},[f(u,{index:r,id:e.id,title:e.title,desc:e.desc,click:e.click,author:e.author,"create-time":e.create_time,image:e.image||m($),"only-title":!1,border:!1,"show-author":!1,"show-desc":!1,"show-time":!1,"show-click":!1,"is-horizontal":!0},{title:d(({title:y})=>[s("span",E,k(y),1)]),_:2},1032,["index","id","title","desc","click","author","create-time","image"])]))),128))]),(t(!0),a(n,null,l(p(h).remain,e=>(t(),a("div",{key:e.id},[f(u,{id:e.id,title:e.title,desc:e.desc,click:e.click,author:e.author,"create-time":e.create_time,image:e.image,"only-title":!0,"show-time":!1},{title:d(({title:r})=>[s("span",G,k(r),1)]),_:2},1032,["id","title","desc","click","author","create-time","image"])]))),128))])]),_:2},1032,["header","data","link"]))),128))])])}}});export{U as default};