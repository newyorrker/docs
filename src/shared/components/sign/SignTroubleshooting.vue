<template>
  <div class="sign-troubleshooting" :class="{ 'sign-troubleshooting_can-restart': canRestartSign, 'sign-troubleshooting_error': codeIsWrong }">
    <p>
      <span>{{codeIsWrong ? 'Неверный код!' : 'Не пришел код?'}} </span>
      <a v-if="canRestartSign" @click="restart">Отправить повторно</a>
      <a v-else-if="time">Отправить повторно через {{ time }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class SignTroubleshooting extends Vue {
  @Prop() canRestartSign: boolean;
  @Prop() codeIsWrong: boolean;
  @Prop() time: string;

  restart() {
    this.$emit('restart');
  }
}

</script>
<style lang="scss">
.sign-troubleshooting {
  text-align: center;

  a {
    font-variant-numeric: tabular-nums;
    text-decoration: underline;
    line-height: 1.4;
  }
}

.sign-troubleshooting_can-restart {
  a {
    color: #FFB400;
    cursor: pointer;
  }
}

.sign-troubleshooting_error {
  span {
    color: #FF5249;
  }
}
</style>