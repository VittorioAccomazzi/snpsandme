(this.webpackJsonpsnpandme=this.webpackJsonpsnpandme||[]).push([[0],{100:function(t,e,n){t.exports=function(){return new Worker(n.p+"05a5069ab37953881250.worker.js")}},107:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(9),i=n.n(a),c=n(82),o=n(156),s=n(6),l=n(151),u=n(152),d=n(81),p=n.n(d),h=n(41),b=n(14),f=n.n(b),j=n(22),m=n(16),x=n(83),v=n(138),O=n(79),g=n.n(O),w=n(78),y=n.n(w),k=n(147),F=n(145),A=n(112),N=n(146),I=n(38),S=n(39),D=n(72),C=new(n.n(D).a),P=function(){function t(e){Object(I.a)(this,t),this.worker=null,this.data=null,this.timerID=null,this.progress=void 0,this.progress=e}return Object(S.a)(t,[{key:"start",value:function(){var t=Object(j.a)(f.a.mark((function t(e,n){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.worker){t.next=2;break}throw Error("foreground worked invoked while processing.");case 2:return this.data={snps:e,type:n},t.next=5,new C.default(this.data.type);case 5:this.worker=t.sent,this.worker.start(this.data.snps),this.startWorker();case 8:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"stop",value:function(){this.timerID&&window.clearTimeout(this.timerID),this.timerID=null,this.data=null}},{key:"startWorker",value:function(){var t=Object(j.a)(f.a.mark((function t(){var e,n=this;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.worker.start(this.data.snps),(e=function(){var t=Object(j.a)(f.a.mark((function t(){var r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.data||!n.worker){t.next=6;break}return n.timerID=null,t.next=4,n.worker.Next();case 4:r=t.sent,n.data&&n.worker&&(r.length>0?(n.progress(r),n.timerID=window.setTimeout(e,200)):(n.worker=null,console.log("Completly Done...")));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}())();case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),t}(),E=n(65),H=function(){function t(e,n){var r=this;Object(I.a)(this,t),this.list=void 0,this.list=[],e.split("\n").forEach((function(t){if(t.startsWith("rs")){var e=t.split("\t").map((function(t){return t.trim()}));if(4===e.length){var a=e[1].toUpperCase();(void 0===n||n.findIndex((function(t){return t===a}))>=0)&&e[3].match(/[AGCT]/)&&!Number.isNaN(Number(e[2]))&&r.list.push({id:e[0],chr:a,bases:e[3].toUpperCase()})}}}))}return Object(S.a)(t,[{key:"snpList",get:function(){return this.list}},{key:"snpChromosome",value:function(t){return t=t.trim().toUpperCase(),this.list.filter((function(e){return e.chr===t}))}}],[{key:"fromFile",value:function(){var e=Object(j.a)(f.a.mark((function e(n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!E.existsSync(n)){e.next=4;break}return e.abrupt("return",new Promise((function(e,r){E.readFile(n,{},(function(n,a){n&&r(n);var i=new t(a.toString());e(i)}))})));case 4:throw new Error("file ".concat(n," noy found!"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),t}(),W={ID:function(t,e,n){var r=parseInt(t.snp.id.substr(2)),a=parseInt(e.snp.id.substr(2));return"asc"===n?r-a:a-r},Chromosome:function(t,e,n){return z(t,e,n,"chr")},Base:function(t,e,n){return z(t,e,n,"bases")},Frequency:function(t,e,n){return L(t,e,n,"perc")},Publications:function(t,e,n){return L(t,e,n,"pub")}},R=function(){function t(e){Object(I.a)(this,t),this.worker=null,this.update=void 0,this.list=[],this.sortId="ID",this.sortDir="asc",this.update=e}return Object(S.a)(t,[{key:"start",value:function(t,e){var n=this;this.worker&&this.worker.stop();var r=new H(t,["Y","MT"]);this.list=r.snpList.map((function(t){return n.toSnpEl(t)})),this.doSort(),this.worker=new P((function(t){n.merge(t),"Frequency"!==n.sortId&&"Publications"!==n.sortId||n.doSort(),n.sendUpdate()})),this.worker.start(r.snpList,e)}},{key:"sort",value:function(t,e){this.sortId=t,this.sortDir=e,this.doSort(),this.sendUpdate()}},{key:"doSort",value:function(){var t=this;this.list=this.list.sort((function(e,n){return W[t.sortId](e.val,n.val,t.sortDir)}))}},{key:"sendUpdate",value:function(){var t=this.list.map((function(t){return{done:t.done,val:Object(h.a)({},t.val)}}));this.update(t)}},{key:"merge",value:function(t){this.list.forEach((function(e){if(!e.done){var n=t.find((function(t){return e.val.snp.id===t.snp.id}));n&&(e.done=!0,e.val.perc=n.perc,e.val.pub=n.pub)}}))}},{key:"toSnpEl",value:function(t){return{val:{snp:t,perc:null,pub:0},done:!1}}}]),t}();function z(t,e,n,r){return("asc"===n?1:-1)*(t.snp[r]>e.snp[r]?1:-1)}function L(t,e,n,r){var a,i;return("asc"===n?1:-1)*((null!==(a=t[r])&&void 0!==a?a:0)>(null!==(i=e[r])&&void 0!==i?i:0)?1:-1)}var U=n(46),T=Object(U.b)({name:"PopulationType",initialState:{population:"European"},reducers:{setPopulation:function(t,e){t.population=e.payload}}}),q=T.actions.setPopulation,B=function(t){return t.population.population},M=T.reducer,_=Object(U.b)({name:"Filename",initialState:{filename:""},reducers:{setFilename:function(t,e){t.filename=e.payload}}}),G=_.actions.setFilename,J=function(t){return t.filename.filename},V=_.reducer,Y=Object(U.b)({name:"Snps",initialState:{list:[]},reducers:{setSnps:function(t,e){t.list=e.payload}}}),$=Y.actions.setSnps,K=function(t){return t.snps},Q=Y.reducer,X="#FFFAAA",Z="#FFAAAA",tt="#A0A0FF",et="#FFFFFF",nt="#AAAAAA",rt=n(12),at=n(140),it=n(142),ct=n(143),ot=n(157),st=n(3),lt=Object(v.a)((function(t){return{table:{width:"100%"},container:{},header:{background:"#FAFAFA",fontWeight:"bold"}}})),ut=[{id:"ID",align:"left",text:"SNP id"},{id:"Chromosome",align:"right",text:"Chromosome"},{id:"Base",align:"right",text:"Base"},{id:"Frequency",align:"right",text:"Frequency"},{id:"Publications",align:"right",text:"Publications"}];function dt(t){var e=t.sort,n=lt(),a=Object(r.useState)("ID"),i=Object(m.a)(a,2),c=i[0],o=i[1],s=Object(r.useState)("asc"),l=Object(m.a)(s,2),u=l[0],d=l[1];return Object(st.jsx)(at.a,{children:Object(st.jsx)(it.a,{children:ut.map((function(t){return Object(st.jsx)(ct.a,{align:t.align,className:n.header,children:Object(st.jsx)(ot.a,{active:c===t.id,direction:u,onClick:function(){return function(t){var n="asc";c===t&&(n="asc"===u?"desc":"asc"),o(t),d(n),e(t,n)}(t.id)},children:t.text})},t.id)}))})})}var pt=n(144),ht=Object(v.a)((function(t){return{undefined:{background:nt},novalue:{background:et},high:{background:tt},mid:{background:X},low:{background:Z}}}));function bt(t){var e=t.list,n=ht(),r=function(t){var e=n.undefined;return t.done&&(t.val.perc?(e=n.high,t.val.perc<.5&&(e=n.mid),t.val.perc<.25&&(e=n.low)):e=n.novalue),e};return Object(st.jsx)(pt.a,{children:e.map((function(t){return Object(st.jsxs)(it.a,{className:r(t),children:[Object(st.jsx)(ct.a,{component:"th",scope:"row",children:Object(st.jsx)("a",{target:"_blank",href:"https://www.ncbi.nlm.nih.gov/snp/".concat(t.val.snp.id),rel:"noreferrer",children:t.val.snp.id})}),Object(st.jsx)(ct.a,{align:"right",children:t.val.snp.chr}),Object(st.jsx)(ct.a,{align:"right",children:t.val.snp.bases}),Object(st.jsx)(ct.a,{align:"right",children:t.val.perc?t.val.perc.toFixed(2):"-"}),Object(st.jsxs)(ct.a,{align:"right",children:[t.val.pub>0?t.val.pub:t.val.perc?"0":"-"," "]})]},t.val.snp.id)}))})}var ft=Object(v.a)((function(t){return{table:{width:"100%"},container:{}}})),jt={maxHeight:"calc(100% - 2em)"};function mt(t){var e=t.data,n=ft(),a=Object(r.useRef)(null),i=Object(rt.b)(),c=Object(rt.c)(K),o=Object(rt.c)(B);Object(r.useEffect)((function(){a.current||(a.current=new R((function(t){i($(t))}))),a.current.start(e,o)}),[e,i,o]);return Object(st.jsx)(F.a,{component:A.a,className:n.container,style:jt,children:Object(st.jsxs)(N.a,{className:n.table,size:"small",stickyHeader:!0,"aria-label":"simple table",children:[Object(st.jsx)(dt,{sort:function(t,e){a.current&&a.current.sort(t,e)}}),Object(st.jsx)(bt,{list:c.list})]})})}var xt=Object(v.a)((function(t){return{root:{width:"100%",height:"100%",padding:"4px"},drop:{width:"100%",height:"100%",borderWidth:"2px",borderStyle:"dotted",borderColor:t.palette.primary.light,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column","&:hover":{borderColor:t.palette.primary.dark},"& .AddIcn":{fontSize:80,color:t.palette.primary.light},"&:hover .AddIcn":{fontSize:80,color:t.palette.primary.dark},"& .text":{textAlign:"center",color:t.palette.primary.light},"&:hover .text":{textAlign:"center",color:t.palette.primary.dark}},noDisplay:{display:"none"}}})),vt=[".txt"];function Ot(){var t=xt(),e=Object(r.useState)(null),n=Object(m.a)(e,2),a=n[0],i=n[1],c=Object(r.useState)(null),o=Object(m.a)(c,2),s=o[0],l=o[1],u=Object(rt.b)(),d=Object(r.useCallback)(function(){var t=Object(j.a)(f.a.mark((function t(e){var n,r,a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((n=e.filter((function(t){return vt.some((function(e){var n;return null===(n=t.path)||void 0===n?void 0:n.toLowerCase().endsWith(e)}))}))).length>0)){t.next=9;break}return r=n[0],t.next=5,gt(r);case 5:yt(a=t.sent)?(i(a),u(G(r.name))):(i(null),l("".concat(r.name," is not valid"))),t.next=11;break;case 9:i(null),l("unable to load ".concat(e[0].name));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[i,u]),p=Object(x.a)({onDrop:d}),b=p.getRootProps,v=p.getInputProps,O=p.isDragActive;return Object(st.jsx)("div",{className:t.root,children:Object(st.jsxs)("div",Object(h.a)(Object(h.a)({},b()),{},{className:t.root,children:[Object(st.jsxs)("div",{className:O?t.drop:t.noDisplay,children:[Object(st.jsx)(y.a,{className:"AddIcn"}),Object(st.jsx)(k.a,{className:"text",children:"Drop the file here."})]}),null!==a?Object(st.jsx)(st.Fragment,{children:Object(st.jsx)(mt,{data:a})}):Object(st.jsxs)("div",{className:O?t.noDisplay:t.drop,children:[Object(st.jsx)("input",Object(h.a)({},v())),Object(st.jsx)(g.a,{className:"AddIcn"}),null!==s?Object(st.jsx)(st.Fragment,{children:Object(st.jsxs)(k.a,{className:"text",children:["\ud83d\udd90 ",s]})}):Object(st.jsx)(st.Fragment,{}),Object(st.jsxs)(st.Fragment,{children:[Object(st.jsx)(k.a,{className:"text",children:"Drag and Drop here your 23andme txt file."}),Object(st.jsx)(k.a,{className:"text",children:"or click here to select the file."})]})]})]}))})}function gt(t){return wt.apply(this,arguments)}function wt(){return(wt=Object(j.a)(f.a.mark((function t(e){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){var n=new FileReader;n.onloadend=function(){return t(n.result)},n.readAsText(e)})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function yt(t){return t.indexOf("This data file generated by 23andMe")>0&&t.indexOf("# rsid\tchromosome\tposition\tgenotype")>0}var kt=n(149),Ft=n(150),At=n(154),Nt=n(148),It=n(80),St=n.n(It),Dt=Object(v.a)((function(t){return Object(o.a)({cirProgress:{marginRight:t.spacing(2),color:"#0000FF"},txtProgress:{marginRight:t.spacing(2),color:"#0000FF"},cirHidden:{marginRight:t.spacing(2),color:"transparent"},textHidden:{display:"none"},iconDisplay:{color:"white"},iconHidden:{display:"none"}})}));function Ct(){var t=Dt(),e=Object(rt.c)(K),n=0,r=0;e.list.forEach((function(t){return t.done?r++:n++}));var a=r+n,i=a>0&&n>0,c=i?r/a*100:0,o=c>0?"determinate":"indeterminate",s=c>0?"".concat(Math.round(c),"%"):"";return Object(st.jsx)(st.Fragment,{children:Object(st.jsxs)(At.a,{position:"relative",display:"inline-flex",children:[Object(st.jsx)(Nt.a,{className:i?t.cirProgress:t.cirHidden,variant:o,value:c}),Object(st.jsxs)(At.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",children:[Object(st.jsx)(St.a,{className:i?t.iconHidden:a>0?t.iconDisplay:t.iconHidden,fontSize:"large"}),Object(st.jsx)(k.a,{variant:"caption",component:"div",className:i?t.txtProgress:t.textHidden,children:s})]})]})})}var Pt=Object(v.a)((function(t){return Object(o.a)({margin:{marginRight:t.spacing(2)},boxHidden:{display:"none"},boxDisplay:{display:"inline-flex"}})}));function Et(){var t=Pt(),e=Object(rt.c)(K),n=0,r=0,a=0,i=0,c=0;e.list.forEach((function(t){return t.done?t.val.perc?t.val.perc<.25?a++:t.val.perc<.5?r++:n++:i++:c++}));var o=[n,r,a,i,c],s=o.reduce((function(t,e){return t+e}),0),l=function(t){var e=[],n=t.reduce((function(t,e){return t+e}),0);if(n>0){var r=t.map((function(t){return Math.floor(100*t/n)})),a=100-r.reduce((function(t,e){return t+e}),0);r[0]+=a,e=r.map((function(t){return"".concat(t,"%")}))}return e}(o),u=[tt,X,Z,et,nt];return Object(st.jsxs)(At.a,{position:"relative",className:s>0?t.boxDisplay:t.boxHidden,children:[Object(st.jsxs)(k.a,{align:"center",variant:"caption",color:"secondary",className:t.margin,children:[" ","".concat(s," Snps, ").concat(a," low frequency")]}),Object(st.jsx)(At.a,{top:20,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",className:t.margin,children:l.map((function(t,e){return Object(st.jsx)("div",{style:{background:u[e],position:"relative",width:t,height:"5px"}})}))})]})}var Ht=n(153),Wt=n(158),Rt=Object(v.a)((function(t){return Object(o.a)({combobox:{marginRight:t.spacing(2),background:"transparent"},textColor:{color:"white",borderWidth:"1px",borderColor:"white !important"},icon:{fill:"white"}})}));function zt(){var t=Rt(),e=Object(rt.c)(B),n=Object(rt.b)(),r=["European","African","East Asian","South Asian"],a=["European","African","SAsian","EAsian"],i=r[a.indexOf(e)];return Object(st.jsx)(Ht.a,{className:t.combobox,variant:"outlined",size:"small",select:!0,value:i,onChange:function(t){var e,i=a[r.indexOf(null!==(e=t.target.value)&&void 0!==e?e:"European")];n(q(i))},InputProps:{classes:{root:t.textColor,notchedOutline:t.textColor}},SelectProps:{classes:{icon:t.icon}},children:r.map((function(t){return Object(st.jsx)(Wt.a,{value:t,children:t},t)}))})}var Lt=Object(v.a)((function(t){return Object(o.a)({root:{flexGrow:1},toolbar:{display:"flex",justifyContent:"space-between"},toolList:{display:"flex",alignItems:"center"}})}));function Ut(){var t=Lt(),e=Object(rt.c)(J);return Object(st.jsx)("div",{className:t.root,children:Object(st.jsx)(kt.a,{position:"static",children:Object(st.jsxs)(Ft.a,{variant:"dense",className:t.toolbar,children:[Object(st.jsxs)(k.a,{variant:"h6",color:"inherit",noWrap:!0,children:["SNPs and Me ",e.length>0?"[".concat(e,"]"):""]}),Object(st.jsxs)("div",{className:t.toolList,children:[Object(st.jsx)(zt,{}),Object(st.jsx)(Et,{}),Object(st.jsx)(Ct,{})]})]})})})}var Tt=n(58),qt=Object(v.a)((function(t){return{version:{position:"absolute",left:"14px",bottom:"0px",fontSize:"12px",color:t.palette.primary.main},ribbon:{position:"absolute",right:"0px",top:"0px"}}})),Bt=function(t){var e=t.label,n=t.baseURL,r=t.forkme,a=qt();return Object(st.jsxs)(st.Fragment,{children:[r&&n&&Object(st.jsx)("div",{className:a.ribbon,children:Object(st.jsx)("a",{href:n,children:Object(st.jsx)("img",{width:"100",height:"100",src:"https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=100%2C100",alt:"Fork me on GitHub"})})}),Object(st.jsx)("div",{className:a.version,onClick:function(){n&&""!==Tt.long&&(window.location.href=n+"/tree/"+Tt.long)},children:Object(st.jsx)("p",{children:e+Tt.version})})]})},Mt=Object(c.a)({palette:{primary:p.a,secondary:{main:"#fff"},background:{default:"#fff"}}}),_t=Object(s.a)((function(t){return Object(o.a)({app:{textAlign:"center"},main:{position:"absolute",top:"55px",right:"0px",left:"0px",bottom:"0px",background:"white",display:"flex",justifyContent:"center",alignItems:"center"}})}))((function(t){var e=t.classes;return Object(st.jsxs)(l.a,{theme:Mt,children:[Object(st.jsx)(u.a,{}),Object(st.jsxs)("div",{className:e.app,children:[Object(st.jsx)(Ut,{}),Object(st.jsx)("div",{className:e.main,children:Object(st.jsx)(Ot,{})}),Object(st.jsx)(Bt,{label:"version : ",forkme:!1,baseURL:"https://github.com/VittorioAccomazzi/Artist"})]})]})})),Gt=Object(U.a)({reducer:{population:M,snps:Q,filename:V}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(st.jsx)(rt.a,{store:Gt,children:Object(st.jsx)(_t,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},58:function(t){t.exports=JSON.parse('{"version":"cd63868\\n","long":"cd63868ce16d97d49121bf78ab04be4a2002d169\\n"}')},72:function(t,e,n){var r,a=n(108).wrap,i=n(100);t.exports=function t(){return this instanceof t?a(i()):r||(r=a(i()))}}},[[107,1,2]]]);
//# sourceMappingURL=main.d20b8243.chunk.js.map