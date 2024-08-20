import{_ as t}from"./page-meta.7fcf423d.js";import{C as e,al as s,o as i,b as a,w as o,e as n,n as l,k as h,E as d,g as c,F as u,h as r,l as m,t as p,f as v,p as f,am as w,an as g,d as b,V as y,G as k,z as x,r as C,a as _}from"./index-aa2c3a24.js";import{_ as W}from"./news-card.cd42f1a4.js";import{_ as X}from"./_plugin-vue_export-helper.1b428a4d.js";import{_ as B}from"./z-paging.5f754451.js";import{e as $,c as j}from"./news.03e63066.js";import"./u-image.52659497.js";import"./u-icon.7e76f1a5.js";import"./icon_visit.713e13e8.js";const F=X({name:"u-swipe-action",emits:["click","content-click","open","close"],props:{index:{type:[Number,String],default:""},btnWidth:{type:[String,Number],default:180},disabled:{type:Boolean,default:!1},show:{type:Boolean,default:!1},bgColor:{type:String,default:"#ffffff"},vibrateShort:{type:Boolean,default:!1},options:{type:Array,default:()=>[]}},watch:{show:{immediate:!0,handler(t,e){t?this.open():this.close()}}},data(){return{moveX:0,scrollX:0,status:!1,movableAreaWidth:0,elId:this.$u.guid(),showBtn:!1}},computed:{movableViewWidth(){return this.movableAreaWidth+this.allBtnWidth+"px"},innerBtnWidth(){return e(this.btnWidth)},allBtnWidth(){return e(this.btnWidth)*this.options.length},btnStyle(){return t=>(t.width=this.btnWidth+"rpx",t)}},mounted(){this.getActionRect()},methods:{btnClick(t){this.status=!1,this.$emit("click",this.index,t)},change(t){this.scrollX=t.detail.x},close(){this.moveX=0,this.status=!1},open(){this.disabled||(this.moveX=-this.allBtnWidth,this.status=!0)},touchend(){this.moveX=this.scrollX,this.$nextTick((function(){0==this.status?this.scrollX<=-this.allBtnWidth/4?(this.moveX=-this.allBtnWidth,this.status=!0,this.emitOpenEvent(),this.vibrateShort&&s()):(this.moveX=0,this.status=!1,this.emitCloseEvent()):this.scrollX>3*-this.allBtnWidth/4?(this.moveX=0,this.$nextTick((()=>{this.moveX=101})),this.status=!1,this.emitCloseEvent()):(this.moveX=-this.allBtnWidth,this.status=!0,this.emitOpenEvent())}))},emitOpenEvent(){this.$emit("open",this.index)},emitCloseEvent(){this.$emit("close",this.index)},touchstart(){},getActionRect(){this.$uGetRect(".u-swipe-action").then((t=>{this.movableAreaWidth=t.width,this.$nextTick((()=>{this.showBtn=!0}))}))},contentClick(){1==this.status&&(this.status="close",this.moveX=0),this.$emit("content-click",this.index)}}},[["render",function(t,e,s,b,y,k){const x=f,C=w,_=g;return i(),a(x,{class:""},{default:o((()=>[n(_,{class:"u-swipe-action",style:l({backgroundColor:s.bgColor})},{default:o((()=>[n(C,{class:"u-swipe-view",onChange:k.change,onTouchend:k.touchend,onTouchstart:k.touchstart,direction:"horizontal",disabled:s.disabled,x:y.moveX,style:l({width:k.movableViewWidth?k.movableViewWidth:"100%"})},{default:o((()=>[n(x,{class:"u-swipe-content",onClick:h(k.contentClick,["stop"])},{default:o((()=>[d(t.$slots,"default",{},void 0,!0)])),_:3},8,["onClick"]),y.showBtn?(i(!0),c(u,{key:0},r(s.options,((t,e)=>(i(),a(x,{class:"u-swipe-del",onClick:h((t=>k.btnClick(e)),["stop"]),style:l([k.btnStyle(t.style)]),key:e},{default:o((()=>[n(x,{class:"u-btn-text"},{default:o((()=>[m(p(t.text),1)])),_:2},1024)])),_:2},1032,["onClick","style"])))),128)):v("v-if",!0)])),_:3},8,["onChange","onTouchend","onTouchstart","disabled","x","style"])])),_:3},8,["style"])])),_:3})}],["__scopeId","data-v-d29e9c37"]]),E=b({__name:"collection",setup(e){const s=y(),l=k([{text:"取消收藏",style:{color:"#FFFFFF",backgroundColor:"#FF2C3C"}}]),h=x([]),d=async(t,e)=>{const{lists:i}=await $();i.forEach((t=>{t.show=!1})),h.value=i,s.value.complete(i)},m=async t=>{try{const e=h.value[t].article_id;await j({id:e}),uni.$u.toast("已取消收藏"),s.value.reload()}catch(e){console.log("取消收藏报错=>",e)}};return(e,p)=>{const v=C(_("page-meta"),t),f=C(_("news-card"),W),w=C(_("u-swipe-action"),F),g=C(_("z-paging"),B);return i(),c(u,null,[n(v,{"page-style":e.$theme.pageStyle},null,8,["page-style"]),n(g,{ref_key:"paging",ref:s,modelValue:h.value,"onUpdate:modelValue":p[0]||(p[0]=t=>h.value=t),onQuery:d,fixed:!1,height:"100%","use-page-scroll":""},{default:o((()=>[(i(!0),c(u,null,r(h.value,((t,e)=>(i(),a(w,{show:t.show,index:e,key:t.id,onClick:m,options:l,"btn-width":"120"},{default:o((()=>[n(f,{item:t,newsId:t.article_id},null,8,["item","newsId"])])),_:2},1032,["show","index","options"])))),128))])),_:1},8,["modelValue"])],64)}}});export{E as default};