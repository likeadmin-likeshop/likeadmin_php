import{F as d}from"./index.4d18e569.js";import{e as b,f as C}from"./setting.07722716.js";import{_ as B}from"./index.c7cd6466.js";import{d as k,r as D,o as V,a as r,b as h,c as g,f as e,w as t,e as m,m as E}from"./vendor.41e472b3.js";const v=k({components:{FooterBtns:d},setup(){const u=D({info:"",icp_number:"",icp_link:"",public_number:"",public_link:""}),l={},p=()=>{b().then(o=>{console.log("res",o),u.info=o.info,u.icp_number=o.icp_number,u.icp_link=o.icp_link,u.public_number=o.public_number,u.public_link=o.public_link})},s=()=>{C({info:u.info,icp_number:u.icp_number,icp_link:u.icp_link,public_number:u.public_number,public_link:u.public_link}).then(o=>{console.log("res",o),p()}).catch(o=>{console.log("err",o)})};return V(()=>{p()}),{formData:u,rules:l,getCopyright:p,setCopyright:s}}}),w={class:"website-filing"},y=m("div",{class:"muted xs m-r-16"},"\u4F8B\u5982\u586B\u5199\uFF0CCopyright \xA9 2019-2020 \u516C\u53F8\u540D\u79F0",-1),A=m("div",{class:"muted xs m-r-16"}," \u4F8B\u5982\u586B\u5199\u57DF\u540D\u4FE1\u606F\u5907\u6848\u7CFB\u7EDF\u94FE\u63A5\uFF0Chttp://beian.miit.gov.cn ",-1),U=m("div",{class:"muted xs m-r-16"}," \u4F8B\u5982\u586B\u5199\u516C\u5B89\u4FE1\u606F\u5907\u6848\u7CFB\u7EDF\u94FE\u63A5\uFF0Chttp://www.beian.gov.cn ",-1),I=E("\u4FDD\u5B58");function P(u,l,p,s,o,$){const i=r("el-input"),a=r("el-form-item"),c=r("el-form"),_=r("el-card"),f=r("el-button"),F=d;return h(),g("div",w,[e(_,{shadow:"never",class:""},{default:t(()=>[e(c,{ref:"form",rules:u.rules,class:"ls-form",model:u.formData,"label-width":"150px",size:"small"},{default:t(()=>[e(a,{label:"\u7248\u6743\u4FE1\u606F",prop:"info"},{default:t(()=>[e(i,{modelValue:u.formData.info,"onUpdate:modelValue":l[0]||(l[0]=n=>u.formData.info=n),placeholder:"\u8BF7\u8F93\u5165\u7248\u6743\u4FE1\u606F"},null,8,["modelValue"]),y]),_:1}),e(a,{label:"ICP\u5907\u6848\u53F7",prop:"icp_number"},{default:t(()=>[e(i,{modelValue:u.formData.icp_number,"onUpdate:modelValue":l[1]||(l[1]=n=>u.formData.icp_number=n),placeholder:"\u8BF7\u8F93\u5165ICP\u5907\u6848\u53F7"},null,8,["modelValue"])]),_:1}),e(a,{label:"ICP\u5907\u6848\u53F7\u94FE\u63A5",prop:"icp_link"},{default:t(()=>[e(i,{modelValue:u.formData.icp_link,"onUpdate:modelValue":l[2]||(l[2]=n=>u.formData.icp_link=n),placeholder:"\u8BF7\u8F93\u5165ICP\u5907\u6848\u53F7\u94FE\u63A5"},null,8,["modelValue"]),A]),_:1}),e(a,{label:"\u516C\u5B89\u5907\u6848\u53F7",prop:"public_number"},{default:t(()=>[e(i,{modelValue:u.formData.public_number,"onUpdate:modelValue":l[3]||(l[3]=n=>u.formData.public_number=n),placeholder:"\u8BF7\u8F93\u5165\u516C\u5B89\u5907\u6848\u53F7"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u516C\u5B89\u5907\u6848\u53F7\u94FE\u63A5",prop:"public_link"},{default:t(()=>[e(i,{modelValue:u.formData.public_link,"onUpdate:modelValue":l[4]||(l[4]=n=>u.formData.public_link=n),placeholder:"\u8BF7\u8F93\u5165\u516C\u5B89\u5907\u6848\u53F7\u94FE\u63A5"},null,8,["modelValue"]),U]),_:1})]),_:1},8,["rules","model"])]),_:1}),e(F,null,{default:t(()=>[e(f,{type:"primary",size:"small",onClick:u.setCopyright},{default:t(()=>[I]),_:1},8,["onClick"])]),_:1})])}var S=B(v,[["render",P]]);export{S as default};
