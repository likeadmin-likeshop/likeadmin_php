import{_ as k}from"./index.429f9ace.js";import{K as U,I as S,B as I,C as R,w as q,G as j,H as T,D as K}from"./element-plus.317dd699.js";import{_ as L}from"./picker.3099ca58.js";import{g as N,s as O}from"./wx_oa.4983d44c.js";import{u as G}from"./index.565e6324.js";import{d as D,$ as J,s as M,af as C,o as n,c as z,U as u,L as t,u as H,M as m,K as p,a as e,S as d}from"./@vue.e8706010.js";import"./@vueuse.1e5a6e21.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.f7363e4f.js";import"./axios.3af9fe4b.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.4ce7b5a5.js";import"./index.c4acc210.js";import"./index.vue_vue_type_script_setup_true_lang.f549c02e.js";import"./index.b2d8cbd8.js";import"./index.ea9cd244.js";import"./index.vue_vue_type_script_setup_true_lang.a60e2335.js";import"./usePaging.160b82b8.js";import"./vue3-video-play.4851e3ad.js";import"./vuedraggable.eee17a05.js";import"./vue.7e66a746.js";import"./sortablejs.d9cb9a0e.js";import"./lodash.873faf2b.js";import"./vue-router.12d45bc3.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.6e1df87d.js";import"./color.3050aad5.js";import"./clone.3b081931.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./nprogress.fd69c5bf.js";import"./vue-clipboard3.9796a14d.js";import"./clipboard.2bdac801.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";const Z=e("div",{class:"font-medium mb-7"},"\u5FAE\u4FE1\u516C\u4F17\u53F7",-1),$={class:"w-80"},P={class:"w-80"},Q=e("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A\u5BBD400px*\u9AD8400px\u3002jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),W=e("div",{class:"font-medium mb-7"},"\u516C\u4F17\u53F7\u5F00\u53D1\u8005\u4FE1\u606F",-1),X={class:"w-80"},Y={class:"w-80"},uu=e("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u5F00\u53D1\u8005ID\uFF0C\u8BBE\u7F6EAppID\u548CAppSecret ",-1),eu=e("div",{class:"font-medium mb-7"},"\u670D\u52A1\u5668\u914D\u7F6E",-1),ou={class:"flex-1 min-w-0"},tu={class:"sm:flex"},lu={class:"mr-4 sm:w-80 flex"},su=d("\u590D\u5236"),au=e("div",{class:"form-tips"}," \u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u57FA\u672C\u914D\u7F6E>\u670D\u52A1\u5668\u914D\u7F6E\uFF0C\u586B\u5199\u670D\u52A1\u5668\u5730\u5740\uFF08URL\uFF09 ",-1),iu={class:"flex-1 min-w-0"},du={class:"w-80"},nu=e("div",{class:"form-tips"}," \u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u57FA\u672C\u914D\u7F6E>\u670D\u52A1\u5668\u914D\u7F6E\uFF0C\u8BBE\u7F6E\u4EE4\u724CToken\u3002\u4E0D\u586B\u9ED8\u8BA4\u4E3A\u201Clikeshop\u201D ",-1),Fu={class:"flex-1 min-w-0"},_u={class:"w-80"},ru=e("div",{class:"form-tips"}," \u6D88\u606F\u52A0\u5BC6\u5BC6\u94A5\u753143\u4F4D\u5B57\u7B26\u7EC4\u6210\uFF0C\u5B57\u7B26\u8303\u56F4\u4E3AA-Z,a-z,0-9 ",-1),mu={class:"flex-1 min-w-0"},pu=d(" \u660E\u6587\u6A21\u5F0F (\u4E0D\u4F7F\u7528\u6D88\u606F\u4F53\u52A0\u89E3\u5BC6\u529F\u80FD\uFF0C\u5B89\u5168\u7CFB\u6570\u8F83\u4F4E) "),cu=d(" \u517C\u5BB9\u6A21\u5F0F (\u660E\u6587\u3001\u5BC6\u6587\u5C06\u5171\u5B58\uFF0C\u65B9\u4FBF\u5F00\u53D1\u8005\u8C03\u8BD5\u548C\u7EF4\u62A4) "),Bu=d(" \u5B89\u5168\u6A21\u5F0F\uFF08\u63A8\u8350\uFF09 (\u6D88\u606F\u5305\u4E3A\u7EAF\u5BC6\u6587\uFF0C\u9700\u8981\u5F00\u53D1\u8005\u52A0\u5BC6\u548C\u89E3\u5BC6\uFF0C\u5B89\u5168\u7CFB\u6570\u9AD8) "),Eu=e("div",{class:"font-medium mb-7"},"\u529F\u80FD\u8BBE\u7F6E",-1),fu={class:"flex-1 min-w-0"},Cu={class:"sm:flex"},Du={class:"mr-4 sm:w-80 flex"},Au=d("\u590D\u5236"),vu=e("div",{class:"form-tips"}," \u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u8BBE\u7F6E>\u516C\u4F17\u53F7\u8BBE\u7F6E>\u529F\u80FD\u8BBE\u7F6E\uFF0C\u586B\u5199\u4E1A\u52A1\u57DF\u540D ",-1),bu={class:"flex-1 min-w-0"},hu={class:"sm:flex"},wu={class:"mr-4 sm:w-80 flex"},Vu=d("\u590D\u5236"),gu=e("div",{class:"form-tips"}," \u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u8BBE\u7F6E>\u516C\u4F17\u53F7\u8BBE\u7F6E>\u529F\u80FD\u8BBE\u7F6E\uFF0C\u586B\u5199JS\u63A5\u53E3\u5B89\u5168\u57DF\u540D ",-1),xu={class:"flex-1 min-w-0"},yu={class:"sm:flex"},ku={class:"mr-4 sm:w-80 flex"},Uu=d("\u590D\u5236"),Su=e("div",{class:"form-tips"}," \u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u8BBE\u7F6E>\u516C\u4F17\u53F7\u8BBE\u7F6E>\u529F\u80FD\u8BBE\u7F6E\uFF0C\u586B\u5199\u7F51\u9875\u6388\u6743\u57DF\u540D ",-1),Iu=d("\u4FDD\u5B58"),Ru=D({name:"wxOaConfig"}),ge=D({...Ru,setup(qu){const A=G(),o=J({name:"",original_id:" ",qr_code:"",app_id:"",app_secret:"",url:"",token:"",encoding_aes_key:"",encryption_type:1,business_domain:"",js_secure_domain:"",web_auth_domain:""}),E=M(),v={app_id:[{required:!0,message:"\u8BF7\u8F93\u5165AppID",trigger:["blur","change"]}],app_secret:[{required:!0,message:"\u8BF7\u8F93\u5165AppSecret",trigger:["blur","change"]}]},f=async()=>{const F=await N();for(const l in o)o[l]=F[l]},b=async()=>{var F;await((F=E.value)==null?void 0:F.validate()),await O(o),f()};return f(),(F,l)=>{const h=U,_=S,i=I,a=R,w=L,r=q,B=j,V=T,g=K,x=k,c=C("copy"),y=C("perms");return n(),z("div",null,[u(_,{class:"!border-none",shadow:"never"},{default:t(()=>[u(h,{type:"warning",title:"\u6E29\u99A8\u63D0\u793A\uFF1A\u586B\u5199\u5FAE\u4FE1\u516C\u4F17\u53F7\u5F00\u53D1\u914D\u7F6E\uFF0C\u8BF7\u524D\u5F80\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\u7533\u8BF7\u670D\u52A1\u53F7\u5E76\u5B8C\u6210\u8BA4\u8BC1",closable:!1,"show-icon":""})]),_:1}),u(g,{ref_key:"formRef",ref:E,model:o,rules:v,"label-width":H(A).isMobile?"80px":"160px"},{default:t(()=>[u(_,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[Z,u(a,{label:"\u516C\u4F17\u53F7\u540D\u79F0",prop:"name"},{default:t(()=>[e("div",$,[u(i,{modelValue:o.name,"onUpdate:modelValue":l[0]||(l[0]=s=>o.name=s),placeholder:"\u8BF7\u8F93\u5165\u516C\u4F17\u53F7\u540D\u79F0"},null,8,["modelValue"])])]),_:1}),u(a,{label:"\u539F\u59CBID",prop:"original_id"},{default:t(()=>[e("div",P,[u(i,{modelValue:o.original_id,"onUpdate:modelValue":l[1]||(l[1]=s=>o.original_id=s),placeholder:"\u8BF7\u8F93\u5165\u539F\u59CBID"},null,8,["modelValue"])])]),_:1}),u(a,{label:"\u516C\u4F17\u53F7\u4E8C\u7EF4\u7801",prop:"qr_code"},{default:t(()=>[e("div",null,[e("div",null,[u(w,{modelValue:o.qr_code,"onUpdate:modelValue":l[2]||(l[2]=s=>o.qr_code=s),limit:1},null,8,["modelValue"])]),Q])]),_:1})]),_:1}),u(_,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[W,u(a,{label:"AppID",prop:"app_id"},{default:t(()=>[e("div",X,[u(i,{modelValue:o.app_id,"onUpdate:modelValue":l[3]||(l[3]=s=>o.app_id=s),placeholder:"\u8BF7\u8F93\u5165AppID"},null,8,["modelValue"])])]),_:1}),u(a,{label:"AppSecret",prop:"app_secret"},{default:t(()=>[e("div",Y,[u(i,{modelValue:o.app_secret,"onUpdate:modelValue":l[4]||(l[4]=s=>o.app_secret=s),placeholder:"\u8BF7\u8F93\u5165AppSecret"},null,8,["modelValue"])])]),_:1}),u(a,null,{default:t(()=>[uu]),_:1})]),_:1}),u(_,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[eu,u(a,{label:"URL"},{default:t(()=>[e("div",ou,[e("div",tu,[e("div",lu,[u(i,{modelValue:o.url,"onUpdate:modelValue":l[5]||(l[5]=s=>o.url=s),disabled:""},null,8,["modelValue"])]),m((n(),p(r,null,{default:t(()=>[su]),_:1})),[[c,o.url]])]),au])]),_:1}),u(a,{label:"Token",prop:"Token"},{default:t(()=>[e("div",iu,[e("div",du,[u(i,{modelValue:o.token,"onUpdate:modelValue":l[6]||(l[6]=s=>o.token=s),placeholder:"\u8BF7\u8F93\u5165Token"},null,8,["modelValue"])]),nu])]),_:1}),u(a,{label:"EncodingAESKey",prop:"encoding_aes_key"},{default:t(()=>[e("div",Fu,[e("div",_u,[u(i,{modelValue:o.encoding_aes_key,"onUpdate:modelValue":l[7]||(l[7]=s=>o.encoding_aes_key=s),placeholder:"\u8BF7\u8F93\u5165EncodingAESKey"},null,8,["modelValue"])]),ru])]),_:1}),u(a,{label:"\u6D88\u606F\u52A0\u5BC6\u65B9\u5F0F",required:"",prop:"encryption_type"},{default:t(()=>[e("div",mu,[u(V,{class:"flex-col !items-start min-w-0",modelValue:o.encryption_type,"onUpdate:modelValue":l[8]||(l[8]=s=>o.encryption_type=s)},{default:t(()=>[u(B,{label:1},{default:t(()=>[pu]),_:1}),u(B,{label:2},{default:t(()=>[cu]),_:1}),u(B,{label:3},{default:t(()=>[Bu]),_:1})]),_:1},8,["modelValue"])])]),_:1})]),_:1}),u(_,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[Eu,u(a,{label:"\u4E1A\u52A1\u57DF\u540D"},{default:t(()=>[e("div",fu,[e("div",Cu,[e("div",Du,[u(i,{modelValue:o.business_domain,"onUpdate:modelValue":l[9]||(l[9]=s=>o.business_domain=s),disabled:""},null,8,["modelValue"])]),m((n(),p(r,null,{default:t(()=>[Au]),_:1})),[[c,o.business_domain]])]),vu])]),_:1}),u(a,{label:"JS\u63A5\u53E3\u5B89\u5168\u57DF\u540D"},{default:t(()=>[e("div",bu,[e("div",hu,[e("div",wu,[u(i,{modelValue:o.js_secure_domain,"onUpdate:modelValue":l[10]||(l[10]=s=>o.js_secure_domain=s),disabled:""},null,8,["modelValue"])]),m((n(),p(r,null,{default:t(()=>[Vu]),_:1})),[[c,o.js_secure_domain]])]),gu])]),_:1}),u(a,{label:"\u7F51\u9875\u6388\u6743\u57DF\u540D"},{default:t(()=>[e("div",xu,[e("div",yu,[e("div",ku,[u(i,{modelValue:o.web_auth_domain,"onUpdate:modelValue":l[11]||(l[11]=s=>o.web_auth_domain=s),disabled:""},null,8,["modelValue"])]),m((n(),p(r,null,{default:t(()=>[Uu]),_:1})),[[c,o.web_auth_domain]])]),Su])]),_:1})]),_:1})]),_:1},8,["model","label-width"]),m((n(),p(x,null,{default:t(()=>[u(r,{type:"primary",onClick:b},{default:t(()=>[Iu]),_:1})]),_:1})),[[y,["channel.official_account_setting/setConfig"]]])])}}});export{ge as default};
