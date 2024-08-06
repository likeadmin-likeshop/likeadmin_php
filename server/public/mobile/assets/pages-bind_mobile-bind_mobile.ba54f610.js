import{d as e,V as a,z as l,Z as t,G as o,o as r,g as s,e as i,w as d,l as u,j as n,t as m,F as p,ab as c,ac as b,aD as x,ai as f,r as _,a as g,p as h,a3 as y}from"./index-cca0a918.js";import{_ as v}from"./page-meta.a54da57d.js";import{_ as j}from"./u-input.2015e46f.js";import{_ as w}from"./u-verification-code.fdffb626.js";import{_ as V}from"./u-button.286a5b6f.js";import{_ as k}from"./_plugin-vue_export-helper.1b428a4d.js";import"./u-icon.8199a0c5.js";import"./emitter.1571a5d9.js";const $=k(e({__name:"bind_mobile",setup(e){const k=a(),$=l(""),C=t(),I=e=>{$.value=e},D=o({type:"bind",mobile:"",code:""}),S=async()=>{var e,a;if(!D.mobile)return uni.$u.toast("请输入手机号码");(null==(e=k.value)?void 0:e.canGetCode)&&(await c({scene:b.BIND_MOBILE,mobile:D.mobile}),uni.$u.toast("发送成功"),null==(a=k.value)||a.start())},B=async()=>D.mobile?D.code?(await x(D,{token:C.temToken}),uni.$u.toast("绑定成功"),C.login(C.temToken),void f()):uni.$u.toast("请输入验证码"):uni.$u.toast("请输入手机号码");return(e,a)=>{const l=_(g("page-meta"),v),t=h,o=_(g("u-input"),j),c=_(g("u-verification-code"),w),b=y,x=_(g("u-button"),V);return r(),s(p,null,[i(l,{"page-style":e.$theme.pageStyle},null,8,["page-style"]),i(t,{class:"bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border"},{default:d((()=>[i(t,{class:"w-full"},{default:d((()=>[i(t,{class:"text-2xl font-medium mb-[60rpx]"},{default:d((()=>[u("绑定手机号")])),_:1}),i(t,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"},{default:d((()=>[i(o,{class:"flex-1",modelValue:D.mobile,"onUpdate:modelValue":a[0]||(a[0]=e=>D.mobile=e),border:!1,placeholder:"请输入手机号码"},null,8,["modelValue"])])),_:1}),i(t,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"},{default:d((()=>[i(o,{class:"flex-1",modelValue:D.code,"onUpdate:modelValue":a[1]||(a[1]=e=>D.code=e),placeholder:"请输入验证码",border:!1},null,8,["modelValue"]),i(t,{class:"border-l border-solid border-0 border-light pl-3 leading-4 ml-3 w-[180rpx]",onClick:S},{default:d((()=>[i(c,{ref_key:"uCodeRef",ref:k,seconds:60,onChange:I,"change-text":"x秒"},null,512),i(b,{class:n(D.mobile?"text-primary":"text-muted")},{default:d((()=>[u(m($.value),1)])),_:1},8,["class"])])),_:1})])),_:1}),i(t,{class:"mt-[40rpx]"},{default:d((()=>[i(x,{type:"primary","hover-class":"none",customStyle:{height:"100rpx",opacity:D.mobile&&D.code?"1":"0.5"},onClick:B},{default:d((()=>[u(" 确定 ")])),_:1},8,["customStyle"])])),_:1})])),_:1})])),_:1})],64)}}}),[["__scopeId","data-v-4605d615"]]);export{$ as default};