<template>
    <div class="document-view">
      <div class="document-view__padding">
        <document-info :source="source" />
        <!-- wrap to component -->
        <document-comment-view v-if="source.rejected && source.rejectionComment" class="document-view__comment" :rawText="source.rejectionComment" :mayBeExpanded="true" />
      </div>

      <pdf-viewer @done="loading = false" class="document-view__pdf" :id="source.id" :name="source.name" />

      <footer v-if="showFooter" class="document-view__footer">
        <button-1 @click="sign">Подписать</button-1>
        <button-1 @click="reject" :color="'#ffffff'" :textColor="'#F39420'">Отклонить</button-1>
      </footer>

      <div v-if="loading" class="document-view__loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none">
          <circle cx="20.5" cy="20.5" r="18.5" stroke="#373737" stroke-width="3"/>
          <mask id="a" fill="#fff">
            <path d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z"/>
          </mask>
          <path stroke="#FFB400" stroke-width="6" d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z" mask="url(#a)"/>
        </svg>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import DocumentInfo from '@/shared/components/document-info/DocumentInfo.vue';
import PdfViewer from "@/shared/components/pdf-viewer/PdfViewer.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";

import DocumentCommentView from '@/shared/components/document-comment-view/DocumentCommentView.vue';
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import { getLink } from "@/shared/helpers/linkHelper";

@Component({ components: { DocumentInfo, PdfViewer, DocumentCommentView, Button1 }})

export default class DocumentView extends Vue {

  @Prop({required: true}) source: HrLinkDocumentModel;

  loading = true;

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
    margin-top: 6px;
  }

  &__pdf {
    margin-top: 16px;
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

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255, .8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    svg {
      animation:animate .3s linear infinite;
    }

    @keyframes animate
    {
      0%
      {
        transform:rotate(0deg);
      }
      100%
      {
        transform:rotate(360deg);
      }
    }

  }
}
</style>