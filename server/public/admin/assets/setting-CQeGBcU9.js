import{_ as y}from"./index-CAptsx20.js";import{d as f,i as k,f as I,j as _,o as x,a as B,m as r,w as a,e as s,b as m,p as C,E as S,v as M,I as l,ff as N}from"./index-CxIKPv72.js";import{E as q}from"./el-card-DDcm4FIi.js";import{E as F,a as R}from"./el-form-item-DXMlFMHu.js";import{_ as j}from"./picker-i9nkkqdv.js";import"./_baseClone-Cclv58hm.js";import"./_Uint8Array-3zasVRiK.js";import"./_initCloneObject-BDU-Y3TY.js";import"./index-CztTkn1O.js";import"./index-Cr67L_5o.js";import"./index-D2kcX1gB.js";import"./index.vue_vue_type_script_setup_true_lang-ZbIzRpuP.js";import"./el-tag-vY3DIJMZ.js";import"./isEqual-COF5tDj7.js";import"./el-select-Mi1Lmmwx.js";import"./index-DX66Z-02.js";import"./token-DI9FKtlJ.js";import"./el-table-column-CtDZjMl1.js";import"./el-checkbox-r-piVVjI.js";import"./index-D2NF0jp1.js";import"./index-C5fLYe8h.js";import"./el-tree-NuP0E0on.js";import"./index.vue_vue_type_script_setup_true_lang-SPp69LxQ.js";import"./el-popover-CXLB0Q9q.js";import"./usePaging-DoKal5g9.js";const D={class:"user-setting"},T={class:"w-80"},z={class:"w-80"},A={class:"w-80"},G={class:"w-80"},H={class:"w-80"},J=f({name:"userSetting"}),go=f({...J,setup(K){const i=k(),u=I(),o=_({avatar:"",account:"",name:"",password_old:"",password:"",password_confirm:""}),c=_({avatar:[{required:!0,message:"头像不能为空",trigger:["change"]}],name:[{required:!0,message:"请输入名称",trigger:["blur"]}]}),w=async()=>{const d=u.userInfo;for(const e in o)o[e]=d[e]},g=async()=>{if(o.password_old||o.password||o.password_confirm){if(!o.password_old)return l.msgError("请输入当前密码");if(!o.password)return l.msgError("请输入新的密码");if(!o.password_confirm)return l.msgError("请输入确定密码");if(o.password_confirm!=o.password)return l.msgError("两次输入的密码不一样")}if(o.password_old&&o.password&&o.password_confirm){if(o.password_old.length<6||o.password_old.length>32)return l.msgError("密码长度在6到32之间");if(o.password.length<6||o.password.length>32)return l.msgError("密码长度在6到32之间");if(o.password_confirm.length<6||o.password_confirm.length>32)return l.msgError("密码长度在6到32之间")}await N(o),u.getUserInfo()},V=async()=>{var d;await((d=i.value)==null?void 0:d.validate()),g()};return w(),(d,e)=>{const v=j,n=F,p=S,E=R,b=q,h=M,U=y;return x(),B("div",D,[r(b,{class:"!border-none",shadow:"never"},{default:a(()=>[r(E,{ref_key:"formRef",ref:i,class:"ls-form",model:s(o),rules:s(c),"label-width":"100px"},{default:a(()=>[r(n,{label:"头像：",prop:"avatar"},{default:a(()=>[r(v,{modelValue:s(o).avatar,"onUpdate:modelValue":e[0]||(e[0]=t=>s(o).avatar=t),limit:1},null,8,["modelValue"])]),_:1}),r(n,{label:"账号：",prop:"account"},{default:a(()=>[m("div",T,[r(p,{modelValue:s(o).account,"onUpdate:modelValue":e[1]||(e[1]=t=>s(o).account=t),disabled:""},null,8,["modelValue"])])]),_:1}),r(n,{label:"名称：",prop:"name"},{default:a(()=>[m("div",z,[r(p,{modelValue:s(o).name,"onUpdate:modelValue":e[2]||(e[2]=t=>s(o).name=t),placeholder:"请输入名称"},null,8,["modelValue"])])]),_:1}),r(n,{label:"当前密码：",prop:"password_old"},{default:a(()=>[m("div",A,[r(p,{modelValue:s(o).password_old,"onUpdate:modelValue":e[3]||(e[3]=t=>s(o).password_old=t),modelModifiers:{trim:!0},placeholder:"修改密码时必填, 不修改密码时留空",type:"password","show-password":""},null,8,["modelValue"])])]),_:1}),r(n,{label:"新的密码：",prop:"password"},{default:a(()=>[m("div",G,[r(p,{modelValue:s(o).password,"onUpdate:modelValue":e[4]||(e[4]=t=>s(o).password=t),modelModifiers:{trim:!0},placeholder:"修改密码时必填, 不修改密码时留空",type:"password","show-password":""},null,8,["modelValue"])])]),_:1}),r(n,{label:"确定密码：",prop:"password_confirm"},{default:a(()=>[m("div",H,[r(p,{modelValue:s(o).password_confirm,"onUpdate:modelValue":e[5]||(e[5]=t=>s(o).password_confirm=t),modelModifiers:{trim:!0},placeholder:"修改密码时必填, 不修改密码时留空",type:"password","show-password":""},null,8,["modelValue"])])]),_:1})]),_:1},8,["model","rules"])]),_:1}),r(U,null,{default:a(()=>[r(h,{type:"primary",onClick:V},{default:a(()=>e[6]||(e[6]=[C("保存")])),_:1})]),_:1})])}}});export{go as default};