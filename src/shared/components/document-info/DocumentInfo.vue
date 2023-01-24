<template>
    <div class="document-info">
        <user-profile v-if="!!source.creator" :userProfile="source.creator" />

        <div class="document-info__text">
            <!-- move logic to base component -->
            <p>
                <span>Сформировано:</span> {{ creationDate }}
            </p>

            <document-status v-if="showStatus" :source="source" class="document-info__status" />


            <!-- <p><span>Ожидает подписи:</span> Вы, Архипов Андрей Петрович</p> -->
        </div>
    </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import UserProfile from '@/shared/components/user-profile/UserProfile.vue';
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import DocumentStatus from '@/shared/components/document-card/status/DocumentStatus.vue';
import { formatDate } from "@/helpers/dateFormating";

@Component({ components: { UserProfile, DocumentStatus }})

export default class DocumentInfo extends Vue {
    @Prop({required: true}) source: HrLinkDocumentModel;

    //duplicated
    get showStatus() {
        return this.source.rejected || this.source.signed;
    }

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
            font-size: 14px;
            line-height: 17px;
            color: #9E9E9E;
            margin: 0;
            letter-spacing: 0.1px;

            span {
                color: #6D6D72;
            }
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