System.register([],(function(e){"use strict";return{execute:function(){
/*!
       * escape-html
       * Copyright(c) 2012-2013 TJ Holowaychuk
       * Copyright(c) 2015 Andreas Lubbe
       * Copyright(c) 2015 Tiancheng "Timothy" Gu
       * MIT Licensed
       */
var r=/["'&<>]/;e("e",(function(e){var t,a=""+e,n=r.exec(a);if(!n)return a;var c="",s=0,u=0;for(s=n.index;s<a.length;s++){switch(a.charCodeAt(s)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}u!==s&&(c+=a.substring(u,s)),u=s+1,c+=t}return u!==s?c+a.substring(u,s):c}))}}}));
