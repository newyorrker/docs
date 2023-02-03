<template template>
 <div class="applications-list">
    <button v-if="showNewApplicationButton" @click="goToApplicationsCreate">Show filter</button>
    Applications list
 </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { getLink } from "@/shared/helpers/linkHelper";
import MobileAppButtonType from "@/types/MobileAppButtonType";

@Component({ components: {  }})

export default class ApplicationsList extends Vue {
  goToApplicationsCreate() {
    const link = getLink(
      this.$store.getters['platform'],
      { isApplicationCreate: "true", isTypeSelect: "true" },
      "Создание заявления"
    );

    document.location.href = link;
  }

  buttonClicked(button: MobileAppButtonType): void {
    if (button === MobileAppButtonType.new) {
      this.goToApplicationsCreate();
    }
  }

  get showNewApplicationButton() {
    return this.$store.getters["platform"] === "Web";
  }
}

</script>
<style lang="scss">

</style>