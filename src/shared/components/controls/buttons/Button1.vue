<template>
  <button @click="$emit('click', $event)" v-bind="{...$listeners, ...$attrs}" :style="styleObject" class="button-1"><slot/></button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class Button1 extends Vue {
  @Prop({ default: "var(--accent-color)" }) color!: string;
  @Prop({ default: "var(--accent-color)" }) borderColor!: string;
  @Prop({ default: "#ffffff" }) textColor!: string;

  get styleObject() {
      return {
          '--bg-color' : this.color,
          '--border-color' : this.borderColor,
          '--text-color': this.textColor
      }
  }
}

</script>
<style lang="scss">
.button-1 {
    width: 100%;
    background-color: var(--bg-color);
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: var(--text-color);
    border: 0;
    border-radius: 4px;
    padding: 11px 0;
    cursor: pointer;
    border: 1px var(--border-color) solid;
}
</style>