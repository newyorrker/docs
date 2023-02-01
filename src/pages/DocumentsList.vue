<template>
    <div class="documents-list">
      <easy-refresh
        :on-refresh="refresh"
        :loadMore="loadMore"
        :autoLoad="true"
        userSelect="false"
        :showScrollBar="true"
        class="documents-list__refresh"
        :class="{'documents-list__refresh_error': isError}"
        ref="easyRefresh"
      >

        <template v-if="!isError">
          <button v-if="showFilterButton" @click="showFilter = true">Show filter</button>
          <div v-if="showList" class="documents-list__list" :class="{'documents-list__list_bordered': showSkel}">
            <document-card v-for="document in items" :source="document" :key="document.id" @click.native="openItem(document)" />
          </div>
          <documents-list-skel v-show="showSkel" class="documents-list__skel" />
        </template>
        <background-icon-error v-else>
          <p>При загрузке списка документов произошла ошибка</p>
        </background-icon-error>


        <template v-slot:header>
          <ClassicsHeader
            :finishDuration="0"
            refreshedText=""
            :refreshingText="$t('common.refreshingText')"
            :refreshText="$t('common.pullToRefreshPrompt')"
            :refreshReadyText="$t('common.releaseToRefreshPrompt')"
          />
        </template>
        <template v-slot:footer>
          <EmptyFooter />
        </template>
        <template v-slot:scrollbar>
          <ClassicsScrollBar color="rgba(0, 0, 0, 0.3)" bgColor="transparent" width="3" radius="2" />
        </template>
      </easy-refresh>

      <template v-if="false">
        <button class="documents-list__web-filter-toggle-button" @click="showFilter = !showFilter">toggle</button>
      </template>
      <keep-alive>
        <documents-list-filter v-if="showFilter" class="documents-list__filter"
          @apply="applyFilter"
          @close="showFilter = false" />
      </keep-alive>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import DocumentCard from '@/shared/components/document-card/DocumentCard.vue';
import DocumentsListFilter from '@/shared/components/documents-list-filter/DocumentsListFilter.vue';
import DocumentsListSkel from '@/shared/components/documents-list-skel/DocumentsListSkel.vue';
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { DocumentsListService } from "@/shared/services/documents-list/DocumentsListService";
import { DocumentListFilterState, DocumentsListQueryFabric } from "@/shared/services/documents-list/DocumentsListQueryFabric";
import { PagingStateInterface } from "@/types/PagingStateInterface";
import { getLink } from "@/shared/helpers/linkHelper";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import MobileAppButtonType from "@/types/MobileAppButtonType";
import { changeButtons } from "@/shared/helpers/interopHelper";

@Component({ components: { DocumentCard, DocumentsListFilter, DocumentsListSkel, BackgroundIconError }})

export default class DocumentsList extends Vue {

  documentsListService: DocumentsListService;

  items: HrLinkDocumentModel[] = [];

  pagingState: PagingStateInterface = {
    skip: 0,
    take: 20
  }

  isLoading = false;
  isOnRefresh = false;
  loaded = false;

  isError = false;
  showFilter = false;

  filterState: DocumentListFilterState = {
    documentDateFrom: "",
    documentDateTo: "",
    statuses: [],
    employeeSignerStatuses: [],
    headSignerStatuses: []
  }

  created() {
    this.documentsListService = new DocumentsListService(
      new DocumentsListQueryFabric(this.pagingState),
      this.$hrLinkRepository
    )
  }

  mounted() {
    window.clickButton = this.buttonClicked;

    this.getList();
  }

  async getList(loadMore = false) {

    this.isLoading = true;

    if (loadMore) {
      this.pagingState.skip = this.items?.length ?? 0;
    }
    else {
      this.pagingState.skip = 0;
    }

    try {
      const newDocuments = await this.documentsListService.load(this.filterState);

      this.isError = false;

      if (!loadMore || !this.items) {
        this.items = newDocuments;
      } else {
        this.items = [...this.items, ...newDocuments];
      }
      if (newDocuments.length < this.pagingState.take) {
        return true; // no more items
      }
    }
    catch(e) {
      this.isError = true;
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.isLoading = false;
      this.loaded = true;
    }

    return false;
  }

  async loadMore(done: (noMore: boolean) => void) {
    if(this.isError) {
      done(true);
      return;
    }
    const res = await this.getList(true);
    done(res);
  }

  async refresh(done: () => void) {
    try {
      this.isOnRefresh = true;

      await this.getList();
      done();
    }
    catch(e) {
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.isOnRefresh = false;
    }
  }

  buttonClicked(button: MobileAppButtonType): void {
    if (button === MobileAppButtonType.filter) {
      this.showFilter = true;
    }
  }

  openItem(item: HrLinkDocumentModel): void {

    const link = getLink(
      this.$store.getters['platform'],
      { id: item.id },
      item.type
    );

    document.location.href = link;
  }

  applyFilter(filterState: DocumentListFilterState) {
    this.filterState = filterState;

    changeButtons([{ type: MobileAppButtonType.filter, params: { filtered: this.filterHasValue } }]);

    this.items = [];

    this.getList();
  }

  get filterHasValue() {
    const { documentDateFrom, documentDateTo, statuses, employeeSignerStatuses, headSignerStatuses } = this.filterState;

    return !!documentDateFrom || !!documentDateTo || !!statuses?.length || !!employeeSignerStatuses?.length || !!headSignerStatuses?.length;
  }

  get showList() {
    return this.loaded;
  }

  get showSkel() {
    return this.isLoading && !this.isOnRefresh;
  }

  get listIsEmpty() {
    return false;
  }

  get showFilterButton() {
    return this.$store.getters["platform"] === "Web";
  }
}

</script>

<style lang="scss">
.documents-list {
  height: 100%;
  position: relative;

  &__refresh_error {
    .v-easy-refresh-body > div {
      height: 100%;
    }
  }

  &__list {
    & > div {
      border-top: 1px #C8C7CC solid;
      border-bottom: 1px #C8C7CC solid;
    }

    & > div:first-child {
      border-top: 0;
    }

    & > div:last-child {
      border-bottom: 0;
    }

    & > div + div {
      margin-top: 10px
    }
  }

  &__list_bordered {
    border-bottom: 1px #C8C7CC solid;
  }

  &__list + &__skel {
    border-top: 1px #C8C7CC solid;
  }

  &__filter {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }

  &__web-filter-toggle-button {
    position: absolute;
    bottom: 0;
  }
}
</style>