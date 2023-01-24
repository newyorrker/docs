<template>
    <div class="document-view">
      <div class="document-view__padding">
        <document-info :source="source" />
        <!-- wrap to component -->
        <document-comment-view v-if="source.rejected && source.rejectionComment" class="document-view__comment" :rawText="source.rejectionComment" />
      </div>

      <pdf-viewer class="document-view__pdf" :id="source.id" :name="source.name" />

      <footer v-if="showFooter" class="document-view__footer">
        <button-1 @click="sign">Подписать</button-1>
        <button-1 @click="reject" :color="'#ffffff'" :textColor="'#F39420'">Отклонить</button-1>
      </footer>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import DocumentInfo from '@/shared/components/document-info/DocumentInfo.vue';
import PdfViewer from "@/shared/components/pdf-viewer/PdfViewer.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";

import DocumentCommentView from '@/shared/components/document-comment-view/DocumentCommentView.vue';
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import { getLink } from "@/helpers/linkHelper";

@Component({ components: { DocumentInfo, PdfViewer, DocumentCommentView, Button1 }})

export default class DocumentView extends Vue {

  @Prop({required: true}) source: HrLinkDocumentModel;

  sign() {
    const link = getLink(
      this.$store.getters['platform'],
      { id: this.source.id, isSign: "true" },
      this.source.type
    );

    document.location.href = link;
  }

  reject() {
    const link = getLink(
      this.$store.getters['platform'],
      { id: this.source.id, isReject: "true" },
      this.source.type
    );

    document.location.href = link;
  }

  get showFooter() {
    const { rejected, signed } = this.source;
    console.log(rejected, signed);
    return !rejected && !signed;
  }

}

</script>

<style lang="scss">
.document-view {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__comment {
    margin-top: 10px;
  }

  &__pdf {
    margin-top: 15px;
  }

  &__padding {
    padding: 16px 16px 0 16px;
  }

  &__footer {
    display: flex;
    background-color: #F9F9F9;
    margin-top: 17px;
    margin-bottom: 10px;
    padding: 13px 16px 12px;

    button + button {
      margin-left: 16px;
    }
  }
}
</style>