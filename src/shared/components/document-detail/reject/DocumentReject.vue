<template>
  <div class="document-reject">
    <template v-if="!rejected && !error">
      <div class="document-reject__container">
        <div class="document-reject__title">
          <p>Вы действительно хотите отказаться подписывать документ: "{{ source.type }}"?</p>
        </div>
        <document-info :source="source" />
        <div class="document-reject__reason">
          <p>Укажите причину:</p>
          <textarea v-model="reason" placeholder="Введите сообщение" rows="9" ></textarea>
          <span v-if="validationError">Поле причины обязательно</span>
        </div>
      </div>
      <footer class="document-reject__footer">
        <button-1 @click="reject">Отказаться</button-1>
      </footer>
    </template>

    <template v-if="rejected">
      <background-icon-error >
        <p>Ваш отказ отправлен!</p>
      </background-icon-error>
      <footer class="document-reject__footer">
        <button-1 @click="goToList">К списку документов</button-1>
      </footer>
    </template>

    <template v-if="error">
      <background-icon-error >
        <p>При отказе от подписи документа произошла ошибка</p>
      </background-icon-error>
      <footer class="document-reject__footer">
        <button-1 @click="reject">Попробовать снова</button-1>
      </footer>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentInfo from "@/shared/components/document-info/DocumentInfo.vue";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { getLink } from "@/helpers/linkHelper";

@Component({ components: { Button1, DocumentInfo, BackgroundIconError }})

export default class ClassName extends Vue {
  @Prop({required: true}) source: HrLinkDocumentModel;

  reason = "";
  validationError = false;
  rejected = false;
  error = false;


  async reject() {
    this.error = false;
    this.validationError = false;

    try {
      if(!this.reason) {
        //required
        this.validationError = true;

        return
      }

      await this.$hrLinkRepository.rejectSign(this.source.id, this.reason);

      this.rejected = true;
    }
    catch(e) {
      this.error = true;
      this.$store.dispatch('reportError', e);
    }
  }

  goToList() {
    const link = getLink(
      this.$store.getters['platform'],
      {}
    );

    document.location.href = link;
  }

  @Watch("reason")
  watchReason() {
    this.validationError = false;
  }
}

</script>

<style lang="scss">
.document-reject {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__container {
    margin: 16px 16px 0;
  }

  &__title {
    margin-bottom: 16px;

    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #373737;
      letter-spacing: 0.35px;
      margin: 0;
    }
  }

  &__reason {
    margin-top: 15px;

    p {
      margin: 0;
    }

    textarea {
      width: 100%;
      background-color: transparent;
      border: 1px solid #C8C7CC;
      border-radius: 4px;
      resize: none;
      color: #373737;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      margin-top: 8px;
      padding: 14px;
    }

    span {
      color: #FF5249;
    }
  }

  &__footer {
    background-color: #F9F9F9;
    padding: 16px;
  }
}
</style>