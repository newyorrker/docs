<template>
    <div class="document-sign">
      <template v-if="showMain">
        <div class="document-sign__container">

          <sign-title :title="source.typeName" :type="''" />

          <application-info :source="source" />

          <!-- PINCODE: -->
          <pin-code v-model="pinCodeValue" :error="isPinCodeError" />

          <sign-troubleshooting @restart="restart"
            :codeIsWrong="currentState.matches(State.wrongCode)"
            :canRestartSign="canRestartSign"
            :time="time" />

        </div>
        <footer class="document-sign__footer">
          <button-1 @click="confirm">Подтвердить</button-1>
        </footer>
      </template>

      <sign-loading v-if="isBusy" :type="'заявление'" :showText="currentState.matches(State.onConfirmation)" />

      <!-- error or success -->

      <template v-if="currentState.matches(State.startSignError)">
        <background-icon-error >
          <p>{{ errorMessage }}</p>
        </background-icon-error>
        <footer class="document-sign__footer">
          <button-1 @click="startSign">Повторить попытку</button-1>
        </footer>
      </template>

      <template v-if="currentState.matches(State.confirmationError)">
        <background-icon-error >
          <p>Ошибка! <br> Не удалось подписать заявление</p>
        </background-icon-error>

        <footer class="document-sign__footer">
          <button-1 @click="confirm">Повторить попытку</button-1>
        </footer>
      </template>

      <template v-if="currentState.matches(State.signIsSucceed)">
        <background-icon-success >
          <p>Вы подписали заявление!</p>
        </background-icon-success>

        <footer class="document-sign__footer">
          <button-1 @click="goToList">К списку заявлений</button-1>
        </footer>
      </template>
    </div>
  </template>

  <script lang="ts">
  import { Component, Prop } from "vue-property-decorator";

  import SignBase from "@/shared/components/sign/SignBase.vue";
  import PinCode from '@/shared/components/pin-code/PinCode.vue';
  import Button1 from "@/shared/components/controls/buttons/Button1.vue";
  import ApplicationInfo from "@/shared/components/applications/application-info/ApplicationInfo.vue";
  import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
  import BackgroundIconSuccess from "@/shared/components/background-icon/BackgroundIconSuccess.vue";
  import BackgroundIconKey from "@/shared/components/background-icon/BackgroundIconKey.vue";
  import SignTroubleshooting from "@/shared/components/sign/SignTroubleshooting.vue";
  import SignTitle from "@/shared/components/sign/SignTitle.vue";
  import SignLoading from "@/shared/components/sign/SignLoading.vue";
  import { getLink } from "@/shared/helpers/linkHelper";
  import MobileAppChangeButtonMessage from "@/models/MobileAppChangeButtonMessage";
  import MobileAppButtonType from "@/types/MobileAppButtonType";
  import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";

  @Component({ components: { ApplicationInfo, PinCode, Button1, BackgroundIconError, BackgroundIconSuccess, BackgroundIconKey, SignTroubleshooting, SignTitle, SignLoading }})

  export default class ApplicationSign extends SignBase {

    @Prop({required: true}) source: HrLinkApplicationModel;

    mounted() {
      this.startSign();
    }

    goToList() {
      const buttons: MobileAppChangeButtonMessage[] = [
        {
          type: MobileAppButtonType.new,
          params: {
            visible: true
          }
        }
      ]
      const link = getLink(
        this.$store.getters['platform'],
        {},
        "Мои заявления",
        buttons
      );

      document.location.href = link;
    }
  }

  </script>