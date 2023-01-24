<template>
  <div class="document-sign">
    <template v-if="!isError && !signIsSucceed">
      <div class="document-sign__container">
        <div class="document-sign__title">
          <p>Вы подписываете документ “Служебная записка об использовании личного транспорта</p>
        </div>
        <document-info :source="source" />

        <!-- PINCODE: -->
        <pin-code v-model="pinCodeValue" :error="isPinCodeError" />

        <div class="document-sign__troubleshooting" :class="{ 'document-sign__troubleshooting_can-restart': canRestart, 'document-sign__troubleshooting_error': pinCodeIsWrongError }">
          <p>
            <span>{{pinCodeIsWrongError ? 'Неверный код!' : 'Не пришло SMS?'}} </span>
            <a v-if="canRestart" @click="restart">Отправить повторно</a>
            <a v-else>Отправить повторно через {{ time }}</a>
          </p>
        </div>
      </div>
      <footer class="document-sign__footer">
        <button-1 @click="confirm">Подтвердить</button-1>
      </footer>
    </template>

    <div v-if="isBusy" class="document-sign__loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none">
        <circle cx="20.5" cy="20.5" r="18.5" stroke="#373737" stroke-width="3"/>
        <mask id="a" fill="#fff">
          <path d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z"/>
        </mask>
        <path stroke="#FFB400" stroke-width="6" d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z" mask="url(#a)"/>
      </svg>

      <div v-if="onConfirm">Подписываем документ</div>
    </div>

    <template v-if="startSignError">
      <background-icon-error >
        <p>{{ errorMessage }}</p>

      </background-icon-error>
      <footer class="document-sign__footer">
        <button-1 @click="confirm(false)">Повторить попытку</button-1>
      </footer>
    </template>

    <template v-if="confirmationError">
      <background-icon-error >
        <p>Ошибка! <br> Не удалось подписать договор</p>
      </background-icon-error>

      <footer class="document-sign__footer">
        <button-1 @click="confirm(false)">Повторить попытку</button-1>
      </footer>
    </template>

    <template v-if="signIsSucceed">
      <background-icon-success >
        <p>Вы подписали договор!</p>
      </background-icon-success>

      <footer class="document-sign__footer">
        <button-1 @click="goToList">К списку документов</button-1>
      </footer>
    </template>

    <template v-if="signatureError">
      <background-icon-key >
        <p>У вас нет электронной подписи!</p>
        <p>Обратитесь в отдел кадров для выпуска элетронной подписи</p>
      </background-icon-key>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import PinCode from '@/shared/components/pin-code/PinCode.vue';
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentInfo from "@/shared/components/document-info/DocumentInfo.vue";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import BackgroundIconSuccess from "@/shared/components/background-icon/BackgroundIconSuccess.vue";
import BackgroundIconKey from "@/shared/components/background-icon/BackgroundIconKey.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { DateTime, Duration } from "luxon";
import { AxiosError } from "axios";
import { getLink } from "@/helpers/linkHelper";

import { createMachine, MachineConfig } from "xstate"

const sleep = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, seconds);
  })
}

enum Event {

  /* errors on sign start */
  success = "SUCCESS",
  startSignError = "START_SIGN_ERROR",

  /* errors on confirm  */
  signatureError = "SIGNATURE_ERROR",
  confirmationError = "CONFORMATION_ERROR",
  wrongCodeError = "WRONG_CODE_ERROR",
  invalidCode = "INVALID_CODE",
  resetCodeValidation = "RESET_CODE_VALIDATION",

  startSign = "START_SIGN",
  confirm = "CONFIRM",
  retryStart = "RETRY_START",
  retryConfirm = "RETRY_CONFIRM",
}

enum State {
  initial = "initial",

  /**
   * Код отправляется
   */
  onSignStart = "onSignStart",

  /**
   * Код запрошен, ожидание подтверждения
   */
  waitingCodeInput = "waitingCode",

  /**
   * Ожидание ответа на запрос подтверждения подписи (подписываем документ)
   */
  onConfirmation = "onConfirmation",

  /**
   * Можно запросить код еще раз
   */
  canRestartCode = "canRestartCode",

  /**
   * Введенный код не валиден
   */
  invalidCode = "invalidCode",

  /**
   * Ошибка неправильного кода
   */
  wrongCode = "wrongCode",

  /**
   * Неизвестаня ошибка начала подписи документа
   */
  startSignError = "startSignError",

  /**
   * Неизвестаня ошибка подтверждения подписи
   */
  confirmationError = "confirmationError",

  /**
   * Отсутствие подписи
   */
  signatureError = "signatureError",

  /**
   * Подписан успешно
   */
  signIsSucceed = "signIsSucceed"
}


