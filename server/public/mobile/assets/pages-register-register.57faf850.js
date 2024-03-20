import{d as e,z as a,u as t,c as r,G as l,o,g as s,e as d,w as u,l as p,x as c,b as n,k as m,f as i,F as f,az as x,aA as _,r as g,a as b,p as h}from"./index.0c119821.js";import{_ as v}from"./page-meta.ba93fd71.js";import{_ as y}from"./u-input.04952b66.js";import{_ as w}from"./router-navigate.c51ed5f9.js";import{_ as V,a as j}from"./u-modal.55a6c4dc.js";import{_ as k}from"./u-button.71b8ca69.js";import{_ as C}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.62b0787b.js";import"./emitter.5b880544.js";import"./u-loading.65ac2bcf.js";import"./u-popup.ce08d41a.js";var U=C(e({__name:"register",setup(e){const C=a(!1),U=t(),$=r((()=>1==U.getLoginConfig.login_agreement)),S=l({account:"",password:"",password_confirm:""}),z=a(!1),A=async()=>S.account?S.password?S.password_confirm?!C.value&&$.value?z.value=!0:S.password!=S.password_confirm?uni.$u.toast("两次输入的密码不一致"):(await x(S),void _()):uni.$u.toast("请输入确认密码"):uni.$u.toast("请输入密码"):uni.$u.toast("请输入账号");return(e,a)=>{const t=g(b("page-meta"),v),r=h,l=g(b("u-input"),y),x=g(b("router-navigate"),w),_=g(b("u-checkbox"),V),U=g(b("u-button"),k),F=g(b("u-modal"),j);return o(),s(f,null,[d(t,{"page-style":e.$theme.pageStyle},null,8,["page-style"]),d(r,{class:"register bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border"},{default:u((()=>[d(r,{class:"w-full"},{default:u((()=>[d(r,{class:"text-2xl font-medium mb-[60rpx]"},{default:u((()=>[p("注册新账号")])),_:1}),d(r,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"},{default:u((()=>[d(l,{class:"flex-1",modelValue:S.account,"onUpdate:modelValue":a[0]||(a[0]=e=>S.account=e),border:!1,placeholder:"请输入账号"},null,8,["modelValue"])])),_:1}),d(r,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"},{default:u((()=>[d(l,{class:"flex-1",type:"password",modelValue:S.password,"onUpdate:modelValue":a[1]||(a[1]=e=>S.password=e),placeholder:"请输入密码",border:!1},null,8,["modelValue"])])),_:1}),d(r,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"},{default:u((()=>[d(l,{class:"flex-1",type:"password",modelValue:S.password_confirm,"onUpdate:modelValue":a[2]||(a[2]=e=>S.password_confirm=e),placeholder:"请再次输入密码",border:!1},null,8,["modelValue"])])),_:1}),c($)?(o(),n(r,{key:0,class:"mt-[40rpx]"},{default:u((()=>[d(_,{modelValue:C.value,"onUpdate:modelValue":a[5]||(a[5]=e=>C.value=e),shape:"circle"},{default:u((()=>[d(r,{class:"text-xs flex"},{default:u((()=>[p(" 已阅读并同意 "),d(r,{onClick:a[3]||(a[3]=m((()=>{}),["stop"]))},{default:u((()=>[d(x,{class:"text-primary","hover-class":"none",to:"/pages/agreement/agreement?type=service"},{default:u((()=>[p(" 《服务协议》 ")])),_:1})])),_:1}),p(" 和 "),d(r,{onClick:a[4]||(a[4]=m((()=>{}),["stop"]))},{default:u((()=>[d(x,{class:"text-primary","hover-class":"none",to:"/pages/agreement/agreement?type=privacy"},{default:u((()=>[p(" 《隐私协议》 ")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})):i("v-if",!0),d(r,{class:"mt-[60rpx]"},{default:u((()=>[d(U,{type:"primary","hover-class":"none",onClick:A,customStyle:{height:"100rpx",opacity:S.account&&S.password&&S.password_confirm?"1":"0.5"}},{default:u((()=>[p(" 注册 ")])),_:1},8,["customStyle"])])),_:1})])),_:1})])),_:1}),i(" 协议弹框 "),d(F,{modelValue:z.value,"onUpdate:modelValue":a[6]||(a[6]=e=>z.value=e),"show-cancel-button":"","show-title":!1,onConfirm:a[7]||(a[7]=e=>{C.value=!0,z.value=!1}),onCancel:a[8]||(a[8]=e=>z.value=!1),"confirm-color":"var(--color-primary)"},{default:u((()=>[d(r,{class:"text-center px-[70rpx] py-[60rpx]"},{default:u((()=>[d(r,null,{default:u((()=>[p(" 请先阅读并同意")])),_:1}),d(r,{class:"flex justify-center"},{default:u((()=>[d(x,{"data-theme":"",to:"/pages/agreement/agreement?type=service"},{default:u((()=>[d(r,{class:"text-primary"},{default:u((()=>[p("《服务协议》")])),_:1})])),_:1}),p(" 和 "),d(x,{to:"/pages/agreement/agreement?type=privacy"},{default:u((()=>[d(r,{class:"text-primary"},{default:u((()=>[p("《隐私协议》")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}}}),[["__scopeId","data-v-82f6475c"]]);export{U as default};