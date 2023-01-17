<template>
  <div class="app-root">
    <documents-list v-if="true" />
    <document-view v-if="false" />
    <document-sign v-if="false" />
    <document-reject v-if="false" />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'


import DocumentsList from './pages/DocumentsList.vue';
import DocumentView from './pages/DocumentView.vue';
import DocumentSign from './pages/DocumentSign.vue';
import DocumentReject from './pages/DocumentReject.vue';


export default defineComponent({
  name: 'App',
  components: {
    DocumentsList,
    DocumentView,
    DocumentSign,
    DocumentReject
  },
  data() {
    return {
    //   s,
    }
  }
})

</script>

<style lang="scss">
@import "./styles/app";
</style>
