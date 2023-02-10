<template>
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none">
    <path :fill="color" d="M10.118 5.571V3.714a.43.43 0 0 0-.037-.178.463.463 0 0 0-.109-.152L6.431.134A.546.546 0 0 0 6.07 0h-5.06C.454 0 0 .416 0 .929V12.07c0 .513.453.929 1.012.929h8.095c.558 0 1.011-.416 1.011-.929v-.928H9.107v.928H1.012V.93h4.047v2.785c0 .513.454.929 1.012.929h3.036v.928h1.011ZM6.071 3.714V1.12L8.9 3.714H6.071Z"/>
    <path :fill="color" fill-rule="evenodd" d="m11.267 6.656-4.06 4.07a.549.549 0 0 1-.395.157.547.547 0 0 1-.39-.166L4.114 8.29l.794-.635 1.92 2.02 3.662-3.671.777.652Z" clip-rule="evenodd"/>
</svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DocumentCheckIcon extends Vue {
    @Prop() inverted: boolean;

    get color() {
        return this.inverted ? "#ffffff" : "#373737";
    }
}
</script>