<template>
<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="outlined-fail-circle-svg" viewBox="0 0 20 20">
   <path :fill="color" d="M13.381 14.375 10 10.995l-3.381 3.38-.994-.994L9.005 10l-3.38-3.38.994-.995L10 9.005l3.38-3.38.995.994L10.995 10l3.38 3.381-.994.994ZM10 2.5A7.5 7.5 0 1 1 2.5 10 7.509 7.509 0 0 1 10 2.5Zm0-1.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5Z"/>
</svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CrossIcon extends Vue {
   @Prop() inverted: boolean;

   get color() {
      return this.inverted ? "#ffffff" : "#FF5249";
   }
}
</script>