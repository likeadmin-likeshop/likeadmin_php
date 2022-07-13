import{a8 as I,a9 as M,am as ae,d as K,y as W,ac as X,P as q,r as S,L as k,K as J,b7 as F,af as se,o as ne,c as le,T as oe,h as B,q as pe,X as re,N as Q,aA as Z,dY as he,dZ as ge,k as D,m as ce,ae as ye,a as b,p as V,d8 as _e,d9 as Ne,cw as Te,de as U,D as Pe,F as we,l as ie,d4 as Se,Y as Ce,dJ as Ee,U as ue,dH as G,O as $e,d_ as ee,b as xe,Q as Be,aw as ke,i as Oe,$ as Re,a0 as ze}from"./index.4026a001.js";import{U as de}from"./event.776e7e11.js";const H=Symbol("tabsRootContextKey"),Ae=I({tabs:{type:M(Array),default:()=>ae([])}}),Fe={name:"ElTabBar"},Le=K({...Fe,props:Ae,setup(e,{expose:c}){const x=e,T="ElTabBar",n=Q(),_=W(H);_||X(T,"<el-tabs><el-tab-bar /></el-tabs>");const m=q("tabs"),i=S(),p=S(),u=()=>{let l=0,C=0;const h=["top","bottom"].includes(_.props.tabPosition)?"width":"height",o=h==="width"?"x":"y";return x.tabs.every(t=>{var g,f,E,O;const R=(f=(g=n.parent)==null?void 0:g.refs)==null?void 0:f[`tab-${t.paneName}`];if(!R)return!1;if(!t.active)return!0;C=R[`client${F(h)}`];const L=o==="x"?"left":"top";l=R.getBoundingClientRect()[L]-((O=(E=R.parentElement)==null?void 0:E.getBoundingClientRect()[L])!=null?O:0);const z=window.getComputedStyle(R);return h==="width"&&(x.tabs.length>1&&(C-=Number.parseFloat(z.paddingLeft)+Number.parseFloat(z.paddingRight)),l+=Number.parseFloat(z.paddingLeft)),!1}),{[h]:`${C}px`,transform:`translate${F(o)}(${l}px)`}},v=()=>p.value=u();return k(()=>x.tabs,async()=>{await J(),v()},{immediate:!0}),se(i,()=>v()),c({ref:i,update:v}),(l,C)=>(ne(),le("div",{ref_key:"barRef",ref:i,class:oe([B(m).e("active-bar"),B(m).is(B(_).props.tabPosition)]),style:pe(p.value)},null,6))}});var Me=re(Le,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const De=I({panes:{type:M(Array),default:()=>ae([])},currentName:{type:[String,Number],default:""},editable:Boolean,onTabClick:{type:M(Function),default:Z},onTabRemove:{type:M(Function),default:Z},type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),te="ElTabNav",Ve=K({name:te,props:De,setup(e,{expose:c}){const x=Q(),T=W(H);T||X(te,"<el-tabs><tab-nav /></el-tabs>");const n=q("tabs"),_=he(),m=ge(),i=S(),p=S(),u=S(),v=S(!1),l=S(0),C=S(!1),h=S(!0),o=D(()=>["top","bottom"].includes(T.props.tabPosition)?"width":"height"),t=D(()=>({transform:`translate${o.value==="width"?"X":"Y"}(-${l.value}px)`})),g=()=>{if(!i.value)return;const a=i.value[`offset${F(o.value)}`],r=l.value;if(!r)return;const s=r>a?r-a:0;l.value=s},f=()=>{if(!i.value||!p.value)return;const a=p.value[`offset${F(o.value)}`],r=i.value[`offset${F(o.value)}`],s=l.value;if(a-s<=r)return;const P=a-s>r*2?s+r:a-r;l.value=P},E=async()=>{const a=p.value;if(!v.value||!u.value||!i.value||!a)return;await J();const r=u.value.querySelector(".is-active");if(!r)return;const s=i.value,P=["top","bottom"].includes(T.props.tabPosition),N=r.getBoundingClientRect(),y=s.getBoundingClientRect(),$=P?a.offsetWidth-y.width:a.offsetHeight-y.height,w=l.value;let d=w;P?(N.left<y.left&&(d=w-(y.left-N.left)),N.right>y.right&&(d=w+N.right-y.right)):(N.top<y.top&&(d=w-(y.top-N.top)),N.bottom>y.bottom&&(d=w+(N.bottom-y.bottom))),d=Math.max(d,0),l.value=Math.min(d,$)},O=()=>{if(!p.value||!i.value)return;const a=p.value[`offset${F(o.value)}`],r=i.value[`offset${F(o.value)}`],s=l.value;if(r<a){const P=l.value;v.value=v.value||{},v.value.prev=P,v.value.next=P+r<a,a-P<r&&(l.value=a-r)}else v.value=!1,s>0&&(l.value=0)},R=a=>{const r=a.code,{up:s,down:P,left:N,right:y}=U;if(![s,P,N,y].includes(r))return;const $=Array.from(a.currentTarget.querySelectorAll("[role=tab]")),w=$.indexOf(a.target);let d;r===N||r===s?w===0?d=$.length-1:d=w-1:w<$.length-1?d=w+1:d=0,$[d].focus(),$[d].click(),L()},L=()=>{h.value&&(C.value=!0)},z=()=>C.value=!1;return k(_,a=>{a==="hidden"?h.value=!1:a==="visible"&&setTimeout(()=>h.value=!0,50)}),k(m,a=>{a?setTimeout(()=>h.value=!0,50):h.value=!1}),se(u,O),ce(()=>setTimeout(()=>E(),0)),ye(()=>O()),c({scrollToActiveTab:E,removeFocus:z}),k(()=>e.panes,()=>x.update(),{flush:"post"}),()=>{const a=v.value?[b("span",{class:[n.e("nav-prev"),n.is("disabled",!v.value.prev)],onClick:g},[b(V,null,{default:()=>[b(_e,null,null)]})]),b("span",{class:[n.e("nav-next"),n.is("disabled",!v.value.next)],onClick:f},[b(V,null,{default:()=>[b(Ne,null,null)]})])]:null,r=e.panes.map((s,P)=>{var N,y,$,w;const d=(y=(N=s.props.name)!=null?N:s.index)!=null?y:`${P}`,Y=s.isClosable||e.editable;s.index=`${P}`;const ve=Y?b(V,{class:"is-icon-close",onClick:A=>e.onTabRemove(s,A)},{default:()=>[b(Te,null,null)]}):null,fe=((w=($=s.slots).label)==null?void 0:w.call($))||s.props.label,me=s.active?0:-1;return b("div",{ref:`tab-${d}`,class:[n.e("item"),n.is(T.props.tabPosition),n.is("active",s.active),n.is("disabled",s.props.disabled),n.is("closable",Y),n.is("focus",C.value)],id:`tab-${d}`,key:`tab-${d}`,"aria-controls":`pane-${d}`,role:"tab","aria-selected":s.active,tabindex:me,onFocus:()=>L(),onBlur:()=>z(),onClick:A=>{z(),e.onTabClick(s,d,A)},onKeydown:A=>{Y&&(A.code===U.delete||A.code===U.backspace)&&e.onTabRemove(s,A)}},[fe,ve])});return b("div",{ref:u,class:[n.e("nav-wrap"),n.is("scrollable",!!v.value),n.is(T.props.tabPosition)]},[a,b("div",{class:n.e("nav-scroll"),ref:i},[b("div",{class:[n.e("nav"),n.is(T.props.tabPosition),n.is("stretch",e.stretch&&["top","bottom"].includes(T.props.tabPosition))],ref:p,style:t.value,role:"tablist",onKeydown:R},[e.type?null:b(Me,{tabs:[...e.panes]},null),r])])])}}}),Ue=I({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:M(Function),default:()=>!0},stretch:Boolean}),j=e=>Pe(e)||we(e),Ie={[de]:e=>j(e),"tab-click":(e,c)=>c instanceof Event,"tab-change":e=>j(e),edit:(e,c)=>["remove","add"].includes(c),"tab-remove":e=>j(e),"tab-add":()=>!0};var Ke=K({name:"ElTabs",props:Ue,emits:Ie,setup(e,{emit:c,slots:x,expose:T}){var n,_;const m=q("tabs"),i=S(),p=ie({}),u=S((_=(n=e.modelValue)!=null?n:e.activeName)!=null?_:"0"),v=t=>{u.value=t,c(de,t),c("tab-change",t)},l=async t=>{var g,f,E;if(!(u.value===t||G(t)))try{await((g=e.beforeLeave)==null?void 0:g.call(e,t,u.value))!==!1&&(v(t),(E=(f=i.value)==null?void 0:f.removeFocus)==null||E.call(f))}catch{}},C=(t,g,f)=>{t.props.disabled||(l(g),c("tab-click",t,f))},h=(t,g)=>{t.props.disabled||G(t.props.name)||(g.stopPropagation(),c("edit",t.props.name,"remove"),c("tab-remove",t.props.name))},o=()=>{c("edit",void 0,"add"),c("tab-add")};return Se({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},D(()=>!!e.activeName)),k(()=>e.activeName,t=>l(t)),k(()=>e.modelValue,t=>l(t)),k(u,async()=>{var t;await J(),(t=i.value)==null||t.scrollToActiveTab()}),Ce(H,{props:e,currentName:u,registerPane:f=>p[f.uid]=f,unregisterPane:f=>delete p[f]}),T({currentName:u}),()=>{const t=e.editable||e.addable?b("span",{class:m.e("new-tab"),tabindex:"0",onClick:o,onKeydown:E=>{E.code===U.enter&&o()}},[b(V,{class:m.is("icon-plus")},{default:()=>[b(Ee,null,null)]})]):null,g=b("div",{class:[m.e("header"),m.is(e.tabPosition)]},[t,b(Ve,{ref:i,currentName:u.value,editable:e.editable,type:e.type,panes:Object.values(p),stretch:e.stretch,onTabClick:C,onTabRemove:h},null)]),f=b("div",{class:m.e("content")},[ue(x,"default")]);return b("div",{class:[m.b(),m.m(e.tabPosition),{[m.m("card")]:e.type==="card",[m.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[g,f]:[f,g]])}}});const qe=I({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),He=["id","aria-hidden","aria-labelledby"],Ye={name:"ElTabPane"},je=K({...Ye,props:qe,setup(e){const c=e,x="ElTabPane",T=Q(),n=$e(),_=W(H);_||X(x,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const m=q("tab-pane"),i=S(),p=D(()=>c.closable||_.props.closable),u=ee(()=>{var o;return _.currentName.value===((o=c.name)!=null?o:i.value)}),v=S(u.value),l=D(()=>{var o;return(o=c.name)!=null?o:i.value}),C=ee(()=>!c.lazy||v.value||u.value);k(u,o=>{o&&(v.value=!0)});const h=ie({uid:T.uid,slots:n,props:c,paneName:l,active:u,index:i,isClosable:p});return ce(()=>{_.registerPane(h)}),xe(()=>{_.unregisterPane(h.uid)}),(o,t)=>B(C)?Be((ne(),le("div",{key:0,id:`pane-${B(l)}`,class:oe(B(m).b()),role:"tabpanel","aria-hidden":!B(u),"aria-labelledby":`tab-${B(l)}`},[ue(o.$slots,"default")],10,He)),[[ke,B(u)]]):Oe("v-if",!0)}});var be=re(je,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const Je=Re(Ke,{TabPane:be}),Qe=ze(be);export{Qe as E,Je as a};