import{N as B,I as g,o as w,D as h,w as P,F as N}from"./element-plus.994d4e5d.js";import{_ as R}from"./index.vue_vue_type_script_setup_true_lang.bc5b89bf.js";import{l as V,b as $}from"./index.be302bd0.js";import{u as q}from"./vue-router.e1b37eed.js";import{g as I,u as O}from"./consumer.cd1cd013.js";import{d as y,a1 as U,s as j,ah as z,o as s,c as H,W as e,O as t,a as C,U as l,V as n,P as f,M as F}from"./@vue.af680e04.js";import"./@vueuse.8c34eaea.js";import"./@element-plus.034bf3af.js";import"./lodash-es.70b90cb6.js";import"./dayjs.f7363e4f.js";import"./axios.3af9fe4b.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.873faf2b.js";import"./pinia.2a01c3c3.js";import"./vue-demi.bfae2336.js";import"./css-color-function.e12a99db.js";import"./color.cb877126.js";import"./clone.3b081931.js";import"./color-convert.69e17089.js";import"./color-string.e356f5de.js";import"./color-name.e7a4e1d3.js";import"./nprogress.fd69c5bf.js";import"./vue-clipboard3.9796a14d.js";import"./clipboard.2bdac801.js";import"./echarts.5e2dc550.js";import"./zrender.510214c4.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.b2525ffc.js";const M={class:"bg-page py-5 pl-20 mb-10"},S=C("div",{class:"mb-3 text-tx-regular"},"\u7528\u6237\u5934\u50CF",-1),T=y({name:"consumerDetail"}),ke=y({...T,setup(W){const b=q(),o=U({avatar:"",channel:"",create_time:"",login_time:"",mobile:"",nickname:"",real_name:0,sex:0,sn:"",account:""}),D=j(),E=async()=>{const i=await I({id:b.query.id});Object.keys(o).forEach(a=>{o[a]=i[a]})},m=async(i,a)=>{V(i)||(await O({id:b.query.id,field:a,value:i}),E())};return E(),(i,a)=>{const x=B,v=g,k=w,r=h,p=$,c=P,_=R,A=N,d=z("perms");return s(),H("div",null,[e(v,{class:"!border-none",shadow:"never"},{default:t(()=>[e(x,{content:"\u7528\u6237\u8BE6\u60C5",onBack:a[0]||(a[0]=u=>i.$router.back())})]),_:1}),e(v,{class:"mt-4 !border-none",header:"\u57FA\u672C\u8D44\u6599",shadow:"never"},{default:t(()=>[e(A,{ref_key:"formRef",ref:D,class:"ls-form",model:o,"label-width":"120px"},{default:t(()=>[C("div",M,[S,e(k,{src:o.avatar,size:58},null,8,["src"])]),e(r,{label:"\u7528\u6237\u7F16\u53F7\uFF1A"},{default:t(()=>[l(n(o.sn),1)]),_:1}),e(r,{label:"\u7528\u6237\u6635\u79F0\uFF1A"},{default:t(()=>[l(n(o.nickname),1)]),_:1}),e(r,{label:"\u8D26\u53F7\uFF1A"},{default:t(()=>[l(n(o.account)+" ",1),e(_,{class:"ml-[10px]",onConfirm:a[1]||(a[1]=u=>m(u,"account")),limit:32},{default:t(()=>[f((s(),F(c,{type:"primary",link:""},{default:t(()=>[e(p,{name:"el-icon-EditPen"})]),_:1})),[[d,["user:edit"]]])]),_:1})]),_:1}),e(r,{label:"\u771F\u5B9E\u59D3\u540D\uFF1A"},{default:t(()=>[l(n(o.real_name||"-")+" ",1),e(_,{class:"ml-[10px]",onConfirm:a[2]||(a[2]=u=>m(u,"real_name")),limit:32},{default:t(()=>[f((s(),F(c,{type:"primary",link:""},{default:t(()=>[e(p,{name:"el-icon-EditPen"})]),_:1})),[[d,["user:edit"]]])]),_:1})]),_:1}),e(r,{label:"\u6027\u522B\uFF1A"},{default:t(()=>[l(n(o.sex)+" ",1),e(_,{class:"ml-[10px]",type:"select",options:[{label:"\u672A\u77E5",value:0},{label:"\u7537",value:1},{label:"\u5973",value:2}],onConfirm:a[3]||(a[3]=u=>m(u,"sex"))},{default:t(()=>[f((s(),F(c,{type:"primary",link:""},{default:t(()=>[e(p,{name:"el-icon-EditPen"})]),_:1})),[[d,["user:edit"]]])]),_:1})]),_:1}),e(r,{label:"\u8054\u7CFB\u7535\u8BDD\uFF1A"},{default:t(()=>[l(n(o.mobile||"-")+" ",1),e(_,{class:"ml-[10px]",type:"number",onConfirm:a[4]||(a[4]=u=>m(u,"mobile"))},{default:t(()=>[f((s(),F(c,{type:"primary",link:""},{default:t(()=>[e(p,{name:"el-icon-EditPen"})]),_:1})),[[d,["user:edit"]]])]),_:1})]),_:1}),e(r,{label:"\u6CE8\u518C\u6765\u6E90\uFF1A"},{default:t(()=>[l(n(o.channel),1)]),_:1}),e(r,{label:"\u6CE8\u518C\u65F6\u95F4\uFF1A"},{default:t(()=>[l(n(o.create_time),1)]),_:1}),e(r,{label:"\u6700\u8FD1\u767B\u5F55\u65F6\u95F4\uFF1A"},{default:t(()=>[l(n(o.login_time),1)]),_:1})]),_:1},8,["model"])]),_:1})])}}});export{ke as default};