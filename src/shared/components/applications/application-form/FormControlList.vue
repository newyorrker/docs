<template>
  <div class="form-control-list">
    <div v-for="field in fields" class="form-control-list__item">
      <form-group :name="field.label" :nameFor="field.id">
        <text-input v-if="field.type === FieldType.string" :name="field.id" />
        <number-input v-if="field.type === FieldType.number" :name="field.id" />
        <date-input v-if="field.type === FieldType.date" :name="field.id" :value="''" />
        <span v-if="errors[field.id]" class="form-error">Обязательное поле</span>
      </form-group>
    </div>
  </div>
</template>

<script lang="ts">
import { FieldType, HRLinkApplicationTypeField } from "@/types/HRLinkApplication";
import { Vue, Component, Prop } from "vue-property-decorator";

import DateInput from "@/shared/components/controls/date-input/DateInput.vue";
import TextInput from "@/shared/components/controls/text/TextInput.vue";
import NumberInput from "@/shared/components/controls/number/NumberInput.vue";
import FormGroup from "@/shared/components/form/FormGroup.vue";

@Component({ components: { DateInput, TextInput, NumberInput, FormGroup }})

export default class FormControlList extends Vue {
  @Prop() fields: HRLinkApplicationTypeField[];
  @Prop() errors: Record<string, boolean>;

  FieldType = FieldType;
}

</script>
<style lang="scss">
.form-control-list {
  &__item + &__item {
    margin-top: 16px;
  }
}
</style>