<template>
  <div @click="$emit('toggle')" class="status-tag" :class="{'status-tag_active': active}">
    <span><slot/></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class StatusTag extends Vue {
  @Prop({ default: false }) active: boolean;
}

</script>
<style lang="scss">
  .status-tag {
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;
    height: 32px;

    line-height: 1.2;

    background-color: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 4px;

    padding: 6px 6px;
  }

  .status-tag_active {
    background-color: #F39420;
    border-color: #F39420;
    color: #ffffff;
  }
</style>