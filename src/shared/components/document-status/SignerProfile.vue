<template>
  <div @click="openTheProfile" class="signer-profile">
    <user-icon v-if="!!source.profile" class="signer-profile__icon" :userProfile="source.profile" :size="25" />
    <span>{{ source.name }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import UserIcon from "../user-profile/UserIcon.vue";
import { Signer } from "./types";

@Component({ components: { UserIcon }})

export default class SignerProfile extends Vue {
    @Prop() source: Signer;

    openTheProfile() {
      document.location.href = this.link;
    }

    get link() {
      const profileId = this.source.profile?.id;
      if (profileId) {
        let params = {
          schemaId: 'UserProfiles',
          objectId: profileId
        };

        return 'actor:ContactsPageActor?params=' + encodeURIComponent(JSON.stringify(params));
      }
      return '';
    }
}

</script>
<style lang="scss">
.signer-profile {
  display: flex;
  align-items: center;

  &__icon {
    margin-right: 4px;
  }
}
</style>