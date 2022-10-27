import{_ as q}from"./index.7a46b8d2.js";import{H as I,I as U,C as y,D as S,w as R,F as N}from"./element-plus.81dd3128.js";import{_ as W}from"./picker.62cc0706.js";import{r as A,u as j}from"./index.a15bcf21.js";import{d as C,a1 as M,s as H,ah as E,o as a,c as O,W as o,O as t,a as u,P as F,M as m,u as P,U as _}from"./@vue.af680e04.js";import"./@vueuse.8c34eaea.js";import"./@element-plus.034bf3af.js";import"./lodash-es.70b90cb6.js";import"./dayjs.8a39f93d.js";import"./axios.ef849b08.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.c864908f.js";import"./index.e5c8e52e.js";import"./index.vue_vue_type_script_setup_true_lang.09e19d7d.js";import"./index.1d877511.js";import"./index.vue_vue_type_script_setup_true_lang.877bdfb3.js";import"./usePaging.01638e85.js";import"./vue3-video-play.e9a50e78.js";import"./vuedraggable.f1b552bb.js";import"./vue.9a71f557.js";import"./sortablejs.d7e1e118.js";import"./lodash.cceb5001.js";import"./vue-router.e1b37eed.js";import"./pinia.2a01c3c3.js";import"./vue-demi.bfae2336.js";import"./css-color-function.525addec.js";import"./color.629b30be.js";import"./clone.5fb606c0.js";import"./color-convert.69e17089.js";import"./color-string.e356f5de.js";import"./color-name.e7a4e1d3.js";import"./nprogress.06980d2d.js";import"./vue-clipboard3.5ebd6696.js";import"./clipboard.3fb7e13f.js";import"./echarts.5e2dc550.js";import"./zrender.510214c4.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.b2525ffc.js";function T(D){return A.post({url:"/channel.mnp_settings/setConfig",params:D})}function z(){return A.get({url:"/channel.mnp_settings/getConfig"})}const G=u("div",{class:"font-medium mb-7"},"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F",-1),J={class:"w-80"},K={class:"w-80"},L={class:"flex-1"},Q=u("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A\u5BBD400px*\u9AD8400px\u3002jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),X=u("div",{class:"font-medium mb-7"},"\u5F00\u53D1\u8005ID",-1),Y={class:"w-80"},Z={class:"w-80"},$=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u5F00\u53D1\u8005ID\uFF0C\u8BBE\u7F6EAppID\u548CAppSecret ",-1),uu=u("div",{class:"font-medium mb-7"},"\u670D\u52A1\u5668\u57DF\u540D",-1),eu={class:"flex-1 min-w-0"},ou={class:"sm:flex"},tu={class:"mr-4 sm:w-80 flex"},su=_("\u590D\u5236"),lu=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u670D\u52A1\u5668\u57DF\u540D\uFF0C\u586B\u5199https\u534F\u8BAE\u57DF\u540D ",-1),du={class:"flex-1 min-w-0"},iu={class:"sm:flex"},au={class:"mr-4 sm:w-80 flex"},nu=_("\u590D\u5236"),Fu=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u670D\u52A1\u5668\u57DF\u540D\uFF0C\u586B\u5199wss\u534F\u8BAE\u57DF\u540D ",-1),mu={class:"flex-1 min-w-0"},_u={class:"sm:flex"},pu={class:"mr-4 sm:w-80 flex"},ru=_("\u590D\u5236"),cu=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u670D\u52A1\u5668\u57DF\u540D\uFF0C\u586B\u5199https\u534F\u8BAE\u57DF\u540D ",-1),Du={class:"flex-1 min-w-0"},fu={class:"sm:flex"},Bu={class:"mr-4 sm:w-80 flex"},Eu=_("\u590D\u5236"),Au=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u670D\u52A1\u5668\u57DF\u540D\uFF0C\u586B\u5199https\u534F\u8BAE\u57DF\u540D ",-1),Cu={class:"flex-1 min-w-0"},vu={class:"sm:flex"},hu={class:"mr-4 sm:w-80 flex"},wu=_("\u590D\u5236"),bu=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u670D\u52A1\u5668\u57DF\u540D\uFF0C\u586B\u5199udp\u534F\u8BAE\u57DF\u540D ",-1),Vu=u("div",{class:"font-medium mb-7"},"\u4E1A\u52A1\u57DF\u540D",-1),gu={class:"flex-1 min-w-0"},xu={class:"sm:flex"},ku={class:"mr-4 sm:w-80 flex"},qu=_("\u590D\u5236"),Iu=u("div",{class:"form-tips"}," \u5C0F\u7A0B\u5E8F\u8D26\u53F7\u767B\u5F55\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\uFF0C\u70B9\u51FB\u5F00\u53D1>\u5F00\u53D1\u8BBE\u7F6E->\u4E1A\u52A1\u57DF\u540D\uFF0C\u586B\u5199\u4E1A\u52A1\u57DF\u540D ",-1),Uu=_("\u4FDD\u5B58"),yu=C({name:"weappConfig"}),ve=C({...yu,setup(D){const v=j(),e=M({name:"",original_id:"",qr_code:"",app_id:"",app_secret:"",business_domain:"",download_file_domain:"",request_domain:"",socket_domain:"",tcpDomain:"",udp_domain:"",upload_file_domain:""}),f=H(),h={app_id:[{required:!0,message:"\u8BF7\u8F93\u5165AppID",trigger:["blur","change"]}],app_secret:[{required:!0,message:"\u8BF7\u8F93\u5165AppSecret",trigger:["blur","change"]}]},B=async()=>{const r=await z();for(const s in e)e[s]=r[s]},w=async()=>{var r;await((r=f.value)==null?void 0:r.validate()),await T(e),B()};return B(),(r,s)=>{const b=I,c=U,i=y,d=S,V=W,n=R,g=N,x=q,p=E("copy"),k=E("perms");return a(),O("div",null,[o(c,{class:"!border-none",shadow:"never"},{default:t(()=>[o(b,{type:"warning",title:"\u6E29\u99A8\u63D0\u793A\uFF1A\u586B\u5199\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u914D\u7F6E\uFF0C\u8BF7\u524D\u5F80\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\u7533\u8BF7\u5C0F\u7A0B\u5E8F\u5E76\u5B8C\u6210\u8BA4\u8BC1",closable:!1,"show-icon":""})]),_:1}),o(g,{ref_key:"formRef",ref:f,model:e,rules:h,"label-width":P(v).isMobile?"80px":"160px"},{default:t(()=>[o(c,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[G,o(d,{label:"\u5C0F\u7A0B\u5E8F\u540D\u79F0",prop:"name"},{default:t(()=>[u("div",J,[o(i,{modelValue:e.name,"onUpdate:modelValue":s[0]||(s[0]=l=>e.name=l),placeholder:"\u8BF7\u8F93\u5165\u5C0F\u7A0B\u5E8F\u540D\u79F0"},null,8,["modelValue"])])]),_:1}),o(d,{label:"\u539F\u59CBID",prop:"original_id"},{default:t(()=>[u("div",K,[o(i,{modelValue:e.original_id,"onUpdate:modelValue":s[1]||(s[1]=l=>e.original_id=l),placeholder:"\u8BF7\u8F93\u5165\u539F\u59CBID"},null,8,["modelValue"])])]),_:1}),o(d,{label:"\u5C0F\u7A0B\u5E8F\u7801",prop:"qr_code"},{default:t(()=>[u("div",L,[u("div",null,[o(V,{modelValue:e.qr_code,"onUpdate:modelValue":s[2]||(s[2]=l=>e.qr_code=l),limit:1},null,8,["modelValue"])]),Q])]),_:1})]),_:1}),o(c,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[X,o(d,{label:"AppID",prop:"app_id"},{default:t(()=>[u("div",Y,[o(i,{modelValue:e.app_id,"onUpdate:modelValue":s[3]||(s[3]=l=>e.app_id=l),placeholder:"\u8BF7\u8F93\u5165AppID"},null,8,["modelValue"])])]),_:1}),o(d,{label:"AppSecret",prop:"app_secret"},{default:t(()=>[u("div",Z,[o(i,{modelValue:e.app_secret,"onUpdate:modelValue":s[4]||(s[4]=l=>e.app_secret=l),placeholder:"\u8BF7\u8F93\u5165AppSecret"},null,8,["modelValue"])])]),_:1}),o(d,null,{default:t(()=>[$]),_:1})]),_:1}),o(c,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[uu,o(d,{label:"request\u5408\u6CD5\u57DF\u540D",prop:"appId"},{default:t(()=>[u("div",eu,[u("div",ou,[u("div",tu,[o(i,{modelValue:e.request_domain,"onUpdate:modelValue":s[5]||(s[5]=l=>e.request_domain=l),disabled:""},null,8,["modelValue"])]),F((a(),m(n,null,{default:t(()=>[su]),_:1})),[[p,e.request_domain]])]),lu])]),_:1}),o(d,{label:"socket\u5408\u6CD5\u57DF\u540D"},{default:t(()=>[u("div",du,[u("div",iu,[u("div",au,[o(i,{modelValue:e.socket_domain,"onUpdate:modelValue":s[6]||(s[6]=l=>e.socket_domain=l),disabled:""},null,8,["modelValue"])]),F((a(),m(n,null,{default:t(()=>[nu]),_:1})),[[p,e.socket_domain]])]),Fu])]),_:1}),o(d,{label:"uploadFile\u5408\u6CD5\u57DF\u540D"},{default:t(()=>[u("div",mu,[u("div",_u,[u("div",pu,[o(i,{modelValue:e.upload_file_domain,"onUpdate:modelValue":s[7]||(s[7]=l=>e.upload_file_domain=l),disabled:""},null,8,["modelValue"])]),F((a(),m(n,null,{default:t(()=>[ru]),_:1})),[[p,e.upload_file_domain]])]),cu])]),_:1}),o(d,{label:"downloadFile\u5408\u6CD5\u57DF\u540D"},{default:t(()=>[u("div",Du,[u("div",fu,[u("div",Bu,[o(i,{modelValue:e.download_file_domain,"onUpdate:modelValue":s[8]||(s[8]=l=>e.download_file_domain=l),disabled:""},null,8,["modelValue"])]),F((a(),m(n,null,{default:t(()=>[Eu]),_:1})),[[p,e.download_file_domain]])]),Au])]),_:1}),o(d,{label:"udp\u5408\u6CD5\u57DF\u540D"},{default:t(()=>[u("div",Cu,[u("div",vu,[u("div",hu,[o(i,{modelValue:e.udp_domain,"onUpdate:modelValue":s[9]||(s[9]=l=>e.udp_domain=l),disabled:""},null,8,["modelValue"])]),F((a(),m(n,null,{default:t(()=>[wu]),_:1})),[[p,e.udp_domain]])]),bu])]),_:1})]),_:1}),o(c,{class:"!border-none mt-4",shadow:"never"},{default:t(()=>[Vu,o(d,{label:"\u4E1A\u52A1\u57DF\u540D"},{default:t(()=>[u("div",gu,[u("div",xu,[u("div",ku,[o(i,{modelValue:e.business_domain,"onUpdate:modelValue":s[10]||(s[10]=l=>e.business_domain=l),disabled:""},null,8,["modelValue"])]),F((a(),m(n,null,{default:t(()=>[qu]),_:1})),[[p,e.business_domain]])]),Iu])]),_:1})]),_:1})]),_:1},8,["model","label-width"]),F((a(),m(x,null,{default:t(()=>[o(n,{type:"primary",onClick:w},{default:t(()=>[Uu]),_:1})]),_:1})),[[k,["channel.mnp_settings/setConfig"]]])])}}});export{ve as default};
