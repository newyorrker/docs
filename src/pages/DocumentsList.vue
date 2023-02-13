<template>
  <div class="documents-list">
    <button v-if="showFilterButton" @click="showFilter = true">Show filter</button>
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

        <div v-if="showList" class="documents-list__list" :class="{'documents-list__list_bordered': showSkel}">
          <document-card v-for="document in items" @click.native="openItem(document)"
            :title="document.type"
            :source="document"
            :key="document.id"  />
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

    <div class="documents-list__empty" v-if="showList && !items.length && !showSkel && !isError">
      Список документов пуст
    </div>

    <keep-alive>
      <documents-list-filter v-if="showFilter" class="documents-list__filter"
        @apply="applyFilter"
        @close="showFilter = false" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import DocumentCard from '@/shared/components/documents/document-card/DocumentCard.vue';
import DocumentsListFilter from '@/shared/components/documents/documents-list-filter/DocumentsListFilter.vue';
import DocumentsListSkel from '@/shared/components/documents/documents-list-skel/DocumentsListSkel.vue';
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { DocumentsListService } from "@/shared/services/documents-list/DocumentsListService";
import { DocumentListFilterState, DocumentsListQueryFabric } from "@/shared/services/documents-list/DocumentsListQueryFabric";
import { getLink } from "@/shared/helpers/linkHelper";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import MobileAppButtonType from "@/types/MobileAppButtonType";
import { changeButtons } from "@/shared/helpers/interopHelper";
import ItemsListBase from "@/shared/components/items-list/ItemsListBase.vue";

@Component({ components: { DocumentCard, DocumentsListFilter, DocumentsListSkel, BackgroundIconError }})

export default class DocumentsList extends ItemsListBase<HrLinkDocumentModel> {

  documentsListService: DocumentsListService;

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

  async getList(loadMore = false) {

    this.isLoading = true;

    this.resetEasyRefreshScroll();

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

  buttonClicked(button: MobileAppButtonType) {
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

  get showFilterButton() {
    return this.$store.getters["platform"] === "Web";
  }
}

</script>

<style lang="scss">

</style>