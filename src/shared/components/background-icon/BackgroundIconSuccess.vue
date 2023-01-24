<template>
  <background-icon-root>
    <svg xmlns="http://www.w3.org/2000/svg" width="170" height="178" fill="none">
      <path fill="#EAECF0" d="M85 170c46.944 0 85-38.056 85-85S131.944 0 85 0 0 38.056 0 85s38.056 85 85 85Z"/>
      <path fill="#fff" d="M33.5 178h102V61.257c-4.808-.006-9.417-2.037-12.816-5.647-3.4-3.61-5.312-8.505-5.317-13.61H51.633a20.16 20.16 0 0 1-1.374 7.37 19.242 19.242 0 0 1-3.942 6.24 17.985 17.985 0 0 1-5.876 4.187c-2.2.969-4.56 1.465-6.941 1.46V178Z"/>
      <path fill="#19B817" d="M85 115.6c15.022 0 27.2-12.178 27.2-27.2 0-15.022-12.178-27.2-27.2-27.2-15.022 0-27.2 12.178-27.2 27.2 0 15.022 12.178 27.2 27.2 27.2Z"/>
      <path fill="#EAECF0" d="M99.733 122.4H70.267a3.4 3.4 0 1 0 0 6.8h29.466a3.4 3.4 0 0 0 0-6.8ZM109.933 136H60.066a3.4 3.4 0 1 0 0 6.8h49.867a3.4 3.4 0 1 0 0-6.8Z"/>
      <path fill="#fff" fill-rule="evenodd" d="M101 80.663 80.756 102 69 89.609l2.62-2.663 9.136 9.629L98.38 78l2.62 2.663Z" clip-rule="evenodd"/>
    </svg>
  <template #text>
    <slot></slot>
  </template>
</background-icon-root>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import BackgroundIconRoot from "./BackgroundIconRoot.vue";

@Component({ components: { BackgroundIconRoot }})

export default class BackgroundIconSuccess extends Vue {}

</script>
<style lang="scss">

</style>