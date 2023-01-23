<template>
  <div class="document-status" :style="{color: color}">
    <p class="document-status__main" >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none">
        <template v-if="false">
          <path :fill="color" d="M1.687 4.816c-.251 0-.455.187-.455.418 0 .23.204.417.455.417H6c.25 0 .454-.187.454-.417 0-.231-.203-.418-.454-.418H1.687ZM1.687 6.532c-.251 0-.455.187-.455.418 0 .23.204.418.455.418h3.805c.251 0 .455-.187.455-.418 0-.23-.204-.418-.455-.418H1.687ZM1.687 9.965c-.251 0-.455.187-.455.418 0 .23.204.417.455.417h6.288c.25 0 .454-.187.454-.418 0-.23-.203-.417-.454-.417H1.687ZM10.426 5.973a.316.316 0 0 0-.04-.472.386.386 0 0 0-.512.037l-.989 1.06-.356-.382a.386.386 0 0 0-.513-.036.316.316 0 0 0-.04.471l.564.604a.48.48 0 0 0 .69 0l1.196-1.282Z"/>
          <path :fill="color" fill-rule="evenodd" d="M3.447.5a.952.952 0 0 0-.632.235L.277 2.994a.804.804 0 0 0-.277.6v8.07c0 .462.407.836.909.836h7.735c.502 0 .909-.374.909-.836V9.14a3.178 3.178 0 0 1-.451.033C10.703 9.168 12 7.973 12 6.5c0-1.476-1.3-2.672-2.906-2.672h.004c.155 0 .307.011.455.033V1.336C9.553.874 9.146.5 8.644.5H3.447Zm4 8.201c.351.223.758.376 1.197.439v2.524H.91V4.218H3.17c.502 0 .91-.374.91-.835V1.336h4.563V3.86c-1.39.2-2.455 1.305-2.455 2.64 0 .66.26 1.265.693 1.732H1.687c-.251 0-.455.187-.455.418 0 .23.204.417.455.417h5.31c.231 0 .423-.16.45-.366ZM3.171 3.383H1.147L3.17 1.58v1.802Zm5.923 4.953c1.103 0 1.997-.822 1.997-1.836 0-1.014-.894-1.836-1.997-1.836-1.102 0-1.997.822-1.997 1.836 0 1.014.895 1.836 1.997 1.836Z" clip-rule="evenodd"/>
        </template>
        <template v-else>
          <path :fill="color" d="M1.687 4.316c-.251 0-.455.187-.455.418 0 .23.204.417.455.417H6c.25 0 .454-.187.454-.417 0-.231-.203-.418-.454-.418H1.687ZM1.687 6.032c-.251 0-.455.187-.455.418 0 .23.204.418.455.418h3.805c.251 0 .455-.187.455-.418 0-.23-.204-.418-.455-.418H1.687ZM1.687 9.465c-.251 0-.455.187-.455.418 0 .23.204.417.455.417h6.288c.25 0 .454-.187.454-.417 0-.231-.203-.418-.454-.418H1.687ZM9.698 5.01a.386.386 0 0 1 .514 0 .316.316 0 0 1 0 .472L9.648 6l.564.518a.316.316 0 0 1 0 .473.386.386 0 0 1-.514 0l-.564-.518-.563.518a.386.386 0 0 1-.514 0 .316.316 0 0 1 0-.473L8.62 6l-.563-.518a.316.316 0 0 1 0-.473.386.386 0 0 1 .514 0l.563.518.564-.518Z"/>
          <path :fill="color" fill-rule="evenodd" d="M3.447 0a.952.952 0 0 0-.632.235L.277 2.494a.804.804 0 0 0-.277.6v8.07c0 .462.407.836.909.836h7.735c.502 0 .909-.374.909-.836V8.64a3.178 3.178 0 0 1-.451.033C10.703 8.668 12 7.473 12 6c0-1.476-1.3-2.672-2.906-2.672h-.006.01c.155 0 .307.011.455.033V.836C9.553.374 9.146 0 8.644 0H3.447Zm5.197 3.36V.836H4.08v2.047c0 .461-.407.835-.909.835H.91v7.446h7.735V8.64a3.038 3.038 0 0 1-1.197-.439c-.027.207-.219.366-.45.366h-5.31c-.251 0-.455-.187-.455-.417 0-.231.204-.418.455-.418h5.195A2.538 2.538 0 0 1 6.189 6c0-1.335 1.064-2.44 2.455-2.64Zm-5.473-.477H1.147L3.17 1.08v1.802ZM11.091 6c0 1.014-.894 1.836-1.997 1.836-1.102 0-1.997-.822-1.997-1.836 0-1.014.895-1.836 1.997-1.836 1.103 0 1.997.822 1.997 1.836Z" clip-rule="evenodd"/>
        </template>
      </svg>
      <span>{{ text }}</span>
    </p>
    <p v-if="extended" class="document-status__extra"><span>Подписал Архипов Андрей Петрович - fake data</span></p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HrLinkDocumentInterface } from "@/types/HrLinkDocument/HrLinkDocumentInterface";

@Component({ components: {  }})

export default class ClassName extends Vue {
  @Prop() source: HrLinkDocumentInterface;
  @Prop({default: false}) extended: boolean;

  get text() {
    const actionWord = this.isSigned ? "Подписано" : "Отклонено";
    const date = this.isSigned ? this.source.signedAt : this.source.rejectedAt;
    let dateString = date?.toFormat("d LLLL, HH:mm") ?? "";

    if(dateString) {
      dateString = " " + dateString;
    }

    return `${actionWord} вами${dateString}`;
  }

  get color() {
    return this.isRejected ? "#FF5249" : "#19B817";
  }

  get isSigned() {
    return this.source.signed;
  }

  get isRejected() {
    return this.source.rejected;
  }
}
</script>

<style lang="scss">

.document-status {

    &__main {
      display: flex;
      align-items: center;
      margin: 0;

      & > span {

        margin-left: 8px;
      }
    }

    p {
      span {
        display: inline-block;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.18px;
      }
    }

}
</style>