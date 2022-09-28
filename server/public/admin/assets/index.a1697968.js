import{N as z,_ as H,Q as J,R as M,C as Q,B as W,w as X,D as G,I as Y,J as Z,K as ee,L as te}from"./element-plus.520347c0.js";import{_ as ae}from"./index.vue_vue_type_script_setup_true_lang.e19fa418.js";import{f as oe,b as le}from"./index.bfaa543c.js";import{u as ne}from"./vue-router.e1b37eed.js";import{d as se,r as P,s as ie,a1 as ue,ah as de,o as n,c as h,W as e,O as a,u as s,X as re,a9 as me,M as d,ab as pe,a as k,P as y,k as ce,T as _e,U as r,n as R}from"./@vue.af680e04.js";import{b as fe,c as ve}from"./dict.3a9cab65.js";import{u as ye}from"./useDictOptions.f8fa5657.js";import{u as be}from"./usePaging.01638e85.js";import{_ as ge}from"./edit.vue_vue_type_script_setup_true_lang.88f9ab64.js";import"./@vueuse.8c34eaea.js";import"./@element-plus.034bf3af.js";import"./lodash-es.70b90cb6.js";import"./dayjs.8a39f93d.js";import"./axios.ef849b08.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.cceb5001.js";import"./pinia.2a01c3c3.js";import"./vue-demi.bfae2336.js";import"./css-color-function.525addec.js";import"./color.629b30be.js";import"./clone.5fb606c0.js";import"./color-convert.69e17089.js";import"./color-string.e356f5de.js";import"./color-name.e7a4e1d3.js";import"./nprogress.06980d2d.js";import"./vue-clipboard3.5ebd6696.js";import"./clipboard.3fb7e13f.js";import"./echarts.5e2dc550.js";import"./zrender.510214c4.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.b2525ffc.js";import"./index.fff7e258.js";const Ce={class:"dict-type"},Ee=r("\u67E5\u8BE2"),he=r("\u91CD\u7F6E"),ke=r(" \u6DFB\u52A0\u6570\u636E "),we=r(" \u5220\u9664 "),De={class:"mt-4"},Fe=r("\u6B63\u5E38"),Be=r("\u505C\u7528"),Ve=r(" \u7F16\u8F91 "),xe=r(" \u5220\u9664 "),$e={class:"flex justify-end mt-4"},_t=se({__name:"index",setup(Pe){const{query:N}=ne(),b=P(!1),_=ie(),i=ue({type:"",type_id:Number(N.id),name:"",status:""}),{pager:f,getLists:v,resetPage:w,resetParams:T}=be({fetchFun:ve,params:i}),E=P([]),L=l=>{E.value=l.map(({id:t})=>t)},S=async()=>{var t,m;b.value=!0,await R();const l=F.dict_type.find(p=>p.id==i.type_id);(t=_.value)==null||t.setFormData({type_value:l==null?void 0:l.type,type_id:l.id}),(m=_.value)==null||m.open("add")},U=async l=>{var t,m;b.value=!0,await R(),(t=_.value)==null||t.open("edit"),(m=_.value)==null||m.setFormData(l)},D=async l=>{await oe.confirm("\u786E\u5B9A\u8981\u5220\u9664\uFF1F"),await fe({id:l}),v()},{optionsData:F}=ye({dict_type:{}});return v(),(l,t)=>{const m=z,p=J,B=M,g=Q,A=W,c=X,I=G,V=Y,x=le,u=Z,$=H,K=ee,O=ae,C=de("perms"),q=te;return n(),h("div",Ce,[e(V,{class:"!border-none",shadow:"never"},{default:a(()=>[e(m,{class:"mb-4",content:"\u6570\u636E\u7BA1\u7406",onBack:t[0]||(t[0]=o=>l.$router.back())}),e(I,{ref:"formRef",class:"mb-[-16px]",model:i,inline:""},{default:a(()=>[e(g,{label:"\u5B57\u5178\u540D\u79F0"},{default:a(()=>[e(B,{class:"w-[280px]",modelValue:i.type_id,"onUpdate:modelValue":t[1]||(t[1]=o=>i.type_id=o),onChange:s(v)},{default:a(()=>[(n(!0),h(re,null,me(s(F).dict_type,o=>(n(),d(p,{label:o.name,value:o.id,key:o.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","onChange"])]),_:1}),e(g,{label:"\u6570\u636E\u540D\u79F0"},{default:a(()=>[e(A,{class:"w-[280px]",modelValue:i.name,"onUpdate:modelValue":t[2]||(t[2]=o=>i.name=o),clearable:"",onKeyup:pe(s(w),["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(g,{label:"\u6570\u636E\u72B6\u6001"},{default:a(()=>[e(B,{class:"w-[280px]",modelValue:i.status,"onUpdate:modelValue":t[3]||(t[3]=o=>i.status=o)},{default:a(()=>[e(p,{label:"\u5168\u90E8",value:""}),e(p,{label:"\u6B63\u5E38",value:1}),e(p,{label:"\u505C\u7528",value:0})]),_:1},8,["modelValue"])]),_:1}),e(g,null,{default:a(()=>[e(c,{type:"primary",onClick:s(w)},{default:a(()=>[Ee]),_:1},8,["onClick"]),e(c,{onClick:s(T)},{default:a(()=>[he]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),_:1}),e(V,{class:"!border-none mt-4",shadow:"never"},{default:a(()=>[k("div",null,[y((n(),d(c,{type:"primary",onClick:S},{icon:a(()=>[e(x,{name:"el-icon-Plus"})]),default:a(()=>[ke]),_:1})),[[C,["setting.dict.dict_data/add"]]]),y((n(),d(c,{disabled:!E.value.length,type:"danger",onClick:t[4]||(t[4]=o=>D(E.value))},{icon:a(()=>[e(x,{name:"el-icon-Delete"})]),default:a(()=>[we]),_:1},8,["disabled"])),[[C,["setting.dict.dict_data/delete"]]])]),y((n(),h("div",De,[k("div",null,[e(K,{data:s(f).lists,size:"large",onSelectionChange:L},{default:a(()=>[e(u,{type:"selection",width:"55"}),e(u,{label:"ID",prop:"id"}),e(u,{label:"\u6570\u636E\u540D\u79F0",prop:"name","min-width":"120"}),e(u,{label:"\u6570\u636E\u503C",prop:"value","min-width":"120"}),e(u,{label:"\u72B6\u6001"},{default:a(({row:o})=>[o.status==1?(n(),d($,{key:0},{default:a(()=>[Fe]),_:1})):(n(),d($,{key:1,type:"danger"},{default:a(()=>[Be]),_:1}))]),_:1}),e(u,{label:"\u5907\u6CE8",prop:"remark","min-width":"120","show-tooltip-when-overflow":""}),e(u,{label:"\u6392\u5E8F",prop:"sort"}),e(u,{label:"\u64CD\u4F5C",width:"120",fixed:"right"},{default:a(({row:o})=>[y((n(),d(c,{link:"",type:"primary",onClick:j=>U(o)},{default:a(()=>[Ve]),_:2},1032,["onClick"])),[[C,["setting.dict.dict_data/edit"]]]),y((n(),d(c,{link:"",type:"danger",onClick:j=>D(o.id)},{default:a(()=>[xe]),_:2},1032,["onClick"])),[[C,["setting.dict.dict_data/delete"]]])]),_:1})]),_:1},8,["data"])]),k("div",$e,[e(O,{modelValue:s(f),"onUpdate:modelValue":t[5]||(t[5]=o=>ce(f)?f.value=o:null),onChange:s(v)},null,8,["modelValue","onChange"])])])),[[q,s(f).loading]])]),_:1}),b.value?(n(),d(ge,{key:0,ref_key:"editRef",ref:_,onSuccess:s(v),onClose:t[6]||(t[6]=o=>b.value=!1)},null,8,["onSuccess"])):_e("",!0)])}}});export{_t as default};
