<template>
  <div class="sign-loading">
    <spinner-svg />
    <div v-if="showText">{{verb}} {{type}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import SpinnerSvg from "@/shared/components/svg/SpinnerSvg.vue";

@Component({ components: { SpinnerSvg }})

export default class SignLoading extends Vue {
  @Prop({ default: "Подписываем" }) verb: string;
  @Prop() type: string;
  @Prop() showText: boolean;
}

</script>
<style lang="scss">
  .sign-loading {
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

    svg {

      animation:animate .3s linear infinite;
    }

    & > div {
      margin-top: 17px;
      font-size: 16px;
      font-weight: 600;
      color: #6D6D72;
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