<template>

<svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" fill="none">
    <path :fill="color" d="M11 7.893H4.964L6.146 6.69 5.5 6.036 3.208 8.357 5.5 10.68l.646-.655-1.182-1.203H11v-.928ZM9.167 5.57V3.714a.47.47 0 0 0-.133-.33L5.826.134A.458.458 0 0 0 5.5 0H.917A.923.923 0 0 0 0 .929V12.07c0 .513.41.929.917.929H8.25a.923.923 0 0 0 .917-.929v-.928H8.25v.928H.917V.93h3.666v2.785c0 .513.411.929.917.929h2.75v.928h.917ZM5.5 3.714V1.12l2.562 2.595H5.5Z"/>
</svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DocumentProgressIcon extends Vue {
    @Prop() inverted: boolean;

    get color() {
        return this.inverted ? "#ffffff" : "#373737";
    }
}
</script>