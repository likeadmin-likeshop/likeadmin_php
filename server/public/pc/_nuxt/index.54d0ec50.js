import{s as ue,b3 as Te,b4 as Ae,Q as ie,b5 as Be,a as j,af as ce,r as w,V as S,u as e,M as H,aa as fe,aS as De,aQ as Le,ag as Oe,o as g,h as E,i as L,c as W,k as T,ai as K,Y as k,b6 as F,j as N,G as oe,b7 as Ve,am as Q,an as ne,p as O,b8 as Pe,X as de,B as ve,H as me,b9 as pe,t as ze,Z as he,aJ as He,N as _e,T as Fe,f as je,K as Re,ba as Ue,ap as We,aV as Ke,bb as Qe,w as qe,bc as Je}from"./entry.1150dd33.js";import{_ as Xe}from"./card.vue_vue_type_script_setup_true_lang.a3cc8e81.js";import{u as Ye}from"./asyncData.c1143cbf.js";import{t as le,E as Ge}from"./empty_news.cb45a1b6.js";import"./items.vue_vue_type_script_setup_true_lang.1e5648a0.js";import"./debounce.2cab6c4b.js";const ge=Symbol("carouselContextKey"),Ze=(C,p,c)=>Te(C.subTree).filter(o=>{var f;return Ae(o)&&((f=o.type)==null?void 0:f.name)===p&&!!o.component}).map(o=>o.component.uid).map(o=>c[o]).filter(o=>!!o),xe=(C,p)=>{const c={},a=ue([]);return{children:a,addChild:f=>{c[f.uid]=f,a.value=Ze(C,p,c)},removeChild:f=>{delete c[f],a.value=a.value.filter(h=>h.uid!==f)}}},et=ie({initialIndex:{type:Number,default:0},height:{type:String,default:""},trigger:{type:String,values:["hover","click"],default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:{type:String,values:["","none","outside"],default:""},indicator:{type:Boolean,default:!0},arrow:{type:String,values:["always","hover","never"],default:"hover"},type:{type:String,values:["","card"],default:""},loop:{type:Boolean,default:!0},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},pauseOnHover:{type:Boolean,default:!0}}),tt={change:(C,p)=>[C,p].every(Be)},at=["onMouseenter","onMouseleave"],st=["onMouseenter","onClick"],ot={key:0},re=300,nt=j({name:"ElCarousel"}),lt=j({...nt,props:et,emits:tt,setup(C,{expose:p,emit:c}){const a=C,l=ce("carousel"),{children:o,addChild:f,removeChild:h}=xe(_e(),"ElCarouselItem"),s=w(-1),v=w(null),_=w(!1),y=w(),M=S(()=>a.arrow!=="never"&&!e(A)),V=S(()=>o.value.some(t=>t.props.label.toString().length>0)),q=S(()=>{const t=[l.b(),l.m(a.direction)];return e(P)&&t.push(l.m("card")),t}),J=S(()=>{const t=[l.e("indicators"),l.em("indicators",a.direction)];return V.value&&t.push(l.em("indicators","labels")),(a.indicatorPosition==="outside"||e(P))&&t.push(l.em("indicators","outside")),t}),P=S(()=>a.type==="card"),A=S(()=>a.direction==="vertical"),R=le(t=>{i(t)},re,{trailing:!0}),X=le(t=>{Ce(t)},re);function n(){v.value&&(clearInterval(v.value),v.value=null)}function r(){a.interval<=0||!a.autoplay||v.value||(v.value=setInterval(()=>d(),a.interval))}const d=()=>{s.value<o.value.length-1?s.value=s.value+1:a.loop&&(s.value=0)};function i(t){if(He(t)){const I=o.value.filter(D=>D.props.name===t);I.length>0&&(t=o.value.indexOf(I[0]))}if(t=Number(t),Number.isNaN(t)||t!==Math.floor(t))return;const u=o.value.length,m=s.value;t<0?s.value=a.loop?u-1:0:t>=u?s.value=a.loop?0:u-1:s.value=t,m===s.value&&b(m),ee()}function b(t){o.value.forEach((u,m)=>{u.translateItem(m,s.value,t)})}function B(t,u){var m,I,D,te;const z=e(o),ae=z.length;if(ae===0||!t.states.inStage)return!1;const ke=u+1,Se=u-1,se=ae-1,Ee=z[se].states.active,Ne=z[0].states.active,$e=(I=(m=z[ke])==null?void 0:m.states)==null?void 0:I.active,Me=(te=(D=z[Se])==null?void 0:D.states)==null?void 0:te.active;return u===se&&Ne||$e?"left":u===0&&Ee||Me?"right":!1}function $(){_.value=!0,a.pauseOnHover&&n()}function Y(){_.value=!1,r()}function Z(t){e(A)||o.value.forEach((u,m)=>{t===B(u,m)&&(u.states.hover=!0)})}function x(){e(A)||o.value.forEach(t=>{t.states.hover=!1})}function we(t){s.value=t}function Ce(t){a.trigger==="hover"&&t!==s.value&&(s.value=t)}function Ie(){i(s.value-1)}function be(){i(s.value+1)}function ee(){n(),r()}H(()=>s.value,(t,u)=>{b(u),u>-1&&c("change",t,u)}),H(()=>a.autoplay,t=>{t?r():n()}),H(()=>a.loop,()=>{i(s.value)}),H(()=>a.interval,()=>{ee()}),H(()=>o.value,()=>{o.value.length>0&&i(a.initialIndex)});const G=ue();return fe(()=>{G.value=De(y.value,()=>{b()}),r()}),Le(()=>{n(),y.value&&G.value&&G.value.stop()}),Oe(ge,{root:y,isCardType:P,isVertical:A,items:o,loop:a.loop,addItem:f,removeItem:h,setActiveItem:i}),p({setActiveItem:i,prev:Ie,next:be}),(t,u)=>(g(),E("div",{ref_key:"root",ref:y,class:k(e(q)),onMouseenter:F($,["stop"]),onMouseleave:F(Y,["stop"])},[L("div",{class:k(e(l).e("container")),style:ve({height:t.height})},[e(M)?(g(),W(ne,{key:0,name:"carousel-arrow-left",persisted:""},{default:T(()=>[K(L("button",{type:"button",class:k([e(l).e("arrow"),e(l).em("arrow","left")]),onMouseenter:u[0]||(u[0]=m=>Z("left")),onMouseleave:x,onClick:u[1]||(u[1]=F(m=>e(R)(s.value-1),["stop"]))},[N(e(oe),null,{default:T(()=>[N(e(Ve))]),_:1})],34),[[Q,(t.arrow==="always"||_.value)&&(a.loop||s.value>0)]])]),_:1})):O("v-if",!0),e(M)?(g(),W(ne,{key:1,name:"carousel-arrow-right",persisted:""},{default:T(()=>[K(L("button",{type:"button",class:k([e(l).e("arrow"),e(l).em("arrow","right")]),onMouseenter:u[2]||(u[2]=m=>Z("right")),onMouseleave:x,onClick:u[3]||(u[3]=F(m=>e(R)(s.value+1),["stop"]))},[N(e(oe),null,{default:T(()=>[N(e(Pe))]),_:1})],34),[[Q,(t.arrow==="always"||_.value)&&(a.loop||s.value<e(o).length-1)]])]),_:1})):O("v-if",!0),de(t.$slots,"default")],6),t.indicatorPosition!=="none"?(g(),E("ul",{key:0,class:k(e(J))},[(g(!0),E(me,null,pe(e(o),(m,I)=>(g(),E("li",{key:I,class:k([e(l).e("indicator"),e(l).em("indicator",t.direction),e(l).is("active",I===s.value)]),onMouseenter:D=>e(X)(I),onClick:F(D=>we(I),["stop"])},[L("button",{class:k(e(l).e("button"))},[e(V)?(g(),E("span",ot,ze(m.props.label),1)):O("v-if",!0)],2)],42,st))),128))],2)):O("v-if",!0)],42,at))}});var rt=he(lt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);const ut=ie({name:{type:String,default:""},label:{type:[String,Number],default:""}}),U=.83,it=j({name:"ElCarouselItem"}),ct=j({...it,props:ut,setup(C){const p=C,c=ce("carousel"),a=Fe(ge),l=_e(),o=w(!1),f=w(0),h=w(1),s=w(!1),v=w(!1),_=w(!1),y=w(!1),{isCardType:M,isVertical:V}=a,q=S(()=>{const r=`${`translate${e(V)?"Y":"X"}`}(${e(f)}px)`,d=`scale(${e(h)})`;return{transform:[r,d].join(" ")}});function J(n,r,d){const i=d-1,b=r-1,B=r+1,$=d/2;return r===0&&n===i?-1:r===i&&n===0?d:n<b&&r-n>=$?d+1:n>B&&n-r>=$?-2:n}function P(n,r){var d;const i=((d=a.root.value)==null?void 0:d.offsetWidth)||0;return _.value?i*((2-U)*(n-r)+1)/4:n<r?-(1+U)*i/4:(3+U)*i/4}function A(n,r,d){const i=a.root.value;return i?((d?i.offsetHeight:i.offsetWidth)||0)*(n-r):0}const R=(n,r,d)=>{var i;const b=e(M),B=(i=a.items.value.length)!=null?i:Number.NaN,$=n===r;!b&&!Ue(d)&&(y.value=$||n===d),!$&&B>2&&a.loop&&(n=J(n,r,B));const Y=e(V);s.value=$,b?(_.value=Math.round(Math.abs(n-r))<=1,f.value=P(n,r),h.value=e(s)?1:U):f.value=A(n,r,Y),v.value=!0};function X(){if(a&&e(M)){const n=a.items.value.findIndex(({uid:r})=>r===l.uid);a.setActiveItem(n)}}return fe(()=>{a.addItem({props:p,states:je({hover:o,translate:f,scale:h,active:s,ready:v,inStage:_,animating:y}),uid:l.uid,translateItem:R})}),Re(()=>{a.removeItem(l.uid)}),(n,r)=>K((g(),E("div",{class:k([e(c).e("item"),e(c).is("active",s.value),e(c).is("in-stage",_.value),e(c).is("hover",o.value),e(c).is("animating",y.value),{[e(c).em("item","card")]:e(M)}]),style:ve(e(q)),onClick:X},[e(M)?K((g(),E("div",{key:0,class:k(e(c).e("mask"))},null,2)),[[Q,!s.value]]):O("v-if",!0),de(n.$slots,"default")],6)),[[Q,v.value]])}});var ye=he(ct,[["__file","/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);const ft=We(rt,{CarouselItem:ye}),dt=Ke(ye);function vt(){return $request.get({url:"/pc/index"})}const mt={class:"index"},pt={class:"flex"},ht={class:"mt-5 flex"},bt=j({__name:"index",async setup(C){let p,c;const a=Qe(),{data:l}=([p,c]=qe(()=>Ye(()=>vt(),{default:()=>({all:[],hot:[],new:[],page:{}})},"$pqtWcjQkdb")),p=await p,c(),p),o=S(()=>{var h;try{return(h=JSON.parse(l.value.page.data).find(v=>v.name==="banner"))==null?void 0:h.content}catch{return{}}}),f=S(()=>{var h,s;return((s=(h=o.value)==null?void 0:h.data)==null?void 0:s.filter(v=>v.is_show=="1"))||[]});return(h,s)=>{const v=Je,_=Xe;return g(),E("div",mt,[L("div",pt,[e(o).enabled?(g(),W(e(ft),{key:0,class:"w-[750px] flex-none mr-5",trigger:"click",height:"340px"},{default:T(()=>[(g(!0),E(me,null,pe(e(f),y=>(g(),W(e(dt),{key:y},{default:T(()=>[N(v,{to:y.link.path,target:"_blank"},{default:T(()=>[N(e(Ge),{class:"w-full h-full rounded-[8px] bg-white overflow-hidden",src:e(a).getImageUrl(y.image),fit:"contain"},null,8,["src"])]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})):O("",!0),N(_,{link:"/information/new",class:"flex-1 min-w-0",header:"\u6700\u65B0\u8D44\u8BAF",data:e(l).new,"show-time":!1},null,8,["data"])]),L("div",ht,[N(_,{link:"/information",class:"w-[750px] flex-none mr-5",header:"\u5168\u90E8\u8D44\u8BAF",data:e(l).all,"only-title":!1},null,8,["data"]),N(_,{link:"/information/hot",class:"flex-1",header:"\u70ED\u95E8\u8D44\u8BAF",data:e(l).hot,"only-title":!1,"image-size":"mini","show-author":!1,"show-desc":!1,"show-click":!1,border:!1,"title-line":2},null,8,["data"])])])}}});export{bt as default};
