import{_ as m,d as p,l as f,m as v,o as s,c as h,a as e,w as t,e as l,f as r,cU as C}from"./index.4026a001.js";import{E}from"./el-card.8bc70aa0.js";import{E as b,a as B}from"./el-table-column.930005fc.js";import"./el-checkbox.34358670.js";import"./el-tag.73419346.js";import{i as k}from"./setting.96286e40.js";import"./event.776e7e11.js";const A=p({setup(){const a=f({server:[],env:[],auth:[]}),c=()=>{k().then(n=>{console.log("res",n),a.server=n.server,a.env=n.env,a.auth=n.auth})};return v(()=>{c()}),{info:a,getSystemInfo:c}}}),w={class:"system-environment"},y=l("div",null,"\u670D\u52A1\u5668\u4FE1\u606F",-1),F={class:"m-t-15"},$=l("div",null,"PHP\u73AF\u5883\u8981\u6C42",-1),S={class:"m-t-15"},D=l("div",null,"\u76EE\u5F55\u6743\u9650",-1),g={class:"m-t-15"};function q(a,c,n,I,N,P){const o=b,d=B,i=E,u=C;return s(),h("div",w,[e(i,{shadow:"never"},{default:t(()=>[y,l("div",F,[e(d,{data:a.info.server},{default:t(()=>[e(o,{prop:"param",label:"\u53C2\u6570"}),e(o,{prop:"value",label:"\u503C"})]),_:1},8,["data"])])]),_:1}),e(i,{shadow:"never",class:"m-t-15"},{default:t(()=>[$,l("div",S,[e(d,{data:a.info.env},{default:t(()=>[e(o,{prop:"option",label:"\u9009\u9879"}),e(o,{prop:"require",label:"\u8981\u6C42"}),e(o,{label:"\u72B6\u6001"},{default:t(_=>[_.row.status?(s(),r(u,{key:0,name:"el-icon-Select",color:"#67C23A"})):(s(),r(u,{key:1,name:"el-icon-CloseBold",color:"#DB2828"}))]),_:1}),e(o,{prop:"remark",label:"\u8BF4\u660E\u53CA\u5E2E\u52A9"})]),_:1},8,["data"])])]),_:1}),e(i,{shadow:"never",class:"m-t-15"},{default:t(()=>[D,l("div",g,[e(d,{data:a.info.auth},{default:t(()=>[e(o,{prop:"dir",label:"\u9009\u9879"}),e(o,{prop:"require",label:"\u8981\u6C42"}),e(o,{label:"\u72B6\u6001"},{default:t(_=>[_.row.status?(s(),r(u,{key:0,name:"el-icon-Select",color:"#67C23A"})):(s(),r(u,{key:1,name:"el-icon-CloseBold",color:"#DB2828"}))]),_:1}),e(o,{prop:"remark",label:"\u8BF4\u660E\u53CA\u5E2E\u52A9"})]),_:1},8,["data"])])]),_:1})])}var z=m(A,[["render",q]]);export{z as default};