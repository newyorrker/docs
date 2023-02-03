<template>
 <div class="application-detal">
    <application-view :source="item" />
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ApplcationView from "@/shared/components/application-detail/view/ApplcationView.vue"

@Component({ components: { ApplcationView }})

export default class ApplicationDetail extends Vue {
  @Prop({required: true}) id: string;

  item: any | null = null; //HrLinkApplicationModel

  isError = false;

  async load() {
    try {
      const data = await this.$hrLinkRepository.getDocument(this.id);

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