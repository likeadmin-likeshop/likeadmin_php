import{_ as w}from"./index-CAptsx20.js";import{d as p,j as y,z as E,o as l,a as k,m as r,w as a,b as s,e as m,B,C,p as V,v as x}from"./index-CxIKPv72.js";import{E as D}from"./el-card-DDcm4FIi.js";import{E as S,a as j}from"./el-form-item-DXMlFMHu.js";import{_ as N}from"./picker-i9nkkqdv.js";import{a as U,b as F}from"./user-DCMhTm4f.js";import"./_baseClone-Cclv58hm.js";import"./_Uint8Array-3zasVRiK.js";import"./_initCloneObject-BDU-Y3TY.js";import"./index-CztTkn1O.js";import"./index-Cr67L_5o.js";import"./index-D2kcX1gB.js";import"./index.vue_vue_type_script_setup_true_lang-ZbIzRpuP.js";import"./el-tag-vY3DIJMZ.js";import"./isEqual-COF5tDj7.js";import"./el-select-Mi1Lmmwx.js";import"./index-DX66Z-02.js";import"./token-DI9FKtlJ.js";import"./el-table-column-CtDZjMl1.js";import"./el-checkbox-r-piVVjI.js";import"./index-D2NF0jp1.js";import"./index-C5fLYe8h.js";import"./el-tree-NuP0E0on.js";import"./index.vue_vue_type_script_setup_true_lang-SPp69LxQ.js";import"./el-popover-CXLB0Q9q.js";import"./usePaging-DoKal5g9.js";const h={class:"user-setup"},z=p({name:"userSetup"}),it=p({...z,setup(I){const o=y({default_avatar:""}),n=async()=>{try{const e=await U();for(const t in o)o[t]=e[t]}catch(e){console.log("获取=>",e)}},_=async()=>{try{await F(o),n()}catch(e){console.log("保存=>",e)}};return n(),(e,t)=>{const u=N,i=S,c=j,d=D,f=x,v=w,g=E("perms");return l(),k("div",h,[r(d,{shadow:"never",class:"!border-none"},{default:a(()=>[t[2]||(t[2]=s("div",{class:"font-medium mb-7"},"基本设置",-1)),r(c,{ref:"formRef",model:m(o),"label-width":"120px"},{default:a(()=>[r(i,{label:"用户默认头像"},{default:a(()=>[s("div",null,[r(u,{modelValue:m(o).default_avatar,"onUpdate:modelValue":t[0]||(t[0]=b=>m(o).default_avatar=b),limit:1},null,8,["modelValue"])])]),_:1}),r(i,null,{default:a(()=>t[1]||(t[1]=[s("div",null,[s("div",{class:"form-tips"}," 用户注册时给的默认头像，建议尺寸：400*400像素，支持jpg，jpeg，png格式 ")],-1)])),_:1})]),_:1},8,["model"])]),_:1}),B((l(),C(v,null,{default:a(()=>[r(f,{type:"primary",onClick:_},{default:a(()=>t[3]||(t[3]=[V("保存")])),_:1})]),_:1})),[[g,["setting.user.user/setConfig"]]])])}}});export{it as default};