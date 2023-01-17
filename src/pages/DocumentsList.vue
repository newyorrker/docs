<template>
    <div class="documents-list">
        <div class="documents-list__list">
            <document-card />
            <document-card />
            <document-card />
            <document-card />
            <document-card />
            <document-card />
            <document-card />
        </div>

        <!-- <document-list-filter v-if="true" class="documents-list__filter" /> -->
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
  name: 'DocumentList',
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
  overflow: auto;
  height: 100%;
  position: relative;

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

  &__filter {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px #c8c7cc solid;
  }
}
</style>