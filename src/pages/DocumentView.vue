<template>
    <div class="document-view">
        <document-info :userProfile="userProfile" />
    </div>
</template>

<script lang="ts">


import { defineComponent } from 'vue'
import DocumentInfo from '@/shared/components/document-info/DocumentInfo.vue';
// import s from './style.module.scss'

interface SomeTypeInterface {

}


export default defineComponent({
  name: '',
  components: {
    DocumentInfo
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