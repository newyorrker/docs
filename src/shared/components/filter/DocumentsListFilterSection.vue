<template>
  <section class="documents-list-filter-section">
    <header>
      <p><slot name="header"/></p>
    </header>

    <div class="documents-list-filter-section__content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class DocumentsListFilterSection extends Vue {

}

</script>
<style lang="scss">
.documents-list-filter-section {
  &__content {
    padding: 11px 16px;
  }
  header {
    background-color: #F4F6F7;
    padding: 13px 16px;
    p {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      margin: 0;
    }
  }
}
</style>