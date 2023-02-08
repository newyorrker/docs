<template>
    <div class="application-view">
      <div class="application-view__padding">
        <application-info :source="source" />
      </div>

      <pdf-viewer @done="loading = false" class="application-view__pdf" :id="source.id" :fileDataLoader="fileDataLoader" :name="source.typeName" />

      <!-- <footer v-if="showFooter" class="application-view__footer">
        <button-1 @click="sign">Подписать</button-1>
        <button-1 @click="reject" :color="'#ffffff'" :textColor="'#F39420'">Отклонить</button-1>
      </footer> -->

      <background-spinner v-if="loading" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ApplicationInfo from '@/shared/components/application-info/ApplicationInfo.vue';
import BackgroundSpinner from "@/shared/components/background-spinner/BackgroundSpinner.vue";
import PdfViewer from "@/shared/components/pdf-viewer/PdfViewer.vue";
import { HrLinkApplicationModel } from "@/types/HrLinkApplication/HrLinkApplicationModel";

import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import { getLink } from "@/shared/helpers/linkHelper";
import { ApplicationFileDataLoader } from "./ApplicationFileDataLoader";


@Component({ components: { ApplicationInfo, PdfViewer, Button1, BackgroundSpinner }})

export default class ApplicationView extends Vue {

  @Prop({required: true}) source: HrLinkApplicationModel;

  loading = true;

  fileDataLoader = new ApplicationFileDataLoader(this.$hrLinkRepository);

//   sign() {
//     const link = getLink(
//       this.$store.getters['platform'],
//       { id: this.source.id, isSign: "true" },
//       this.source.type
//     );

//     document.location.href = link;
//   }

//   reject() {
//     const link = getLink(
//       this.$store.getters['platform'],
//       { id: this.source.id, isReject: "true" },
//       this.source.type
//     );

//     document.location.href = link;
//   }

//   get showFooter() {
//     const { rejected, signed } = this.source;
//     return !rejected && !signed;
//   }
}

</script>

<style lang="scss">
.application-view {
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
}
</style>