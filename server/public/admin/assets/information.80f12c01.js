import{_ as v}from"./index.d23cf9a7.js";import{C as D,D as w,I as V,F as h,w as x}from"./element-plus.4078815e.js";import{_ as j}from"./picker.3b530f21.js";import{a as q,b as U}from"./website.8f891171.js";import{u as k}from"./index.9feff995.js";import{d as g,r as O,a1 as y,an as P,o as _,c as M,X as u,P as r,a as i,u as t,Q as G,O as L,U as I}from"./@vue.b52708da.js";import"./@element-plus.35ec7429.js";import"./lodash-es.2b4cc642.js";import"./dayjs.3bccbd93.js";import"./axios.dc00a7f8.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.b082b0c1.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.6a7603c9.js";import"./index.e2458a44.js";import"./index.vue_vue_type_script_setup_true_lang.39fbc713.js";import"./index.1b19ad06.js";import"./index.98d815fb.js";import"./index.vue_vue_type_script_setup_true_lang.020a2226.js";import"./@vueuse.e1a32ef4.js";import"./usePaging.771acc0e.js";import"./vue3-video-play.36140ed9.js";import"./vuedraggable.5bfed3b5.js";import"./vue.0ef5c72b.js";import"./sortablejs.dbf1c042.js";import"./lodash.e6e9a684.js";import"./vue-router.48496b4b.js";import"./pinia.3f41eb90.js";import"./css-color-function.a728b5d4.js";import"./color.d7ae65d5.js";import"./clone.65443a5f.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.2274a56d.js";import"./vue-clipboard3.d9310b6d.js";import"./clipboard.cf95dd73.js";import"./echarts.004f4e72.js";import"./zrender.b56a9aa5.js";import"./tslib.60310f1a.js";import"./highlight.js.db90315f.js";import"./@highlightjs.0797cc3b.js";const N={class:"website-information"},S=i("div",{class:"text-xl font-medium mb-[20px]"},"\u540E\u53F0\u8BBE\u7F6E",-1),W={class:"w-80"},R=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),Q=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),T=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),X=i("div",{class:"text-xl font-medium mb-[20px]"},"\u524D\u53F0\u8BBE\u7F6E",-1),z={class:"w-80"},H=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),J=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100px\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),K=i("div",{class:"text-xl font-medium mb-[20px]"},"PC\u7AEF\u8BBE\u7F6E",-1),Y=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A120*28px\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),Z={class:"w-80"},$=i("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A100*100\u50CF\u7D20\uFF0C\u652F\u6301jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),uu={class:"w-80"},eu={class:"w-80"},ou=g({name:"webInformation"}),Ku=g({...ou,setup(tu){const d=O(),c=k(),e=y({name:"",web_favicon:"",web_logo:"",login_image:"",h5_favicon:"",shop_name:"",shop_logo:"",pc_logo:"",pc_title:"",pc_desc:"",pc_ico:"",pc_keywords:""}),f={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u7F51\u7AD9\u540D\u79F0",trigger:["blur"]}],web_favicon:[{required:!0,message:"\u8BF7\u9009\u62E9\u7F51\u7AD9\u56FE\u6807",trigger:["change"]}],web_logo:[{required:!0,message:"\u8BF7\u9009\u62E9\u7F51\u7AD9logo",trigger:["change"]}],login_image:[{required:!0,message:"\u8BF7\u9009\u62E9\u767B\u5F55\u9875\u5E7F\u544A\u56FE",trigger:["change"]}],shop_name:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E97\u94FA/\u5546\u57CE\u540D\u79F0",trigger:["blur"]}],shop_logo:[{required:!0,message:"\u8BF7\u9009\u62E9\u5546\u57CELOGO",trigger:["change"]}],pc_logo:[{required:!0,message:"\u8BF7\u9009\u62E9PC\u7AEFLOGO",trigger:["change"]}],pc_title:[{required:!0,message:"\u8BF7\u8F93\u5165PC\u7AEF\u7F51\u7AD9\u6807\u9898",trigger:["blur"]}],pc_ico:[{required:!0,message:"\u8BF7\u9009\u62E9PC\u7AEF\u7F51\u7AD9\u56FE\u6807",trigger:["change"]}]},n=async()=>{const m=await q();for(const o in e)e[o]=m[o]},C=async()=>{var m;await((m=d.value)==null?void 0:m.validate()),await U(e),c.getConfig(),n()};return n(),(m,o)=>{const p=D,s=w,a=j,F=V,A=h,E=x,b=v,B=P("perms");return _(),M("div",N,[u(A,{ref_key:"formRef",ref:d,rules:f,class:"ls-form",model:t(e),"label-width":"120px"},{default:r(()=>[u(F,{shadow:"never",class:"!border-none"},{default:r(()=>[S,u(s,{label:"\u7F51\u7AD9\u540D\u79F0",prop:"name"},{default:r(()=>[i("div",W,[u(p,{modelValue:t(e).name,"onUpdate:modelValue":o[0]||(o[0]=l=>t(e).name=l),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165\u7F51\u7AD9\u540D\u79F0",maxlength:"30","show-word-limit":""},null,8,["modelValue"])])]),_:1}),u(s,{label:"\u7F51\u7AD9\u56FE\u6807",prop:"web_favicon",required:""},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).web_favicon,"onUpdate:modelValue":o[1]||(o[1]=l=>t(e).web_favicon=l),limit:1},null,8,["modelValue"]),R])]),_:1}),u(s,{label:"\u7F51\u7AD9LOGO",prop:"web_logo",required:""},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).web_logo,"onUpdate:modelValue":o[2]||(o[2]=l=>t(e).web_logo=l),modelModifiers:{trim:!0},limit:1},null,8,["modelValue"]),Q])]),_:1}),u(s,{label:"\u767B\u5F55\u9875\u5E7F\u544A\u56FE",prop:"login_image",required:""},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).login_image,"onUpdate:modelValue":o[3]||(o[3]=l=>t(e).login_image=l),modelModifiers:{trim:!0},limit:1},null,8,["modelValue"]),T])]),_:1})]),_:1}),u(F,{shadow:"never",class:"!border-none mt-4"},{default:r(()=>[X,u(s,{label:"\u524D\u53F0\u540D\u79F0",prop:"shop_name"},{default:r(()=>[i("div",z,[u(p,{modelValue:t(e).shop_name,"onUpdate:modelValue":o[4]||(o[4]=l=>t(e).shop_name=l),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165\u524D\u53F0\u540D\u79F0",maxlength:"30","show-word-limit":""},null,8,["modelValue"])])]),_:1}),u(s,{label:"\u7F51\u7AD9\u56FE\u6807",prop:"web_favicon",required:""},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).h5_favicon,"onUpdate:modelValue":o[5]||(o[5]=l=>t(e).h5_favicon=l),limit:1},null,8,["modelValue"]),H])]),_:1}),u(s,{label:"\u524D\u53F0LOGO",prop:"shop_logo"},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).shop_logo,"onUpdate:modelValue":o[6]||(o[6]=l=>t(e).shop_logo=l),limit:1},null,8,["modelValue"]),J])]),_:1})]),_:1}),u(F,{shadow:"never",class:"!border-none mt-4"},{default:r(()=>[K,u(s,{label:"PC\u7AEFLOGO",prop:"pc_logo"},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).pc_logo,"onUpdate:modelValue":o[7]||(o[7]=l=>t(e).pc_logo=l),limit:1},null,8,["modelValue"]),Y])]),_:1}),u(s,{label:"\u7F51\u7AD9\u6807\u9898",prop:"pc_title"},{default:r(()=>[i("div",Z,[u(p,{modelValue:t(e).pc_title,"onUpdate:modelValue":o[8]||(o[8]=l=>t(e).pc_title=l),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165PC\u7AEF\u7F51\u7AD9\u6807\u9898",maxlength:"30","show-word-limit":""},null,8,["modelValue"])])]),_:1}),u(s,{label:"\u7F51\u7AD9\u56FE\u6807",prop:"pc_ico"},{default:r(()=>[i("div",null,[u(a,{modelValue:t(e).pc_ico,"onUpdate:modelValue":o[9]||(o[9]=l=>t(e).pc_ico=l),limit:1},null,8,["modelValue"]),$])]),_:1}),u(s,{label:"\u7F51\u7AD9\u63CF\u8FF0",prop:"pc_desc"},{default:r(()=>[i("div",uu,[u(p,{modelValue:t(e).pc_desc,"onUpdate:modelValue":o[10]||(o[10]=l=>t(e).pc_desc=l),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165PC\u7AEF\u7F51\u7AD9\u63CF\u8FF0"},null,8,["modelValue"])])]),_:1}),u(s,{label:"\u7F51\u7AD9\u5173\u952E\u8BCD",prop:"pc_keywords"},{default:r(()=>[i("div",eu,[u(p,{modelValue:t(e).pc_keywords,"onUpdate:modelValue":o[11]||(o[11]=l=>t(e).pc_keywords=l),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165PC\u7AEF\u7F51\u7AD9\u5173\u952E\u8BCD"},null,8,["modelValue"])])]),_:1})]),_:1})]),_:1},8,["model"]),G((_(),L(b,null,{default:r(()=>[u(E,{type:"primary",onClick:C},{default:r(()=>[I("\u4FDD\u5B58")]),_:1})]),_:1})),[[B,["setting.web.web_setting/setWebsite"]]])])}}});export{Ku as default};