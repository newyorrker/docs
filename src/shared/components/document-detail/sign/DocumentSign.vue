<template>
  <div class="document-sign">
    <template v-if="!isError">
      <div class="document-sign__container">
          <div class="document-sign__title">
              <p>Вы подписываете документ “Служебная записка об использовании личного транспорта</p>
          </div>
          <document-info :source="source" />
          <pin-code v-model="pinCodeValue" />
          <div class="document-sign__troubleshooting">
              <p>Не пришло SMS? <a href="">Отправить повторно через {{ time }}</a></p>
          </div>
      </div>
      <footer class="document-sign__footer">
        <button-1 @click="confirm">Подтвердить</button-1>
      </footer>
    </template>

    <template v-if="busy || isError" class="document-sign">
      <div v-if="busy" class="document-sign__loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none">
          <circle cx="20.5" cy="20.5" r="18.5" stroke="#373737" stroke-width="3"/>
          <mask id="a" fill="#fff">
            <path d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z"/>
          </mask>
          <path stroke="#FFB400" stroke-width="6" d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z" mask="url(#a)"/>
        </svg>
      </div>

      <background-icon-error v-if="isError">
        <p>{{ errorMessage }}</p>
      </background-icon-error>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import PinCode from '@/shared/components/pin-code/PinCode.vue';
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentInfo from "@/shared/components/document-info/DocumentInfo.vue";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import { DateTime, Duration } from "luxon";
import { AxiosError } from "axios";

const sleep = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, seconds);
  })
}

const COUNT_DOWN_MINUTES = 0.5;

@Component({ components: { DocumentInfo, PinCode, Button1, BackgroundIconError }})

export default class DocumentSign extends Vue {
  @Prop({required: true}) source: HrLinkDocumentModel;

  requestId: string | null = null;
  pinCodeValue: string[] = ["", "", "", ""];

  resendCounter: number | null = null;
  resendDuration: Duration | null = null;

  errorMessage = "";

  busy = false;
  isError = false;

  mounted() {
    this.startSign();
  }

  async startSign() {
    this.busy = true;

    if(this.source.rejected || this.source.signed) {
      return;
    }

    try {

      console.log(6);
      // await sleep(1000)
      this.requestId = await this.$hrLinkRepository.startSign(this.source.id);

      this.startTimer();
      this.isError = false;
    }
    catch(e) {
      this.errorMessage = (e as AxiosError).response?.data?.message || "При попытке подписании документа произошла ошибка";
      console.dir();
      //show error
      this.isError = true;
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.busy = false;
    }
  }

  async confirm() {
    try {
      if(!this.requestId) {
        throw Error("requestId must be set before confirmation")
      }

      const valid = this.validate();

      if(valid) {
        this.$hrLinkRepository.confirmSign(this.source.id, this.requestId, this.code);
      }

      else {
        alert("invalid")
      }


    }
    catch(e) {
      this.$store.dispatch('reportError', e);
    }
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

    this.resendCounter = setInterval(() => {
      this.resendDuration = this.getDiff(resendTime);

      if((this.resendDuration?.seconds ?? 0) <= 1) {
        clearInterval(this.resendCounter || 0);
      }
    }, 1000);

    this.resendDuration = this.getDiff(resendTime);
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
}

</script>

<style lang="scss">
.document-sign {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;

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
  }

  &__footer {
    background-color: #F9F9F9;
    padding: 16px;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255, .8);
    position: absolute;
    top: 0;
    left: 0;

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