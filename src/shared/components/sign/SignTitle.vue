<template>
  <div class="sign-title">
    <p>Вы подписываете {{ type }} "{{ title }}"</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class SignTitle extends Vue {
  @Prop({ required: true }) title: string;
  @Prop({ default: "документ" }) type: string;
}

</script>
<style lang="scss">
  .sign-title {
    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #373737;
    }
  }
</style>