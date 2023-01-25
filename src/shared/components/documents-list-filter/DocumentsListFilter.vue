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
                        <date-input v-model="dateLeft"/>
                        —
                        <date-input v-model="dateRight"/>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS -->
                <documents-listFilter-section>
                    <template #header>Статус документа:</template>

                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in statuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
                            {{ status.title }}
                        </status-tag>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS: user -->
                <documents-listFilter-section>
                    <template #header>Статус документа для пользователя:</template>

                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in employeeSignerStatuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
                            {{ status.title }}
                        </status-tag>
                    </div>
                </documents-listFilter-section>

                <!-- STATUS: head -->
                <documents-listFilter-section>
                    <template #header>Статус документа для руководителя:</template>
                    <div class="documents-list-filter__status">
                        <status-tag v-for="status in headSignerStatuses" @toggle="status.isActive = !status.isActive" :active="status.isActive" :key="status.id">
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
import DocumentListFilterSection from "./DocumentsListFilterSection.vue";
import { DocumentListFilterState } from '@/shared/services/documents-list/DocumentsListQueryFabric';
import DocumentsListFilterSection from './DocumentsListFilterSection.vue';
import StatusTag from './StatusTag.vue';
import { OtherStatuses, Statuses } from "@/service/repositories/types";
import { getOtherStatuses, getStatuses } from "./data";
import { Status } from "./types";



@Component({ components: {
    DateInput,
    Button1,
    DocumentListFilterSection,
    DocumentsListFilterSection,
    StatusTag
}})

export default class DocumentsListFilter extends Vue {
    dateLeft = "";
    dateRight =  "";

    statuses: Status[] = getStatuses();
    employeeSignerStatuses: Status<OtherStatuses>[] = getOtherStatuses();
    headSignerStatuses: Status<OtherStatuses>[] = getOtherStatuses()

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

<style lang="scss">
.documents-list-filter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;

        & > div {
            flex-basis: 33.3333%;
        }
    }

    &__reset {
        button {
            background-color: transparent;
            border: 0;
            color: #888888;
            font-weight: 500;
            font-size: 13px;
            letter-spacing: 0.6px;
            cursor: pointer;
            padding: 0;
        }
    }

    &__title {
        text-align: center;
        color: #373737;
        font-weight: 600;
        font-size: 15px;
    }

    &__close {
        text-align: right;
        button {
            display: inline-block;
            background-color: transparent;
            border: 0;
            cursor: pointer;

            padding: 6px;
            margin-right: -7px;
            margin-top: -2px;
        }

        svg {
            display: block;
        }
    }

    &__date {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
            width: calc(50% - 27px);
        }
    }

    &__status {
        margin-left: -8px;
        margin-bottom: -8px;

        & > div {
            margin-bottom: 8px;
        }

        & > div {
            margin-left: 8px;
        }
    }

    & > footer {
        padding: 16px;

        button {
            width: 100%;
            background-color: #F39420;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: white;
            border: 0;
            border-radius: 4px;
            padding: 11px 0;
            cursor: pointer;
        }
    }
}
</style>