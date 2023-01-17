<template>
  <div :class="s.input">
    <input @click="open" v-model="model" :placeholder="placeholder" type="date">
    <svg @click="open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path stroke="#C8C8C8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.8 5.6H7.2A3.2 3.2 0 0 0 4 8.8v8A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2v-8a3.2 3.2 0 0 0-3.2-3.2ZM4 10.4h16M8.8 4v3.2V4Zm6.4 0v3.2V4Z"/>
    </svg>
    <svg :class="s.close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#EE8056"/><path fill="#F9F9F9" d="M12.91 5.95a.805.805 0 0 1 1.14 1.14L11.14 10l2.91 2.91a.806.806 0 0 1-1.14 1.14L10 11.14l-2.91 2.91a.805.805 0 0 1-1.14-1.14L8.861 10l-2.91-2.91a.805.805 0 0 1 1.138-1.14L10 8.861l2.91-2.91Z"/></svg>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import s from './style.module.scss';

export default defineComponent({
  name: '',
  components: {

  },
  props: {
    value: {
      required: true,
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      s,
    }
  },
  methods: {
    open(e: InputEvent) {

      const element = this.getElement()[0];
      //@ts-ignore
      element.showPicker();

      console.dir("show");

      // e.stopPropagation();
      // e.preventDefault();
    },
    getElement() {
      return (this.$el as HTMLElement).getElementsByTagName("input");
    }
  },
  computed: {
    model: {
        get() {
            return this.value;
        },
        set(value: string) {
            this.$emit('input', value);
        }
    }
  }
})

</script>