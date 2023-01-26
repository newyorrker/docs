<template>
  <background-icon-root>
      <svg xmlns="http://www.w3.org/2000/svg" width="171" height="178" fill="none"><path fill="#EAECF0" d="M85.5 170c46.944 0 85-38.056 85-85s-38.056-85-85-85S.5 38.056.5 85s38.056 85 85 85Z"/><path fill="#fff" d="M34 178h102V61.257c-4.808-.006-9.417-2.037-12.816-5.647-3.4-3.61-5.312-8.505-5.317-13.61H52.133a20.16 20.16 0 0 1-1.374 7.37 19.242 19.242 0 0 1-3.942 6.24 17.985 17.985 0 0 1-5.876 4.187c-2.2.969-4.56 1.465-6.941 1.46V178Z"/><path fill="#EAECF0" d="M100.233 122.4H70.767a3.4 3.4 0 1 0 0 6.8h29.466a3.4 3.4 0 1 0 0-6.8ZM110.433 136H60.566a3.4 3.4 0 1 0 0 6.8h49.867a3.4 3.4 0 1 0 0-6.8Z"/><path fill="#98A2B3" d="M84.366 115.2c15.022 0 27.2-12.178 27.2-27.2 0-15.022-12.178-27.2-27.2-27.2-15.022 0-27.2 12.178-27.2 27.2 0 15.022 12.178 27.2 27.2 27.2Z"/><path fill="#fff" fill-rule="evenodd" d="M99.362 82.073a9.5 9.5 0 0 1-9.5 9.5 9.459 9.459 0 0 1-4.509-1.136L79.27 96.62l2.93 2.734-3.788 4.073-3.001-3.019-2.198 2.233-3.841-3.806L81.524 86.63a9.457 9.457 0 0 1-1.162-4.557 9.5 9.5 0 0 1 19 0Zm-5 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" clip-rule="evenodd"/></svg>
    <template #text>
      <slot></slot>
    </template>
  </background-icon-root>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import BackgroundIconRoot from "./BackgroundIconRoot.vue";

@Component({ components: { BackgroundIconRoot }})

export default class BackgroundIconKey extends Vue {}

</script>
<style lang="scss">

</style>