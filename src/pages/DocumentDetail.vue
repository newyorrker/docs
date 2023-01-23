<template>
    <div class="document-detail">
        <template v-if="!isError && item">

          <template v-if="isSign || isReject">
            <document-sign v-if="isSign" :source="item" />
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

import DocumentSign from "@/shared/components/document-detail/sign/DocumentSign.vue";
import DocumentView from "@/shared/components/document-detail/view/DocumentView.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { DateTime } from "luxon";

import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";

@Component({ components: { DocumentView, BackgroundIconError, DocumentSign }})

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

      // throw Error("Kekus only");

      // data.signed = false;
      // data.signedAt = DateTime.local();

      // data.rejected = false;
      // data.rejectedAt = DateTime.local();
      // data.rejectionComment = "Supper comment for reject reason"

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