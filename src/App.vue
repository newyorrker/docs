<template>
  <div id="app" class="app-root">
    <documents-list />
    <!-- <document-view v-if="false" />
    <document-sign v-if="false" />
    <document-reject v-if="false" /> -->

  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import DocumentsList from './pages/DocumentsList.vue';
import DocumentView from './pages/DocumentView.vue';
import DocumentSign from './pages/DocumentSign.vue';
import DocumentReject from './pages/DocumentReject.vue';
import DocumentListFilter from '@/shared/components/document-list-filter/DocumentListFilter.vue';

@Component({ components: {
    DocumentsList,
    DocumentView,
    DocumentSign,
    DocumentReject,
    DocumentListFilter
}})

export default class App extends Vue {

}

</script>
<style lang="scss">
@import "./styles/app";
</style>


