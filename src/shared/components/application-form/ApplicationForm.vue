<template>
  <div class="application-form">
    <template v-if="!isError">
      <div class="application-form__extra-controls">
        <form-group :name="'Получатель заявления'">
          <select-control
            v-model="selectedApproverUserId"
            :items="approversList"
            :placeholder="'Выберите получателя'"
            :is-loading="false"
            :is-ajax="false"
            :select-model="false"
          />
          <span class="form-error" v-if="errors.selectedApproverUserId">Обязательное поле</span>
        </form-group>
        <form-group  :name="'Дата заявления'">
          <date-input v-model="applicationDate" :needClear="false" />
        </form-group>
        <span class="form-error" v-if="errors.applicationDate">Обязательное поле</span>
      </div>

      <form @submit.prevent="submit" @input="resetFieldError" class="application-form__form">
        <div class="application-form__container">
          <form-control-list :fields="systemFields" :errors="errors"/>
          <form-control-list :fields="mainFields" :errors="errors" />
        </div>

        <footer class="application-form__footer">
          <button-1 type="submit">Отправить</button-1>
        </footer>
      </form>
    </template>
  </div>
</template>

<script lang="ts">
import { FieldType, HRLinkApplicationField, HRLinkApplicationRequest, HRLinkApplicationTypeField } from "@/types/HRLinkApplication";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import SelectControl from "@/shared/components/controls/select/SelectControl.vue"
import FormGroup from "@/shared/components/form/FormGroup.vue";
import DateInput from "@/shared/components/controls/date-input/DateInput.vue";

import FormControlList from "./FormControlList.vue";
import { LocalStorageClient } from "@/shared/services/common/local-storage-client/LocalStorageClient";
import { UgmkUserProfile } from "@/models/UgmkUserProfile";
import { SelectorItem } from "../controls/select/types";
import { DateTime } from "luxon";
import { ApplicationFormService } from "./ApplicationFormService";

const sleep = (time: number) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

export interface FormSubmitPayload {
  systemFields: [string, FormDataEntryValue][];
  mainFields: [string, FormDataEntryValue][];
}

@Component({ components: { Button1, FormControlList, DateInput, FormGroup, SelectControl }})

export default class ApplicationForm extends Vue {
  @Prop({ default: () => [] }) mainFields: HRLinkApplicationTypeField[];
  @Prop({ default: () => [] }) systemFields: HRLinkApplicationTypeField[];
  @Prop() selectedTypeId: string;

  localStorageClient: LocalStorageClient = new LocalStorageClient();
  selectedApproverUserId: number | null = null;
  applicationDate: string = "";
  approversList: SelectorItem[] = [];

  FieldType = FieldType;

  errors: Record<"selectedApproverUserId" | "applicationDate", boolean> & Record<string, boolean> = {
    selectedApproverUserId: false,
    applicationDate: false
  };

  service: ApplicationFormService | null = null;

  isError = false;

  async created() {
    const currentUserDirectionId = this.currentUserProfile.directionId;

    if(currentUserDirectionId && this.currentUserProfile.userId) {
      this.service = new ApplicationFormService(this.$userRepository, this.$objectRepository, this.localStorageClient, this.currentUserProfile.userId);

      try {
        this.$emit("loading", true);
        // await sleep(100000000)
        // throw Error()
        this.approversList = await this.service.getApproversList(currentUserDirectionId, this.currentUserProfile.userId);
        this.restoreSelectedApprover();
      }
      catch(e) {
        this.$emit("error", "При загрузке дополнительных данных произошла ошибка");
        this.$store.dispatch('reportError', e);
      }
      finally {
        this.$emit("loading", false);
      }
    }
  }

  mounted() {
    this.applicationDate = DateTime.local().toFormat('yyyy-LL-dd');
    this.restoreSystemValues();
  }

