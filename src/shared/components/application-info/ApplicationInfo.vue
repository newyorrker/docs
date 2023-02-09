<template>
    <div class="application-info">
        <user-profile v-if="!!source.creator" :userProfile="source.creator" />

        <div class="application-info__text">
            <!-- move logic to base component -->
            <p>
                <span>Сформировано:</span> {{ creationDate }}
            </p>
        </div>
    </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import UserProfile from '@/shared/components/user-profile/UserProfile.vue';
import DocumentStatus from '@/shared/components/document-status/DocumentStatus.vue';
import { formatDate } from "@/shared/helpers/dateFormating";
import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";

@Component({ components: { UserProfile, DocumentStatus }})

export default class ApplicationInfo extends Vue {
    @Prop({required: true}) source: HrLinkApplicationModel;

    //duplicated
    get creationDate() {
        return formatDate(this.source.createdAt);
    }
}

</script>

<style lang="scss">
.application-info {
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