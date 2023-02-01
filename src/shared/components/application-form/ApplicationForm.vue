<template>
  <form @submit.prevent="submit" class="application-form">
    <div class="application-form__container">
      <div v-for="field in fields" class="application-form__item">
        <form-group v-if="field.type === FieldType.string" :name="field.label" :nameFor="field.id">
          <text-input :name="field.id" />
        </form-group>

        <form-group v-if="field.type === FieldType.number" :name="field.label" :nameFor="field.id">
          <number-input :name="field.id" />
        </form-group>

        <form-group v-if="field.type === FieldType.date" :name="field.label" :nameFor="field.id">
          <date-input :value="''" />
        </form-group>
      </div>
    </div>

    <footer class="application-form__footer">
      <button-1 type="submit">Отправить</button-1>
    </footer>
  </form>
</template>

<script lang="ts">
import { FieldType, HRLinkApplicationTypeField } from "@/types/HRLinkApplication";
import { Vue, Component, Prop } from "vue-property-decorator";

import DateInput from "@/shared/components/controls/date-input/DateInput.vue";
import TextInput from "@/shared/components/controls/text/TextInput.vue";
import NumberInput from "@/shared/components/controls/number/NumberInput.vue";
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import FormGroup from "@/shared/components/form/FormGroup.vue";

@Component({ components: { DateInput, Button1, TextInput, NumberInput, FormGroup }})

export default class ApplicationForm extends Vue {
  @Prop({ default: () => [] }) fields: HRLinkApplicationTypeField[];

  FieldType = FieldType;

  submit(e: any) {

    const formData = new FormData(e.target);


    this.$emit("submit", formData)
  }
}

</script>
<style lang="scss">
  .application-form {
    display: flex;
    flex-direction: column;

    &__container {
      flex: 1;
      padding: 0 16px;
    }

    &__item + &__item {
      margin-top: 16px;
    }

    &__footer {
      background-color: #F9F9F9;
      padding: 16px;
    }
  }
</style>