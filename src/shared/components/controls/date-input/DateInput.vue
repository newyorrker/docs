<template>
  <div :class="s.input">
    <input @click="open" v-model="model" :placeholder="placeholder" :name="name" type="date">

    <svg :class="s.inputIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path stroke="#C8C8C8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.8 5.6H7.2A3.2 3.2 0 0 0 4 8.8v8A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2v-8a3.2 3.2 0 0 0-3.2-3.2ZM4 10.4h16M8.8 4v3.2V4Zm6.4 0v3.2V4Z"/>
    </svg>

    <button v-if="value && needClear" @click="clear" :class="s.close" >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#EE8056"/><path fill="#F9F9F9" d="M12.91 5.95a.805.805 0 0 1 1.14 1.14L11.14 10l2.91 2.91a.806.806 0 0 1-1.14 1.14L10 11.14l-2.91 2.91a.805.805 0 0 1-1.14-1.14L8.861 10l-2.91-2.91a.805.805 0 0 1 1.138-1.14L10 8.861l2.91-2.91Z"/></svg>
    </button>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class Dateinput extends Vue {
  @Prop({required: true}) value!: string;
  @Prop() placeholder!: string;
  @Prop() name!: string | undefined;
  @Prop({ default: true }) needClear!: boolean;

  open(e: InputEvent) {
    const element = this.getElement()[0];
    //@ts-ignore
    element.showPicker();
  }

  clear() {
    this.model = "";
  }

  getElement() {
    return (this.$el as HTMLElement).getElementsByTagName("input");
  }

  get s() {
    return this.$style
  }

  get model() {
    return this.value;
  }

  set model(value: string) {
    this.$emit('input', value);
  }
}

</script>

<style lang="scss" module>
.input {
    display: flex;
    min-height: 40px;
    position: relative;
    border: 1px #C8C8C8 solid;
    border-radius: 4px;

    input {
      width: 100%;
      min-height: 38px;
      border: 0;
      background-color: transparent;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      color: #212121;
      outline: 0;
      text-align: left;
      padding: 10px;
      padding-right: 32px;

      appearance: none;
    }

    input::-webkit-inner-spin-button,
    input::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }

    input::-webkit-clear-button {
      display: none;
    }

    input::-webkit-date-and-time-value {
      text-align: left;
    }

    button {
      border: 0;
      padding: 0;
      background-color: transparent;
    }
}

.inputIcon {
  position: absolute;
  right: 11px;
  top: calc(50% + 1px);
  transform: translateY(-50%);
  pointer-events: none;
}

.close {
  position: absolute;
  right: -4px;
  top: -6px;
}
</style>