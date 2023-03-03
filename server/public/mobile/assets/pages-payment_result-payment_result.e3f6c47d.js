import{d as a,z as e,aQ as s,m as t,A as r,W as l,o as u,e as i,h as o,b as d,w as c,g as n,l as m,t as f,c as _,F as p,J as g,H as x,r as y,a as h,y as v,k as b}from"./index.8db2afd7.js";import{g as w,_ as j,a as k}from"./pay.2a3d86b1.js";import{_ as O}from"./u-image.3b3481f8.js";import{_ as R}from"./u-button.215da162.js";import{_ as A}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.f772b850.js";var C=A(a({__name:"payment_result",setup(a){const A={succeed:{text:"支付成功",image:"/static/images/payment/icon_succeed.png"},waiting:{text:"等待支付",image:"/static/images/payment/icon_waiting.png"}},C=e(s.LOADING),E=e({id:"",from:""}),I=t({order:{}}),L=r((()=>{const a=!!I.pay_status;return A[a?"succeed":"waiting"]})),N=()=>{g({url:"/pages/index/index"})},z=()=>{if("recharge"===E.value.from)x({url:"/packages/pages/recharge/recharge"})};return l((async a=>{try{if(!a.id)throw new Error("订单不存在");E.value=a,await new Promise(((a,e)=>{w({order_id:E.value.id,from:E.value.from}).then((e=>{Object.assign(I,e),a(e)})).catch((a=>{e(a)}))})),C.value=s.NORMAL}catch(e){console.log(e),C.value=s.ERROR}})),(a,e)=>{const s=y(h("u-empty"),j),t=y(h("u-image"),O),r=v,l=b,g=y(h("u-button"),R),x=y(h("page-status"),k);return u(),i(p,null,[o(" 页面状态 "),d(x,{status:C.value},{error:c((()=>[d(s,{text:"订单不存在",mode:"order"})])),default:c((()=>[d(l,{class:"payment-result p-[20rpx]"},{default:c((()=>[d(l,{class:"result bg-white p-[20rpx] rounded-md"},{default:c((()=>[d(l,{class:"flex flex-col items-center my-[40rpx]"},{default:c((()=>[o(" 支付状态图片 "),d(t,{class:"status-image",src:n(L).image,width:"100",height:"100",shape:"circle"},null,8,["src"]),o(" 支付状态文字 "),d(r,{class:"text-2xl font-medium mt-[20rpx]"},{default:c((()=>[m(f(n(L).text),1)])),_:1}),d(l,{class:"text-3xl font-medium mt-[20rpx]"},{default:c((()=>[m(" ¥ "+f(I.order.order_amount),1)])),_:1})])),_:1}),o(" 支付信息 "),d(l,{class:"result-info"},{default:c((()=>[d(l,{class:"result-info__item"},{default:c((()=>[d(r,null,{default:c((()=>[m("订单编号")])),_:1}),d(r,null,{default:c((()=>[m(f(I.order.order_sn),1)])),_:1})])),_:1}),d(l,{class:"result-info__item"},{default:c((()=>[d(r,null,{default:c((()=>[m("付款时间")])),_:1}),d(r,null,{default:c((()=>[m(f(I.order.pay_time),1)])),_:1})])),_:1}),d(l,{class:"result-info__item"},{default:c((()=>[d(r,null,{default:c((()=>[m("支付方式")])),_:1}),I.pay_status?(u(),_(r,{key:0},{default:c((()=>[m(f(I.order.pay_way||"-"),1)])),_:1})):(u(),_(r,{key:1},{default:c((()=>[m("未支付")])),_:1}))])),_:1})])),_:1})])),_:1}),d(l,{class:"mt-[40rpx]"},{default:c((()=>[d(l,{class:"mb-[20rpx]"},{default:c((()=>["recharge"==E.value.from?(u(),_(g,{key:0,type:"primary",shape:"circle","hover-class":"none",onClick:z},{default:c((()=>[m(" 继续充值 ")])),_:1})):o("v-if",!0)])),_:1}),d(l,{class:"mb-[20rpx]"},{default:c((()=>[d(g,{type:"primary",plain:"",shape:"circle","hover-class":"none",onClick:N},{default:c((()=>[m(" 返回首页 ")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["status"])],2112)}}}),[["__scopeId","data-v-514986f8"]]);export{C as default};
