<template>
  <div class="background-spinner">
    <spinner-svg />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import SpinnerSvg from "@/shared/components/svg/SpinnerSvg.vue";

@Component({ components: { SpinnerSvg }})

export default class BackgroundSpinner extends Vue {

}

</script>
<style lang="scss">
  .background-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255, .8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    svg {
      animation:animate .3s linear infinite;
    }

    @keyframes animate
    {
      0%
      {
        transform:rotate(0deg);
      }
      100%
      {
        transform:rotate(360deg);
      }
    }
  }
</style>