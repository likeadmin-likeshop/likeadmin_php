import{_ as e}from"./u-icon.23be9572.js";import{r as t,a as i,o as a,c as s,w as l,b as h,v as n,y as r,E as o,l as c}from"./index.1f244ca0.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";var p=u({name:"u-checkbox",emits:["update:modelValue","input","change"],props:{value:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!1},name:{type:[String,Number],default:""},shape:{type:String,default:""},disabled:{type:[String,Boolean],default:""},labelDisabled:{type:[String,Boolean],default:""},activeColor:{type:String,default:""},iconSize:{type:[String,Number],default:""},labelSize:{type:[String,Number],default:""},size:{type:[String,Number],default:""}},data:()=>({parentDisabled:!1,newParams:{}}),created(){this.parent=this.$u.$parent.call(this,"u-checkbox-group"),this.parent&&this.parent.children.push(this)},computed:{valueCom(){return this.modelValue},isDisabled(){return""!==this.disabled?this.disabled:!!this.parent&&this.parent.disabled},isLabelDisabled(){return""!==this.labelDisabled?this.labelDisabled:!!this.parent&&this.parent.labelDisabled},checkboxSize(){return this.size?this.size:this.parent?this.parent.size:34},checkboxIconSize(){return this.iconSize?this.iconSize:this.parent?this.parent.iconSize:20},elActiveColor(){return this.activeColor?this.activeColor:this.parent?this.parent.activeColor:"primary"},elShape(){return this.shape?this.shape:this.parent?this.parent.shape:"square"},iconStyle(){let e={};return this.elActiveColor&&this.valueCom&&!this.isDisabled&&(e.borderColor=this.elActiveColor,e.backgroundColor=this.elActiveColor),e.width=this.$u.addUnit(this.checkboxSize),e.height=this.$u.addUnit(this.checkboxSize),e},iconColor(){return this.valueCom?"#ffffff":"transparent"},iconClass(){let e=[];return e.push("u-checkbox__icon-wrap--"+this.elShape),1==this.valueCom&&e.push("u-checkbox__icon-wrap--checked"),this.isDisabled&&e.push("u-checkbox__icon-wrap--disabled"),this.valueCom&&this.isDisabled&&e.push("u-checkbox__icon-wrap--disabled--checked"),e.join(" ")},checkboxStyle(){let e={};return this.parent&&this.parent.width&&(e.width=this.parent.width,e.flex=`0 0 ${this.parent.width}`),this.parent&&this.parent.wrap&&(e.width="100%",e.flex="0 0 100%"),e}},mounted(){this._emitEvent()},watch:{valueCom:{handler:function(e,t){this._emitEvent()}}},methods:{_emitEvent(){let e={value:this.valueCom,name:this.name};this.parent&&this.parent.emitEvent&&this.parent._emitEvent(e)},onClickLabel(){this.isLabelDisabled||this.isDisabled||this.setValue()},toggle(){this.isDisabled||this.setValue()},emitEvent(){let e={value:!this.valueCom,name:this.name};this.$emit("change",e),this.parent&&this.parent.emitEvent&&this.parent.emitEvent(e)},setValue(){let e=this.valueCom,t=0;if(this.parent&&this.parent.children&&this.parent.children.map((e=>{e.value&&t++})),1==e)this.emitEvent(),this.$emit("input",!e),this.$emit("update:modelValue",!e);else{if(this.parent&&t>=this.parent.max)return this.$u.toast(`最多可选${this.parent.max}项`);this.emitEvent(),this.$emit("input",!e),this.$emit("update:modelValue",!e)}}}},[["render",function(u,p,d,b,m,v){const f=t(i("u-icon"),e),C=c;return a(),s(C,{class:"u-checkbox",style:r([v.checkboxStyle])},{default:l((()=>[h(C,{class:n(["u-checkbox__icon-wrap",[v.iconClass]]),onClick:v.toggle,style:r([v.iconStyle])},{default:l((()=>[h(f,{class:"u-checkbox__icon-wrap__icon",name:"checkbox-mark",size:v.checkboxIconSize,color:v.iconColor},null,8,["size","color"])])),_:1},8,["onClick","class","style"]),h(C,{class:"u-checkbox__label",onClick:v.onClickLabel,style:r({fontSize:u.$u.addUnit(d.labelSize)})},{default:l((()=>[o(u.$slots,"default",{},void 0,!0)])),_:3},8,["onClick","style"])])),_:3},8,["style"])}],["__scopeId","data-v-5a6bc387"]]);export{p as _};
