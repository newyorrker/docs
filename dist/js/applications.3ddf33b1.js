(function(){"use strict";var t={8918:function(t,e,s){var i=s(538),n=s(6234),r=s(4553),o=s(7922),l=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{attrs:{id:"app"}},[t.isApplicationCreate?e("application-create"):e("applications-list")],1)},a=[],c=s(655),u=s(140),d=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"applications-list"},[e("button",{on:{click:t.goToApplicationsCreate}},[t._v("+")])])},p=[],h=s(5423);let f=class extends u.w3{goToApplicationsCreate(){const t=(0,h.Rg)(this.$store.getters["platform"],{isApplicationCreate:"true",isTypeSelect:"true"},"Создание заявки");document.location.href=t}};f=(0,c.gn)([(0,u.wA)({components:{}})],f);var m=f,v=m,g=s(1001),_=(0,g.Z)(v,d,p,!1,null,null,null),y=_.exports,w=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"applications-create"},[e("div",{staticClass:"applications-create__type"},[e("form-group",{attrs:{name:"Тип заявки"}},[e("select-control",{attrs:{items:t.list,placeholder:"Выберите тип заявки","is-loading":!1,"is-ajax":!1,"select-model":!1},model:{value:t.selectedTypeId,callback:function(e){t.selectedTypeId=e},expression:"selectedTypeId"}})],1)],1),t.selectedTypeId?e("application-form",{staticClass:"applications-create__form",attrs:{fields:t.allFields},on:{submit:t.submit}}):t._e()],1)},b=[],x=s(6318),C=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"application-type-list"},[t._v(" application-type-list ")])},T=[];let Z=class extends u.w3{constructor(...t){super(...t),(0,x.Z)(this,"list",void 0)}};(0,c.gn)([(0,u.fI)()],Z.prototype,"list",void 0),Z=(0,c.gn)([(0,u.wA)({components:{}})],Z);var A,F=Z,S=F,k=(0,g.Z)(S,C,T,!1,null,null,null),I=k.exports,L=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("form",{staticClass:"application-form",on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}}},[e("div",{staticClass:"application-form__container"},t._l(t.fields,(function(s){return e("div",{staticClass:"application-form__item"},[s.type===t.FieldType.string?e("form-group",{attrs:{name:s.label,nameFor:s.id}},[e("text-input",{attrs:{name:s.id}})],1):t._e(),s.type===t.FieldType.number?e("form-group",{attrs:{name:s.label,nameFor:s.id}},[e("number-input",{attrs:{name:s.id}})],1):t._e(),s.type===t.FieldType.date?e("form-group",{attrs:{name:s.label,nameFor:s.id}},[e("date-input",{attrs:{value:""}})],1):t._e()],1)})),0),e("footer",{staticClass:"application-form__footer"},[e("button-1",{attrs:{type:"submit"}},[t._v("Отправить")])],1)])},j=[];(function(t){t["string"]="STRING",t["number"]="NUMBER",t["date"]="DATE"})(A||(A={}));var E=s(2133),P=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("input",t._b({staticClass:"text-input",attrs:{type:"text"}},"input",t.$attrs,!1))},$=[];let O=class extends u.w3{};O=(0,c.gn)([(0,u.wA)({components:{}})],O);var M=O,N=M,R=(0,g.Z)(N,P,$,!1,null,null,null),V=R.exports,D=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("input",t._b({staticClass:"number-input",attrs:{inputmode:"numeric",type:"number"}},"input",t.$attrs,!1))},H=[];let U=class extends u.w3{};U=(0,c.gn)([(0,u.wA)({components:{}})],U);var z=U,B=z,G=(0,g.Z)(B,D,H,!1,null,null,null),q=G.exports,J=s(3437),K=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"form-group"},[e("label",{attrs:{for:t.nameFor}},[t._v(t._s(t.name))]),t._t("default")],2)},Q=[];let W=class extends u.w3{constructor(...t){super(...t),(0,x.Z)(this,"name",void 0),(0,x.Z)(this,"nameFor",void 0)}};(0,c.gn)([(0,u.fI)()],W.prototype,"name",void 0),(0,c.gn)([(0,u.fI)()],W.prototype,"nameFor",void 0),W=(0,c.gn)([(0,u.wA)({components:{}})],W);var X=W,Y=X,tt=(0,g.Z)(Y,K,Q,!1,null,null,null),et=tt.exports;let st=class extends u.w3{constructor(...t){super(...t),(0,x.Z)(this,"fields",void 0),(0,x.Z)(this,"FieldType",A)}submit(t){const e=new FormData(t.target);this.$emit("submit",e)}};(0,c.gn)([(0,u.fI)({default:()=>[]})],st.prototype,"fields",void 0),st=(0,c.gn)([(0,u.wA)({components:{DateInput:E.Z,Button1:J.Z,TextInput:V,NumberInput:q,FormGroup:et}})],st);var it=st,nt=it,rt=(0,g.Z)(nt,L,j,!1,null,null,null),ot=rt.exports,lt=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"selector",class:{"is-active":t.active}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.active,expression:"!active"}],staticClass:"selector__label",class:{"is-placeholder":!t.selected},on:{click:t.onFocus}},[t._v(" "+t._s(t.label)+" ")]),t.active?e("input",{ref:"input",attrs:{type:"text",placeholder:t.currentPlaceholder},domProps:{value:t.search},on:{focus:t.onFocus,input:t.onSearchInput}}):t._e(),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"selector__arrow",on:{click:t.onFocus}},[e("arrow")],1),e("div",{staticClass:"selector__items"},[t._l(t.filteredList,(function(s){return e("div",{key:s.id,staticClass:"selector__item",class:{"is-selected":t.isSelected(s)},on:{click:function(e){return t.select(s)}}},[t._v(" "+t._s(s.title)+" ")])})),t.isLoading?t._e():[t.showNotFound?e("div",{staticClass:"selector__item is-non-selectable"},[t._v("Не найдено")]):t._e(),t.showAjaxHint?e("div",{staticClass:"selector__item is-non-selectable"},[t._v("Введите несколько символов для начала поиска")]):t._e()]],2)])},at=[],ct=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("svg",{attrs:{width:"12",height:"7",viewBox:"0 0 12 7",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M1 1L6 6L11 1",stroke:"#8E8E93"}})])},ut=[];let dt=class extends u.w3{};dt=(0,c.gn)([u.wA],dt);var pt=dt,ht=pt,ft=(0,g.Z)(ht,ct,ut,!1,null,null,null),mt=ft.exports;let vt=class extends u.w3{constructor(...t){super(...t),(0,x.Z)(this,"value",void 0),(0,x.Z)(this,"placeholder",void 0),(0,x.Z)(this,"items",void 0),(0,x.Z)(this,"selectModel",void 0),(0,x.Z)(this,"disabled",void 0),(0,x.Z)(this,"isLoading",void 0),(0,x.Z)(this,"isAjax",void 0),(0,x.Z)(this,"selectField",void 0),(0,x.Z)(this,"active",!1),(0,x.Z)(this,"search",""),(0,x.Z)(this,"selected",null),(0,x.Z)(this,"blockSearchEmit",!1),(0,x.Z)(this,"previousEmitValue",""),(0,x.Z)(this,"isTyping",!1),(0,x.Z)(this,"typingTimeout",0)}get showNotFound(){return!(this.isLoading||this.isAjax&&this.isTyping)&&(this.active&&0==this.filteredList.length&&(this.search||!this.isAjax))}get showAjaxHint(){return this.active&&0==this.filteredList.length&&!this.search&&this.isAjax}mounted(){this.value&&this.setSelected()}onSearchChange(t,e){this.blockSearchEmit?this.blockSearchEmit=!1:t!=e&&this.previousEmitValue.substring(0,3)!=this.search.substring(0,3)&&(this.$emit("searchChanged",this.search),this.previousEmitValue=this.search)}get currentPlaceholder(){return this.placeholder}get label(){return this.selected&&this.selected.title?this.selected.title:this.placeholder}onValueChange(){this.setSelected()}onItemsChange(){this.setSelected()}onSearchInput(t){clearTimeout(this.typingTimeout),this.search=t.target.value,this.isTyping=!0,this.typingTimeout=setTimeout((()=>{this.isTyping=!1}),500)}get normalizedList(){return this.items.map((t=>"string"==typeof t?{id:t,title:t}:t))}get filteredList(){if(this.isAjax&&0==this.search.length)return[];const t=this.search.toLowerCase().trim().split(" ");return this.normalizedList.filter((e=>{let s=e.title.toLowerCase(),i=!0;return t.forEach((t=>{i=i&&s.indexOf(t)>=0})),i}))}setSelected(){if(this.selectModel)this.selected=this.value;else{const t=this.normalizedList.find((t=>t[this.selectField]==this.value));t&&(this.selected=t)}}isSelected(t){return this.selectModel?this.value&&this.value.id&&t.id==this.value.id:t.id==this.value}onFocus(){this.disabled||(this.active=!0,this.$nextTick((()=>{this.isAjax&&this.$refs.input&&this.$refs.input.focus()})),setTimeout((()=>{document.addEventListener("click",this.documentClick)}),500))}documentClick(t){this.isSelectorElement(t.target)||(this.blur(),document.removeEventListener("click",this.documentClick))}select(t){this.selectModel?this.$emit("input",t):this.$emit("input",t[this.selectField]),this.$emit("changed",t),this.selected=t,this.blur()}blur(){this.blockSearchEmit=!0,this.search="",this.$refs.input&&this.$refs.input.blur(),this.active=!1}isSelectorElement(t){let e=!1,s=t;while(s){if(e=s==this.$el,e)break;s=s.parentNode}return e}};(0,c.gn)([(0,u.fI)({required:!0})],vt.prototype,"value",void 0),(0,c.gn)([(0,u.fI)({default:""})],vt.prototype,"placeholder",void 0),(0,c.gn)([(0,u.fI)({default:()=>[]})],vt.prototype,"items",void 0),(0,c.gn)([(0,u.fI)({default:!1})],vt.prototype,"selectModel",void 0),(0,c.gn)([(0,u.fI)({default:!1})],vt.prototype,"disabled",void 0),(0,c.gn)([(0,u.fI)({default:!1})],vt.prototype,"isLoading",void 0),(0,c.gn)([(0,u.fI)({default:!1})],vt.prototype,"isAjax",void 0),(0,c.gn)([(0,u.fI)({default:"id"})],vt.prototype,"selectField",void 0),(0,c.gn)([(0,u.RL)("search")],vt.prototype,"onSearchChange",null),(0,c.gn)([(0,u.RL)("value")],vt.prototype,"onValueChange",null),(0,c.gn)([(0,u.RL)("items")],vt.prototype,"onItemsChange",null),vt=(0,c.gn)([(0,u.wA)({components:{Arrow:mt}})],vt);var gt=vt,_t=gt,yt=(0,g.Z)(_t,lt,at,!1,null,null,null),wt=yt.exports;let bt=class extends u.w3{constructor(...t){super(...t),(0,x.Z)(this,"selectedTypeId",""),(0,x.Z)(this,"data",null)}async created(){try{this.data=await this.$hrLinkRepository.getApplicationsTypes()}catch(t){this.$store.dispatch("reportError",t)}}submit(t){this.selectedTypeId;for(const e of t.entries());console.dir(Array.from(t.entries()));this.selectedTypeId}get allFields(){return[...this.templateSystemFields,...this.templateFields]}get templateFields(){return this.selectedType?.templateFields||[]}get templateSystemFields(){return this.data?.templateSystemFields||[]}get selectedType(){return this.data?.types.find((t=>t.id===this.selectedTypeId))}get list(){return this.data?.types?.filter((t=>t.templatable)).map((t=>({id:t.id,title:t.name})))||[]}};bt=(0,c.gn)([(0,u.wA)({components:{ApplicationTypeSelect:I,ApplicationForm:ot,SelectControl:wt,FormGroup:et}})],bt);var xt=bt,Ct=xt,Tt=(0,g.Z)(Ct,w,b,!1,null,null,null),Zt=Tt.exports;let At=class extends u.w3{created(){const t=Object.fromEntries(new URL(window.location.toString()).searchParams.entries());this.$store.commit("setUrlParams",t)}get isApplicationCreate(){return"true"===(this.$store.getters["urlParam"]("isApplicationCreate")??"")}};At=(0,c.gn)([(0,u.wA)({components:{ApplicationsList:y,ApplicationCreate:Zt}})],At);var Ft=At,St=Ft,kt=(0,g.Z)(St,l,a,!1,null,null,null),It=kt.exports;i["default"].config.productionTip=!1,i["default"].use(n.Z),i["default"].use(r.ZP);const Lt=(0,o.p)(It);Lt.$mount("#app")},3109:function(t,e,s){s.d(e,{dx:function(){return i}});const i=()=>{void 0!=window.webkit&&void 0!=window.webkit.messageHandlers.session&&window.webkit.messageHandlers.session.postMessage("refresh"),void 0!=window.session&&window.session.postMessage("refresh")}}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={id:i,loaded:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.loaded=!0,r.exports}s.m=t,function(){s.amdO={}}(),function(){var t=[];s.O=function(e,i,n,r){if(!i){var o=1/0;for(u=0;u<t.length;u++){i=t[u][0],n=t[u][1],r=t[u][2];for(var l=!0,a=0;a<i.length;a++)(!1&r||o>=r)&&Object.keys(s.O).every((function(t){return s.O[t](i[a])}))?i.splice(a--,1):(l=!1,r<o&&(o=r));if(l){t.splice(u--,1);var c=n();void 0!==c&&(e=c)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[i,n,r]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.j=383}(),function(){var t={383:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,r,o=i[0],l=i[1],a=i[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(n in l)s.o(l,n)&&(s.m[n]=l[n]);if(a)var u=a(s)}for(e&&e(i);c<o.length;c++)r=o[c],s.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return s.O(u)},i=self["webpackChunkugmk_documents"]=self["webpackChunkugmk_documents"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998,64],(function(){return s(8918)}));i=s.O(i)})();