<template>
  <div class="background-spinner">
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none">
      <circle cx="20.5" cy="20.5" r="18.5" stroke="#373737" stroke-width="3"/>
      <mask id="a" fill="#fff">
        <path d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z"/>
      </mask>
      <path stroke="#FFB400" stroke-width="6" d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z" mask="url(#a)"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class BackgroundSpinner extends Vue {

}

</script>
<style lang="scss">
  .background-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255, .8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    svg {
      animation:animate .3s linear infinite;
    }

    @keyframes animate
    {
      0%
      {
        transform:rotate(0deg);
      }
      100%
      {
        transform:rotate(360deg);
      }
    }
  }
</style>