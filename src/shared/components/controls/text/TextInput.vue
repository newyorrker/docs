<template>
  <input class="text-input" v-bind="$attrs" type="text" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class TextInput extends Vue {

}

</script>
<style lang="scss">
  .text-input {
    border: 1px #C8C8C8 solid;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 15px;
    color: #212121;
    background-color: transparent;
    border-radius: 4px;
    padding: 8px 12px;
  }
</style>