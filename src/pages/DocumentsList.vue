<template>
    <div class="documents-list">
        <div class="documents-list__list">
            <document-card />
            <document-card />
            <document-card />
        </div>

        <div v-if="false" class="documents-list__filter">
          <document-list-filter />
        </div>
    </div>
</template>

<script lang="ts">

import DocumentCard from '@/shared/components/document-card/DocumentCard.vue';
import DocumentListFilter from '@/shared/components/document-list-filter/DocumentListFilter.vue';
import { defineComponent } from 'vue'
// import s from './style.module.scss'

interface SomeTypeInterface {

}


export default defineComponent({
  name: '',
  components: {
      DocumentCard, DocumentListFilter
  },
  data() {
    return {
    //   s,
    }
  }
})

</script>

<style lang="scss">
.documents-list {

  &__list {
    & > div {
      border-top: 1px #C8C7CC solid;
      border-bottom: 1px #C8C7CC solid;
    }

    & > div:first-child {
      border-top: 0;
    }

    & > div:last-child {
      border-bottom: 0;
    }

    & > div + div {
      margin-top: 10px
    }
  }
}
</style>