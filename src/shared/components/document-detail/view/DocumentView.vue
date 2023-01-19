<template>
    <div class="document-view">
      <document-info :userProfile="userProfile" />

      <pdf-viewer />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DocumentInfo from '@/shared/components/document-info/DocumentInfo.vue';
import PdfViewer from "@/shared/components/pdf-viewer/PdfViewer.vue";

export default defineComponent({
  name: '',
  components: {
    DocumentInfo, PdfViewer
},
  data() {
    return {
    //   s,
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    }
  }
})

</script>