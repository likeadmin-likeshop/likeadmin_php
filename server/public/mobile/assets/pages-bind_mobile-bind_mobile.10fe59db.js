import{d as e,V as a,z as o,a8 as l,m as t,o as r,c as s,w as u,b as d,l as i,t as m,ag as n,aC as c,af as f,r as b,a as p,k as _}from"./index.aeb0ad66.js";import{a as x,_ as v}from"./u-form-item.e3fc0359.js";import{_ as h}from"./u-verification-code.3f7b3150.js";import{_ as g}from"./u-form.6d5fe33a.js";import{_ as j}from"./u-button.b495f4a3.js";import{S as k}from"./appEnums.18338bd1.js";import{_ as w}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.04cc1bc3.js";var V=w(e({__name:"bind_mobile",setup(e){const w=a(),V=o(""),y=l(),C=e=>{V.value=e},B=t({type:"bind",mobile:"",code:""}),$=async()=>{var e,a;if(!B.mobile)return uni.$u.toast("请输入手机号码");(null==(e=w.value)?void 0:e.canGetCode)&&(await n({scene:k.BIND_MOBILE,mobile:B.mobile}),uni.$u.toast("发送成功"),null==(a=w.value)||a.start())},I=async()=>B.mobile?B.code?(await c(B,{token:y.temToken}),uni.$u.toast("绑定成功"),y.login(y.temToken),void f()):uni.$u.toast("请输入验证码"):uni.$u.toast("请输入手机号码");return(e,a)=>{const o=b(p("u-input"),x),l=b(p("u-form-item"),v),t=b(p("u-verification-code"),h),n=_,c=b(p("u-form"),g),f=b(p("u-button"),j);return r(),s(n,{class:"bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border"},{default:u((()=>[d(n,{class:"w-full"},{default:u((()=>[d(c,{borderBottom:"","label-width":150},{default:u((()=>[d(l,{label:"手机号",borderBottom:""},{default:u((()=>[d(o,{class:"flex-1",modelValue:B.mobile,"onUpdate:modelValue":a[0]||(a[0]=e=>B.mobile=e),border:!1,placeholder:"请输入手机号码"},null,8,["modelValue"])])),_:1}),d(l,{label:"验证码",borderBottom:""},{default:u((()=>[d(o,{class:"flex-1",modelValue:B.code,"onUpdate:modelValue":a[1]||(a[1]=e=>B.code=e),placeholder:"请输入验证码",border:!1},null,8,["modelValue"]),d(n,{class:"border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3 w-[180rpx]",onClick:$},{default:u((()=>[d(t,{ref_key:"uCodeRef",ref:w,seconds:60,onChange:C,"change-text":"x秒"},null,512),i(" "+m(V.value),1)])),_:1})])),_:1})])),_:1}),d(n,{class:"mt-[40rpx]"},{default:u((()=>[d(f,{type:"primary",shape:"circle",onClick:I},{default:u((()=>[i(" 确定 ")])),_:1})])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-3b29402b"]]);export{V as default};