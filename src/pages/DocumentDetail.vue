<template>
    <div class="document-detail">
        <document-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import DocumentSign from "@/shared/components/document-detail/sign/DocumentSign.vue";
import DocumentView from "@/shared/components/document-detail/view/DocumentView.vue";

@Component({ components: { DocumentView }})

export default class DocumentDetail extends Vue {

    created() {
        this.load();
    }

    load() {
        //
    }

}

</script>
<style lang="scss">

</style>