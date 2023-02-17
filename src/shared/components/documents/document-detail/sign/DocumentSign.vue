<template>
  <div class="document-sign">
    <template v-if="showMain">
      <div class="document-sign__container">

        <sign-title :title="source.type" :type="'документ'" />

        <document-info :source="source" />

        <!-- PINCODE: -->
        <pin-code v-model="pinCodeValue" @filled="filled" :error="isPinCodeError" />

        <sign-troubleshooting @restart="restart"
          :codeIsWrong="currentState.matches(State.wrongCode)"
          :canRestartSign="canRestartSign"
          :time="time" />

      </div>
      <footer class="document-sign__footer">
        <button-1 @click="confirm" :disabled="isPinCodeError">Подтвердить</button-1>
      </footer>
    </template>

    <sign-loading v-if="onSendingTheCode || onSignStart" :type="'документ'" :showText="onSendingTheCode" />
    <sign-loading v-if="onSigning" :verb="'Идет'" :type="'подписание...'" :showText="true" />

    <!-- error or success -->

    <!-- STARTERROR -->
    <template v-if="currentState.matches(State.startSignError)">
      <background-icon-error >
        <p>{{ errorMessage }}</p>
      </background-icon-error>
      <footer class="document-sign__footer">
        <button-1 @click="startSign">Повторить попытку</button-1>
      </footer>
    </template>

    <!-- SIGNING:ERROR -->
    <template v-if="currentState.matches(State.signError) || currentState.matches(State.signTimeIsOut)">
      <background-icon-error >
        <p>Ошибка! <br> {{ errorMessage }}</p>
      </background-icon-error>

      <footer class="document-sign__footer">
        <button-1 @click="confirm">Повторить попытку</button-1>
      </footer>
    </template>

    <!-- SUCCESS -->
    <template v-if="currentState.matches(State.signIsSucceed)">
      <background-icon-success >
        <p>Вы подписали документ!</p>
      </background-icon-success>

      <footer class="document-sign__footer">
        <button-1 @click="goToList">К списку документов</button-1>
      </footer>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import SignBase from "@/shared/components/sign/SignBase.vue";
import PinCode from '@/shared/components/pin-code/PinCode.vue';
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentInfo from "@/shared/components/documents/document-info/DocumentInfo.vue";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import BackgroundIconSuccess from "@/shared/components/background-icon/BackgroundIconSuccess.vue";
import BackgroundIconKey from "@/shared/components/background-icon/BackgroundIconKey.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import SignTroubleshooting from "@/shared/components/sign/SignTroubleshooting.vue";
import SignTitle from "@/shared/components/sign/SignTitle.vue";
import SignLoading from "@/shared/components/sign/SignLoading.vue";
import MobileAppChangeButtonMessage from "@/models/MobileAppChangeButtonMessage";
import MobileAppButtonType from "@/types/MobileAppButtonType";
import { getLink } from "@/shared/helpers/linkHelper";
import { State, Event } from "@/shared/components/sign/stateMachine";
import { SignStatus } from "@/types/HrLinkDocument/SignStatus";

@Component({ components: { DocumentInfo, PinCode, Button1, BackgroundIconError, BackgroundIconSuccess, BackgroundIconKey, SignTroubleshooting, SignTitle, SignLoading }})

export default class DocumentSign extends SignBase {

  @Prop({required: true}) source: HrLinkDocumentModel;

  mounted() {
    if(this.source.rejected || this.source.signed) {
      return;
    }
    this.startSign();
  }

  filled() {
    this.confirm();
  }

  async startCheckTheSign() {
    // на протяжении минуты каждую секунду выполнять запрос проверки статуса подписания

    const intervalTimer = setInterval(async () => {
      if(!this.requestId) {
        return;
      }

      const state = await this.$hrLinkRepository.getSignStatus(this.id, this.requestId);

      if(state === SignStatus.WAITING_CODE || state === SignStatus.CONFIRMING) {
        return;
      }

      if(state === SignStatus.SUCCEEDED) {
        this.stateService.send(Event.success);
        this.$emit('signed');
      }

      if(state === SignStatus.FAILED) {
        this.stateService.send(Event.error);
      }

      if(state === SignStatus.WRONG_CODE) {
        this.stateService.send(Event.wrongCodeError);
      }

      clearTimeout(timeoutTimer);
      clearInterval(intervalTimer);

    }, 1000);


    const timeoutTimer = setTimeout(() => {
      clearInterval(intervalTimer);
      this.errorMessage = "Время ожидания подписания вышло";
      this.stateService.send(Event.tooLongOperation);

    }, 60 * 1000);
  }

  goToList() {
    const buttons: MobileAppChangeButtonMessage[] = [
      {
        type: MobileAppButtonType.filter,
        params: {
          visible: true
        }
      }
    ]
    const link = getLink(
      this.$store.getters['platform'],
      {},
      "Мои документы",
      buttons
    );

    document.location.href = link;
  }

  get onSigning() {
    return this.currentState.matches(State.onSigning);
  }
}

</script>