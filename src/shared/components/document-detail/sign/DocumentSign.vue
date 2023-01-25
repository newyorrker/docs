<template>
  <div class="document-sign">
    <template v-if="!isError && !currentState.matches(State.signIsSucceed)">
      <div class="document-sign__container">
        <div class="document-sign__title">
          <p>Вы подписываете документ {{ source.type }}</p>
        </div>
        <document-info :source="source" />

        <!-- PINCODE: -->
        <pin-code v-model="pinCodeValue" :error="isPinCodeError" />

        <div class="document-sign__troubleshooting" :class="{ 'document-sign__troubleshooting_can-restart': canRestartSign, 'document-sign__troubleshooting_error': currentState.matches(State.wrongCode) }">
          <p>
            <span>{{currentState.matches(State.wrongCode) ? 'Неверный код!' : 'Не пришел код?'}} </span>
            <a v-if="canRestartSign" @click="restart">Отправить повторно</a>
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

      <div v-if="currentState.matches(State.onConfirmation)">Подписываем документ</div>
    </div>

    <template v-if="currentState.matches(State.startSignError)">
      <background-icon-error >
        <p>{{ errorMessage }}</p>

      </background-icon-error>
      <footer class="document-sign__footer">
        <button-1 @click="confirm">Повторить попытку</button-1>
      </footer>
    </template>

    <template v-if="currentState.matches(State.confirmationError)">
      <background-icon-error >
        <p>Ошибка! <br> Не удалось подписать документ</p>
      </background-icon-error>

      <footer class="document-sign__footer">
        <button-1 @click="confirm">Повторить попытку</button-1>
      </footer>
    </template>

    <template v-if="currentState.matches(State.signatureError)">
      <background-icon-key >
        <p>У вас нет электронной подписи!</p>
        <p>Обратитесь в отдел кадров для выпуска элетронной подписи</p>
      </background-icon-key>
    </template>

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

import { interpret } from "xstate";
import { stateMachine, Event, State } from "./stateMachine";

const COUNT_DOWN_MINUTES = 1;

@Component({ components: { DocumentInfo, PinCode, Button1, BackgroundIconError, BackgroundIconSuccess, BackgroundIconKey }})

export default class DocumentSign extends Vue {
  @Prop({required: true}) source: HrLinkDocumentModel;

  requestId: string | null = null;
  pinCodeValue: string[] = ["", "", "", "", "", ""];

  resendCounter: number | null = null;
  resendDuration: Duration | null = null;

  canRestartSign = false;

  errorMessage = "";

  stateService = interpret(stateMachine);
  currentState = stateMachine.initialState;
  State = State;

  created() {
    // Start service on component creation
    this.stateService
        .onTransition((state) => {
            // Update the current state component data property with the next state
            this.currentState = state;
        })
        .start();
  }

  mounted() {
    this.startSign();
  }

  /**
   * START SIGN
   */
  async startSign() {
    if(this.source.rejected || this.source.signed) {
      return;
    }

    this.canRestartSign = false;

    this.stateService.send(Event.startSign);

    try {
      // await sleep(450);
      // throw Error("")
      // this.requestId = "fake-id";
      this.requestId = await this.$hrLinkRepository.startSign(this.source.id);

      this.startTimer();
      this.stateService.send(Event.success);
    }
    catch(e) {
      this.errorMessage = (e as AxiosError).response?.data?.message || "При попытке подписании документа произошла ошибка";

      //show error
      this.stateService.send(Event.startSignError);
      this.$store.dispatch('reportError', e);
    }
  }

  /**
   * CONFIRM
   */
  async confirm() {
    try {
      if(!this.requestId) {
        throw Error("requestId must be set before confirmation");
      }

      this.stateService.send(Event.confirm);

      const valid = this.validate();

      if(valid) {
        // await sleep(500);

        await this.$hrLinkRepository.confirmSign(this.source.id, this.requestId, this.code);
        this.stateService.send(Event.success);

      }
      else {
        this.stateService.send(Event.invalidCode);
      }
    }
    catch(e) {
      //catch the wrong pincode
      if(false) {
        this.stateService.send(Event.wrongCodeError);
      }
      else if(false) {
        this.stateService.send(Event.signatureError);
      }
      else {
        this.stateService.send(Event.confirmationError);
        this.errorMessage = (e as AxiosError).response?.data?.message || "При попытке подписании документа произошла ошибка";
        this.$store.dispatch('reportError', e);
      }
    }
  }

  async restart() {
    await this.startSign();
  }

  @Watch("pinCodeValue")
  resetPinCodeError() {
    this.stateService.send(Event.resetCodeValidation)
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

    if(!this.code || this.code.length < 6) {
      valid = false;
    }

    return valid;
  }

  protected startTimer() {
    const resendTime = DateTime.local().plus({ minutes: COUNT_DOWN_MINUTES });

    const handler = () => {
      this.resendDuration = this.getDiff(resendTime);

      if((this.resendDuration?.seconds ?? 0) <= 1) {
        this.canRestartSign = true;
        clearInterval(this.resendCounter || 0);
      }
    }

    this.resendCounter = setInterval(handler, 1000);

    handler();
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
    return this.currentState.matches(State.onConfirmation) || this.currentState.matches(State.onSignStart);
  }

  get isPinCodeError() {
    return this.currentState.matches(State.wrongCode) || this.currentState.matches(State.invalidCode);
  }

  get isError() {
    return  this.currentState.matches(State.startSignError) || this.currentState.matches(State.confirmationError) || this.currentState.matches(State.signatureError);
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