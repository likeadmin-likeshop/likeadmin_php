import{A as a}from"./index.1f244ca0.js";function t(t){const c=a(!1);return{isLock:c,lockFn:async(...a)=>{if(!c.value){c.value=!0;try{const n=await t(...a);return c.value=!1,n}catch(n){throw c.value=!1,n}}}}}export{t as u};
