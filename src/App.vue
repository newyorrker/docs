<template>
  <div id="app" class="app-root">
    <documents-list v-if="!id" />
    <document-detail :id="id" v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import DocumentsList from './pages/DocumentsList.vue';
import DocumentDetail from './pages/DocumentDetail.vue';

@Component({ components: {
    DocumentsList,
    DocumentDetail
}})

export default class App extends Vue {

  created(): void {
    const urlParams = Object.fromEntries(new URL(window.location.toString()).searchParams.entries());
    this.$store.commit('setUrlParams', urlParams);
  }

  get id(): string {
    return this.$store.getters['urlParam']('id') ?? '';
  }
}

</script>
<style lang="scss">
@import "./styles/app";
</style>


