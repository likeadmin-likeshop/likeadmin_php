import{d as u,s as E,j as C,z as h,o as a,a as x,B as c,e as f,C as n,w as e,m as s,p as m,v as B,K as L}from"./index-B2xNDy79.js";import{E as T}from"./el-card-DpH4mUSc.js";import{E as R,a as z}from"./el-table-column-DG3vRCd5.js";import"./el-checkbox-3_Bu4Dnb.js";import"./el-tag-CuODyGk4.js";import{d as D}from"./message-BcHkSWHo.js";import{_ as N}from"./edit.vue_vue_type_script_setup_true_lang-CnrV7mEQ.js";import{E as S}from"./index-CcX0CyWL.js";import"./_Uint8Array-0jgVjd-W.js";import"./isEqual-CLGO95LP.js";import"./_initCloneObject-C-h6JGU9.js";import"./el-form-item-DlU85AZK.js";import"./_baseClone-CdezRMKA.js";/* empty css                       */import"./el-radio-CKcO4hVq.js";import"./index-DFOp_83R.js";import"./index-C6Cr8aHe.js";const V=u({name:"shortLetter"}),tt=u({...V,setup($){const d=E(),o=C({loading:!1,lists:[]}),p=async()=>{try{o.loading=!0,o.lists=await D(),o.loading=!1}catch{o.loading=!1}},g=i=>{var t;(t=d.value)==null||t.open(i)};return p(),(i,t)=>{const r=R,_=S,v=B,b=z,k=T,w=h("perms"),y=L;return a(),x("div",null,[c((a(),n(k,{class:"!border-none",shadow:"never"},{default:e(()=>[s(b,{size:"large",data:f(o).lists},{default:e(()=>[s(r,{label:"短信渠道",prop:"name","min-width":"120"}),s(r,{label:"状态","min-width":"120"},{default:e(({row:l})=>[l.status==1?(a(),n(_,{key:0},{default:e(()=>t[0]||(t[0]=[m("开启")])),_:1})):(a(),n(_,{key:1,type:"danger"},{default:e(()=>t[1]||(t[1]=[m("关闭")])),_:1}))]),_:1}),s(r,{label:"操作","min-width":"120",fixed:"right"},{default:e(({row:l})=>[c((a(),n(v,{type:"primary",link:"",onClick:j=>g(l.type)},{default:e(()=>t[2]||(t[2]=[m(" 设置 ")])),_:2},1032,["onClick"])),[[w,["notice.sms_config/setConfig"]]])]),_:1})]),_:1},8,["data"])]),_:1})),[[y,f(o).loading]]),s(N,{ref_key:"editRef",ref:d,onSuccess:p},null,512)])}}});export{tt as default};