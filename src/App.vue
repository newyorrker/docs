<template>
  <div class="app-root">
    <documents-list v-if="true" />
    <document-view v-if="false" />
    <document-sign v-if="false" />
    <document-reject v-if="false" />

    <button @click="showFilter = !showFilter">toggle</button>

    <document-list-filter @close="showFilter = false" v-if="showFilter" class="documents-list__filter" />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'


import DocumentsList from './pages/DocumentsList.vue';
import DocumentView from './pages/DocumentView.vue';
import DocumentSign from './pages/DocumentSign.vue';
import DocumentReject from './pages/DocumentReject.vue';
import DocumentListFilter from '@/shared/components/document-list-filter/DocumentListFilter.vue';

export default defineComponent({
  name: 'App',
  components: {
    DocumentsList,
    DocumentView,
    DocumentSign,
    DocumentReject,
    DocumentListFilter
  },
  data() {
    return {
      showFilter: true
    //   s,
    }
  }
})

</script>

<style lang="scss">
@import "./styles/app";
</style>
