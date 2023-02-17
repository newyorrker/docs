<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" fill="none">
        <path :fill="color" d="M0 12 7.5 0 15 12H0Zm2.205-1.2h10.59L7.5 2.333 2.205 10.8Zm5.291-.8a.627.627 0 0 0 .447-.171.56.56 0 0 0 .182-.425.608.608 0 0 0-.621-.604.627.627 0 0 0-.447.171.56.56 0 0 0-.182.425.608.608 0 0 0 .621.604Zm-.621-2h1.25V4.8h-1.25V8Z"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Warning extends Vue {
    @Prop() inverted: boolean;

    get color() {
        return this.inverted ? "#ffffff" : "#373737";
    }
}

</script>
<style lang="scss">

</style>