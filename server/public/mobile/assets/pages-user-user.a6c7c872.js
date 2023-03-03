import{a6 as e,d as t,r as s,a,o as r,c as n,w as l,b as c,l as o,t as i,v as u,g as d,h as p,H as f,k as m,i as y,u as x,e as g,a7 as b,F as v,f as _,S as k,j as h,m as j,a8 as w,a9 as C,aa as O}from"./index.d35e3d3f.js";import{_ as I}from"./u-avatar.0c597b95.js";import{_ as L}from"./u-icon.c0d4d6a2.js";import{_ as z}from"./plugin-vue_export-helper.21dcd24c.js";import{_ as S}from"./u-image.61cb41b1.js";import{n as U}from"./util.31490c5c.js";import{_ as F}from"./tabbar.f89e68f3.js";import{a as B}from"./shop.d9cccaf5.js";import"./u-badge.a7e54eaf.js";var H=z(t({__name:"user-info",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})},user:{type:Object,default:()=>({})},isLogin:{type:Boolean}},setup(t){const{copy:x}={copy:t=>{e({data:String(t)})}};return(e,g)=>{const b=s(a("u-avatar"),I),v=m,_=y,k=s(a("u-icon"),L);return r(),n(v,{class:"user-info flex px-[50rpx] justify-between py-[50rpx]"},{default:l((()=>[t.isLogin?(r(),n(v,{key:0,class:"flex items-center",onClick:g[1]||(g[1]=e=>{f({url:"/pages/user_data/user_data"})})},{default:l((()=>[c(b,{src:t.user.avatar,size:120},null,8,["src"]),c(v,{class:"text-white ml-[20rpx]"},{default:l((()=>[c(v,{class:"text-2xl"},{default:l((()=>[o(i(t.user.nickname),1)])),_:1}),c(v,{class:"text-xs mt-[18rpx]",onClick:g[0]||(g[0]=u((e=>d(x)(t.user.account)),["stop"]))},{default:l((()=>[o(" 账号："+i(t.user.account),1)])),_:1})])),_:1})])),_:1})):(r(),n(_,{key:1,class:"flex items-center","hover-class":"none",url:"/pages/login/login"},{default:l((()=>[c(b,{src:"/static/images/user/default_avatar.png",size:120}),c(v,{class:"text-white text-3xl ml-[20rpx]"},{default:l((()=>[o("未登录")])),_:1})])),_:1})),t.isLogin?(r(),n(_,{key:2,"hover-class":"none",url:"/pages/user_set/user_set"},{default:l((()=>[c(k,{name:"setting",color:"#fff",size:48})])),_:1})):p("v-if",!0)])),_:1})}}}),[["__scopeId","data-v-4c42a4cc"]]);const J=t({__name:"my-service",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(e){const{getImageUrl:t}=x(),n=e=>{U(e)};return(l,o)=>{const u=s(a("u-image"),S),f=s(a("u-icon"),L);return r(),g("div",{class:"my-service bg-white mx-[20rpx] mt-[20rpx] rounded-lg"},[e.content.title?(r(),g("div",{key:0,class:"title px-[30rpx] py-[20rpx] font-medium text-xl border-light border-solid border-0 border-b"},[b("div",null,i(e.content.title),1)])):p("v-if",!0),1==e.content.style?(r(),g("div",{key:1,class:"flex flex-wrap pt-[40rpx] pb-[20rpx]"},[(r(!0),g(v,null,_(e.content.data,((e,s)=>(r(),g("div",{key:s,class:"flex flex-col items-center w-1/4 mb-[15px]",onClick:t=>n(e.link)},[c(u,{width:"52",height:"52",src:d(t)(e.image),alt:""},null,8,["src"]),b("div",{class:"mt-[7px]"},i(e.name),1)],8,["onClick"])))),128))])):p("v-if",!0),2==e.content.style?(r(),g("div",{key:2},[(r(!0),g(v,null,_(e.content.data,((e,s)=>(r(),g("div",{key:s,class:"flex items-center border-light border-solid border-0 border-b h-[100rpx] px-[24rpx]",onClick:t=>n(e.link)},[c(u,{width:"48",height:"48",src:d(t)(e.image),alt:""},null,8,["src"]),b("div",{class:"ml-[20rpx] flex-1"},i(e.name),1),b("div",{class:"text-muted"},[c(f,{name:"arrow-right"})])],8,["onClick"])))),128))])):p("v-if",!0)])}}}),N=t({__name:"user-banner",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(e){const{getImageUrl:t}=x();return(o,i)=>{const u=s(a("u-image"),S),f=k,y=h,x=m;return e.content.data.length&&e.content.enabled?(r(),n(x,{key:0,class:"banner h-[200rpx] mx-[20rpx] mt-[20rpx] translate-y-0"},{default:l((()=>[c(y,{class:"swiper h-full","indicator-dots":e.content.data.length>1,"indicator-active-color":"#4173ff",autoplay:!0},{default:l((()=>[(r(!0),g(v,null,_(e.content.data,((e,s)=>(r(),n(f,{key:s,onClick:t=>{return s=e.limk,void U(s);var s}},{default:l((()=>[c(u,{mode:"aspectFit",width:"100%",height:"100%",src:d(t)(e.image),"border-radius":14},null,8,["src"])])),_:2},1032,["onClick"])))),128))])),_:1},8,["indicator-dots"])])),_:1})):p("v-if",!0)}}}),q=t({__name:"user",setup(e){const t=j({pages:[]}),o=w(),{userInfo:i,isLogin:u}=C(o);return O((()=>{o.getUser()})),(async()=>{const e=await B({id:2});t.pages=JSON.parse(e.data)})(),(e,o)=>{const f=s(a("w-user-info"),H),y=s(a("w-my-service"),J),x=s(a("w-user-banner"),N),b=m,k=s(a("tabbar"),F);return r(),n(b,{class:"user"},{default:l((()=>[(r(!0),g(v,null,_(t.pages,((e,t)=>(r(),n(b,{key:t},{default:l((()=>["user-info"==e.name?(r(),n(f,{key:0,content:e.content,styles:e.styles,user:d(i),"is-login":d(u)},null,8,["content","styles","user","is-login"])):p("v-if",!0),"my-service"==e.name?(r(),n(y,{key:1,content:e.content,styles:e.styles},null,8,["content","styles"])):p("v-if",!0),"user-banner"==e.name?(r(),n(x,{key:2,content:e.content,styles:e.styles},null,8,["content","styles"])):p("v-if",!0)])),_:2},1024)))),128)),c(k)])),_:1})}}});export{q as default};