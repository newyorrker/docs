<template>
    <div class="background-icon">
      <div class="background-icon__container">
        <slot>
        </slot>
        <div class="background-icon__text">
          <slot name="text"></slot>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class ClassName extends Vue {}

</script>
<style lang="scss">
  .background-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &__container {
      text-align: center;
    }

    &__text {
      margin-top: 18px;
      padding: 0 8px;

      p {
        margin: 0;
        line-height: 1.4;
      }

      p:first-child {
        font-size: 18px;

        color: #808998;
      }

      p:nth-child(2) {
        max-width: 305px;
        font-size: 12px;
        color: #9E9E9E;
        margin-top: 12px;
      }
    }
  }
</style>