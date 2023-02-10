<template>
    <div class="user-profile">
        <div class="user-profile__icon">
          <user-icon :userProfile="userProfile" :size="30" />
        </div>
        <div class="user-profile__text">
          <p class="user-profile__name">{{ userProfile.fullName }}</p> <!--{{  }} -->
          <p class="user-profile__position">{{ userProfile.position }}</p>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { UserProfile } from '../../../../../../common/api/models/UserProfile';
import UserIcon from "./UserIcon.vue";
// import s from './style.module.scss'

export default defineComponent({
  name: '',
  components: {
    UserIcon
  },
  props: {
    userProfile: {
      required: true,
      type: Object as () => UserProfile
    }
  },
  data() {
    return {
    //   s,
    }
  }
})

</script>

<style lang="scss">
.user-profile {
    display: flex;
    align-items: center;

    &__text {
        margin-left: 8px;
    }

    &__name, &__position {
        margin: 0;
    }

    &__name {
        font-size: 14px;
        letter-spacing: 0.3px;
        margin-top: 2px;
    }

    &__position {
        font-size: 12px;
        color: #9E9E9E;
        margin-top: 5px;
    }
}
</style>