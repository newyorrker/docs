<template>
 <div class="application-type-list">
  application-type-list
 </div>
</template>

<script lang="ts">
import { HRLinkApplicationType } from "@/types/HRLinkApplication";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})
export default class ApplicationTypeList extends Vue {
  @Prop() list: HRLinkApplicationType[];
}

</script>
<style lang="scss">
.application-type-list {
  &__title {
    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #373737;
    }
  }
}
</style>