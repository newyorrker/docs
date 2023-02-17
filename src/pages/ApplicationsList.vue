<template>
 <div class="documents-list">
    <button v-if="showNewApplicationButton" @click="goToApplicationsCreate">Add new</button>
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
          <document-card v-for="document in items"
            @click.native="openItem(document)"
            :title="document.typeName"
            :source="document"
            :key="document.id" />
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
      Список заявлений пуст
    </div>

    <keep-alive>
      <applications-list-filter v-if="showFilter" class="documents-list__filter"
        @apply="applyFilter"
        @close="showFilter = false" />
    </keep-alive>
 </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import ItemsListBase from "@/shared/components/items-list/ItemsListBase.vue";
import DocumentCard from '@/shared/components/documents/document-card/DocumentCard.vue';
import DocumentsListSkel from '@/shared/components/documents/documents-list-skel/DocumentsListSkel.vue';
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import ApplicationsListFilter from "@/shared/components/applications/applications-list-filter/ApplicationsListFilter.vue";

import { getLink } from "@/shared/helpers/linkHelper";
import MobileAppButtonType from "@/types/MobileAppButtonType";

import { changeButtons } from "@/shared/helpers/interopHelper";

import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";
import { ApplicationsListService } from "@/shared/services/applications-list/ApplicationsListService";
import { ApplicationsListFilterState, ApplicationsListQueryFabric } from "@/shared/services/applications-list/ApplicationsListQueryFabric";


@Component({ components: { DocumentsListSkel, DocumentCard, BackgroundIconError, ApplicationsListFilter }})

export default class ApplicationsList extends ItemsListBase<HrLinkApplicationModel> {

  applicationsListService: ApplicationsListService;

  filterState: ApplicationsListFilterState = {
    applicationDateFrom: "",
    applicationDateTo: "",
    statuses: []
  }

  created() {
    this.applicationsListService = new ApplicationsListService(
      new ApplicationsListQueryFabric(this.pagingState),
      this.$hrLinkRepository
    )
  }

  mounted() {
    window.clickButton = this.buttonClicked;
  }

  destroyed() {
    window.clickButton = undefined;
  }

  async getList(loadMore = false): Promise<boolean> {
    this.isLoading = true;

    this.resetEasyRefreshScroll();

    if (loadMore) {
      this.pagingState.skip = this.items?.length ?? 0;
    }
    else {
      this.pagingState.skip = 0;
    }

    try {
      const newDocuments = await this.applicationsListService.load(this.filterState);

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

  openItem(item: HrLinkApplicationModel): void {

    const link = getLink(
      this.$store.getters['platform'],
      { id: item.applicationGroupId },
      item.typeName
    );

    document.location.href = link;
  }

  applyFilter(filterState: ApplicationsListFilterState) {
    this.filterState = filterState;

    changeButtons(
      [
        { type: MobileAppButtonType.filter, params: { filtered: this.filterHasValue } },
        { type: MobileAppButtonType.new, params: {  } }
      ]
    );

    this.items = [];

    this.getList();
  }

  goToApplicationsCreate() {
    const link = getLink(
      this.$store.getters['platform'],
      { isApplicationCreate: "true", isTypeSelect: "true" },
      "Создание заявления"
    );

    document.location.href = link;
  }

  buttonClicked(button: MobileAppButtonType): void {
    if (button === MobileAppButtonType.new) {
      this.goToApplicationsCreate();
    }

    if (button === MobileAppButtonType.filter) {
      this.showFilter = true;
    }
  }

  get filterHasValue() {
    const { statuses, applicationDateFrom, applicationDateTo } = this.filterState;

    return !!statuses?.length || !!applicationDateFrom || !!applicationDateTo;
  }

  get showNewApplicationButton() {
    return this.$store.getters["platform"] === "Web";
  }

  get showFilterButton() {
    return this.$store.getters["platform"] === "Web";
  }
}

</script>
<style lang="scss">

</style>