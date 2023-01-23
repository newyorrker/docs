<template>
     <div class="document-comment-view">
        <p>Комментарий</p>
        <p>{{ text }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { process } from "@/helpers/MessageProcessor";

@Component({ components: {  }})

export default class DocumentCommentView extends Vue {
    @Prop() rawText: string;

    get text() {
        return process(this.rawText);
    }
}

</script>
<style lang="scss">
    .document-comment-view {
        p {
            margin: 0;
        }

        p:first-child {
            font-size: 15px;
            letter-spacing: -0.3px;
        }

        p:last-child {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: -0.8px;
            padding-right: 10px;
            margin-top: 4px;
        }
    }
</style>