const stateMachine = createMachine({
  initial: State.initial,
  states: {
    [State.initial]: {
      on: {
        [Event.startSign]: State.onSignStart,
      }
    },
    [State.onSignStart]: {
      on: {
        [Event.success]: State.waitingCodeInput,
        [Event.startSignError]: State.startSignError,
      }
    },
    [State.startSignError]: {
      on: {
        [Event.retryStart]: State.onSignStart
      }
    },
    [State.waitingCodeInput]: {
      on: {
        [Event.confirm]: State.onConfirmation
      }
    },
    [State.onConfirmation]: {
      on: {
        [Event.invalidCode]: State.invalidCode,
        [Event.success]: State.signIsSucceed,
        [Event.wrongCodeError]: State.wrongCode,
        [Event.confirmationError]: State.confirmationError,
        [Event.signatureError]: State.signatureError,
      }
    },
    [State.invalidCode]: {
      on: {
        [Event.resetCodeValidation]: State.onConfirmation
      }
    },
    [State.wrongCode]: {
      on: {
        [Event.resetCodeValidation]: State.onConfirmation
      }
    },
    [State.confirmationError]: {
      on: {
        [Event.retryConfirm]: State.onConfirmation
      }
    },
    [State.signatureError]: {
    },
    [State.signIsSucceed]: {
    }
  }
})

const COUNT_DOWN_MINUTES = 0.5;

@Component({ components: { DocumentInfo, PinCode, Button1, BackgroundIconError, BackgroundIconSuccess, BackgroundIconKey }})

export default class DocumentSign extends Vue {
  @Prop({required: true}) source: HrLinkDocumentModel;

  requestId: string | null = null;
  pinCodeValue: string[] = ["", "", "", ""];

  resendCounter: number | null = null;
  resendDuration: Duration | null = null;

  errorMessage = "";
  onSignStart = false;
  onConfirm = false;

  canRestart = false;

  startSignError = false;
  confirmationError = false;
  signatureError = false


  pinCodeValidationError = false;
  pinCodeIsWrongError = false;

  signIsSucceed = false;

  mounted() {
    this.startSign();
  }

  /**
   * START SIGN
   */
  async startSign() {
    this.onSignStart = true;

    if(this.source.rejected || this.source.signed) {
      return;
    }

    try {
      // await sleep(450);
      // this.requestId = "kek";
      this.requestId = await this.$hrLinkRepository.startSign(this.source.id);

      this.startTimer();
      this.startSignError = false;
    }
    catch(e) {
      this.errorMessage = (e as AxiosError).response?.data?.message || "При попытке подписании документа произошла ошибка";

      //show error
      this.startSignError = true;
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.onSignStart = false;
    }
  }

  /**
   * CONFIRM
   */
  async confirm(dd = true) {
    this.confirmationError = false;
    this.signatureError = false;

    try {
      if(!this.requestId) {
        throw Error("requestId must be set before confirmation");
      }

      if(dd) {
        console.log(1);
        throw Error()
      }

      const valid = this.validate();

      if(valid) {
        this.onConfirm = true;
        // await sleep(500);

        this.signIsSucceed = true;
        this.$hrLinkRepository.confirmSign(this.source.id, this.requestId, this.code);
      }
      else {
        this.pinCodeValidationError = true;
      }
    }
    catch(e) {
      //catch the wrong pincode
      if(false) {
        this.pinCodeIsWrongError = true;
      }
      else if(true) {
        this.signatureError = true;
      }
      else {
        this.confirmationError = true;
        // this.errorMessage = (e as AxiosError).response?.data?.message || "При попытке подписании документа произошла ошибка";
      }

      this.$store.dispatch('reportError', e);
    }
    finally {
      this.onConfirm = false;
    }
  }

  async restart() {
    await this.startSign();
  }

  @Watch("pinCodeValue")
  resetPinCodeError() {
    this.pinCodeValidationError = false;
    this.pinCodeIsWrongError = false;
  }

  goToList() {

    const link = getLink(
      this.$store.getters['platform'],
      {}
    );

    document.location.href = link;
  }

  protected validate() {
    let valid = true;

    if(!this.code || this.code.length < 4) {
      valid = false;
    }

    return valid
  }

  protected startTimer() {
    const resendTime = DateTime.local().plus({ minutes: COUNT_DOWN_MINUTES });

    const handler = () => {
      this.resendDuration = this.getDiff(resendTime);

      if((this.resendDuration?.seconds ?? 0) <= 1) {
        this.canRestart = true;
        clearInterval(this.resendCounter || 0);
      }
    }

    this.resendCounter = setInterval(handler, 1000);

    handler();

    this.canRestart = false;
  }

  protected getDiff(resendTime: DateTime) {
    return resendTime.diff(DateTime.local(), "seconds")
  }

  get time() {
    return this.resendDuration?.toFormat("mm:ss");
  }

  get code() {
    return this.pinCodeValue.join("");
  }

  get isBusy() {
    return this.onConfirm || this.onSignStart;
  }

  get isPinCodeError() {
    return this.pinCodeIsWrongError || this.pinCodeValidationError;
  }

  get isError() {
    return this.startSignError || this.confirmationError || this.signatureError;
  }
}

</script>

<style lang="scss">
.document-sign {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;

  &__container {
    padding: 0 16px;
  }

  &__title {
    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #373737;
    }
  }

  &__troubleshooting {
    text-align: center;

    a {
      font-variant-numeric: tabular-nums;
      text-decoration: underline;
    }
  }

  &__troubleshooting_can-restart {
    a {
      color: #FFB400;
      cursor: pointer;
    }
  }

  &__troubleshooting_error {
    span {
      color: #FF5249;
    }
  }

  &__footer {
    background-color: #F9F9F9;
    padding: 16px;
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

    svg {

      animation:animate .3s linear infinite;
    }

    & > div {
      margin-top: 17px;
      font-size: 16px;
      font-weight: 600;
      color: #373737;
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