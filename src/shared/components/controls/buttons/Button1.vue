<template>
  <button-default @click="$emit('click', $event)" :color="color" :textColor="textColor" v-bind="{...$listeners, ...$attrs}">
    <slot/>
  </button-default>
  <!-- <button  :style="styleObject" class="button-1"></button> -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ButtonDefault } from "ui-lib";

@Component({ components: { ButtonDefault }})

export default class Button1 extends Vue {
  @Prop({ default: "var(--accent-color)" }) color!: string;
  @Prop({ default: "#ffffff" }) textColor!: string;
}

</script>