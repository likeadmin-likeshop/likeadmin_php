import{d,i as r,o as s,a as c,b as e,F as _,r as p,e as x,G as m,t as a,m as f,q as u,x as v}from"./index-C5Svqzv1.js";import{g as w}from"./decoration-Bx1KJouC.js";const y={class:"news"},b={key:0,class:"mr-[10px]"},g=["src"],h={class:"flex flex-col justify-between flex-1"},j={class:"text-[15px] font-medium line-clamp-2"},k={class:"line-clamp-1 text-sm mt-[8px]"},D={class:"text-[#999] text-xs w-full flex justify-between mt-[8px]"},V={class:"flex items-center"},B={class:"ml-[5px]"},N=d({__name:"content",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(C){const n=r([]);return(async()=>{const o=await w({limit:10});n.value=o})(),(o,i)=>{const l=u;return s(),c("div",y,[i[0]||(i[0]=e("div",{class:"flex items-center news-title mx-[10px] my-[15px] text-[17px] font-medium"}," 最新资讯 ",-1)),(s(!0),c(_,null,p(x(n),t=>(s(),c("div",{key:t.id,class:"news-card flex bg-white px-[10px] py-[16px] text-[#333] border-[#f2f2f2] border-b"},[t.image?(s(),c("div",b,[e("img",{src:t.image,class:"w-[120px] h-[90px] object-contain"},null,8,g)])):m("",!0),e("div",h,[e("div",j,a(t.title),1),e("div",k,a(t.desc),1),e("div",D,[e("div",null,a(t.create_time),1),e("div",V,[f(l,{name:"el-icon-View"}),e("div",B,a(t.click),1)])])])]))),128))])}}}),q=v(N,[["__scopeId","data-v-ee8cfed9"]]);export{q as default};
