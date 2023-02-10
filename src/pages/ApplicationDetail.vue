<template>
  <div class="application-detal">
    <template v-if="!isError && item">

      <application-sign v-if="isSign"
        @signed="load"
        :source="item"
        :id="item.applicationGroupId"
        :defaultErrorMessage="'При попытке подписания документа произошла ошибка'"/>

      <application-view v-else :source="item" />

    </template>

    <background-icon-error v-else-if="isError">
      <p>При загрузке документа произошла ошибка</p>
    </background-icon-error>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ApplicationView from "@/shared/components/applications/application-detail/view/ApplicationView.vue";
import ApplicationSign from "@/shared/components/applications/application-detail/sign/ApplicationSign.vue";
import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";

@Component({ components: { ApplicationView, BackgroundIconError, ApplicationSign}})

export default class ApplicationDetail extends Vue {
  @Prop({required: true}) id: string;

  item: HrLinkApplicationModel | null = null;

  isError = false;

  created() {
    this.load();
  }

  async load() {
    try {
      const data = await this.$hrLinkRepository.getApplication(this.id);

      this.item = data;

      this.isError = false;
    }
    catch(e) {
      this.isError = true;
    }
  }

  get isSign(): boolean {
    return (this.$store.getters['urlParam']('isSign') ?? '') === "true";
  }
}

</script>
<style lang="scss">
  .application-detal {
    height: 100%;
  }
</style>