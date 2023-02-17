

<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="12" fill="none">
        <path :fill="color" d="M2.063 10.875h4.874V9a2.35 2.35 0 0 0-.71-1.727 2.35 2.35 0 0 0-1.727-.71 2.35 2.35 0 0 0-1.727.71A2.35 2.35 0 0 0 2.063 9v1.875ZM0 12v-1.125h.938V9c0-.615.145-1.185.437-1.71A3.565 3.565 0 0 1 2.594 6a3.68 3.68 0 0 1-1.211-1.29A3.423 3.423 0 0 1 .937 3V1.125H0V0h9v1.125h-.938V3c0 .615-.148 1.185-.445 1.71A3.68 3.68 0 0 1 6.407 6c.52.333.926.763 1.218 1.29A3.47 3.47 0 0 1 8.063 9v1.875H9V12H0Z"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PaperPlane extends Vue {
    @Prop() inverted: boolean;

    get color() {
        return this.inverted ? "#ffffff" : "#373737";
    }
}

</script>
<style lang="scss">

</style>