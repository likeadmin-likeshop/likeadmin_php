import c from"./decoration-img.7c1c21f6.js";import{d as i,b as s,o as l,c as u,a as h,X as m,u as d,a0 as f}from"./@vue.b52708da.js";const g={class:"banner-image w-full h-full"},b=i({__name:"content",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})},height:{type:String,default:"170px"}},setup(e){const r=e,t=s(()=>{var a;return((a=r.content.data)==null?void 0:a.filter(n=>n.is_show=="1"))||[]}),o=s(()=>Array.isArray(t.value)&&t.value[0]?t.value[0].image:"");return(a,n)=>(l(),u("div",{class:"banner",style:f(e.styles)},[h("div",g,[m(c,{width:"100%",height:e.content.style==1?e.height:"550px",src:d(o),fit:"contain"},null,8,["height","src"])])],4))}});export{b as _};
