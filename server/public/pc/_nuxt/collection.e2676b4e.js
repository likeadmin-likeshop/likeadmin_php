import{a as g,f as x,w as h,o as a,h as o,u as t,H as y,b9 as C,i as s,j as u,c as v,p as k,t as d,k as b,m as E,b6 as w,E as D,c8 as F}from"./entry.1150dd33.js";import{u as $}from"./asyncData.c1143cbf.js";import{e as j,c as z}from"./news.50c5a1de.js";import{a as B,E as N,e as V}from"./empty_news.cb45a1b6.js";import{E as A}from"./index.03f7f858.js";import"./debounce.2cab6c4b.js";import"./index.9ff5f032.js";import"./index.69ccc880.js";import"./_getTag.19e83419.js";const M={class:"px-[30px] py-5 user-info min-h-full flex flex-col"},S=s("div",{class:"border-b border-br pb-5"},[s("span",{class:"text-2xl font-medium"},"\u6211\u7684\u6536\u85CF")],-1),q={key:0},H=["onClick"],I={class:"border-b border-br py-4 flex items-center"},L={class:"flex-1"},O={class:"text-lg font-medium line-clamp-1"},P={class:"text-tx-regular line-clamp-2 mt-4"},T={class:"mt-5 text-tx-secondary flex justify-between"},U={class:"py-4 flex justify-end"},G={key:1,class:"flex flex-1 justify-center items-center"},se=g({__name:"collection",async setup(J){let n,p;const i=x({page_no:1,page_size:15}),{data:r,refresh:m}=([n,p]=h(()=>$(()=>j(i),{initialCache:!1},"$0MtqemkOuk")),n=await n,p(),n),_=async c=>{await z({id:c}),F.msgSuccess("\u5DF2\u53D6\u6D88\u6536\u85CF"),m()};return(c,l)=>(a(),o("div",M,[S,t(r).lists.length?(a(),o("div",q,[(a(!0),o(y,null,C(t(r).lists,e=>(a(),o("div",{class:"cursor-pointer",key:e.id,onClick:f=>c.$router.push(`/information/detail/${e.article_id}`)},[s("div",I,[e.image?(a(),v(t(N),{key:0,class:"flex-none w-[180px] h-[135px] mr-4",src:e.image,fit:"cover"},null,8,["src"])):k("",!0),s("div",L,[s("div",O,d(e.title),1),s("div",P,d(e.desc),1),s("div",T,[s("div",null,"\u6536\u85CF\u4E8E"+d(e.collect_time),1),u(t(D),{link:"",onClick:w(f=>_(e.article_id),["stop"])},{default:b(()=>[E(" \u53D6\u6D88\u6536\u85CF ")]),_:2},1032,["onClick"])])])])],8,H))),128)),s("div",U,[u(t(A),{"current-page":i.page_no,"onUpdate:current-page":l[0]||(l[0]=e=>i.page_no=e),total:t(r).count,"page-size":i.page_size,"hide-on-single-page":"",layout:"total, prev, pager, next, jumper",onCurrentChange:l[1]||(l[1]=e=>t(m)())},null,8,["current-page","total","page-size"])])])):(a(),o("div",G,[u(t(B),{image:t(V),description:"\u6682\u65E0\u6536\u85CF","image-size":250},null,8,["image"])]))]))}});export{se as default};
