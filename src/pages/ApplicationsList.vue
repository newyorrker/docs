<template template>
 <div class="applications-list">
    <button @click="goToApplicationsCreate">+</button>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { getLink } from "@/shared/helpers/linkHelper";

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
}

</script>
<style lang="scss">

</style>