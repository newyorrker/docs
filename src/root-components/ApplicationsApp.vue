<template>
  <div id="app">
    <application-create v-if="isApplicationCreate" />
    <application-detail v-else-if="id" :id="id" />
    <applications-list v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ApplicationsList from "@/pages/ApplicationsList.vue";
import ApplicationDetail from "@/pages/ApplicationDetail.vue";
import ApplicationCreate from "@/pages/ApplicationCreate.vue";

@Component({components: {ApplicationsList, ApplicationCreate, ApplicationDetail }})

export default class App extends Vue {

  created(): void {
    const urlParams = Object.fromEntries(new URL(window.location.toString()).searchParams.entries());
    this.$store.commit('setUrlParams', urlParams);
  }

  get id(): string {
    return this.$store.getters['urlParam']('id') ?? '';
  }

  get isApplicationCreate() {
    return (this.$store.getters['urlParam']('isApplicationCreate') ?? '') === "true";
  }
}

</script>
<style lang="scss">
@import "../styles/app";
</style>