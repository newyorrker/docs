<template>
    <button v-bind="$attrs" :style="styleObject" class="button-1"><slot/></button>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  components: {

  },
  props: {
    color: {
      type: String,
      default: "#F39420"
    }
  },
  data() {
    return {
    //   s,
    }
  },
  computed: {
    styleObject() {
        return {
            '--bg-color' : this.color
        }
    }
  }
})

</script>

<style lang="scss">
.button-1 {
    width: 100%;
    background-color: var(--bg-color);
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: white;
    border: 0;
    border-radius: 4px;
    padding: 11px 0;
    cursor: pointer;
}
</style>