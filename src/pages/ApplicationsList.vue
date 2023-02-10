<template>
 <div class="documents-list">
    <button v-if="showNewApplicationButton" @click="goToApplicationsCreate">Add new</button>
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
 </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import ItemsListBase from "@/shared/components/items-list/ItemsListBase.vue";
import DocumentCard from '@/shared/components/documents/document-card/DocumentCard.vue';
import DocumentsListSkel from '@/shared/components/documents/documents-list-skel/DocumentsListSkel.vue';
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";

import { getLink } from "@/shared/helpers/linkHelper";
import MobileAppButtonType from "@/types/MobileAppButtonType";

import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";
import { ApplicationsListService } from "@/shared/services/applications-list/ApplicationsListService";
import { ApplicationsListQueryFabric } from "@/shared/services/applications-list/ApplicationsListQueryFabric";


@Component({ components: { DocumentsListSkel, DocumentCard, BackgroundIconError }})

export default class ApplicationsList extends ItemsListBase<HrLinkApplicationModel> {

  applicationsListService: ApplicationsListService;

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
      const newDocuments = await this.applicationsListService.load({});

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
      { id: item.id },
      item.typeName
    );

    document.location.href = link;
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
  }

  get showNewApplicationButton() {
    return this.$store.getters["platform"] === "Web";
  }
}

</script>
<style lang="scss">

</style>