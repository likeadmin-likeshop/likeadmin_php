import{d as e,z as a,ak as t,ag as l,u as o,a1 as s,G as r,c as n,A as u,I as c,al as i,am as d,a9 as p,an as f,o as m,g,e as x,w as v,x as _,F as b,b as h,l as y,f as w,j as k,t as C,k as V,ao as j,v as L,ap as U,aq as $,N as S,ar as G,as as I,at as T,r as F,a as N,m as q,p as A,i as O,Q as D,au as W}from"./index.0c119821.js";import{_ as z}from"./page-meta.ba93fd71.js";import{_ as B}from"./u-button.71b8ca69.js";import{_ as P}from"./u-input.04952b66.js";import{_ as Q}from"./u-verification-code.591d2bcb.js";import{_ as R,a as E}from"./u-modal.55a6c4dc.js";import{u as H}from"./useLockFn.57ba2b25.js";import{_ as J}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.62b0787b.js";import"./emitter.5b880544.js";import"./u-loading.65ac2bcf.js";import"./u-popup.ce08d41a.js";var K=J(e({__name:"login",setup(e){const J=a(!0);J.value=t();const K=j(),M=L(),X=l(),Y=o(),Z=a(!1),ee=s(),ae=a("");a(!1);const te=a(!1),le=r({scene:1,account:"",password:"",code:""}),oe=a(!1),se=a(),re=e=>{ae.value=e};n((()=>Y.getWebsiteConfig));const ne=async()=>{var e,a;le.account&&(null==(e=ee.value)?void 0:e.canGetCode)&&(await U({scene:$.LOGIN,mobile:le.account}),uni.$u.toast("发送成功"),null==(a=ee.value)||a.start())},ue=e=>{le.scene=e},ce=e=>{var a;return null==(a=Y.getLoginConfig.login_way)?void 0:a.includes(String(e))},ie=n((()=>Y.getLoginConfig.wechat_auth)),de=n((()=>1==Y.getLoginConfig.login_agreement)),pe=n((()=>1==Y.getLoginConfig.third_auth)),fe=n((()=>1==Y.getLoginConfig.coerce_mobile)),me=async e=>{const{token:a,mobile:t}=e;if(!t&&fe.value)return X.temToken=a,M.navigateTo("/pages/bind_mobile/bind_mobile"),void f();X.login(e.token),await X.getUser(),uni.$u.toast("登录成功"),f();const l=S();if(l.length>1){const e=l[l.length-2];await M.navigateBack();const{onLoad:a,options:t}=e;a&&a(t)}else if(G.get(I))try{M.redirectTo(G.get(I))}finally{M.switchTab(G.get(I))}else M.reLaunch("/pages/index/index");G.remove(I)},{lockFn:ge}=H((async()=>{if(!te.value&&de.value)return Z.value=!0;if(1==le.scene){if(!le.account)return uni.$u.toast("请输入账号/手机号码");if(!le.password)return uni.$u.toast("请输入密码")}if(2==le.scene){if(!le.account)return uni.$u.toast("请输入手机号码");if(!le.code)return uni.$u.toast("请输入验证码")}p({title:"请稍后..."});try{const e=await W(le);me(e)}catch(e){f(),uni.$u.toast(e)}})),xe=async(e={getUrl:!0})=>{const{code:a,getUrl:t}=e;if(!t){return await T({code:a})}return await i.getUrl(d.LOGIN),Promise.reject()},ve=async()=>{if(!te.value&&de.value)return Z.value=!0,void console.log(Z.value);J.value&&xe()};u((()=>Y.getLoginConfig),(e=>{e.login_way&&(le.scene=e.login_way[0])}),{immediate:!0});const _e=n((()=>!(1!=le.scene||!le.account||!le.password)||!(2!=le.scene||!le.account||!le.code)));return c((async()=>{const e=i.getAuthData();try{if(e.code&&e.scene===d.LOGIN){p({title:"请稍后..."});const a=await xe(e);a&&(se.value=a,me(se.value))}}catch(a){(()=>{const e=K.query;e.code&&e.state&&(delete e.code,delete e.state,M.redirectTo({path:K.path,query:e}))})()}finally{f(),i.setAuthData()}})),(e,a)=>{const t=F(N("page-meta"),z),l=q,o=A,s=F(N("u-button"),B),r=F(N("u-input"),P),n=O,u=F(N("u-verification-code"),Q),c=D,i=F(N("u-checkbox"),R),d=F(N("u-modal"),E);return m(),g(b,null,[x(t,{"page-style":e.$theme.pageStyle},null,8,["page-style"]),x(o,{class:"bg-white login min-h-full flex flex-col items-center px-[40rpx] pt-[120rpx] box-border"},{default:v((()=>[x(o,null,{default:v((()=>[x(l,{src:_(Y).getWebsiteConfig.shop_logo,mode:"widthFix",class:"w-[160rpx] h-[160rpx] rounded-full"},null,8,["src"])])),_:1}),x(o,{class:"w-full mt-[140rpx] pb-[60rpx]"},{default:v((()=>[oe.value?w("v-if",!0):(m(),g(b,{key:0},[_(pe)&&J.value&&_(ie)?(m(),h(o,{key:0},{default:v((()=>[x(s,{type:"primary",onClick:ve,customStyle:{height:"100rpx"},"hover-class":"none"},{default:v((()=>[y(" 用户一键登录 ")])),_:1})])),_:1})):w("v-if",!0),x(o,{class:"mt-[40rpx]"},{default:v((()=>[x(s,{onClick:a[0]||(a[0]=e=>oe.value=!oe.value),customStyle:{height:"100rpx"},"hover-class":"none"},{default:v((()=>[y(" 手机号登录 ")])),_:1})])),_:1})],64)),oe.value?(m(),g(b,{key:1},[w(" 密码登录 "),1==le.scene&&ce(1)?(m(),g(b,{key:0},[x(o,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"},{default:v((()=>[x(r,{class:"flex-1",modelValue:le.account,"onUpdate:modelValue":a[1]||(a[1]=e=>le.account=e),border:!1,placeholder:"输入账号"},null,8,["modelValue"])])),_:1}),x(o,{class:"px-[18rpx] py-[10rpx] border border-solid border-light rounded-[10rpx] flex h-[100rpx] items-center mt-[40rpx]"},{default:v((()=>[x(r,{class:"flex-1",modelValue:le.password,"onUpdate:modelValue":a[2]||(a[2]=e=>le.password=e),type:"password",placeholder:"输入密码",border:!1},null,8,["modelValue"]),x(n,{url:"/pages/forget_pwd/forget_pwd","hover-class":"none"},{default:v((()=>[x(o,{class:"border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3"},{default:v((()=>[y(" 忘记密码？ ")])),_:1})])),_:1})])),_:1})],64)):w("v-if",!0),w(" 验证码登录 "),2==le.scene&&ce(2)?(m(),g(b,{key:1},[x(o,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex"},{default:v((()=>[x(r,{class:"flex-1",modelValue:le.account,"onUpdate:modelValue":a[3]||(a[3]=e=>le.account=e),border:!1,placeholder:"请输入手机号码"},null,8,["modelValue"])])),_:1}),x(o,{class:"px-[18rpx] border border-solid border-lightc border-light rounded-[10rpx] h-[100rpx] items-center flex mt-[40rpx]"},{default:v((()=>[x(r,{class:"flex-1",modelValue:le.code,"onUpdate:modelValue":a[4]||(a[4]=e=>le.code=e),placeholder:"请输入验证码",border:!1},null,8,["modelValue"]),x(o,{class:"border-l border-solid border-0 border-light pl-3 leading-4 ml-3 w-[180rpx]",onClick:ne},{default:v((()=>[x(u,{ref_key:"uCodeRef",ref:ee,seconds:60,onChange:re,"change-text":"x秒"},null,512),x(c,{class:k(le.account?"text-primary":"text-muted")},{default:v((()=>[y(C(ae.value),1)])),_:1},8,["class"])])),_:1})])),_:1})],64)):w("v-if",!0)],64)):w("v-if",!0),_(de)?(m(),h(o,{key:2,class:"mt-[40rpx]"},{default:v((()=>[x(i,{modelValue:te.value,"onUpdate:modelValue":a[7]||(a[7]=e=>te.value=e),shape:"circle"},{default:v((()=>[x(o,{class:"text-xs flex"},{default:v((()=>[y(" 已阅读并同意 "),x(o,{onClick:a[5]||(a[5]=V((()=>{}),["stop"]))},{default:v((()=>[x(n,{class:"text-primary","hover-class":"none",url:"/pages/agreement/agreement?type=service"},{default:v((()=>[y(" 《服务协议》 ")])),_:1})])),_:1}),y(" 和 "),x(o,{onClick:a[6]||(a[6]=V((()=>{}),["stop"]))},{default:v((()=>[x(n,{class:"text-primary","hover-class":"none",url:"/pages/agreement/agreement?type=privacy"},{default:v((()=>[y(" 《隐私协议》 ")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})):w("v-if",!0),oe.value?(m(),g(b,{key:3},[x(o,{class:"mt-[60rpx]"},{default:v((()=>[x(s,{type:"primary",onClick:a[8]||(a[8]=e=>_(ge)(le.scene)),customStyle:{height:"100rpx",opacity:_(_e)?"1":"0.5"},"hover-class":"none"},{default:v((()=>[y(" 登录 ")])),_:1},8,["customStyle"])])),_:1}),x(o,{class:"flex justify-between mt-[40rpx]"},{default:v((()=>[x(o,null,{default:v((()=>[y("已有账号，使用 "),2==le.scene&&ce(1)?(m(),g("span",{key:0,class:"text-primary",onClick:a[9]||(a[9]=e=>ue(1))},"密码登录")):w("v-if",!0),1==le.scene&&ce(2)?(m(),g("span",{key:1,class:"text-primary",onClick:a[10]||(a[10]=e=>ue(2))},"验证码登录")):w("v-if",!0)])),_:1}),x(n,{url:"/pages/register/register","hover-class":"none"},{default:v((()=>[y("注册账号")])),_:1})])),_:1})],64)):w("v-if",!0)])),_:1}),w(" 协议弹框 "),x(d,{modelValue:Z.value,"onUpdate:modelValue":a[11]||(a[11]=e=>Z.value=e),"show-cancel-button":"","show-title":!1,"confirm-color":"var(--color-primary)",onConfirm:a[12]||(a[12]=e=>{te.value=!0,Z.value=!1}),onCancel:a[13]||(a[13]=e=>Z.value=!1)},{default:v((()=>[x(o,{class:"text-center px-[70rpx] py-[60rpx]"},{default:v((()=>[x(o,null,{default:v((()=>[y(" 请先阅读并同意 ")])),_:1}),x(o,{class:"flex justify-center"},{default:v((()=>[x(n,{"data-theme":"",url:"/pages/agreement/agreement?type=service"},{default:v((()=>[x(o,{class:"text-primary"},{default:v((()=>[y("《服务协议》")])),_:1})])),_:1}),y(" 和 "),x(n,{url:"/pages/agreement/agreement?type=privacy"},{default:v((()=>[x(o,{class:"text-primary"},{default:v((()=>[y("《隐私协议》")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})],64)}}}),[["__scopeId","data-v-0e6ad699"]]);export{K as default};