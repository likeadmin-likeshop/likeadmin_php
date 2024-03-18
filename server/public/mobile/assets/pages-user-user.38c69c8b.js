import{_ as e}from"./page-meta.c55b99ba.js";import{ac as t,d as s,c as a,r,a as l,o as n,b as i,w as c,e as o,l as u,t as p,k as d,x as m,f,ad as g,p as y,i as x,u as v,g as _,ae as b,F as h,h as k,y as j,S as w,q as O,G as C,af as S,ag as I,ah as L,ai as M}from"./index.04b6eec4.js";import{_ as z}from"./u-avatar.69c74e01.js";import{_ as U}from"./u-icon.91768b19.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";import{_ as J}from"./u-image.92ccec93.js";import{_ as N}from"./tabbar.70dfaf6a.js";import"./u-badge.7ad692d4.js";var q=F(s({__name:"user-info",props:{pageMeta:{type:Object,default:()=>[]},content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})},user:{type:Object,default:()=>({})},isLogin:{type:Boolean}},setup(e){const s=e,{copy:v}={copy:e=>{t({data:String(e)})}};a((()=>s.pageMeta[0].content));return(t,s)=>{const a=r(l("u-avatar"),z),_=y,b=x,h=r(l("u-icon"),U);return n(),i(_,{class:"user-info mb-[0rpx]"},{default:c((()=>[o(_,{class:"flex items-center justify-between px-[50rpx] pb-[50rpx] pt-[40rpx]"},{default:c((()=>[e.isLogin?(n(),i(_,{key:0,class:"flex items-center",onClick:s[1]||(s[1]=e=>{g({url:"/pages/user_data/user_data"})})},{default:c((()=>[o(a,{src:e.user.avatar,size:120},null,8,["src"]),o(_,{class:"text-white ml-[20rpx]"},{default:c((()=>[o(_,{class:"text-2xl"},{default:c((()=>[u(p(e.user.nickname),1)])),_:1}),o(_,{class:"text-xs mt-[18rpx]",onClick:s[0]||(s[0]=d((t=>m(v)(e.user.account)),["stop"]))},{default:c((()=>[u(" 账号："+p(e.user.account),1)])),_:1})])),_:1})])),_:1})):(n(),i(b,{key:1,class:"flex items-center","hover-class":"none",url:"/pages/login/login"},{default:c((()=>[o(a,{src:"/static/images/user/default_avatar.png",size:120}),o(_,{class:"text-white text-3xl ml-[20rpx]"},{default:c((()=>[u("未登录")])),_:1})])),_:1})),e.isLogin?(n(),i(b,{key:2,"hover-class":"none",url:"/pages/user_set/user_set"},{default:c((()=>[o(h,{name:"setting",color:"#fff",size:48})])),_:1})):f("v-if",!0)])),_:1})])),_:1})}}}),[["__scopeId","data-v-369d9059"]]);const B=s({__name:"my-service",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(e){const t=e,{getImageUrl:s}=v(),i=e=>{j(e)},c=a((()=>{var e;return(null==(e=t.content.data)?void 0:e.filter((e=>"1"==e.is_show)))||[]}));return(t,a)=>{const u=r(l("u-image"),J),d=r(l("u-icon"),U);return n(),_("div",{class:"my-service bg-white mx-[20rpx] mt-[20rpx] rounded-lg p-[30rpx]"},[e.content.title?(n(),_("div",{key:0,class:"title font-medium text-lg"},[b("div",null,p(e.content.title),1)])):f("v-if",!0),1==e.content.style?(n(),_("div",{key:1,class:"grid grid-cols-4 gap-x-9 gap-y-7"},[(n(!0),_(h,null,k(m(c),((e,t)=>(n(),_("div",{key:t,class:"flex flex-col items-center pt-[40rpx]",onClick:t=>i(e.link)},[o(u,{width:"52",height:"52",src:m(s)(e.image),alt:""},null,8,["src"]),b("div",{class:"mt-[22rpx] text-sm"},p(e.name),1)],8,["onClick"])))),128))])):f("v-if",!0),2==e.content.style?(n(),_("div",{key:2},[(n(!0),_(h,null,k(m(c),((e,t)=>(n(),_("div",{key:t,class:"flex items-center border-light border-solid border-0 border-b h-[100rpx] px-[24rpx]",onClick:t=>i(e.link)},[o(u,{width:"48",height:"48",src:m(s)(e.image),alt:""},null,8,["src"]),b("div",{class:"ml-[20rpx] flex-1 text-sm"},p(e.name),1),b("div",{class:"text-muted"},[o(d,{name:"arrow-right"})])],8,["onClick"])))),128))])):f("v-if",!0)])}}}),G=s({__name:"user-banner",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(e){const t=e,{getImageUrl:s}=v(),u=a((()=>{var e;return(null==(e=t.content.data)?void 0:e.filter((e=>"1"==e.is_show)))||[]}));return(t,a)=>{const p=r(l("u-image"),J),d=w,g=O,x=y;return m(u).length&&e.content.enabled?(n(),i(x,{key:0,class:"banner h-[200rpx] mx-[20rpx] mt-[20rpx] translate-y-0"},{default:c((()=>[o(g,{class:"swiper h-full","indicator-dots":m(u).length>1,"indicator-active-color":"#4173ff",autoplay:!0},{default:c((()=>[(n(!0),_(h,null,k(m(u),((e,t)=>(n(),i(d,{key:t,onClick:t=>{return s=e.limk,void j(s);var s}},{default:c((()=>[o(p,{mode:"widthFix",width:"100%",height:"100%",src:m(s)(e.image),"border-radius":14},null,8,["src"])])),_:2},1032,["onClick"])))),128))])),_:1},8,["indicator-dots"])])),_:1})):f("v-if",!0)}}}),$=s({__name:"user",setup(t){const s=C({meta:[],pages:[]}),a=S(),{userInfo:u,isLogin:p}=I(a);return L((()=>{a.getUser()})),(async()=>{const e=await M({id:2});s.meta=JSON.parse(e.meta),s.pages=JSON.parse(e.data)})(),(t,a)=>{const d=r(l("page-meta"),e),g=r(l("w-user-info"),q),x=r(l("w-my-service"),B),v=r(l("w-user-banner"),G),b=y,j=r(l("tabbar"),N);return n(),_(h,null,[o(d,{"page-style":t.$theme.pageStyle},null,8,["page-style"]),o(b,{class:"user"},{default:c((()=>[(n(!0),_(h,null,k(s.pages,((e,t)=>(n(),i(b,{key:t},{default:c((()=>["user-info"==e.name?(n(),i(g,{key:0,pageMeta:s.meta,content:e.content,styles:e.styles,user:m(u),"is-login":m(p)},null,8,["pageMeta","content","styles","user","is-login"])):f("v-if",!0),"my-service"==e.name?(n(),i(x,{key:1,content:e.content,styles:e.styles},null,8,["content","styles"])):f("v-if",!0),"user-banner"==e.name?(n(),i(v,{key:2,content:e.content,styles:e.styles},null,8,["content","styles"])):f("v-if",!0)])),_:2},1024)))),128)),o(j)])),_:1})],64)}}});export{$ as default};
