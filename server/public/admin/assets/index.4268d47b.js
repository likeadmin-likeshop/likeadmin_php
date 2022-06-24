import{a as M,b as H,c as J,d as K,e as O,f as Q,g as W}from"./dev_tools.7bd4c0d3.js";import{u as R,P as q}from"./pages.0e786917.js";import{P as D}from"./index.44b5a48d.js";import{d as z,ak as X,r as S,q as A,a3 as Y,a as n,b as F,c as $,f as e,w as t,l as Z,$ as l,e as b,ai as G,m,j as ee,F as te,g as le,k as U,t as ae,al as oe,E as N,B as ne,a5 as se,a6 as ue,h as de,am as ie}from"./vendor.41e472b3.js";import{_ as T,y as ce}from"./index.89850ea7.js";const _e={class:"data-table"},me={class:"m-l-20"},re=m("\u67E5\u8BE2"),pe=m("\u91CD\u7F6E"),fe={class:"m-15"},ve={class:"flex row-right"},be=z({emits:["success"],setup(E,{emit:f}){const r=X(),s=S({name:"",comment:""}),{pager:p,requestApi:h,resetParams:C,resetPage:c}=R({callback:M,params:s,size:10}),y=A([]),x=u=>{y.value=u.map(({name:_,comment:o})=>({name:_,comment:o}))},w=async()=>{var u;await H({table:y.value}),(u=r.value)==null||u.close(),f("success")};return Y(()=>{var u;return(u=r.value)==null?void 0:u.visible},u=>{u&&h()}),(u,_)=>{const o=n("el-input"),a=n("el-form-item"),v=n("el-button"),k=n("el-form"),d=n("el-table-column"),B=n("el-table");return F(),$("div",_e,[e(D,{ref_key:"popupRef",ref:r,class:"inline",clickModalClose:!1,title:"\u9009\u62E9\u8868",width:"900px",async:!0,onConfirm:w},{trigger:t(()=>[Z(u.$slots,"default")]),default:t(()=>[e(k,{class:"ls-form",model:l(s),"label-width":"80px",size:"small",inline:""},{default:t(()=>[e(a,{label:"\u8868\u540D\u79F0"},{default:t(()=>[e(o,{modelValue:l(s).name,"onUpdate:modelValue":_[0]||(_[0]=g=>l(s).name=g),style:{width:"200px"}},null,8,["modelValue"])]),_:1}),e(a,{label:"\u8868\u63CF\u8FF0"},{default:t(()=>[e(o,{modelValue:l(s).comment,"onUpdate:modelValue":_[1]||(_[1]=g=>l(s).comment=g),style:{width:"200px"}},null,8,["modelValue"])]),_:1}),e(a,null,{default:t(()=>[b("div",me,[e(v,{type:"primary",onClick:l(c)},{default:t(()=>[re]),_:1},8,["onClick"]),e(v,{onClick:l(C)},{default:t(()=>[pe]),_:1},8,["onClick"])])]),_:1})]),_:1},8,["model"]),b("div",fe,[e(B,{height:"400",data:l(p).lists,size:"small",onSelectionChange:x},{default:t(()=>[e(d,{type:"selection",width:"55"}),e(d,{label:"\u8868\u540D\u79F0",prop:"name","min-width":"100"}),e(d,{label:"\u8868\u63CF\u8FF0",prop:"comment","min-width":"100"}),e(d,{label:"\u521B\u5EFA\u65F6\u95F4",prop:"create_time","min-width":"100"})]),_:1},8,["data"])]),b("div",ve,[e(q,{modelValue:l(p),"onUpdate:modelValue":_[2]||(_[2]=g=>G(p)?p.value=g:null),layout:"total, prev, pager, next, jumper",onChange:l(h)},null,8,["modelValue","onChange"])])]),_:3},512)])}}});const he={class:"code-preview"},Ce={class:"flex"},ge={class:"content"},Fe=m("\u590D\u5236"),ye=z({props:{modelValue:{type:Boolean},code:null},emits:["update:modelValue"],setup(E,{emit:f}){const r=E,s=A("index0"),p=C=>{ce(C).then(()=>{N.success("\u590D\u5236\u6210\u529F")}).catch(()=>{N.error("\u590D\u5236\u5931\u8D25")})},h=ee({get(){return r.modelValue},set(C){f("update:modelValue",C)}});return(C,c)=>{const y=n("el-scrollbar"),x=n("el-button"),w=n("el-tab-pane"),u=n("el-tabs"),_=n("el-dialog");return F(),$("div",he,[e(_,{modelValue:l(h),"onUpdate:modelValue":c[1]||(c[1]=o=>G(h)?h.value=o:null),width:"1000px",title:"\u4EE3\u7801\u9884\u89C8"},{default:t(()=>[e(u,{modelValue:s.value,"onUpdate:modelValue":c[0]||(c[0]=o=>s.value=o),class:"demo-tabs"},{default:t(()=>[(F(!0),$(te,null,le(E.code,(o,a)=>(F(),U(w,{label:o.name,name:`index${a}`,key:a},{default:t(()=>[b("div",Ce,[e(y,{class:"flex-1",style:{height:"70vh"}},{default:t(()=>[b("div",ge,ae(o.content),1)]),_:2},1024),b("div",null,[e(x,{onClick:v=>p(o.content),type:"text",icon:l(oe)},{default:t(()=>[Fe]),_:2},1032,["onClick","icon"])])])]),_:2},1032,["label","name"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["modelValue"])])}}});var we=T(ye,[["__scopeId","data-v-7788dc68"]]);const Ve={class:"code-generation"},xe={class:"m-l-20"},ke=m("\u67E5\u8BE2"),Ee=m("\u91CD\u7F6E"),De=m("\u5BFC\u5165\u6570\u636E\u8868"),$e=m("\u751F\u6210\u4EE3\u7801"),Be=m("\u5220\u9664"),Pe={class:"m-t-15"},Se=m("\u9884\u89C8"),Ue=m("\u4EE3\u7801\u751F\u6210"),ze=m("\u7F16\u8F91"),Ae=m("\u540C\u6B65"),Ge=m("\u5220\u9664"),Ne={class:"flex row-right"},Re=z({setup(E){ne();const f=S({table_name:"",table_comment:""}),r=S({show:!1,code:[]}),{pager:s,requestApi:p,resetParams:h,resetPage:C}=R({callback:J,params:f}),c=A([]),y=o=>{c.value=o.map(({id:a})=>a)},x=async o=>{await K({id:o})},w=async o=>{await O({id:o}),p()},u=async o=>{const a=ie.service({text:"\u6B63\u5728\u751F\u6210\u4E2D..."});try{const v=await Q({id:o});r.show=!0,r.code=v,a.close()}catch{a.close()}},_=async o=>{const a=await W({id:o});a.file&&window.open(a.file,"_blank")};return p(),(o,a)=>{const v=n("el-input"),k=n("el-form-item"),d=n("el-button"),B=n("el-form"),g=n("el-card"),V=n("el-table-column"),j=n("router-link"),I=n("el-table"),L=se("loading");return F(),$("div",Ve,[e(g,{shadow:"never"},{default:t(()=>[e(B,{class:"ls-form",model:l(f),"label-width":"80px",size:"small",inline:""},{default:t(()=>[e(k,{label:"\u8868\u540D\u79F0"},{default:t(()=>[e(v,{modelValue:l(f).table_name,"onUpdate:modelValue":a[0]||(a[0]=i=>l(f).table_name=i),class:"ls-input"},null,8,["modelValue"])]),_:1}),e(k,{label:"\u8868\u63CF\u8FF0"},{default:t(()=>[e(v,{modelValue:l(f).table_comment,"onUpdate:modelValue":a[1]||(a[1]=i=>l(f).table_comment=i),class:"ls-input"},null,8,["modelValue"])]),_:1}),e(k,null,{default:t(()=>[b("div",xe,[e(d,{type:"primary",onClick:l(C)},{default:t(()=>[ke]),_:1},8,["onClick"]),e(d,{onClick:l(h)},{default:t(()=>[Ee]),_:1},8,["onClick"])])]),_:1})]),_:1},8,["model"])]),_:1}),ue((F(),U(g,{class:"m-t-16",shadow:"never"},{default:t(()=>[e(be,{class:"inline m-r-10",onSuccess:l(p)},{default:t(()=>[e(d,{type:"primary",size:"small"},{default:t(()=>[De]),_:1})]),_:1},8,["onSuccess"]),e(d,{size:"small",disabled:!c.value.length,onClick:a[2]||(a[2]=i=>_(c.value))},{default:t(()=>[$e]),_:1},8,["disabled"]),e(D,{class:"m-l-10 inline",disabled:!c.value.length,content:"\u786E\u8BA4\u5220\u9664\u9009\u4E2D\u6570\u636E\u8868\uFF1F",onConfirm:a[3]||(a[3]=i=>w(c.value))},{trigger:t(()=>[e(d,{size:"small",disabled:!c.value.length},{default:t(()=>[Be]),_:1},8,["disabled"])]),_:1},8,["disabled"]),b("div",Pe,[e(I,{data:l(s).lists,size:"small",onSelectionChange:y},{default:t(()=>[e(V,{type:"selection",width:"55"}),e(V,{label:"\u8868\u540D\u79F0",prop:"table_name"}),e(V,{label:"\u8868\u63CF\u8FF0",prop:"table_comment"}),e(V,{label:"\u521B\u5EFA\u65F6\u95F4",prop:"create_time"}),e(V,{label:"\u66F4\u65B0\u65F6\u95F4",prop:"update_time"}),e(V,{label:"\u64CD\u4F5C",width:"240",fixed:"right"},{default:t(({row:i})=>[e(d,{type:"text",onClick:P=>u(i.id)},{default:t(()=>[Se]),_:2},1032,["onClick"]),e(d,{type:"text",onClick:P=>_(i.id)},{default:t(()=>[Ue]),_:2},1032,["onClick"]),e(j,{class:"m-l-10",to:{path:"/dev_tools/code/edit",query:{id:i.id}}},{default:t(()=>[e(d,{type:"text"},{default:t(()=>[ze]),_:1})]),_:2},1032,["to"]),e(D,{class:"inline m-l-10",content:"\u786E\u8BA4\u8981\u540C\u6B65\u8868\u7ED3\u6784\u5417\uFF1F",onConfirm:P=>x(i.id)},{trigger:t(()=>[e(d,{type:"text"},{default:t(()=>[Ae]),_:1})]),_:2},1032,["onConfirm"]),e(D,{class:"inline m-l-10",onConfirm:P=>w(i.id)},{trigger:t(()=>[e(d,{type:"text"},{default:t(()=>[Ge]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"])]),b("div",Ne,[e(q,{modelValue:l(s),"onUpdate:modelValue":a[4]||(a[4]=i=>G(s)?s.value=i:null),layout:"total, prev, pager, next, jumper",onChange:l(p)},null,8,["modelValue","onChange"])])]),_:1})),[[L,l(s).loading]]),l(r).show?(F(),U(we,{key:0,modelValue:l(r).show,"onUpdate:modelValue":a[5]||(a[5]=i=>l(r).show=i),code:l(r).code},null,8,["modelValue","code"])):de("",!0)])}}});var Me=T(Re,[["__scopeId","data-v-20dd11f5"]]);export{Me as default};
