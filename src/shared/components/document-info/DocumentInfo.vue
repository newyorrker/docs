<template>
    <div class="document-info">
        <user-profile v-if="!!source.creator" :userProfile="source.creator" />

        <div class="document-info__text">
            <!-- move logic to base component -->
            <p>
                <span>Сформировано:</span> {{ creationDate }}
            </p>

            <document-status class="document-info__status" :source="source" :extended="true" />
        </div>
    </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import UserProfile from '@/shared/components/user-profile/UserProfile.vue';
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import DocumentStatus from '@/shared/components/document-status/DocumentStatus.vue';
import { formatDate } from "@/helpers/dateFormating";

@Component({ components: { UserProfile, DocumentStatus }})

export default class DocumentInfo extends Vue {
    @Prop({required: true}) source: HrLinkDocumentModel;

    //duplicated
    get creationDate() {
        return formatDate(this.source.createdAt);
    }
}

</script>

<style lang="scss">
.document-info {
    &__text {
        margin-top: 15px;
        & > p {
            font-size: 15px;
            line-height: 17px;
            color: #6D6D72;
            margin: 0;
            letter-spacing: 0.1px;
        }

        p + p {
            margin-top: 8px;
        }
    }

    &__status {
        margin-top: 6px;
    }
}
</style>