  async submit(e: SubmitEvent) {

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    const entries = Array.from(formData.entries());

    const systemFields = entries.filter(entry => this.systemFieldsIds.includes(entry[0]));
    const mainFields = entries.filter(entry => this.mainFieldsIds.includes(entry[0]));

    this.storeSystemValues(systemFields);

    const isValid = this.validate(entries);

    if(!isValid) {
      return;
    }

    if(!this.selectedApproverUserId) {
      throw Error("selectedApproverUserId must be set");
    }

    const callbackfn = (entry: [string, any]) => {
      return {
        id: entry[0],
        value: entry[1] as string
      }
    }

    const templateSystemFields: HRLinkApplicationField[] = systemFields.map(callbackfn);
    const templateFields: HRLinkApplicationField[] = mainFields.map(callbackfn);

    const query: HRLinkApplicationRequest = {
      approverUserId: this.selectedApproverUserId,
      typeId: this.selectedTypeId,
      templateFields: templateFields,
      templateSystemFields: templateSystemFields,
      date: this.applicationDate
    }

    try {
      this.$emit("loading", true);
      // await sleep(10000000)
      // throw Error()
      const someThing = this.$hrLinkRepository.createApplication(query);
    }
    catch(e) {
      this.$emit("error", "При создании заявления произошла ошибка")
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.$emit("loading", false);
    }
  }

  /**
   * returns valid form or not
   * @param fieldsEnties
   */
  validate(fieldsEnties: [string, FormDataEntryValue][]): boolean {
    let hasErrors = false;

    if(!this.selectedApproverUserId || !this.applicationDate) {
      this.errors.selectedApproverUserId = !this.selectedApproverUserId;
      this.errors.applicationDate = !this.applicationDate;

      hasErrors = true;
    }

    for (const entry of fieldsEnties) {
      if(!entry[1]) {
        if(!hasErrors) {
          hasErrors = true;
        }

        Vue.set(this.errors, entry[0], true);
      }
    }

    return !hasErrors;
  }

  /**
   * resets generated fields of form
   */
  resetFieldError(e: InputEvent) {
    const target = e.target as HTMLInputElement | null;
    this.errors[(target?.name || "")] = false;
  }

  /**
   * Сохранить в LS выбранного получателя
   * @param selectedApproveruserId
   */
  storeSelectedApprover(selectedApproveruserId: number) {
    this.service?.storeSelectedApprover(selectedApproveruserId);
  }

  /**
   * Восстановить из LS выбранного получателя
   */
  restoreSelectedApprover() {
    this.selectedApproverUserId = this.service?.restoreSelectedApprover(this.approversList) || null;
  }

  /**
   * Сохранение данных системных полей в LS
   * @param data
   */
  private storeSystemValues(data: [string, FormDataEntryValue][]) {
    this.service?.storeSystemValues(data);
  }

  /**
   * Восстановление данных системных полей из LS
   */
  private restoreSystemValues() {

    const data: [string, any][] | null = this.service?.restoreSystemValues() || null;

    if(data) {
      const allInputs = this.$el.querySelectorAll("input");
      const obj = Object.fromEntries(data);
      for (const element of allInputs) {

        if(obj[element.name]) {
          element.value = obj[element.name];
        }
      }
    }
  }

  @Watch("selectedApproverUserId")
  watchSelectedApproverUserIdHandler(selectedApproveruserId: number) {
    this.storeSelectedApprover(selectedApproveruserId);

    this.errors.selectedApproverUserId = false;
  }

  @Watch("applicationDate")
  watchApplicationDateHandler(value: string) {
    //сброс ошибки
  }

  get systemFieldsIds() {
    return this.systemFields.map(field => field.id);
  }

  get mainFieldsIds() {
    return this.mainFields.map(field => field.id);
  }

  get currentUserProfile(): UgmkUserProfile {
    return this.$store.state.userProfile;
  }

  get userId() {
    return this.currentUserProfile.userId;
  }
}

</script>
<style lang="scss">
  .application-form {
    display: flex;
    flex-direction: column;

    &__form {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__container {
      flex: 1;
      padding: 0 16px;

      & > div + div {
        margin-top: 16px;
      }
    }

    &__extra-controls {
      padding: 0 16px;
      margin-bottom: 16px;

      & > div + div {
        margin-top: 16px;
      }
    }

    &__footer {
      background-color: #F9F9F9;
      padding: 16px;
    }
  }
</style>