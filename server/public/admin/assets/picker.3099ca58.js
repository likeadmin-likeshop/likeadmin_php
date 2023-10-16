import{P as I}from"./index.4ce7b5a5.js";import{E as T}from"./element-plus.317dd699.js";import{F as N,_ as B,a as M}from"./index.c4acc210.js";import{u as H,d as O,b as Z}from"./index.565e6324.js";import{_ as j}from"./index.b2d8cbd8.js";import{D as q}from"./vuedraggable.eee17a05.js";import{d as G,r as i,a3 as J,e as S,w as K,D as V,n as Q,a4 as U,o as W,c as X,U as n,a8 as Y,L as p,a as s,P as $,Z as k,M as x,O as ee,H as le,_ as ae,S as oe,b7 as te,b6 as se}from"./@vue.e8706010.js";import{f as ie}from"./@vueuse.1e5a6e21.js";const ne=G({components:{Popup:I,Draggable:q,FileItem:N,Material:B,Preview:M},props:{modelValue:{type:[String,Array],default:()=>[]},type:{type:String,default:"image"},size:{type:String,default:"100px"},fileSize:{type:String,default:"100px"},limit:{type:Number,default:1},disabled:{type:Boolean,default:!1},hiddenUpload:{type:Boolean,default:!1},uploadClass:{type:String,default:""},excludeDomain:{type:Boolean,default:!1}},emits:["change","update:modelValue"],setup(e,{emit:o}){const h=i(),_=i(),g=i(""),w=i(!1),a=i([]),m=i([]),r=i(!0),c=i(-1),{disabled:y,limit:u,modelValue:C}=J(e),{getImageUrl:b}=H(),t=S(()=>{switch(e.type){case"image":return"\u56FE\u7247";case"video":return"\u89C6\u9891";default:return""}}),f=S(()=>e.limit-a.value.length>0),v=S(()=>r.value?u.value==-1?null:u.value-a.value.length:1),E=ie(()=>{const l=m.value.map(d=>e.excludeDomain?d.uri:d.url);r.value?a.value=[...a.value,...l]:a.value.splice(c.value,1,l.shift()),z()},1e3,!1),A=l=>{var d;y.value||(l>=0?(r.value=!1,c.value=l):r.value=!0,(d=h.value)==null||d.open())},F=l=>{m.value=l},z=()=>{const l=u.value!=1?a.value:a.value[0]||"";o("update:modelValue",l),o("change",l),P()},L=l=>{a.value.splice(l,1),z()},R=l=>{g.value=l,w.value=!0},P=()=>{Q(()=>{var l;e.hiddenUpload&&(a.value=[]),(l=_.value)==null||l.clearSelect()})};return K(C,l=>{a.value=Array.isArray(l)?l:l==""?[]:[l]},{immediate:!0}),V("limit",e.limit),V("hiddenUpload",e.hiddenUpload),{popupRef:h,materialRef:_,fileList:a,tipsText:t,handleConfirm:E,meterialLimit:v,showUpload:f,showPopup:A,selectChange:F,deleteImg:L,previewUrl:g,showPreview:w,handlePreview:R,handleClose:P,getImageUrl:b}}});const D=e=>(te("data-v-e0e82c22"),e=e(),se(),e),re={class:"material-select"},ue=["onClick"],de={class:"operation-btns text-xs text-center"},pe=D(()=>s("span",null,"\u4FEE\u6539",-1)),me=oe(" | "),ce=["onClick"],fe=D(()=>s("span",null,"\u6DFB\u52A0",-1)),ve={class:"material-wrap"};function he(e,o,h,_,g,w){const a=U("file-item"),m=j,r=U("draggable"),c=Z,y=B,u=T,C=I,b=U("preview");return W(),X("div",re,[n(C,{ref:"popupRef",width:"830px","custom-class":"body-padding",title:`\u9009\u62E9${e.tipsText}`,onConfirm:e.handleConfirm,onClose:e.handleClose},Y({default:p(()=>[n(u,null,{default:p(()=>[s("div",ve,[n(y,{ref:"materialRef",type:e.type,"file-size":e.fileSize,limit:e.meterialLimit,onChange:e.selectChange},null,8,["type","file-size","limit","onChange"])])]),_:1})]),_:2},[e.hiddenUpload?void 0:{name:"trigger",fn:p(()=>[s("div",{class:"material-select__trigger clearfix",onClick:o[2]||(o[2]=k(()=>{},["stop"]))},[n(r,{class:"draggable",modelValue:e.fileList,"onUpdate:modelValue":o[0]||(o[0]=t=>e.fileList=t),animation:"300","item-key":"id"},{item:p(({element:t,index:f})=>[s("div",{class:$(["material-preview",{"is-disabled":e.disabled,"is-one":e.limit==1}]),onClick:v=>e.showPopup(f)},[n(m,{onClose:v=>e.deleteImg(f)},{default:p(()=>[n(a,{uri:e.excludeDomain?e.getImageUrl(t):t,"file-size":e.size,type:e.type},null,8,["uri","file-size","type"])]),_:2},1032,["onClose"]),s("div",de,[pe,me,s("span",{onClick:k(v=>e.handlePreview(t),["stop"])},"\u67E5\u770B",8,ce)])],10,ue)]),_:1},8,["modelValue"]),x(s("div",{class:$(["material-upload",{"is-disabled":e.disabled,"is-one":e.limit==1,[e.uploadClass]:!0}]),onClick:o[1]||(o[1]=t=>e.showPopup(-1))},[le(e.$slots,"upload",{},()=>[s("div",{class:"upload-btn",style:ae({width:e.size,height:e.size})},[n(c,{size:25,name:"el-icon-Plus"}),fe],4)],!0)],2),[[ee,e.showUpload]])])])}]),1032,["title","onConfirm","onClose"]),n(b,{modelValue:e.showPreview,"onUpdate:modelValue":o[3]||(o[3]=t=>e.showPreview=t),url:e.previewUrl,type:e.type},null,8,["modelValue","url","type"])])}const ze=O(ne,[["render",he],["__scopeId","data-v-e0e82c22"]]);export{ze as _};
