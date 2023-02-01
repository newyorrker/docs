<template>
  <div class="applications-create">

    <div class="applications-create__type">
      <form-group :name="'Тип заявки'">
        <select-control
          :items="list"
          :placeholder="'Выберите тип заявки'"
          :is-loading="false"
          :is-ajax="false"
          v-model="selectedTypeId"
          :select-model="false"
        />
      </form-group>
    </div>

    <application-form v-if="selectedTypeId" @submit="submit" class="applications-create__form" :fields="allFields" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ApplicationTypeSelect from "@/shared/components/application-type-select/ApplicationTypeSelect.vue";
import ApplicationForm from "@/shared/components/application-form/ApplicationForm.vue";
import { ApplicationsTypesResponse, HRLinkApplicationRequest } from "@/types/HRLinkApplication";

import SelectControl from "@/shared/components/controls/select/SelectControl.vue"
import FormGroup from "@/shared/components/form/FormGroup.vue";

@Component({ components: { ApplicationTypeSelect, ApplicationForm, SelectControl, FormGroup }})

export default class ApplicationsCreate extends Vue {

  selectedTypeId = ""

  data: ApplicationsTypesResponse | null = null;

  async created() {
    try {
      this.data = await this.$hrLinkRepository.getApplicationsTypes();
    }
    catch(e) {
      this.$store.dispatch('reportError', e);
    }
  }
  submit(formData: FormData) {

    const date = undefined;
    const typeId = this.selectedTypeId;


    formData//поля
    //разделить поля на системные и несистемные

    for (const entry of formData.entries()) {

      // if() {

      // }

    }

    const templateFields = [];
    const templateSystemFields = [];

    console.dir(Array.from(formData.entries()));


    const request: HRLinkApplicationRequest = {
      approverUserId: 0,
      typeId: this.selectedTypeId,

    }

    try {
      //request
    }
    catch(e) {
      this.$store.dispatch('reportError', e);
    }
  }

  get allFields() {
    return [...this.templateSystemFields, ...this.templateFields]
  }

  get templateFields() {
    return this.selectedType?.templateFields || [];
  }

  get templateSystemFields() {
    return this.data?.templateSystemFields || [];
  }

  get selectedType() {
    return this.data?.types.find((t) => t.id === this.selectedTypeId);
  }

  get list() {
    return this.data?.types?.filter((item) => item.templatable).map((item) => {
      return {
        id: item.id,
        title: item.name
      }
    }) || [];
  }
}

</script>
<style lang="scss">
  .applications-create {
    display: flex;
    flex-direction: column;
    height: 100%;

    padding-top: 16px;

    &__form {
      flex: 1;
    }

    &__type {
      padding: 0 16px;
      margin-bottom: 16px;
    }
  }
</style>