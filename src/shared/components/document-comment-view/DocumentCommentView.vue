<template>
     <div class="document-comment-view" :class="{'document-comment-view_may-be-exapanded': mayBeExpanded, 'document-comment-view_cut': !expanded}">
        <p @click="toggle">Комментарий: {{ text }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { process } from "@/shared/helpers/MessageProcessor";

@Component({ components: {  }})

export default class DocumentCommentView extends Vue {
    @Prop() rawText: string;
    @Prop({ default: false }) mayBeExpanded: boolean;

    expanded = false;

    toggle() {
        if(this.mayBeExpanded) {
            this.expanded = !this.expanded;
        }
    }

    get text() {
        return process(this.rawText);
    }
}

</script>
<style lang="scss">
    .document-comment-view {
        p {
            margin: 0;
            font-size: 15px;
            letter-spacing: 0.1px;
            line-height: 17px;
            color: #6D6D72;
        }
    }

    .document-comment-view_cut {
        p {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    .document-comment-view_may-be-exapanded {
        p {
            -webkit-line-clamp: 3;
        }
    }
</style>