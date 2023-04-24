<template>
    <div class="documents-list-filter">
        <!-- HEADER -->
        <div class="documents-list-filter__container">
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
                        <input-date v-model="dateLeft"/>
                        —
                        <input-date v-model="dateRight"/>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS -->
                <documents-listFilter-section>
                    <template #header>Статус документа</template>

                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in statuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
                            <template #icon>
                                <component :inverted="status.isActive" :is="status.iconName" />
                            </template>
                            {{ status.title }}
                        </status-tag>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS: user -->
                <documents-listFilter-section>
                    <template #header>Статус документа для пользователя</template>

                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in employeeSignerStatuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
                            <template #icon>
                                <component :inverted="status.isActive" :is="status.iconName" />
                            </template>
                            {{ status.title }}
                        </status-tag>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS: head -->
                <documents-listFilter-section>
                    <template #header>Статус документа для руководителя</template>
                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in headSignerStatuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
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
import { Component } from "vue-property-decorator";

import { InputDate } from "ui-lib";
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentListFilterSection from "@/shared/components/filter/DocumentsListFilterSection.vue";
import { DocumentListFilterState } from '@/shared/services/documents-list/DocumentsListQueryFabric';
import DocumentsListFilterSection from '@/shared/components/filter/DocumentsListFilterSection.vue';
import StatusTag from '@/shared/components/filter/StatusTag.vue';
import { getOtherStatuses, getStatuses } from "./data";
import { Status } from "@/shared/components/filter/types";

import EyeIcon from "@/shared/components/filter/icons/eye-icon.vue";
import EyeStrikethroughIcon from "@/shared/components/filter/icons/eye-strikethrough-icon.vue";
import CrossIcon from "@/shared/components/filter/icons/cross-icon.vue";
import ApplyIcon from "@/shared/components/filter/icons/apply-icon.vue";
import DocumentCheckIcon from "@/shared/components/filter/icons/document-check-icon.vue";
import DocumentProgressIcon from "@/shared/components/filter/icons/document-progress-icon.vue";
import ListFilterBase from "@/shared/components/filter/ListFilterBase.vue";
import { OtherStatuses } from "./types";

@Component({ components: {
    InputDate,
    Button1,
    DocumentListFilterSection,
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
    employeeSignerStatuses: Status<OtherStatuses>[] = getOtherStatuses();
    headSignerStatuses: Status<OtherStatuses>[] = getOtherStatuses();

    apply() {
        this.$emit('apply', this.filterState);
        this.$emit('close')
    }
    reset() {
        this.dateLeft = "";
        this.dateRight = "";

        this.statuses = getStatuses();
        this.employeeSignerStatuses = getOtherStatuses();
        this.headSignerStatuses = getOtherStatuses();

        this.apply();
    }

    get filterState(): DocumentListFilterState {
        return {
            documentDateFrom: this.dateLeft,
            documentDateTo: this.dateRight,
            statuses: this.statuses.filter(s => s.isActive).map(i => i.id),
            employeeSignerStatuses: this.employeeSignerStatuses.filter(s => s.isActive).map(i => i.id),
            headSignerStatuses: this.headSignerStatuses.filter(s => s.isActive).map(i => i.id)
        }
    }
}

</script>