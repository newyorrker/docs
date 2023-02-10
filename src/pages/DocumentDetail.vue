<template>
    <div class="document-detail">
      <template v-if="!isError && item">

        <template v-if="isSign || isReject">
          <document-sign v-if="isSign"
            @signed="load"
            :source="item"
            :id="item.id"
            :defaultErrorMessage="'При попытке подписания документа произошла ошибка'"/>
          <document-reject v-if="isReject" :source="item" />
        </template>
        <document-view v-else :source="item" />

      </template>

      <background-icon-error v-else-if="isError">
        <p>При загрузке документа произошла ошибка</p>
      </background-icon-error>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import DocumentSign from "@/shared/components/documents/document-detail/sign/DocumentSign.vue";
import DocumentView from "@/shared/components/documents/document-detail/view/DocumentView.vue";
import DocumentReject from "@/shared/components/documents/document-detail/reject/DocumentReject.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";

import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";

@Component({ components: { DocumentView, BackgroundIconError, DocumentSign, DocumentReject }})

export default class DocumentDetail extends Vue {

  @Prop({required: true}) id: string;

  item: HrLinkDocumentModel | null = null;

  isError = false;

  created() {
    this.load();
  }

  async load() {
    try {
      const data = await this.$hrLinkRepository.getDocument(this.id);

      this.item = data;

      this.isError = false;
    }
    catch(e) {
      this.isError = true;
    }
  }

  get isSign(): boolean {
    return (this.$store.getters['urlParam']('isSign') ?? '') === "true";
  }

  get isReject(): boolean {
    return (this.$store.getters['urlParam']('isReject') ?? '') === "true";
  }
}

</script>
<style lang="scss">
.document-detail {
    height: 100%;
}
</style>