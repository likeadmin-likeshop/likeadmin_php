import{d as e,z as a,G as s,I as o,K as t,o as l,g as r,e as d,w as u,l as p,t as m,b as i,f,F as n,aJ as c,aA as _,r as b,a as w,p as x}from"./index.85970f4f.js";import{_ as y}from"./page-meta.32d87b43.js";import{_ as g}from"./u-input.e8a49f8c.js";import{_ as h}from"./u-form-item.01118210.js";import{_ as v}from"./u-form.80b1a36c.js";import{_ as j}from"./u-button.9d50212b.js";import{_ as V}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.02809d74.js";import"./emitter.5b880544.js";var $=V(e({__name:"change_password",setup(e){const V=a(""),$=s({password:"",password_confirm:""}),B=async()=>$.old_password||"set"==V.value?$.password?$.password_confirm?$.password!=$.password_confirm?uni.$u.toast("两次输入的密码不一致"):(await c($),uni.$u.toast("操作成功"),void setTimeout((()=>{_()}),1500)):uni.$u.toast("请输入确认密码"):uni.$u.toast("请输入密码"):uni.$u.toast("请输入原来的密码");return o((e=>{V.value=e.type||"","set"==V.value&&t({title:"设置登录密码"})})),(e,a)=>{const s=b(w("page-meta"),y),o=x,t=b(w("u-input"),g),c=b(w("u-form-item"),h),_=b(w("u-form"),v),U=b(w("u-button"),j);return l(),r(n,null,[d(s,{"page-style":e.$theme.pageStyle},null,8,["page-style"]),d(o,{class:"register bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[100rpx] box-border"},{default:u((()=>[d(o,{class:"w-full"},{default:u((()=>[d(o,{class:"text-2xl font-medium mb-[60rpx]"},{default:u((()=>[p(m("set"==V.value?"设置登录密码":"修改登录密码"),1)])),_:1}),d(_,{borderBottom:"","label-width":150},{default:u((()=>["set"!=V.value?(l(),i(c,{key:0,label:"原密码",borderBottom:""},{default:u((()=>[d(t,{class:"flex-1",type:"password",modelValue:$.old_password,"onUpdate:modelValue":a[0]||(a[0]=e=>$.old_password=e),border:!1,placeholder:"请输入原来的密码"},null,8,["modelValue"])])),_:1})):f("v-if",!0),d(c,{label:"新密码",borderBottom:""},{default:u((()=>[d(t,{class:"flex-1",type:"password",modelValue:$.password,"onUpdate:modelValue":a[1]||(a[1]=e=>$.password=e),placeholder:"6-20位数字+字母或符号组合",border:!1},null,8,["modelValue"])])),_:1}),d(c,{label:"确认密码",borderBottom:""},{default:u((()=>[d(t,{class:"flex-1",type:"password",modelValue:$.password_confirm,"onUpdate:modelValue":a[2]||(a[2]=e=>$.password_confirm=e),placeholder:"再次输入新密码",border:!1},null,8,["modelValue"])])),_:1})])),_:1}),d(o,{class:"mt-[100rpx]"},{default:u((()=>[d(U,{type:"primary",shape:"circle",onClick:B},{default:u((()=>[p(" 确定 ")])),_:1})])),_:1})])),_:1})])),_:1})],64)}}}),[["__scopeId","data-v-66eb71bb"]]);export{$ as default};