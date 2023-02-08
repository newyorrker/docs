<template>
  <div class="application-detal">
    <application-view v-if="item" :source="item" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ApplicationView from "@/shared/components/application-detail/view/ApplicationView.vue";
import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";

@Component({ components: { ApplicationView }})

export default class ApplicationDetail extends Vue {
  @Prop({required: true}) id: string;

  item: HrLinkApplicationModel | null = null; //

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
}

</script>
<style lang="scss">

</style>