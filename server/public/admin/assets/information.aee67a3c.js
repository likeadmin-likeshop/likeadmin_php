import{_ as B}from"./index.16fd2116.js";import{C as v,D as w,I as h,F as D,w as V}from"./element-plus.81dd3128.js";import{_ as x}from"./picker.27cb7dd4.js";import{a as O,b as j}from"./website.de550045.js";import{u as q}from"./index.3adcc8be.js";import{d as _,r as U,a1 as k,ah as y,o as d,c as G,W as e,O as i,a as t,P as L,M as I,U as P}from"./@vue.af680e04.js";import"./@vueuse.8c34eaea.js";import"./@element-plus.034bf3af.js";import"./lodash-es.70b90cb6.js";import"./dayjs.8a39f93d.js";import"./axios.ef849b08.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.50d6a369.js";import"./index.ba3df663.js";import"./index.vue_vue_type_script_setup_true_lang.09e19d7d.js";import"./index.c2287364.js";import"./index.vue_vue_type_script_setup_true_lang.877bdfb3.js";import"./usePaging.01638e85.js";import"./vue3-video-play.e9a50e78.js";import"./vuedraggable.f1b552bb.js";import"./vue.9a71f557.js";import"./sortablejs.d7e1e118.js";import"./lodash.cceb5001.js";import"./vue-router.e1b37eed.js";import"./pinia.2a01c3c3.js";import"./vue-demi.bfae2336.js";import"./css-color-function.525addec.js";import"./color.629b30be.js";import"./clone.5fb606c0.js";import"./color-convert.69e17089.js";import"./color-string.e356f5de.js";import"./color-name.e7a4e1d3.js";import"./nprogress.06980d2d.js";import"./vue-clipboard3.5ebd6696.js";import"./clipboard.3fb7e13f.js";import"./echarts.5e2dc550.js";import"./zrender.510214c4.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.b2525ffc.js";const W={class:"website-information"},N=t("div",{class:"text-xl font-medium mb-[20px]"},"\u540E\u53F0\u8BBE\u7F6E",-1),S={class:"w-80"},R=t("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),M=t("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),T=t("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),z=t("div",{class:"text-xl font-medium mb-[20px]"},"\u524D\u53F0\u8BBE\u7F6E",-1),H={class:"w-80"},J=t("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100px\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),K=t("div",{class:"text-xl font-medium mb-[20px]"},"PC\u7AEF\u8BBE\u7F6E",-1),Q=t("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100px\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),X=P("\u4FDD\u5B58"),Y=_({name:"webInformation"}),Re=_({...Y,setup(Z){const n=U(),g=q(),o=k({name:"",web_favicon:"",web_logo:"",login_image:"",shop_name:"",shop_logo:"",pc_logo:""}),c={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u7F51\u7AD9\u540D\u79F0",trigger:["blur"]}],web_favicon:[{required:!0,message:"\u8BF7\u9009\u62E9\u7F51\u7AD9\u56FE\u6807",trigger:["change"]}],web_logo:[{required:!0,message:"\u8BF7\u9009\u62E9\u7F51\u7AD9logo",trigger:["change"]}],login_image:[{required:!0,message:"\u8BF7\u9009\u62E9\u767B\u5F55\u9875\u5E7F\u544A\u56FE",trigger:["change"]}],shop_name:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E97\u94FA/\u5546\u57CE\u540D\u79F0",trigger:["blur"]}],shop_logo:[{required:!0,message:"\u8BF7\u9009\u62E9\u5546\u57CELOGO",trigger:["change"]}],pc_logo:[{required:!0,message:"\u8BF7\u9009\u62E9PC\u7AEFLOGO",trigger:["change"]}]},p=async()=>{const a=await O();for(const u in o)o[u]=a[u]},f=async()=>{var a;await((a=n.value)==null?void 0:a.validate()),await j(o),g.getConfig(),p()};return p(),(a,u)=>{const F=v,r=w,s=x,m=h,E=D,C=V,b=B,A=y("perms");return d(),G("div",W,[e(E,{ref_key:"formRef",ref:n,rules:c,class:"ls-form",model:o,"label-width":"120px"},{default:i(()=>[e(m,{shadow:"never",class:"!border-none"},{default:i(()=>[N,e(r,{label:"\u7F51\u7AD9\u540D\u79F0",prop:"name"},{default:i(()=>[t("div",S,[e(F,{modelValue:o.name,"onUpdate:modelValue":u[0]||(u[0]=l=>o.name=l),placeholder:"\u8BF7\u8F93\u5165\u7F51\u7AD9\u540D\u79F0",maxlength:"30","show-word-limit":""},null,8,["modelValue"])])]),_:1}),e(r,{label:"\u7F51\u7AD9\u56FE\u6807",prop:"web_favicon",required:""},{default:i(()=>[t("div",null,[e(s,{modelValue:o.web_favicon,"onUpdate:modelValue":u[1]||(u[1]=l=>o.web_favicon=l),limit:1},null,8,["modelValue"]),R])]),_:1}),e(r,{label:"\u7F51\u7AD9LOGO",prop:"web_logo",required:""},{default:i(()=>[t("div",null,[e(s,{modelValue:o.web_logo,"onUpdate:modelValue":u[2]||(u[2]=l=>o.web_logo=l),limit:1},null,8,["modelValue"]),M])]),_:1}),e(r,{label:"\u767B\u5F55\u9875\u5E7F\u544A\u56FE",prop:"login_image",required:""},{default:i(()=>[t("div",null,[e(s,{modelValue:o.login_image,"onUpdate:modelValue":u[3]||(u[3]=l=>o.login_image=l),limit:1},null,8,["modelValue"]),T])]),_:1})]),_:1}),e(m,{shadow:"never",class:"!border-none mt-4"},{default:i(()=>[z,e(r,{label:"\u5546\u57CE\u540D\u79F0",prop:"shop_name"},{default:i(()=>[t("div",H,[e(F,{modelValue:o.shop_name,"onUpdate:modelValue":u[4]||(u[4]=l=>o.shop_name=l),placeholder:"\u8BF7\u8F93\u5165\u5E97\u94FA/\u5546\u57CE\u540D\u79F0",maxlength:"30","show-word-limit":""},null,8,["modelValue"])])]),_:1}),e(r,{label:"\u5546\u57CELOGO",prop:"shop_logo"},{default:i(()=>[t("div",null,[e(s,{modelValue:o.shop_logo,"onUpdate:modelValue":u[5]||(u[5]=l=>o.shop_logo=l),limit:1},null,8,["modelValue"]),J])]),_:1})]),_:1}),e(m,{shadow:"never",class:"!border-none mt-4"},{default:i(()=>[K,e(r,{label:"PC\u7AEFLOGO",prop:"pc_logo"},{default:i(()=>[t("div",null,[e(s,{modelValue:o.pc_logo,"onUpdate:modelValue":u[6]||(u[6]=l=>o.pc_logo=l),limit:1},null,8,["modelValue"]),Q])]),_:1})]),_:1})]),_:1},8,["model"]),L((d(),I(b,null,{default:i(()=>[e(C,{type:"primary",onClick:f},{default:i(()=>[X]),_:1})]),_:1})),[[A,["setting.web.web_setting/setWebsite"]]])])}}});export{Re as default};