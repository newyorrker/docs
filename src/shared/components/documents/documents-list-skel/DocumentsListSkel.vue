<template>
    <div class="skel">
        <div class="skel__first-row">
        <div v-for="imageId in [1,2,3,4,5]" class="skel__item" :key="imageId">
            <div class="skel__profile">
            <div class="skel__circle &__bg" style="width: 38px; height: 38px; border-radius: 38px;"></div>
            <div class="skel__profile-text">
                <div class="skel__rect &__bg" style="width: 120px; height: 8px"></div>
                <div class="skel__rect &__bg" style="width: 100px; height: 7px"></div>
            </div>
            </div>

            <div class="skel__title">
            <div class="skel__rect" style="width: 278px; max-width: 100%; height: 10px"></div>
            <div class="skel__rect" style="width: 192px; max-width: 74%; height: 10px; "></div>
            <div class="skel__rect" style="width: 225px; max-width: 84%; height: 10px; "></div>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class DocumentListSkel extends Vue {}

</script>
<style lang="scss">
.skel {
  width: 100%;
  height: 100%;
  // background-color: white;
  z-index: 1;
  position: absolute;

  display: grid;
  gap: 10px;

  &__item {
    background-color: #ffffff;
    border-top: 1px #C8C7CC solid;
    border-bottom: 1px #C8C7CC solid;
    padding: 16px;
  }

  &__item + &__item {
    margin-top: 10px;
  }

  &__item:first-child {
    border-top: 0;
  }

  &__item:last-child {
    border-bottom: 0;
  }

  &__rect {
    border-radius: 8px;
  }

  &__rect, &__circle {
    background-color: #ddd;
    background: linear-gradient(-75deg, transparent 20%, #eeeeee, transparent 85%) 0 0/200% 100%, #e3e3e3;
    background-attachment: fixed;
    animation: loading 1.7s infinite linear;
  }

  &__profile {
    display: flex;
  }

  &__profile-text {
    & > div:first-child {
      margin-top: 4px;
    }
    margin-left: 4px;
  }

  &__profile-text > div + div {
    margin-top: 8px;
  }

  &__title {
    margin-top: 16px;

    & > div + div {
      margin-top: 8px;
    }
  }
}

@keyframes loading {
  from {
    background-position: 200% 0;
  }
}
</style>