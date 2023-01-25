<template>
    <div class="document-card">
        <user-profile :userProfile="userProfile" />

        <div class="document-card__title">
          <p>{{ source.type }}</p>
        </div>

        <document-status v-if="showStatus" :source="source" class="document-card__status" />

        <!-- wrap to component -->
        <document-comment-view v-if="source.rejected && source.rejectionComment" class="document-card__comment" :rawText="source.rejectionComment" />

        <div class="document-card__footer">
            <p>{{ creationDate }}</p>
            <button v-if="showSignButton" @click.stop="sign">
              Открыть
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" fill="none">
                <path fill="#fff" fill-rule="evenodd" d="M.793.5 5 4.5l-4.207 4L0 7.746 3.414 4.5 0 1.254.793.5Z" clip-rule="evenodd"/>
              </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { HrLinkDocumentInterface } from "@/types/HrLinkDocument/HrLinkDocumentInterface";
import { Vue, Component, Prop } from "vue-property-decorator";

import UserProfile from '../user-profile/UserProfile.vue';
import DocumentStatus from './status/DocumentStatus.vue';
import DocumentCommentView from '@/shared/components/document-comment-view/DocumentCommentView.vue';
import { getLink } from "@/helpers/linkHelper";
import { formatDate } from "@/helpers/dateFormating";

@Component({ components: {
    UserProfile,
    DocumentStatus,
    DocumentCommentView
}})

export default class DocumentCard extends Vue {
  @Prop() source: HrLinkDocumentInterface;

  sign() {
    const link = getLink(
      this.$store.getters['platform'],
      { id: this.source.id, isSign: "true" },
      this.source.type
    );

    document.location.href = link;
  }

  get userProfile() {
    return this.source.creator;
  }

  get showStatus() {
    return this.source.rejected || this.source.signed;
  }

  get creationDate() {
    return formatDate(this.source.createdAt);
  }

  get showSignButton() {
    const { rejected, signed } = this.source;
    return !rejected && !signed;
  }
}

</script>

<style lang="scss">
.document-card {
  background-color: #ffffff;
  padding: 16px;

  &__title {
    margin-top: 17px;

    p {
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0.34px;
      margin: 0;
    }
  }

  &__comment {
    margin-top: 12px;
  }

  &__title + &__footer {
    margin-top: 17px;
  }

  &__title + &__status {
    margin-top: 16px;
  }

  &__comment + &__footer {
    margin-top: 16px;
  }

  &__status + &__footer {
    margin-top: 16px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: #9E9E9E;
      font-size: 12px;
      margin: 0;
    }

    button {
      background-color: #F39420;
      border-radius: 4px;
      font-size: 12px;
      color: #FFFFFF;
      border: 0;
      padding: 7px 14px;

      svg {
        margin-left: 10px;
      }
    }
  }
}
</style>