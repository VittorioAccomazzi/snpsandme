(this.webpackJsonpsnpandme=this.webpackJsonpsnpandme||[]).push([[0],{38:function(e){e.exports=JSON.parse('{"version":"3327169\\n","long":"33271694bca7af494da9d20046dcd70b15aae879\\n"}')},80:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(13),i=n.n(a),c=n(60),o=n(113),s=n(6),l=n(110),u=n(111),d=n(58),b=n.n(d),j=n(39),h=n(15),p=n.n(h),f=n(22),x=n(17),m=n(62),O=n(99),g=n(57),v=n.n(g),y=n(56),w=n.n(y),k=n(107),N=n(63),C=n(50),I=n(51),S=n(42),A=function(){function e(t,n){var r=this;Object(C.a)(this,e),this.list=void 0,this.list=[],t.split("\n").forEach((function(e){if(e.startsWith("rs")){var t=e.split("\t").map((function(e){return e.trim()}));if(4===t.length){var a=t[1].toUpperCase();(void 0===n||n.findIndex((function(e){return e===a}))>=0)&&t[3].match(/[AGCT]/)&&!Number.isNaN(Number(t[2]))&&r.list.push({id:t[0],chr:a,bases:t[3].toUpperCase()})}}}))}return Object(I.a)(e,[{key:"snpList",get:function(){return this.list}},{key:"snpChromosome",value:function(e){return e=e.trim().toUpperCase(),this.list.filter((function(t){return t.chr===e}))}}],[{key:"fromFile",value:function(){var t=Object(f.a)(p.a.mark((function t(n){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!S.existsSync(n)){t.next=4;break}return t.abrupt("return",new Promise((function(t,r){S.readFile(n,{},(function(n,a){n&&r(n);var i=new e(a.toString());t(i)}))})));case 4:throw new Error("file ".concat(n," noy found!"));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),e}(),F=n(101),D=n(82),P=n(102),L=n(103),z=n(104),U=n(105),W=n(112),B=n(106),E=n(2),R=Object(O.a)((function(e){return{table:{width:"100%"},container:{},header:{background:"#FAFAFA",fontWeight:"bold"}}})),T={maxHeight:"calc(100% - 2em)"},_={ID:G,Chromosome:function(e,t,n){return H(e,t,n,"chr")},Base:function(e,t,n){return H(e,t,n,"bases")},Frequency:G,Publications:G};function q(e){var t=e.data,n=R(),a=Object(r.useState)([]),i=Object(x.a)(a,2),c=i[0],o=i[1];Object(r.useEffect)((function(){var e=new A(t,["Y","MT"]).snpList.sort((function(e,t){return _.ID(e,t,"asc")}));o(e)}),[t]);return Object(E.jsx)(F.a,{component:D.a,className:n.container,style:T,children:Object(E.jsxs)(P.a,{className:n.table,size:"small",stickyHeader:!0,"aria-label":"simple table",children:[Object(E.jsx)(M,{sort:function(e,t){var n=c.sort((function(n,r){return _[e](n,r,t)}));o(Object(N.a)(n))}}),Object(E.jsx)(V,{list:c})]})})}function G(e,t,n){var r=parseInt(e.id.substr(2)),a=parseInt(t.id.substr(2));return"asc"===n?r-a:a-r}function H(e,t,n,r){return("asc"===n?1:-1)*(e[r]>t[r]?1:-1)}var J=[{id:"ID",align:"left",text:"SNP id"},{id:"Chromosome",align:"right",text:"Chromosome"},{id:"Base",align:"right",text:"Base"},{id:"Frequency",align:"right",text:"Frequency"},{id:"Publications",align:"right",text:"Publications"}];function M(e){var t=e.sort,n=R(),a=Object(r.useState)("ID"),i=Object(x.a)(a,2),c=i[0],o=i[1],s=Object(r.useState)("asc"),l=Object(x.a)(s,2),u=l[0],d=l[1];return Object(E.jsx)(L.a,{children:Object(E.jsx)(z.a,{children:J.map((function(e){return Object(E.jsx)(U.a,{align:e.align,className:n.header,children:Object(E.jsx)(W.a,{active:c===e.id,direction:u,onClick:function(){return function(e){var n="asc";c===e&&(n="asc"===u?"desc":"asc"),o(e),d(n),t(e,n)}(e.id)},children:e.text})},e.id)}))})})}function V(e){var t=e.list;return Object(E.jsx)(B.a,{children:t.map((function(e){return Object(E.jsxs)(z.a,{children:[Object(E.jsx)(U.a,{component:"th",scope:"row",children:Object(E.jsx)("a",{target:"_blank",href:"https://www.ncbi.nlm.nih.gov/snp/".concat(e.id),children:e.id})}),Object(E.jsx)(U.a,{align:"right",children:e.chr}),Object(E.jsx)(U.a,{align:"right",children:e.bases}),Object(E.jsx)(U.a,{align:"right",children:"to do"}),Object(E.jsx)(U.a,{align:"right",children:"to do "})]},e.id)}))})}var Y=Object(O.a)((function(e){return{root:{width:"100%",height:"100%",padding:"4px"},drop:{width:"100%",height:"100%",borderWidth:"2px",borderStyle:"dotted",borderColor:e.palette.primary.light,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column","&:hover":{borderColor:e.palette.primary.dark},"& .AddIcn":{fontSize:80,color:e.palette.primary.light},"&:hover .AddIcn":{fontSize:80,color:e.palette.primary.dark},"& .text":{textAlign:"center",color:e.palette.primary.light},"&:hover .text":{textAlign:"center",color:e.palette.primary.dark}},noDisplay:{display:"none"}}})),$=[".txt"];function K(){var e=Y(),t=Object(r.useState)(null),n=Object(x.a)(t,2),a=n[0],i=n[1],c=Object(r.useState)(null),o=Object(x.a)(c,2),s=o[0],l=o[1],u=Object(r.useCallback)(function(){var e=Object(f.a)(p.a.mark((function e(t){var n,r,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((n=t.filter((function(e){return $.some((function(t){var n;return null===(n=e.path)||void 0===n?void 0:n.toLowerCase().endsWith(t)}))}))).length>0)){e.next=9;break}return r=n[0],e.next=5,Q(r);case 5:Z(a=e.sent)?i(a):(i(null),l("".concat(r.name," is not valid"))),e.next=11;break;case 9:i(null),l("unable to load ".concat(t[0].name));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[i]),d=Object(m.a)({onDrop:u}),b=d.getRootProps,h=d.getInputProps,O=d.isDragActive;return Object(E.jsx)("div",{className:e.root,children:Object(E.jsxs)("div",Object(j.a)(Object(j.a)({},b()),{},{className:e.root,children:[Object(E.jsxs)("div",{className:O?e.drop:e.noDisplay,children:[Object(E.jsx)(w.a,{className:"AddIcn"}),Object(E.jsx)(k.a,{className:"text",children:"Drop the file here."})]}),null!==a?Object(E.jsx)(E.Fragment,{children:Object(E.jsx)(q,{data:a})}):Object(E.jsxs)("div",{className:O?e.noDisplay:e.drop,children:[Object(E.jsx)("input",Object(j.a)({},h())),Object(E.jsx)(v.a,{className:"AddIcn"}),null!==s?Object(E.jsx)(E.Fragment,{children:Object(E.jsxs)(k.a,{className:"text",children:["\ud83d\udd90 ",s]})}):Object(E.jsx)(E.Fragment,{}),Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)(k.a,{className:"text",children:"Drag and Drop here your 23andme txt file."}),Object(E.jsx)(k.a,{className:"text",children:"or click here to select the file."})]})]})]}))})}function Q(e){return X.apply(this,arguments)}function X(){return(X=Object(f.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var n=new FileReader;n.onloadend=function(){return e(n.result)},n.readAsText(t)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(e){return e.indexOf("This data file generated by 23andMe")>0&&e.indexOf("# rsid\tchromosome\tposition\tgenotype")>0}var ee=n(108),te=n(109),ne=Object(O.a)((function(e){return Object(o.a)({root:{flexGrow:1},toolbar:{display:"flex",justifyContent:"space-between"},toolList:{display:"flex",alignItems:"center"}})}));function re(){var e=ne();new URLSearchParams(window.location.search).get("all");return Object(E.jsx)("div",{className:e.root,children:Object(E.jsx)(ee.a,{position:"static",children:Object(E.jsxs)(te.a,{variant:"dense",className:e.toolbar,children:[Object(E.jsx)(k.a,{variant:"h6",color:"inherit",children:"SNPs and Me"}),Object(E.jsx)("div",{className:e.toolList})]})})})}var ae=n(38),ie=Object(O.a)((function(e){return{version:{position:"absolute",left:"14px",bottom:"0px",fontSize:"12px",color:e.palette.primary.main},ribbon:{position:"absolute",right:"0px",top:"0px"}}})),ce=function(e){var t=e.label,n=e.baseURL,r=e.forkme,a=ie();return Object(E.jsxs)(E.Fragment,{children:[r&&n&&Object(E.jsx)("div",{className:a.ribbon,children:Object(E.jsx)("a",{href:n,children:Object(E.jsx)("img",{width:"100",height:"100",src:"https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=100%2C100",alt:"Fork me on GitHub"})})}),Object(E.jsx)("div",{className:a.version,onClick:function(){n&&""!==ae.long&&(window.location.href=n+"/tree/"+ae.long)},children:Object(E.jsx)("p",{children:t+ae.version})})]})},oe=Object(c.a)({palette:{primary:b.a,secondary:{main:"#fff"},background:{default:"#fff"}}}),se=Object(s.a)((function(e){return Object(o.a)({app:{textAlign:"center"},main:{position:"absolute",top:"55px",right:"0px",left:"0px",bottom:"0px",background:"white",display:"flex",justifyContent:"center",alignItems:"center"}})}))((function(e){var t=e.classes;return Object(E.jsxs)(l.a,{theme:oe,children:[Object(E.jsx)(u.a,{}),Object(E.jsxs)("div",{className:t.app,children:[Object(E.jsx)(re,{}),Object(E.jsx)("div",{className:t.main,children:Object(E.jsx)(K,{})}),Object(E.jsx)(ce,{label:"version : ",forkme:!1,baseURL:"https://github.com/VittorioAccomazzi/Artist"})]})]})})),le=n(37),ue=Object(le.b)({name:"PopulationType",initialState:{population:"European"},reducers:{setPopulation:function(e,t){e.population=t.payload}}}),de=(ue.actions.setPopulation,ue.reducer),be=Object(le.a)({reducer:{population:de}}),je=n(61);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(E.jsx)(je.a,{store:be,children:Object(E.jsx)(se,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[80,1,2]]]);
//# sourceMappingURL=main.5cd21098.chunk.js.map