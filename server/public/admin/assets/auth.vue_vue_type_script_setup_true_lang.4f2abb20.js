import{B as q,T as H,D as I,E as M,F as Q,N as U}from"./element-plus.4078815e.js";import{a as X}from"./role.04bec11f.js";import{P as j}from"./index.6a7603c9.js";import{t as z}from"./index.9feff995.js";import{m as G}from"./menu.b63e2f7d.js";import{d as J,s as f,r as u,a1 as W,o as k,c as Y,X as s,P as i,Q as Z,O as $,u as c,a as y,i as ee,n as x}from"./@vue.b52708da.js";const te={class:"edit-popup"},re=J({__name:"auth",emits:["success","close"],setup(le,{expose:C,emit:b}){const _=b,o=f(),h=f(),d=f(),g=u(!1),r=u(!0),m=u(!1),v=u([]),p=u([]),a=W({id:"",name:"",desc:"",sort:0,menu_id:[]}),E={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:["blur"]}]},D=()=>{m.value=!0,G().then(e=>{p.value=e,v.value=z(e),x(()=>{F()}),m.value=!1})},w=()=>{var l,n;const e=(l=o.value)==null?void 0:l.getCheckedKeys(),t=(n=o.value)==null?void 0:n.getHalfCheckedKeys();return e==null||e.unshift.apply(e,t),e},F=()=>{a.menu_id.forEach(e=>{x(()=>{var t;(t=o.value)==null||t.setChecked(e,!0,!1)})})},R=e=>{const t=p.value;for(let l=0;l<t.length;l++)o.value.store.nodesMap[t[l].id].expanded=e},A=e=>{var t,l;e?(t=o.value)==null||t.setCheckedKeys(v.value.map(n=>n.id)):(l=o.value)==null||l.setCheckedKeys([])},B=async()=>{var e,t;await((e=h.value)==null?void 0:e.validate()),a.menu_id=w(),await X(a),(t=d.value)==null||t.close(),_("success")},K=()=>{_("close")},T=()=>{var e;(e=d.value)==null||e.open()},V=async e=>{for(const t in a)e[t]!=null&&e[t]!=null&&(a[t]=e[t])};return D(),C({open:T,setFormData:V}),(e,t)=>{const l=q,n=H,S=I,N=M,P=Q,L=U;return k(),Y("div",te,[s(j,{ref_key:"popupRef",ref:d,title:"\u5206\u914D\u6743\u9650",async:!0,width:"550px",onConfirm:B,onClose:K},{default:i(()=>[Z((k(),$(P,{class:"ls-form",ref_key:"formRef",ref:h,rules:E,model:c(a),"label-width":"60px"},{default:i(()=>[s(N,{class:"h-[400px] sm:h-[600px]"},{default:i(()=>[s(S,{label:"\u6743\u9650",prop:"menu_id"},{default:i(()=>[y("div",null,[s(l,{label:"\u5C55\u5F00/\u6298\u53E0",onChange:R}),s(l,{label:"\u5168\u9009/\u4E0D\u5168\u9009",onChange:A}),s(l,{modelValue:c(r),"onUpdate:modelValue":t[0]||(t[0]=O=>ee(r)?r.value=O:null),label:"\u7236\u5B50\u8054\u52A8"},null,8,["modelValue"]),y("div",null,[s(n,{ref_key:"treeRef",ref:o,data:c(p),props:{label:"name",children:"children"},"check-strictly":!c(r),"node-key":"id","default-expand-all":c(g),"show-checkbox":""},null,8,["data","check-strictly","default-expand-all"])])])]),_:1})]),_:1})]),_:1},8,["model"])),[[L,c(m)]])]),_:1},512)])}}});export{re as _};