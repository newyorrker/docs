<template>
  <div class="applications-create">
    <template v-if="!isError">
      <form-group class="applications-create__type" :title="'Тип заявления'">
        <select-control
          v-model="selectedTypeId"
          :items="applicationTypesList"
          :placeholder="'Выберите тип заявления'"
          :is-loading="isLoading"
          :is-ajax="false"
          :select-model="false"
        />
      </form-group>

      <!-- FORM -->
      <application-form v-if="selectedTypeId"
        @loading="isLoading = $event"
        @error="makeError"
        class="applications-create__form"
        :selectedTypeId="selectedTypeId"
        :mainFields="mainFields"
        :systemFields="systemFields" />
    </template>

    <background-spinner v-if="isLoading" />

    <template v-if="isError">
      <background-icon-error >
        <p>{{ errorMessage || 'При загрузке типов заявлений произошла ошибка' }}</p>
      </background-icon-error>
      <footer class="applications-create__footer">
        <button-1 @click="retry">Попробовать снова</button-1>
      </footer>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ApplicationForm from "@/shared/components/applications/application-form/ApplicationForm.vue";
import BackgroundIconError from "@/shared/components/background-icon/BackgroundIconError.vue";
import BackgroundSpinner from "@/shared/components/background-spinner/BackgroundSpinner.vue";
import Button1 from "@/shared/components/controls/buttons/Button1.vue";

import { ApplicationsTypesResponse } from "@/types/HRLinkApplication";

import { FormGroup, SelectControl } from "ui-lib";
import { UgmkUserProfile } from "@/models/UgmkUserProfile";
import { SelectorItem } from "@/shared/components/controls/select/types";

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};


@Component({ components: { ApplicationForm, SelectControl, FormGroup, BackgroundIconError, BackgroundSpinner, Button1 }})

export default class ApplicationsCreate extends Vue {

  selectedTypeId = "";
  applicationTypesData: ApplicationsTypesResponse | null = null;
  isLoading = false;
  isError = false;
  errorMessage = "";

  created() {
    this.loadTypes();
  }

  async loadTypes() {
    try {
      this.isLoading = true;
      // await sleep(10000000)
      // throw new Error("")

      this.applicationTypesData = await this.$hrLinkRepository.getApplicationsTypes();
    }
    catch(e) {
      this.isError = true;
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.isLoading = false;
    }
  }

  makeError(message: string) {
    this.isError = true;
    this.errorMessage = message;
  }

  resetError() {
    this.isError = false;
    this.errorMessage = "";
  }

  retry() {
    this.resetError();
    if(!this.applicationTypesData) {
      this.loadTypes();
    }
  }

  get currentUserProfile(): UgmkUserProfile {
    return this.$store.state.userProfile;
  }

  get applicationTypesList(): SelectorItem[] {
    return this.applicationTypesData?.types?.filter((item) => item.templatable).map((item) => {
      return {
        id: item.id,
        title: item.name
      }
    }) || [];
  }

  get selectedType() {
    return this.applicationTypesData?.types.find((t) => t.id === this.selectedTypeId);
  }

  get mainFields() {
    return this.selectedType?.templateFields || [];
  }

  get systemFields() {
    return this.applicationTypesData?.templateSystemFields || [];
  }
}

</script>
<style lang="scss">
  .applications-create {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: auto;

    padding-top: 16px;

    &__type {
      padding: 0 16px;
      margin-bottom: 16px;
    }

    &__form {
      flex: 1;
    }

    &__system {

      margin-bottom: 16px;

      & > div {
        margin-top: 16px;
      }
    }

    &__footer {
      background-color: #F9F9F9;
      padding: 16px;
    }
  }
</style>