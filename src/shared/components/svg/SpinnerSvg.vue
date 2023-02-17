<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none">
        <circle cx="20.5" cy="20.5" r="18.5" stroke="#6D6D72" stroke-width="3"/>
        <mask id="a" fill="#fff">
        <path d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z"/>
        </mask>
        <path stroke="#FFB400" stroke-width="6" d="M40.5 20.5A20 20 0 0 0 13.795 1.657l1.009 2.835A16.99 16.99 0 0 1 37.49 20.5H40.5Z" mask="url(#a)"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class SpinnerSvg extends Vue {}

</script>
<style lang="scss">
    .qwd {
        color: #888888
    }
</style>