(function(){"use strict";var t={7618:function(t,e,s){var i=s(538),r=s(6234),o=s(1251),n=s(7995),a=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{attrs:{id:"app"}},[t.isApplicationCreate?e("application-create"):t.id?e("application-detail",{attrs:{id:t.id}}):e("applications-list")],1)},l=[],c=s(655),p=s(140),u=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"documents-list"},[t.showNewApplicationButton?e("button",{on:{click:t.goToApplicationsCreate}},[t._v("Add new")]):t._e(),t.showFilterButton?e("button",{on:{click:function(e){t.showFilter=!0}}},[t._v("Show filter")]):t._e(),e("easy-refresh",{ref:"easyRefresh",staticClass:"documents-list__refresh",class:{"documents-list__refresh_error":t.isError},attrs:{"on-refresh":t.refresh,loadMore:t.loadMore,autoLoad:!0,userSelect:"false",showScrollBar:!0},scopedSlots:t._u([{key:"header",fn:function(){return[e("ClassicsHeader",{attrs:{finishDuration:0,refreshedText:"",refreshingText:t.$t("common.refreshingText"),refreshText:t.$t("common.pullToRefreshPrompt"),refreshReadyText:t.$t("common.releaseToRefreshPrompt")}})]},proxy:!0},{key:"footer",fn:function(){return[e("EmptyFooter")]},proxy:!0},{key:"scrollbar",fn:function(){return[e("ClassicsScrollBar",{attrs:{color:"rgba(0, 0, 0, 0.3)",bgColor:"transparent",width:"3",radius:"2"}})]},proxy:!0}])},[t.isError?e("background-icon-error",[e("p",[t._v("При загрузке списка документов произошла ошибка")])]):[t.showList?e("div",{staticClass:"documents-list__list",class:{"documents-list__list_bordered":t.showSkel}},t._l(t.items,(function(s){return e("document-card",{key:s.id,attrs:{title:s.typeName,source:s},nativeOn:{click:function(e){return t.openItem(s)}}})})),1):t._e(),e("documents-list-skel",{directives:[{name:"show",rawName:"v-show",value:t.showSkel,expression:"showSkel"}],staticClass:"documents-list__skel"})]],2),!t.showList||t.items.length||t.showSkel||t.isError?t._e():e("div",{staticClass:"documents-list__empty"},[t._v(" Список заявлений пуст ")]),e("keep-alive",[t.showFilter?e("applications-list-filter",{staticClass:"documents-list__filter",on:{apply:t.applyFilter,close:function(e){t.showFilter=!1}}}):t._e()],1)],1)},d=[],h=s(6318),f=s(9411),m=s(2958),g=s(7499),v=s(1671),_=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"documents-list-filter"},[e("div",{staticClass:"documents-list-filter__container"},[e("header",{staticClass:"documents-list-filter__header"},[e("div",{staticClass:"documents-list-filter__reset"},[e("button",{on:{click:t.reset}},[t._v("Сбросить")])]),t._m(0),e("div",{staticClass:"documents-list-filter__close"},[e("button",{on:{click:function(e){return t.$emit("close")}}},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none"}},[e("path",{attrs:{fill:"#373737",d:"M7.05 5.636 18.364 16.95l-1.414 1.414L5.636 7.05z"}}),e("path",{attrs:{fill:"#373737",d:"m16.95 5.636 1.414 1.414L7.05 18.364 5.636 16.95z"}})])])])]),e("main",[e("documents-listFilter-section",{scopedSlots:t._u([{key:"header",fn:function(){return[t._v(" Период публикации ")]},proxy:!0}])},[e("div",{staticClass:"documents-list-filter__date"},[e("date-input",{model:{value:t.dateLeft,callback:function(e){t.dateLeft=e},expression:"dateLeft"}}),t._v(" — "),e("date-input",{model:{value:t.dateRight,callback:function(e){t.dateRight=e},expression:"dateRight"}})],1)]),e("documents-listFilter-section",{scopedSlots:t._u([{key:"header",fn:function(){return[t._v("Статус рассмотрения")]},proxy:!0}])},[e("div",{staticClass:"documents-list-filter__status"},t._l(t.statuses,(function(s){return e("status-tag",{key:s.id,attrs:{active:s.isActive},on:{toggle:function(t){s.isActive=!s.isActive}},scopedSlots:t._u([{key:"icon",fn:function(){return[e(s.iconName,{tag:"component",attrs:{inverted:s.isActive}})]},proxy:!0}],null,!0)},[t._v(" "+t._s(s.title)+" ")])})),1)])],1)]),e("footer",[e("button-1",{on:{click:t.apply}},[t._v("Применить")])],1)])},y=[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"documents-list-filter__title"},[e("span",[t._v("Фильтр")])])}],w=s(6226),S=s(3437),Z=s(9526),I=s(5213),k=s(9505),C=s(9860);const x=()=>[{id:C.t.completed,title:"Завершен",isActive:!1,iconName:"document-check-icon"},{id:C.t.rejected,title:"Отменен",isActive:!1,iconName:"cross-icon"},{id:C.t.inProcess,title:"В процессе",isActive:!1,iconName:"document-progress-icon"}];var b=s(6475),A=s(9646),L=s(3088),T=s(4434),F=s(5672),E=s(7681);let P=class extends I.Z{constructor(...t){super(...t),(0,h.Z)(this,"dateLeft",""),(0,h.Z)(this,"dateRight",""),(0,h.Z)(this,"statuses",x())}apply(){this.$emit("apply",this.filterState),this.$emit("close")}reset(){this.dateLeft="",this.dateRight="",this.statuses=x(),this.apply()}get filterState(){return{applicationDateFrom:this.dateLeft,applicationDateTo:this.dateRight,statuses:this.statuses.filter((t=>t.isActive)).map((t=>t.id))}}};P=(0,c.gn)([(0,p.wA)({components:{DateInput:w.Z,Button1:S.Z,DocumentsListFilterSection:Z.Z,StatusTag:k.Z,EyeIcon:b.Z,EyeStrikethroughIcon:A.Z,CrossIcon:L.Z,ApplyIcon:T.Z,DocumentCheckIcon:F.Z,DocumentProgressIcon:E.Z}})],P);var $=P,D=$,R=s(1001),U=(0,R.Z)(D,_,y,!1,null,null,null),j=U.exports,N=s(5423),M=s(1390),B=s(3109),O=s(9669),V=s.n(O);class q{constructor(t,e){(0,h.Z)(this,"queryFabric",void 0),(0,h.Z)(this,"hrLinkRepository",void 0),(0,h.Z)(this,"cancelToken",void 0),this.queryFabric=t,this.hrLinkRepository=e}async load(t){const e=this.queryFabric.getQuery(t);return this.cancelToken&&this.cancelToken.cancel(),this.cancelToken=V().CancelToken.source(),await this.hrLinkRepository.getApplications(e,{cancelToken:this.cancelToken.token})}}class H{constructor(t){(0,h.Z)(this,"pagingState",void 0),this.pagingState=t}getQuery(t){const e={take:this.pagingState.take,skip:this.pagingState.skip};return e}}let G=class extends f.Z{constructor(...t){super(...t),(0,h.Z)(this,"applicationsListService",void 0),(0,h.Z)(this,"filterState",{applicationDateFrom:"",applicationDateTo:"",statuses:[]})}created(){this.applicationsListService=new q(new H(this.pagingState),this.$hrLinkRepository)}mounted(){window.clickButton=this.buttonClicked}destroyed(){window.clickButton=void 0}async getList(t=!1){this.isLoading=!0,this.resetEasyRefreshScroll(),this.pagingState.skip=t?this.items?.length??0:0;try{const e=await this.applicationsListService.load({});if(this.isError=!1,t&&this.items?this.items=[...this.items,...e]:this.items=e,e.length<this.pagingState.take)return!0}catch(e){this.isError=!0,this.$store.dispatch("reportError",e)}finally{this.isLoading=!1,this.loaded=!0}return!1}openItem(t){const e=(0,N.Rg)(this.$store.getters["platform"],{id:t.applicationGroupId},t.typeName);document.location.href=e}applyFilter(t){this.filterState=t,(0,B.WS)([{type:M.Z.filter,params:{filtered:this.filterHasValue}}]),this.items=[],this.getList()}goToApplicationsCreate(){const t=(0,N.Rg)(this.$store.getters["platform"],{isApplicationCreate:"true",isTypeSelect:"true"},"Создание заявления");document.location.href=t}buttonClicked(t){t===M.Z["new"]&&this.goToApplicationsCreate()}get filterHasValue(){const{statuses:t}=this.filterState;return!!t?.length}get showNewApplicationButton(){return"Web"===this.$store.getters["platform"]}get showFilterButton(){return"Web"===this.$store.getters["platform"]}};G=(0,c.gn)([(0,p.wA)({components:{DocumentsListSkel:g.Z,DocumentCard:m.Z,BackgroundIconError:v.Z,ApplicationsListFilter:j}})],G);var K=G,z=K,W=(0,R.Z)(z,u,d,!1,null,null,null),J=W.exports,Q=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"application-detal"},[!t.isError&&t.item?[t.isSign?e("application-sign",{attrs:{source:t.item,id:t.item.applicationGroupId,defaultErrorMessage:"При попытке подписания документа произошла ошибка"},on:{signed:t.load}}):e("application-view",{attrs:{source:t.item}})]:t.isError?e("background-icon-error",[e("p",[t._v("При загрузке документа произошла ошибка")])]):t._e()],2)},X=[],Y=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"application-view"},[e("div",{staticClass:"application-view__padding"},[e("application-info",{attrs:{source:t.source}})],1),e("pdf-viewer",{staticClass:"application-view__pdf",attrs:{id:t.source.id,fileDataLoader:t.fileDataLoader,name:t.source.typeName},on:{done:function(e){t.loading=!1}}}),e("footer",{staticClass:"application-view__footer"},[e("button-1",{on:{click:t.sign}},[t._v("Подписать")])],1),t.loading?e("background-spinner"):t._e()],1)},tt=[],et=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"application-info"},[t.source.creator?e("user-profile",{attrs:{userProfile:t.source.creator}}):t._e(),e("div",{staticClass:"application-info__text"},[e("p",[e("span",[t._v("Сформировано:")]),t._v(" "+t._s(t.creationDate)+" ")]),e("application-signers",{staticClass:"application-info__signers",attrs:{source:t.source}})],1)],1)},st=[],it=s(4503),rt=s(7468),ot=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"document-signers"},[t.approver?e("div",{staticClass:"document-signers__list"},[e("span",[t._v("Кому:")]),e("div",{staticClass:"document-signers__list-item"},[e("signer-profile",{attrs:{source:t.approver},nativeOn:{click:function(e){return t.openProfile(t.approver.profile)}}})],1)]):t._e()])},nt=[],at=s(3238),lt=s(1687);let ct=class extends at.Z{get approver(){return{name:this.source.approver.fullName,profile:this.source.approver}}};ct=(0,c.gn)([(0,p.wA)({components:{SignerProfile:lt.Z}})],ct);var pt=ct,ut=pt,dt=(0,R.Z)(ut,ot,nt,!1,null,null,null),ht=dt.exports;let ft=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"source",void 0)}get creationDate(){return(0,rt.p)(this.source.createdAt)}get currentUserProfile(){return this.$store.state.userProfile}};(0,c.gn)([(0,p.fI)({required:!0})],ft.prototype,"source",void 0),ft=(0,c.gn)([(0,p.wA)({components:{UserProfile:it.Z,ApplicationSigners:ht}})],ft);var mt=ft,gt=mt,vt=(0,R.Z)(gt,et,st,!1,null,null,null),_t=vt.exports,yt=s(3686),wt=s(9097);class St{constructor(t){(0,h.Z)(this,"repository",void 0),this.repository=t}load(t){return this.repository.getApplicationFile(t)}}let Zt=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"source",void 0),(0,h.Z)(this,"loading",!0),(0,h.Z)(this,"fileDataLoader",new St(this.$hrLinkRepository))}sign(){const t=(0,N.Rg)(this.$store.getters["platform"],{id:this.source.applicationGroupId,isSign:"true"},this.source.typeName);document.location.href=t}};(0,c.gn)([(0,p.fI)({required:!0})],Zt.prototype,"source",void 0),Zt=(0,c.gn)([(0,p.wA)({components:{ApplicationInfo:_t,PdfViewer:wt.Z,Button1:S.Z,BackgroundSpinner:yt.Z}})],Zt);var It=Zt,kt=It,Ct=(0,R.Z)(kt,Y,tt,!1,null,null,null),xt=Ct.exports,bt=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"document-sign"},[t.showMain?[e("div",{staticClass:"document-sign__container"},[e("sign-title",{attrs:{title:t.source.typeName,type:""}}),e("application-info",{attrs:{source:t.source}}),e("pin-code",{attrs:{error:t.isPinCodeError},model:{value:t.pinCodeValue,callback:function(e){t.pinCodeValue=e},expression:"pinCodeValue"}}),e("sign-troubleshooting",{attrs:{codeIsWrong:t.currentState.matches(t.State.wrongCode),canRestartSign:t.canRestartSign,time:t.time},on:{restart:t.restart}})],1),e("footer",{staticClass:"document-sign__footer"},[e("button-1",{on:{click:t.confirm}},[t._v("Подтвердить")])],1)]:t._e(),t.onSignStart||t.onSendingTheCode?e("sign-loading",{attrs:{type:"заявление",showText:t.onSendingTheCode}}):t._e(),t.currentState.matches(t.State.startSignError)?[e("background-icon-error",[e("p",[t._v(t._s(t.errorMessage))])]),e("footer",{staticClass:"document-sign__footer"},[e("button-1",{on:{click:t.startSign}},[t._v("Повторить попытку")])],1)]:t._e(),t.currentState.matches(t.State.signError)?[e("background-icon-error",[e("p",[t._v("Ошибка! "),e("br"),t._v(" Не удалось подписать заявление")])]),e("footer",{staticClass:"document-sign__footer"},[e("button-1",{on:{click:t.confirm}},[t._v("Повторить попытку")])],1)]:t._e(),t.currentState.matches(t.State.signIsSucceed)?[e("background-icon-success",[e("p",[t._v("Вы подписали заявление!")])]),e("footer",{staticClass:"document-sign__footer"},[e("button-1",{on:{click:t.goToList}},[t._v("К списку заявлений")])],1)]:t._e()],2)},At=[],Lt=s(9245),Tt=s(5848),Ft=s(2378),Et=s(3897),Pt=s(2068),$t=s(7834),Dt=s(8326);let Rt=class extends Lt.Z{constructor(...t){super(...t),(0,h.Z)(this,"source",void 0)}mounted(){this.startSign()}goToList(){const t=[{type:M.Z["new"],params:{visible:!0}}],e=(0,N.Rg)(this.$store.getters["platform"],{},"Мои заявления",t);document.location.href=e}};(0,c.gn)([(0,p.fI)({required:!0})],Rt.prototype,"source",void 0),Rt=(0,c.gn)([(0,p.wA)({components:{ApplicationInfo:_t,PinCode:Tt.Z,Button1:S.Z,BackgroundIconError:v.Z,BackgroundIconSuccess:Ft.Z,BackgroundIconKey:Et.Z,SignTroubleshooting:Pt.Z,SignTitle:$t.Z,SignLoading:Dt.Z}})],Rt);var Ut=Rt,jt=Ut,Nt=(0,R.Z)(jt,bt,At,!1,null,null,null),Mt=Nt.exports;let Bt=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"id",void 0),(0,h.Z)(this,"item",null),(0,h.Z)(this,"isError",!1)}created(){this.load()}async load(){try{const t=await this.$hrLinkRepository.getApplication(this.id);this.item=t,this.isError=!1}catch(t){this.isError=!0}}get isSign(){return"true"===(this.$store.getters["urlParam"]("isSign")??"")}};(0,c.gn)([(0,p.fI)({required:!0})],Bt.prototype,"id",void 0),Bt=(0,c.gn)([(0,p.wA)({components:{ApplicationView:xt,BackgroundIconError:v.Z,ApplicationSign:Mt}})],Bt);var Ot,Vt=Bt,qt=Vt,Ht=(0,R.Z)(qt,Q,X,!1,null,null,null),Gt=Ht.exports,Kt=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"applications-create"},[t.isError?t._e():[e("form-group",{staticClass:"applications-create__type",attrs:{name:"Тип заявления"}},[e("select-control",{attrs:{items:t.applicationTypesList,placeholder:"Выберите тип заявления","is-loading":t.isLoading,"is-ajax":!1,"select-model":!1},model:{value:t.selectedTypeId,callback:function(e){t.selectedTypeId=e},expression:"selectedTypeId"}})],1),t.selectedTypeId?e("application-form",{staticClass:"applications-create__form",attrs:{selectedTypeId:t.selectedTypeId,mainFields:t.mainFields,systemFields:t.systemFields},on:{loading:function(e){t.isLoading=e},error:t.makeError}}):t._e()],t.isLoading?e("background-spinner"):t._e(),t.isError?[e("background-icon-error",[e("p",[t._v(t._s(t.errorMessage||"При загрузке типов заявлений произошла ошибка"))])]),e("footer",{staticClass:"applications-create__footer"},[e("button-1",{on:{click:t.retry}},[t._v("Попробовать снова")])],1)]:t._e()],2)},zt=[],Wt=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"application-form"},[t.isError?t._e():[e("div",{staticClass:"application-form__extra-controls"},[e("form-group",{attrs:{name:"Получатель заявления"}},[e("select-control",{attrs:{items:t.approversList,placeholder:"Выберите получателя","is-loading":!1,"is-ajax":!1,"select-model":!1},scopedSlots:t._u([{key:"default",fn:function({item:t}){return[e("div",{staticClass:"application-form__approver-profile"},[e("user-profile-component",{attrs:{userProfile:t.profile}})],1)]}}],null,!1,3640830242),model:{value:t.selectedApproverUserId,callback:function(e){t.selectedApproverUserId=e},expression:"selectedApproverUserId"}}),t.errors.selectedApproverUserId?e("span",{staticClass:"form-error"},[t._v("Обязательное поле")]):t._e()],1),e("form-group",{attrs:{name:"Дата заявления"}},[e("date-input",{attrs:{needClear:!1},model:{value:t.applicationDate,callback:function(e){t.applicationDate=e},expression:"applicationDate"}})],1),t.errors.applicationDate?e("span",{staticClass:"form-error"},[t._v("Обязательное поле")]):t._e()],1),e("form",{staticClass:"application-form__form",on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)},input:t.resetFieldError}},[e("div",{staticClass:"application-form__container"},[e("form-control-list",{attrs:{fields:t.systemFields,errors:t.errors}}),e("form-control-list",{attrs:{fields:t.mainFields,errors:t.errors}})],1),e("footer",{staticClass:"application-form__footer"},[e("button-1",{attrs:{type:"submit"}},[t._v("Отправить")])],1)])]],2)},Jt=[];(function(t){t["string"]="STRING",t["number"]="NUMBER",t["date"]="DATE"})(Ot||(Ot={}));var Qt=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"selector",class:{"is-active":t.active}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.active,expression:"!active"}],staticClass:"selector__label",class:{"is-placeholder":!t.selected},on:{click:t.onFocus}},[t._v(" "+t._s(t.label)+" ")]),t.active?e("input",{ref:"input",attrs:{type:"text",placeholder:t.currentPlaceholder},domProps:{value:t.search},on:{focus:t.onFocus,input:t.onSearchInput}}):t._e(),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"selector__arrow",on:{click:t.onFocus}},[e("arrow")],1),t.isLoading?e("div",{staticClass:"selector__spinner"},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none"}},[e("path",{attrs:{fill:"#F39420","fill-opacity":".12","fill-rule":"evenodd",d:"M12 21.818c5.422 0 9.818-4.396 9.818-9.818S17.422 2.182 12 2.182 2.182 6.578 2.182 12 6.578 21.818 12 21.818ZM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z","clip-rule":"evenodd"}}),e("path",{attrs:{fill:"#F39420",d:"M12 21.818c5.422 0 9.818-4.396 9.818-9.818S17.422 2.182 12 2.182V0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12h2.182c0 5.422 4.396 9.818 9.818 9.818Z"}})])]):t._e(),e("div",{staticClass:"selector__items"},[t._l(t.filteredList,(function(s){return e("div",{key:s.id,staticClass:"selector__item",class:{"is-selected":t.isSelected(s)},on:{click:function(e){return t.select(s)}}},[t._t("default",(function(){return[t._v(t._s(s.title))]}),{item:s})],2)})),t.isLoading?t._e():[t.showNotFound?e("div",{staticClass:"selector__item is-non-selectable"},[t._v("Не найдено")]):t._e(),t.showAjaxHint?e("div",{staticClass:"selector__item is-non-selectable"},[t._v("Введите несколько символов для начала поиска")]):t._e()]],2)])},Xt=[],Yt=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("svg",{attrs:{width:"12",height:"7",viewBox:"0 0 12 7",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M1 1L6 6L11 1",stroke:"#8E8E93"}})])},te=[];let ee=class extends p.w3{};ee=(0,c.gn)([p.wA],ee);var se=ee,ie=se,re=(0,R.Z)(ie,Yt,te,!1,null,null,null),oe=re.exports;let ne=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"value",void 0),(0,h.Z)(this,"placeholder",void 0),(0,h.Z)(this,"items",void 0),(0,h.Z)(this,"selectModel",void 0),(0,h.Z)(this,"disabled",void 0),(0,h.Z)(this,"isLoading",void 0),(0,h.Z)(this,"isAjax",void 0),(0,h.Z)(this,"selectField",void 0),(0,h.Z)(this,"active",!1),(0,h.Z)(this,"search",""),(0,h.Z)(this,"selected",null),(0,h.Z)(this,"blockSearchEmit",!1),(0,h.Z)(this,"previousEmitValue",""),(0,h.Z)(this,"isTyping",!1),(0,h.Z)(this,"typingTimeout",0)}get showNotFound(){return!(this.isLoading||this.isAjax&&this.isTyping)&&(this.active&&0==this.filteredList.length&&(this.search||!this.isAjax))}get showAjaxHint(){return this.active&&0==this.filteredList.length&&!this.search&&this.isAjax}mounted(){this.value&&this.setSelected()}onSearchChange(t,e){this.blockSearchEmit?this.blockSearchEmit=!1:t!=e&&this.previousEmitValue.substring(0,3)!=this.search.substring(0,3)&&(this.$emit("searchChanged",this.search),this.previousEmitValue=this.search)}get currentPlaceholder(){return this.placeholder}get label(){return this.selected&&this.selected.title?this.selected.title:this.placeholder}onValueChange(){this.setSelected()}onItemsChange(){this.setSelected()}onSearchInput(t){clearTimeout(this.typingTimeout),this.search=t.target.value,this.isTyping=!0,this.typingTimeout=setTimeout((()=>{this.isTyping=!1}),500)}get normalizedList(){return this.items.map((t=>"string"==typeof t?{id:t,title:t}:t))}get filteredList(){if(this.isAjax&&0==this.search.length)return[];const t=this.search.toLowerCase().trim().split(" ");return this.normalizedList.filter((e=>{let s=e.title.toLowerCase(),i=!0;return t.forEach((t=>{i=i&&s.indexOf(t)>=0})),i}))}setSelected(){if(this.selectModel)this.selected=this.value;else{const t=this.normalizedList.find((t=>t[this.selectField]==this.value));t&&(this.selected=t)}}isSelected(t){return this.selectModel?this.value&&this.value.id&&t.id==this.value.id:t.id==this.value}onFocus(){this.disabled||(this.active=!0,this.$nextTick((()=>{this.isAjax&&this.$refs.input&&this.$refs.input.focus()})),setTimeout((()=>{document.addEventListener("click",this.documentClick)}),500))}documentClick(t){this.isSelectorElement(t.target)||(this.blur(),document.removeEventListener("click",this.documentClick))}select(t){this.selectModel?this.$emit("input",t):this.$emit("input",t[this.selectField]),this.$emit("changed",t),this.selected=t,this.blur()}blur(){this.blockSearchEmit=!0,this.search="",this.$refs.input&&this.$refs.input.blur(),this.active=!1}isSelectorElement(t){let e=!1,s=t;while(s){if(e=s==this.$el,e)break;s=s.parentNode}return e}};(0,c.gn)([(0,p.fI)({required:!0})],ne.prototype,"value",void 0),(0,c.gn)([(0,p.fI)({default:""})],ne.prototype,"placeholder",void 0),(0,c.gn)([(0,p.fI)({default:()=>[]})],ne.prototype,"items",void 0),(0,c.gn)([(0,p.fI)({default:!1})],ne.prototype,"selectModel",void 0),(0,c.gn)([(0,p.fI)({default:!1})],ne.prototype,"disabled",void 0),(0,c.gn)([(0,p.fI)({default:!1})],ne.prototype,"isLoading",void 0),(0,c.gn)([(0,p.fI)({default:!1})],ne.prototype,"isAjax",void 0),(0,c.gn)([(0,p.fI)({default:"id"})],ne.prototype,"selectField",void 0),(0,c.gn)([(0,p.RL)("search")],ne.prototype,"onSearchChange",null),(0,c.gn)([(0,p.RL)("value")],ne.prototype,"onValueChange",null),(0,c.gn)([(0,p.RL)("items")],ne.prototype,"onItemsChange",null),ne=(0,c.gn)([(0,p.wA)({components:{Arrow:oe}})],ne);var ae=ne,le=ae,ce=(0,R.Z)(le,Qt,Xt,!1,null,null,null),pe=ce.exports,ue=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"form-group"},[e("label",{attrs:{for:t.nameFor}},[t._v(t._s(t.name))]),t._t("default")],2)},de=[];let he=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"name",void 0),(0,h.Z)(this,"nameFor",void 0)}};(0,c.gn)([(0,p.fI)()],he.prototype,"name",void 0),(0,c.gn)([(0,p.fI)()],he.prototype,"nameFor",void 0),he=(0,c.gn)([(0,p.wA)({components:{}})],he);var fe=he,me=fe,ge=(0,R.Z)(me,ue,de,!1,null,null,null),ve=ge.exports,_e=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"form-control-list"},t._l(t.fields,(function(s){return e("div",{staticClass:"form-control-list__item"},[e("form-group",{attrs:{name:s.label,nameFor:s.id}},[s.type===t.FieldType.string?e("text-input",{attrs:{name:s.id}}):t._e(),s.type===t.FieldType.number?e("number-input",{attrs:{name:s.id}}):t._e(),s.type===t.FieldType.date?e("date-input",{attrs:{name:s.id,value:""}}):t._e(),t.errors[s.id]?e("span",{staticClass:"form-error"},[t._v("Обязательное поле")]):t._e()],1)],1)})),0)},ye=[],we=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("input",t._b({staticClass:"text-input",attrs:{type:"text"}},"input",t.$attrs,!1))},Se=[];let Ze=class extends p.w3{};Ze=(0,c.gn)([(0,p.wA)({components:{}})],Ze);var Ie=Ze,ke=Ie,Ce=(0,R.Z)(ke,we,Se,!1,null,null,null),xe=Ce.exports,be=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("input",t._b({staticClass:"number-input",attrs:{inputmode:"numeric",type:"number"}},"input",t.$attrs,!1))},Ae=[];let Le=class extends p.w3{};Le=(0,c.gn)([(0,p.wA)({components:{}})],Le);var Te=Le,Fe=Te,Ee=(0,R.Z)(Fe,be,Ae,!1,null,null,null),Pe=Ee.exports;let $e=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"fields",void 0),(0,h.Z)(this,"errors",void 0),(0,h.Z)(this,"FieldType",Ot)}};(0,c.gn)([(0,p.fI)()],$e.prototype,"fields",void 0),(0,c.gn)([(0,p.fI)()],$e.prototype,"errors",void 0),$e=(0,c.gn)([(0,p.wA)({components:{DateInput:w.Z,TextInput:xe,NumberInput:Pe,FormGroup:ve}})],$e);var De=$e,Re=De,Ue=(0,R.Z)(Re,_e,ye,!1,null,null,null),je=Ue.exports;const Ne=(t,e)=>{try{return JSON.parse(t)}catch(s){return void 0!==e?e:t}};class Me{constructor(){(0,h.Z)(this,"storage",void 0),this.storage=window.localStorage}set(t,e){this.storage?.setItem(t,JSON.stringify(e))}get(t){return Ne(this.storage?.getItem(t))}}var Be=s(9490);class Oe{constructor(t,e,s,i){(0,h.Z)(this,"userRepository",void 0),(0,h.Z)(this,"objectRepository",void 0),(0,h.Z)(this,"localStorageClient",void 0),(0,h.Z)(this,"userId",void 0),this.userRepository=t,this.objectRepository=e,this.localStorageClient=s,this.userId=i}async getApproversList(t,e){const s=await this.userRepository.profiles({include:["firstName","lastName","middleName","userId","position","photoFileId"],where:{directionId:t},take:-1});if(!s.length)return[];const i=s.filter((t=>t.userId!==e&&t.userId)).map((t=>t.userId)),r=new Map(s.map((t=>[t.userId,t]))),o=await this.objectRepository.query("HRLinkUserSettings",{include:["userId"],where:{userId:{$in:i}},take:-1}),n=o.filter((({userId:t})=>r.has(t))).map((({userId:t})=>r.get(t)));return n}storeSelectedApprover(t){this.localStorageClient.set(this.getApproversLsKey(this.userId),t)}restoreSelectedApprover(t){const e=this.localStorageClient.get(this.getApproversLsKey(this.userId))||null,s=t.find((t=>t.id===e));if(s)return e}storeSystemValues(t){this.localStorageClient.set(this.getSystemFieldsLsKey(this.userId),t)}restoreSystemValues(){return this.localStorageClient.get(this.getSystemFieldsLsKey(this.userId))||null}getApproversLsKey(t){return"selected-approver-id_"+t}getSystemFieldsLsKey(t){return"saved-system-fields_"+t}}let Ve=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"mainFields",void 0),(0,h.Z)(this,"systemFields",void 0),(0,h.Z)(this,"selectedTypeId",void 0),(0,h.Z)(this,"localStorageClient",new Me),(0,h.Z)(this,"selectedApproverUserId",null),(0,h.Z)(this,"applicationDate",""),(0,h.Z)(this,"approversList",[]),(0,h.Z)(this,"FieldType",Ot),(0,h.Z)(this,"errors",{selectedApproverUserId:!1,applicationDate:!1}),(0,h.Z)(this,"service",null),(0,h.Z)(this,"isError",!1)}async created(){const t=this.currentUserProfile.directionId;if(t&&this.currentUserProfile.userId){this.service=new Oe(this.$userRepository,this.$objectRepository,this.localStorageClient,this.currentUserProfile.userId);try{this.$emit("loading",!0);const e=await this.service.getApproversList(t,this.currentUserProfile.userId);this.approversList=e.map((t=>({profile:t,id:t.userId,title:t.fullName}))),this.restoreSelectedApprover()}catch(e){this.$emit("error","При загрузке дополнительных данных произошла ошибка"),this.$store.dispatch("reportError",e)}finally{this.$emit("loading",!1)}}}mounted(){this.applicationDate=Be.ou.local().toFormat("yyyy-LL-dd"),this.restoreSystemValues()}async submit(t){const e=t.target,s=new FormData(e),i=Array.from(s.entries()),r=i.filter((t=>this.systemFieldsIds.includes(t[0]))),o=i.filter((t=>this.mainFieldsIds.includes(t[0])));this.storeSystemValues(r);const n=this.validate(i);if(!n)return;if(!this.selectedApproverUserId)throw Error("selectedApproverUserId must be set");const a=t=>({id:t[0],value:t[1]}),l=r.map(a),c=o.map(a),p={approverUserId:this.selectedApproverUserId,typeId:this.selectedTypeId,templateFields:c,templateSystemFields:l,date:this.applicationDate};try{this.$emit("loading",!0);const t=await this.$hrLinkRepository.createApplication(p);t?this.goToApplication(t):this.$emit("error","При создании заявления произошла ошибка")}catch(t){this.$emit("error","При создании заявления произошла ошибка"),this.$store.dispatch("reportError",t)}finally{this.$emit("loading",!1)}}goToApplication(t){const e=(0,N.Rg)(this.$store.getters["platform"],{id:t.applicationGroupId},t.typeName);document.location.href=e}validate(t){let e=!1;this.selectedApproverUserId&&this.applicationDate||(this.errors.selectedApproverUserId=!this.selectedApproverUserId,this.errors.applicationDate=!this.applicationDate,e=!0);for(const s of t)s[1]||(e||(e=!0),p.w3.set(this.errors,s[0],!0));return!e}resetFieldError(t){const e=t.target;this.errors[e?.name||""]=!1}storeSelectedApprover(t){this.service?.storeSelectedApprover(t)}restoreSelectedApprover(){this.selectedApproverUserId=this.service?.restoreSelectedApprover(this.approversList)||null}storeSystemValues(t){this.service?.storeSystemValues(t)}restoreSystemValues(){const t=this.service?.restoreSystemValues()||null;if(t){const e=this.$el.querySelectorAll("input"),s=Object.fromEntries(t);for(const t of e)s[t.name]&&(t.value=s[t.name])}}watchSelectedApproverUserIdHandler(t){this.storeSelectedApprover(t),this.errors.selectedApproverUserId=!1}watchApplicationDateHandler(t){}get systemFieldsIds(){return this.systemFields.map((t=>t.id))}get mainFieldsIds(){return this.mainFields.map((t=>t.id))}get currentUserProfile(){return this.$store.state.userProfile}get userId(){return this.currentUserProfile.userId}};(0,c.gn)([(0,p.fI)({default:()=>[]})],Ve.prototype,"mainFields",void 0),(0,c.gn)([(0,p.fI)({default:()=>[]})],Ve.prototype,"systemFields",void 0),(0,c.gn)([(0,p.fI)()],Ve.prototype,"selectedTypeId",void 0),(0,c.gn)([(0,p.RL)("selectedApproverUserId")],Ve.prototype,"watchSelectedApproverUserIdHandler",null),(0,c.gn)([(0,p.RL)("applicationDate")],Ve.prototype,"watchApplicationDateHandler",null),Ve=(0,c.gn)([(0,p.wA)({components:{Button1:S.Z,FormControlList:je,DateInput:w.Z,FormGroup:ve,SelectControl:pe,UserProfileComponent:it.Z}})],Ve);var qe=Ve,He=qe,Ge=(0,R.Z)(He,Wt,Jt,!1,null,null,null),Ke=Ge.exports;let ze=class extends p.w3{constructor(...t){super(...t),(0,h.Z)(this,"selectedTypeId",""),(0,h.Z)(this,"applicationTypesData",null),(0,h.Z)(this,"isLoading",!1),(0,h.Z)(this,"isError",!1),(0,h.Z)(this,"errorMessage","")}created(){this.loadTypes()}async loadTypes(){try{this.isLoading=!0,this.applicationTypesData=await this.$hrLinkRepository.getApplicationsTypes()}catch(t){this.isError=!0,this.$store.dispatch("reportError",t)}finally{this.isLoading=!1}}makeError(t){this.isError=!0,this.errorMessage=t}resetError(){this.isError=!1,this.errorMessage=""}retry(){this.resetError(),this.applicationTypesData||this.loadTypes()}get currentUserProfile(){return this.$store.state.userProfile}get applicationTypesList(){return this.applicationTypesData?.types?.filter((t=>t.templatable)).map((t=>({id:t.id,title:t.name})))||[]}get selectedType(){return this.applicationTypesData?.types.find((t=>t.id===this.selectedTypeId))}get mainFields(){return this.selectedType?.templateFields||[]}get systemFields(){return this.applicationTypesData?.templateSystemFields||[]}};ze=(0,c.gn)([(0,p.wA)({components:{DateInput:w.Z,ApplicationForm:Ke,SelectControl:pe,FormGroup:ve,BackgroundIconError:v.Z,BackgroundSpinner:yt.Z,Button1:S.Z}})],ze);var We=ze,Je=We,Qe=(0,R.Z)(Je,Kt,zt,!1,null,null,null),Xe=Qe.exports;let Ye=class extends p.w3{created(){const t=Object.fromEntries(new URL(window.location.toString()).searchParams.entries());this.$store.commit("setUrlParams",t)}get id(){return this.$store.getters["urlParam"]("id")??""}get isApplicationCreate(){return"true"===(this.$store.getters["urlParam"]("isApplicationCreate")??"")}};Ye=(0,c.gn)([(0,p.wA)({components:{ApplicationsList:J,ApplicationCreate:Xe,ApplicationDetail:Gt}})],Ye);var ts=Ye,es=ts,ss=(0,R.Z)(es,a,l,!1,null,null,null),is=ss.exports;i["default"].config.productionTip=!1,i["default"].use(r.Z),i["default"].use(o.ZP);const rs=(0,n.p)(is,"applications");rs.$mount("#app")}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var o=e[i]={id:i,loaded:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.loaded=!0,o.exports}s.m=t,function(){s.amdO={}}(),function(){var t=[];s.O=function(e,i,r,o){if(!i){var n=1/0;for(p=0;p<t.length;p++){i=t[p][0],r=t[p][1],o=t[p][2];for(var a=!0,l=0;l<i.length;l++)(!1&o||n>=o)&&Object.keys(s.O).every((function(t){return s.O[t](i[l])}))?i.splice(l--,1):(a=!1,o<n&&(n=o));if(a){t.splice(p--,1);var c=r();void 0!==c&&(e=c)}}return e}o=o||0;for(var p=t.length;p>0&&t[p-1][2]>o;p--)t[p]=t[p-1];t[p]=[i,r,o]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={383:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var r,o,n=i[0],a=i[1],l=i[2],c=0;if(n.some((function(e){return 0!==t[e]}))){for(r in a)s.o(a,r)&&(s.m[r]=a[r]);if(l)var p=l(s)}for(e&&e(i);c<n.length;c++)o=n[c],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(p)},i=self["webpackChunkugmk_documents"]=self["webpackChunkugmk_documents"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998,64],(function(){return s(7618)}));i=s.O(i)})();