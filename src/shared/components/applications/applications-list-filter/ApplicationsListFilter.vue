<template>
    <div class="documents-list-filter">
        <!-- HEADER -->
        <div class="documents-list-filter__container">
            <!-- COMPONENT -->
            <header class="documents-list-filter__header">
                <div class="documents-list-filter__reset">
                    <button @click="reset">Сбросить</button>
                </div>
                <div class="documents-list-filter__title">
                    <span>Фильтр</span>
                </div>
                <div class="documents-list-filter__close">
                    <button @click="$emit('close')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                            <path fill="#373737" d="M7.05 5.636 18.364 16.95l-1.414 1.414L5.636 7.05z"/>
                            <path fill="#373737" d="m16.95 5.636 1.414 1.414L7.05 18.364 5.636 16.95z"/>
                        </svg>
                    </button>
                </div>
            </header>


            <!-- MAIN -->
            <main>
                <!-- PERIOD -->
                <documents-listFilter-section>
                    <template #header>
                        Период публикации
                    </template>
                    <div class="documents-list-filter__date">
                        <date-input v-model="dateLeft"/>
                        —
                        <date-input v-model="dateRight"/>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS -->
                <documents-listFilter-section>
                    <template #header>Статус рассмотрения</template>

                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in statuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
                            <template #icon>
                                <component :inverted="status.isActive" :is="status.iconName" />
                            </template>
                            {{ status.title }}
                        </status-tag>
                    </div>
                </documents-listFilter-section>
            </main>
        </div>

        <footer>
            <button-1 @click="apply">Применить</button-1>
        </footer>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import DateInput from "@/shared/components/controls/date-input/DateInput.vue";
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentsListFilterSection from '@/shared/components/filter/DocumentsListFilterSection.vue';
import ListFilterBase from "@/shared/components/filter/ListFilterBase.vue";
import StatusTag from '@/shared/components/filter/StatusTag.vue';
import { Status } from "@/shared/components/filter/types";
import { getStatuses } from "./data";

import EyeIcon from "@/shared/components/filter/icons/eye-icon.vue";
import EyeStrikethroughIcon from "@/shared/components/filter/icons/eye-strikethrough-icon.vue";
import CrossIcon from "@/shared/components/filter/icons/cross-icon.vue";
import ApplyIcon from "@/shared/components/filter/icons/apply-icon.vue";
import DocumentCheckIcon from "@/shared/components/filter/icons/document-check-icon.vue";
import DocumentProgressIcon from "@/shared/components/filter/icons/document-progress-icon.vue";
import { ApplicationsListFilterState } from "@/shared/services/applications-list/ApplicationsListQueryFabric";


@Component({ components: {
    DateInput,
    Button1,
    DocumentsListFilterSection,
    StatusTag,
    EyeIcon,
    EyeStrikethroughIcon,
    CrossIcon,
    ApplyIcon,
    DocumentCheckIcon,
    DocumentProgressIcon
}})

export default class DocumentsListFilter extends ListFilterBase {
    dateLeft = "";
    dateRight =  "";

    statuses: Status[] = getStatuses();

    apply() {
        this.$emit('apply', this.filterState);
        this.$emit('close')
    }
    reset() {
        this.dateLeft = "";
        this.dateRight = "";

        this.statuses = getStatuses();

        this.apply();
    }

    get filterState(): ApplicationsListFilterState {
        return {
            applicationDateFrom: this.dateLeft,
            applicationDateTo: this.dateRight,
            statuses: this.statuses.filter(s => s.isActive).map(i => i.id),
        }
    }
}

</script>

<style lang="scss">
</style>