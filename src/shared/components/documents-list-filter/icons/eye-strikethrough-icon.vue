<template>
    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" class="outlined-stroked-eye-svg" viewBox="0 0 20 20">
        <path :fill="color" d="m3.275 14.069.894-.888A8.788 8.788 0 0 1 1.919 10C3.187 6.831 6.687 4.375 10 4.375a7.738 7.738 0 0 1 2.5.45l.969-.975A9.2 9.2 0 0 0 10 3.125 10.431 10.431 0 0 0 .662 9.787a.625.625 0 0 0 0 .425 10 10 0 0 0 2.613 3.857ZM7.5 9.83A2.5 2.5 0 0 1 9.813 7.52l1.13-1.138a3.75 3.75 0 0 0-4.58 4.582L7.5 9.83Zm11.837-.043a10.25 10.25 0 0 0-3.587-4.65l3-3.007-.881-.881L1.25 17.869l.881.881 3.188-3.188A9.556 9.556 0 0 0 10 16.875a10.431 10.431 0 0 0 9.337-6.662.625.625 0 0 0 0-.425ZM12.5 10a2.5 2.5 0 0 1-3.75 2.15l3.4-3.4A2.5 2.5 0 0 1 12.5 10ZM10 15.625a8.156 8.156 0 0 1-3.75-.988l1.588-1.587a3.75 3.75 0 0 0 5.218-5.219l1.794-1.794A9.087 9.087 0 0 1 18.081 10c-1.268 3.169-4.768 5.625-8.081 5.625Z"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EyeStrikethroughIcon extends Vue {
    @Prop() inverted: boolean;

    get color() {
        return this.inverted ? "#f3f3f3" : "#b9bfc7";
    }
}
</script>