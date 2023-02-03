<template>
 <div class="form-group">
    <label :for="nameFor">{{ name }}</label>
    <slot/>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class FormGroup extends Vue {
    @Prop() name: string;
    @Prop() nameFor: string;
}

</script>
<style lang="scss">
.form-group {
    display: flex;
    flex-direction: column;

    label {
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #373737;
    }

    label + * {
        margin-top: 8px;
    }
}
</style>