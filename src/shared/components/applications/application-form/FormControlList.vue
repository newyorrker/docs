<template>
  <div class="form-control-list">
    <div v-for="field in fields" class="form-control-list__item">
      <form-group :title="field.label" :forName="field.id">
        <input-text v-if="field.type === FieldType.string" :name="field.id" />
        <input-text v-if="field.type === FieldType.number" :name="field.id" type="number" inputmode="numeric" />
        <input-date v-if="field.type === FieldType.date" :name="field.id" :value="''" />
        <span v-if="errors[field.id]" class="form-error">Обязательное поле</span>
      </form-group>
    </div>
  </div>
</template>

<script lang="ts">
import { FieldType, HRLinkApplicationTypeField } from "@/types/HRLinkApplication";
import { Vue, Component, Prop } from "vue-property-decorator";
import { FormGroup, InputDate, InputText } from "ui-lib";

@Component({ components: { InputDate, FormGroup, InputText }})

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