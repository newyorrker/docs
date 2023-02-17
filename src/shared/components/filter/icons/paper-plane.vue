<template>
    <svg :fill="color" xmlns="http://www.w3.org/2000/svg" width="13" height="13" >
        <path :fill="color" d="M12.207 6.056 1.22.556a.499.499 0 0 0-.54.06.5.5 0 0 0-.164.5L1.839 6h5.648v1H1.84L.496 11.873a.5.5 0 0 0 .5.63.5.5 0 0 0 .224-.055l10.987-5.5a.5.5 0 0 0 0-.89Z"/>
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