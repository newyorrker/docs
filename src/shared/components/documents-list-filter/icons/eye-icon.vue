<template>
    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" class="outlined-eye-svg" viewBox="0 0 20 20">
        <path :fill="color" d="M19.337 9.787A10.431 10.431 0 0 0 10 3.125 10.431 10.431 0 0 0 .662 9.787a.625.625 0 0 0 0 .425A10.431 10.431 0 0 0 10 16.876a10.431 10.431 0 0 0 9.337-6.662.625.625 0 0 0 0-.425ZM10 15.625c-3.313 0-6.813-2.456-8.081-5.625C3.187 6.831 6.687 4.375 10 4.375c3.313 0 6.813 2.456 8.081 5.625-1.268 3.169-4.768 5.625-8.081 5.625Zm0-9.375a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm0 6.25a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EyeIcon extends Vue {
    @Prop() inverted: boolean;

    get color() {
        return this.inverted ? "#ffffff" : "#373737";
    }
}

</script>
<style lang="scss">

</style>