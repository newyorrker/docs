<template>
    <div class="documents-list">
      <easy-refresh
        :on-refresh="refresh"
        :loadMore="loadMore"
        :autoLoad="true"
        userSelect="false"
        :showScrollBar="true"
        class="tickets"
        ref="easyRefresh"
      >

        <div class="documents-list__list">
          <document-card v-for="document in items" :source="document" :key="document.id" />
        </div>
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


      <template v-if="true">
        <button class="documents-list__web-filter-toggle-button" @click="showFilter = !showFilter">toggle</button>
      </template>


      <document-list-filter @close="showFilter = false" v-if="showFilter" class="documents-list__filter" />



    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import DocumentCard from '@/shared/components/document-card/DocumentCard.vue';
import DocumentListFilter from '@/shared/components/document-list-filter/DocumentListFilter.vue';
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { DocumentQuery } from "@/service/repositories/types";

@Component({ components: { DocumentCard, DocumentListFilter }})

export default class DocumentsList extends Vue {

  items: HrLinkDocumentModel[] = [];

  take = 3;

  mounted() {
    this.getList();
  }

  async getList(loadMore = false) {

    let where: Record<string, any> | null = null;
    let skip = 0;

    if (loadMore) {
      skip = this.items?.length || 0;
    }

    const queryParams: DocumentQuery = {
      take: this.take,
      skip,
      where: {

      }
      // order: {
      //   by: "",
      //   direction: "asc"
      // }
    };

    const newDocuments = await this.$hrLinkRepository.getDocuments(queryParams);

    if (!loadMore || !this.items) {
      this.items = newDocuments;
    } else {
      this.items = [...this.items, ...newDocuments];
    }
    if (newDocuments.length < this.take) {
      return true; // no more items
    }
    return false;
  }


  showFilter = false;

  async loadMore(done: (noMore: boolean) => void) {
    const res = await this.getList(true);
    done(res);
  }

  async refresh(done: () => void) {
    await this.getList();
    done()
  }

  get listIsEmpty() {
    return false;
  }
}

</script>

<style lang="scss">
.documents-list {
  height: 100%;
  position: relative;

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

  &__filter {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px #c8c7cc solid;
  }

  &__web-filter-toggle-button {
    position: absolute;
    bottom: 0;
  }
}
</style>