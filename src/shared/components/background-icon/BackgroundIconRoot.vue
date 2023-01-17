<template>
    <div class="background-icon">
        <slot>

        </slot>

        <div class="background-icon__text">
            <p>main</p>
            <p>additional</p>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
// import s from './style.module.scss'

interface SomeTypeInterface {

}


export default defineComponent({
  name: '',
  components: {

  },
  props: {
    text: {
      type: String
    },
    additionalText: {
        type: String
    }
  },
  data() {
    return {
    //   s,
    }
  }
})

</script>