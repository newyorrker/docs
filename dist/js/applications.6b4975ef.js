(function(){"use strict";var e={1971:function(e,t,s){var i=s(538),r=s(6234),o=s(1251),n=s(813),l=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{attrs:{id:"app"}},[e.isApplicationCreate?t("application-create"):t("applications-list")],1)},a=[],c=s(655),p=s(140),d=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"applications-list"},[e.showNewApplicationButton?t("button",{on:{click:e.goToApplicationsCreate}},[e._v("Show filter")]):e._e(),e._v(" Applications list ")])},u=[],h=s(5423),f=s(1390);let m=class extends p.w3{mounted(){window.clickButton=this.buttonClicked}destroyed(){window.clickButton=void 0}goToApplicationsCreate(){const e=(0,h.Rg)(this.$store.getters["platform"],{isApplicationCreate:"true",isTypeSelect:"true"},"Создание заявления");document.location.href=e}buttonClicked(e){e===f.Z["new"]&&this.goToApplicationsCreate()}get showNewApplicationButton(){return"Web"===this.$store.getters["platform"]}};m=(0,c.gn)([(0,p.wA)({components:{}})],m);var v,g=m,y=g,_=s(1001),w=(0,_.Z)(y,d,u,!1,null,null,null),I=w.exports,b=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"applications-create"},[e.isError?e._e():[t("form-group",{staticClass:"applications-create__type",attrs:{name:"Тип заявления"}},[t("select-control",{attrs:{items:e.applicationTypesList,placeholder:"Выберите тип заявления","is-loading":e.isLoading,"is-ajax":!1,"select-model":!1},model:{value:e.selectedTypeId,callback:function(t){e.selectedTypeId=t},expression:"selectedTypeId"}})],1),e.selectedTypeId?t("application-form",{staticClass:"applications-create__form",attrs:{selectedTypeId:e.selectedTypeId,mainFields:e.mainFields,systemFields:e.systemFields},on:{loading:function(t){e.isLoading=t},error:e.makeError}}):e._e()],e.isLoading?t("background-spinner"):e._e(),e.isError?[t("background-icon-error",[t("p",[e._v(e._s(e.errorMessage||"При загрузке типов заявлений произошла ошибка"))])]),t("footer",{staticClass:"applications-create__footer"},[t("button-1",{on:{click:e.retry}},[e._v("Попробовать снова")])],1)]:e._e()],2)},A=[],S=s(6318),x=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"application-form"},[e.isError?e._e():[t("div",{staticClass:"application-form__extra-controls"},[t("form-group",{attrs:{name:"Получатель заявления"}},[t("select-control",{attrs:{items:e.approversList,placeholder:"Выберите получателя","is-loading":!1,"is-ajax":!1,"select-model":!1},model:{value:e.selectedApproverUserId,callback:function(t){e.selectedApproverUserId=t},expression:"selectedApproverUserId"}}),e.errors.selectedApproverUserId?t("span",{staticClass:"form-error"},[e._v("Обязательное поле")]):e._e()],1),t("form-group",{attrs:{name:"Дата заявления"}},[t("date-input",{attrs:{needClear:!1},model:{value:e.applicationDate,callback:function(t){e.applicationDate=t},expression:"applicationDate"}})],1),e.errors.applicationDate?t("span",{staticClass:"form-error"},[e._v("Обязательное поле")]):e._e()],1),t("form",{staticClass:"application-form__form",on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)},input:e.resetFieldError}},[t("div",{staticClass:"application-form__container"},[t("form-control-list",{attrs:{fields:e.systemFields,errors:e.errors}}),t("form-control-list",{attrs:{fields:e.mainFields,errors:e.errors}})],1),t("footer",{staticClass:"application-form__footer"},[t("button-1",{attrs:{type:"submit"}},[e._v("Отправить")])],1)])]],2)},Z=[];(function(e){e["string"]="STRING",e["number"]="NUMBER",e["date"]="DATE"})(v||(v={}));var C=s(3437),F=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"selector",class:{"is-active":e.active}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.active,expression:"!active"}],staticClass:"selector__label",class:{"is-placeholder":!e.selected},on:{click:e.onFocus}},[e._v(" "+e._s(e.label)+" ")]),e.active?t("input",{ref:"input",attrs:{type:"text",placeholder:e.currentPlaceholder},domProps:{value:e.search},on:{focus:e.onFocus,input:e.onSearchInput}}):e._e(),t("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"selector__arrow",on:{click:e.onFocus}},[t("arrow")],1),e.isLoading?t("div",{staticClass:"selector__spinner"},[t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none"}},[t("path",{attrs:{fill:"#F39420","fill-opacity":".12","fill-rule":"evenodd",d:"M12 21.818c5.422 0 9.818-4.396 9.818-9.818S17.422 2.182 12 2.182 2.182 6.578 2.182 12 6.578 21.818 12 21.818ZM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z","clip-rule":"evenodd"}}),t("path",{attrs:{fill:"#F39420",d:"M12 21.818c5.422 0 9.818-4.396 9.818-9.818S17.422 2.182 12 2.182V0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12h2.182c0 5.422 4.396 9.818 9.818 9.818Z"}})])]):e._e(),t("div",{staticClass:"selector__items"},[e._l(e.filteredList,(function(s){return t("div",{key:s.id,staticClass:"selector__item",class:{"is-selected":e.isSelected(s)},on:{click:function(t){return e.select(s)}}},[e._v(" "+e._s(s.title)+" ")])})),e.isLoading?e._e():[e.showNotFound?t("div",{staticClass:"selector__item is-non-selectable"},[e._v("Не найдено")]):e._e(),e.showAjaxHint?t("div",{staticClass:"selector__item is-non-selectable"},[e._v("Введите несколько символов для начала поиска")]):e._e()]],2)])},L=[],T=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("svg",{attrs:{width:"12",height:"7",viewBox:"0 0 12 7",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M1 1L6 6L11 1",stroke:"#8E8E93"}})])},k=[];let E=class extends p.w3{};E=(0,c.gn)([p.wA],E);var $=E,P=$,U=(0,_.Z)(P,T,k,!1,null,null,null),j=U.exports;let D=class extends p.w3{constructor(...e){super(...e),(0,S.Z)(this,"value",void 0),(0,S.Z)(this,"placeholder",void 0),(0,S.Z)(this,"items",void 0),(0,S.Z)(this,"selectModel",void 0),(0,S.Z)(this,"disabled",void 0),(0,S.Z)(this,"isLoading",void 0),(0,S.Z)(this,"isAjax",void 0),(0,S.Z)(this,"selectField",void 0),(0,S.Z)(this,"active",!1),(0,S.Z)(this,"search",""),(0,S.Z)(this,"selected",null),(0,S.Z)(this,"blockSearchEmit",!1),(0,S.Z)(this,"previousEmitValue",""),(0,S.Z)(this,"isTyping",!1),(0,S.Z)(this,"typingTimeout",0)}get showNotFound(){return!(this.isLoading||this.isAjax&&this.isTyping)&&(this.active&&0==this.filteredList.length&&(this.search||!this.isAjax))}get showAjaxHint(){return this.active&&0==this.filteredList.length&&!this.search&&this.isAjax}mounted(){this.value&&this.setSelected()}onSearchChange(e,t){this.blockSearchEmit?this.blockSearchEmit=!1:e!=t&&this.previousEmitValue.substring(0,3)!=this.search.substring(0,3)&&(this.$emit("searchChanged",this.search),this.previousEmitValue=this.search)}get currentPlaceholder(){return this.placeholder}get label(){return this.selected&&this.selected.title?this.selected.title:this.placeholder}onValueChange(){this.setSelected()}onItemsChange(){this.setSelected()}onSearchInput(e){clearTimeout(this.typingTimeout),this.search=e.target.value,this.isTyping=!0,this.typingTimeout=setTimeout((()=>{this.isTyping=!1}),500)}get normalizedList(){return this.items.map((e=>"string"==typeof e?{id:e,title:e}:e))}get filteredList(){if(this.isAjax&&0==this.search.length)return[];const e=this.search.toLowerCase().trim().split(" ");return this.normalizedList.filter((t=>{let s=t.title.toLowerCase(),i=!0;return e.forEach((e=>{i=i&&s.indexOf(e)>=0})),i}))}setSelected(){if(this.selectModel)this.selected=this.value;else{const e=this.normalizedList.find((e=>e[this.selectField]==this.value));e&&(this.selected=e)}}isSelected(e){return this.selectModel?this.value&&this.value.id&&e.id==this.value.id:e.id==this.value}onFocus(){this.disabled||(this.active=!0,this.$nextTick((()=>{this.isAjax&&this.$refs.input&&this.$refs.input.focus()})),setTimeout((()=>{document.addEventListener("click",this.documentClick)}),500))}documentClick(e){this.isSelectorElement(e.target)||(this.blur(),document.removeEventListener("click",this.documentClick))}select(e){this.selectModel?this.$emit("input",e):this.$emit("input",e[this.selectField]),this.$emit("changed",e),this.selected=e,this.blur()}blur(){this.blockSearchEmit=!0,this.search="",this.$refs.input&&this.$refs.input.blur(),this.active=!1}isSelectorElement(e){let t=!1,s=e;while(s){if(t=s==this.$el,t)break;s=s.parentNode}return t}};(0,c.gn)([(0,p.fI)({required:!0})],D.prototype,"value",void 0),(0,c.gn)([(0,p.fI)({default:""})],D.prototype,"placeholder",void 0),(0,c.gn)([(0,p.fI)({default:()=>[]})],D.prototype,"items",void 0),(0,c.gn)([(0,p.fI)({default:!1})],D.prototype,"selectModel",void 0),(0,c.gn)([(0,p.fI)({default:!1})],D.prototype,"disabled",void 0),(0,c.gn)([(0,p.fI)({default:!1})],D.prototype,"isLoading",void 0),(0,c.gn)([(0,p.fI)({default:!1})],D.prototype,"isAjax",void 0),(0,c.gn)([(0,p.fI)({default:"id"})],D.prototype,"selectField",void 0),(0,c.gn)([(0,p.RL)("search")],D.prototype,"onSearchChange",null),(0,c.gn)([(0,p.RL)("value")],D.prototype,"onValueChange",null),(0,c.gn)([(0,p.RL)("items")],D.prototype,"onItemsChange",null),D=(0,c.gn)([(0,p.wA)({components:{Arrow:j}})],D);var M=D,O=M,R=(0,_.Z)(O,F,L,!1,null,null,null),N=R.exports,V=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"form-group"},[t("label",{attrs:{for:e.nameFor}},[e._v(e._s(e.name))]),e._t("default")],2)},B=[];let H=class extends p.w3{constructor(...e){super(...e),(0,S.Z)(this,"name",void 0),(0,S.Z)(this,"nameFor",void 0)}};(0,c.gn)([(0,p.fI)()],H.prototype,"name",void 0),(0,c.gn)([(0,p.fI)()],H.prototype,"nameFor",void 0),H=(0,c.gn)([(0,p.wA)({components:{}})],H);var K=H,G=K,q=(0,_.Z)(G,V,B,!1,null,null,null),z=q.exports,J=s(6226),W=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"form-control-list"},e._l(e.fields,(function(s){return t("div",{staticClass:"form-control-list__item"},[t("form-group",{attrs:{name:s.label,nameFor:s.id}},[s.type===e.FieldType.string?t("text-input",{attrs:{name:s.id}}):e._e(),s.type===e.FieldType.number?t("number-input",{attrs:{name:s.id}}):e._e(),s.type===e.FieldType.date?t("date-input",{attrs:{name:s.id,value:""}}):e._e(),e.errors[s.id]?t("span",{staticClass:"form-error"},[e._v("Обязательное поле")]):e._e()],1)],1)})),0)},Q=[],X=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("input",e._b({staticClass:"text-input",attrs:{type:"text"}},"input",e.$attrs,!1))},Y=[];let ee=class extends p.w3{};ee=(0,c.gn)([(0,p.wA)({components:{}})],ee);var te=ee,se=te,ie=(0,_.Z)(se,X,Y,!1,null,null,null),re=ie.exports,oe=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("input",e._b({staticClass:"number-input",attrs:{inputmode:"numeric",type:"number"}},"input",e.$attrs,!1))},ne=[];let le=class extends p.w3{};le=(0,c.gn)([(0,p.wA)({components:{}})],le);var ae=le,ce=ae,pe=(0,_.Z)(ce,oe,ne,!1,null,null,null),de=pe.exports;let ue=class extends p.w3{constructor(...e){super(...e),(0,S.Z)(this,"fields",void 0),(0,S.Z)(this,"errors",void 0),(0,S.Z)(this,"FieldType",v)}};(0,c.gn)([(0,p.fI)()],ue.prototype,"fields",void 0),(0,c.gn)([(0,p.fI)()],ue.prototype,"errors",void 0),ue=(0,c.gn)([(0,p.wA)({components:{DateInput:J.Z,TextInput:re,NumberInput:de,FormGroup:z}})],ue);var he=ue,fe=he,me=(0,_.Z)(fe,W,Q,!1,null,null,null),ve=me.exports;const ge=(e,t)=>{try{return JSON.parse(e)}catch(s){return void 0!==t?t:e}};class ye{constructor(){(0,S.Z)(this,"storage",void 0),this.storage=window.localStorage}set(e,t){this.storage?.setItem(e,JSON.stringify(t))}get(e){return ge(this.storage?.getItem(e))}}var _e=s(9490);class we{constructor(e,t,s,i){(0,S.Z)(this,"userRepository",void 0),(0,S.Z)(this,"objectRepository",void 0),(0,S.Z)(this,"localStorageClient",void 0),(0,S.Z)(this,"userId",void 0),this.userRepository=e,this.objectRepository=t,this.localStorageClient=s,this.userId=i}async getApproversList(e,t){const s=await this.userRepository.profiles({include:["firstName","lastName","middleName","userId"],where:{directionId:e},take:-1});if(!s.length)return[];const i=s.filter((e=>e.userId!==t&&e.userId)).map((e=>e.userId)),r=new Map(s.map((e=>[e.userId,e]))),o=await this.objectRepository.query("HRLinkUserSettings",{include:["userId"],where:{userId:{$in:i}},take:-1}),n=o.filter((({userId:e})=>r.has(e))).map((({userId:e})=>r.get(e))),l=n.map((e=>({id:e.userId,title:e.fullName})));return l}storeSelectedApprover(e){this.localStorageClient.set(this.getApproversLsKey(this.userId),e)}restoreSelectedApprover(e){const t=this.localStorageClient.get(this.getApproversLsKey(this.userId))||null,s=e.find((e=>e.id===t));if(s)return t}storeSystemValues(e){this.localStorageClient.set(this.getSystemFieldsLsKey(this.userId),e)}restoreSystemValues(){return this.localStorageClient.get(this.getSystemFieldsLsKey(this.userId))||null}getApproversLsKey(e){return"selected-approver-id_"+e}getSystemFieldsLsKey(e){return"saved-system-fields_"+e}}let Ie=class extends p.w3{constructor(...e){super(...e),(0,S.Z)(this,"mainFields",void 0),(0,S.Z)(this,"systemFields",void 0),(0,S.Z)(this,"selectedTypeId",void 0),(0,S.Z)(this,"localStorageClient",new ye),(0,S.Z)(this,"selectedApproverUserId",null),(0,S.Z)(this,"applicationDate",""),(0,S.Z)(this,"approversList",[]),(0,S.Z)(this,"FieldType",v),(0,S.Z)(this,"errors",{selectedApproverUserId:!1,applicationDate:!1}),(0,S.Z)(this,"service",null),(0,S.Z)(this,"isError",!1)}async created(){const e=this.currentUserProfile.directionId;if(e&&this.currentUserProfile.userId){this.service=new we(this.$userRepository,this.$objectRepository,this.localStorageClient,this.currentUserProfile.userId);try{this.$emit("loading",!0),this.approversList=await this.service.getApproversList(e,this.currentUserProfile.userId),this.restoreSelectedApprover()}catch(t){this.$emit("error","При загрузке дополнительных данных произошла ошибка"),this.$store.dispatch("reportError",t)}finally{this.$emit("loading",!1)}}}mounted(){this.applicationDate=_e.ou.local().toFormat("yyyy-LL-dd"),this.restoreSystemValues()}async submit(e){const t=e.target,s=new FormData(t),i=Array.from(s.entries()),r=i.filter((e=>this.systemFieldsIds.includes(e[0]))),o=i.filter((e=>this.mainFieldsIds.includes(e[0])));this.storeSystemValues(r);const n=this.validate(i);if(!n)return;if(!this.selectedApproverUserId)throw Error("selectedApproverUserId must be set");const l=e=>({id:e[0],value:e[1]}),a=r.map(l),c=o.map(l),p={approverUserId:this.selectedApproverUserId,typeId:this.selectedTypeId,templateFields:c,templateSystemFields:a,date:this.applicationDate};try{this.$emit("loading",!0);this.$hrLinkRepository.createApplication(p)}catch(e){this.$emit("error","При создании заявления произошла ошибка"),this.$store.dispatch("reportError",e)}finally{this.$emit("loading",!1)}}validate(e){let t=!1;this.selectedApproverUserId&&this.applicationDate||(this.errors.selectedApproverUserId=!this.selectedApproverUserId,this.errors.applicationDate=!this.applicationDate,t=!0);for(const s of e)s[1]||(t||(t=!0),p.w3.set(this.errors,s[0],!0));return!t}resetFieldError(e){const t=e.target;this.errors[t?.name||""]=!1}storeSelectedApprover(e){this.service?.storeSelectedApprover(e)}restoreSelectedApprover(){this.selectedApproverUserId=this.service?.restoreSelectedApprover(this.approversList)||null}storeSystemValues(e){this.service?.storeSystemValues(e)}restoreSystemValues(){const e=this.service?.restoreSystemValues()||null;if(e){const t=this.$el.querySelectorAll("input"),s=Object.fromEntries(e);for(const e of t)s[e.name]&&(e.value=s[e.name])}}watchSelectedApproverUserIdHandler(e){this.storeSelectedApprover(e),this.errors.selectedApproverUserId=!1}watchApplicationDateHandler(e){}get systemFieldsIds(){return this.systemFields.map((e=>e.id))}get mainFieldsIds(){return this.mainFields.map((e=>e.id))}get currentUserProfile(){return this.$store.state.userProfile}get userId(){return this.currentUserProfile.userId}};(0,c.gn)([(0,p.fI)({default:()=>[]})],Ie.prototype,"mainFields",void 0),(0,c.gn)([(0,p.fI)({default:()=>[]})],Ie.prototype,"systemFields",void 0),(0,c.gn)([(0,p.fI)()],Ie.prototype,"selectedTypeId",void 0),(0,c.gn)([(0,p.RL)("selectedApproverUserId")],Ie.prototype,"watchSelectedApproverUserIdHandler",null),(0,c.gn)([(0,p.RL)("applicationDate")],Ie.prototype,"watchApplicationDateHandler",null),Ie=(0,c.gn)([(0,p.wA)({components:{Button1:C.Z,FormControlList:ve,DateInput:J.Z,FormGroup:z,SelectControl:N}})],Ie);var be=Ie,Ae=be,Se=(0,_.Z)(Ae,x,Z,!1,null,null,null),xe=Se.exports,Ze=s(1671),Ce=s(3686);let Fe=class extends p.w3{constructor(...e){super(...e),(0,S.Z)(this,"selectedTypeId",""),(0,S.Z)(this,"applicationTypesData",null),(0,S.Z)(this,"isLoading",!1),(0,S.Z)(this,"isError",!1),(0,S.Z)(this,"errorMessage","")}created(){this.loadTypes()}async loadTypes(){try{this.isLoading=!0,this.applicationTypesData=await this.$hrLinkRepository.getApplicationsTypes()}catch(e){this.isError=!0,this.$store.dispatch("reportError",e)}finally{this.isLoading=!1}}makeError(e){this.isError=!0,this.errorMessage=e}resetError(){this.isError=!1,this.errorMessage=""}retry(){this.resetError(),this.applicationTypesData||this.loadTypes()}get currentUserProfile(){return this.$store.state.userProfile}get applicationTypesList(){return this.applicationTypesData?.types?.filter((e=>e.templatable)).map((e=>({id:e.id,title:e.name})))||[]}get selectedType(){return this.applicationTypesData?.types.find((e=>e.id===this.selectedTypeId))}get mainFields(){return this.selectedType?.templateFields||[]}get systemFields(){return this.applicationTypesData?.templateSystemFields||[]}};Fe=(0,c.gn)([(0,p.wA)({components:{DateInput:J.Z,ApplicationForm:xe,SelectControl:N,FormGroup:z,BackgroundIconError:Ze.Z,BackgroundSpinner:Ce.Z,Button1:C.Z}})],Fe);var Le=Fe,Te=Le,ke=(0,_.Z)(Te,b,A,!1,null,null,null),Ee=ke.exports;let $e=class extends p.w3{created(){const e=Object.fromEntries(new URL(window.location.toString()).searchParams.entries());this.$store.commit("setUrlParams",e)}get isApplicationCreate(){return"true"===(this.$store.getters["urlParam"]("isApplicationCreate")??"")}};$e=(0,c.gn)([(0,p.wA)({components:{ApplicationsList:I,ApplicationCreate:Ee}})],$e);var Pe=$e,Ue=Pe,je=(0,_.Z)(Ue,l,a,!1,null,null,null),De=je.exports;i["default"].config.productionTip=!1,i["default"].use(r.Z),i["default"].use(o.ZP);const Me=(0,n.p)(De);Me.$mount("#app")},3109:function(e,t,s){s.d(t,{dx:function(){return i}});const i=()=>{void 0!=window.webkit&&void 0!=window.webkit.messageHandlers.session&&window.webkit.messageHandlers.session.postMessage("refresh"),void 0!=window.session&&window.session.postMessage("refresh")}}},t={};function s(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(o.exports,o,o.exports,s),o.loaded=!0,o.exports}s.m=e,function(){s.amdO={}}(),function(){var e=[];s.O=function(t,i,r,o){if(!i){var n=1/0;for(p=0;p<e.length;p++){i=e[p][0],r=e[p][1],o=e[p][2];for(var l=!0,a=0;a<i.length;a++)(!1&o||n>=o)&&Object.keys(s.O).every((function(e){return s.O[e](i[a])}))?i.splice(a--,1):(l=!1,o<n&&(n=o));if(l){e.splice(p--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var p=e.length;p>0&&e[p-1][2]>o;p--)e[p]=e[p-1];e[p]=[i,r,o]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){s.j=383}(),function(){var e={383:0};s.O.j=function(t){return 0===e[t]};var t=function(t,i){var r,o,n=i[0],l=i[1],a=i[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(r in l)s.o(l,r)&&(s.m[r]=l[r]);if(a)var p=a(s)}for(t&&t(i);c<n.length;c++)o=n[c],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(p)},i=self["webpackChunkugmk_documents"]=self["webpackChunkugmk_documents"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998,64],(function(){return s(1971)}));i=s.O(i)})();