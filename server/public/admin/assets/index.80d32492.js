import{d as p,r as E,m as f,s as B,o as s,c as g,a as e,w as t,e as h,h as C,f as _,g as l,E as b}from"./index.4026a001.js";import{E as A,a as x}from"./el-table-column.930005fc.js";import"./el-checkbox.34358670.js";import"./el-tag.73419346.js";import{E as v}from"./el-card.8bc70aa0.js";import{E as w}from"./el-alert.81c7dc29.js";import{g as k}from"./setting.96286e40.js";import{E as D}from"./index.aa0fcd74.js";import"./event.776e7e11.js";const y={class:"storage"},L=l("\u5F00\u542F"),T=l("\u5173\u95ED"),N=l("\u8BBE\u7F6E"),P=p({__name:"index",setup(V){let o=E([]);const c=async()=>{o.value=await k(),console.log("storageLists.value",o.value)};return f(()=>{c()}),(S,q)=>{const i=w,n=v,u=A,r=D,F=b,m=B("router-link"),d=x;return s(),g("div",y,[e(n,{shadow:"never"},{default:t(()=>[e(i,{class:"xxl",title:"\u6E29\u99A8\u63D0\u793A\uFF1A1.\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\u540E\uFF0C\u9700\u8981\u5C06\u8D44\u6E90\u6587\u4EF6\u4F20\u8F93\u81F3\u65B0\u7684\u5B58\u50A8\u7AEF\uFF1B2.\u8BF7\u52FF\u968F\u610F\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\uFF0C\u53EF\u80FD\u5BFC\u81F4\u56FE\u7247\u65E0\u6CD5\u67E5\u770B",closable:!1,"show-icon":""})]),_:1}),e(n,{class:"m-t-15",shadow:"never"},{default:t(()=>[h("div",null,[e(d,{class:"m-t-20",data:C(o)},{default:t(()=>[e(u,{label:"\u50A8\u5B58\u65B9\u5F0F",prop:"name"}),e(u,{label:"\u50A8\u5B58\u4F4D\u7F6E",prop:"path"}),e(u,{label:"\u72B6\u6001",width:"100"},{default:t(({row:a})=>[a.status==1?(s(),_(r,{key:0},{default:t(()=>[L]),_:1})):(s(),_(r,{key:1,type:"info"},{default:t(()=>[T]),_:1}))]),_:1}),e(u,{label:"\u64CD\u4F5C",fixed:"right",width:"100"},{default:t(({row:a})=>[e(m,{class:"m-r-10",to:{path:"/setting/storage/edit",query:{engine:a.engine}}},{default:t(()=>[e(F,{type:"text"},{default:t(()=>[N]),_:1})]),_:2},1032,["to"])]),_:1})]),_:1},8,["data"])])]),_:1})])}}});export{P as default};