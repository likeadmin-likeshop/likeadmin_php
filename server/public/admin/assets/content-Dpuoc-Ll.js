import{d,i as r,o as s,a,b as e,F as _,r as p,e as x,G as m,t as c,m as f,q as u,x as v}from"./index-CxIKPv72.js";import{g as b}from"./decoration-Cg_eSayr.js";const w={class:"news"},y={key:0,class:"mr-[10px]"},g=["src"],h={class:"flex flex-col justify-between flex-1"},j={class:"text-[15px] font-medium line-clamp-2"},k={class:"line-clamp-1 text-sm mt-[8px]"},D={class:"text-[#999] text-xs w-full flex justify-between mt-[8px]"},V={class:"flex items-center"},B={class:"ml-[5px]"},N=d({__name:"content",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(C){const n=r([]);return(async()=>{const o=await b({limit:10});n.value=o})(),(o,i)=>{const l=u;return s(),a("div",w,[i[0]||(i[0]=e("div",{class:"flex items-center news-title mx-[10px] my-[15px] text-[17px] font-medium"}," 最新资讯 ",-1)),(s(!0),a(_,null,p(x(n),t=>(s(),a("div",{key:t.id,class:"news-card flex bg-white px-[10px] py-[16px] text-[#333] border-[#f2f2f2] border-b"},[t.image?(s(),a("div",y,[e("img",{src:t.image,class:"w-[120px] h-[90px] object-contain"},null,8,g)])):m("",!0),e("div",h,[e("div",j,c(t.title),1),e("div",k,c(t.desc),1),e("div",D,[e("div",null,c(t.create_time),1),e("div",V,[f(l,{name:"el-icon-View"}),e("div",B,c(t.click),1)])])])]))),128))])}}}),q=v(N,[["__scopeId","data-v-dba98882"]]);export{q as default};