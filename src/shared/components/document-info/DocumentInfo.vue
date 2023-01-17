<template>
    <div class="document-info">
        <user-profile v-if="!!userProfile" :userProfile="userProfile" />

        <div class="document-info__text">
            <p>
                <span>Сформировано:</span> 5 декабря 14:03
            </p>
            <p>
                <span>Ожидает подписи:</span> Вы, Архипов Андрей Петрович
            </p>
        </div>
    </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { UserProfile as UserProfileModel } from '../../../../../../common/api/models/UserProfile';

import UserProfile from '@/shared/components/user-profile/UserProfile.vue';
// import s from './style.module.scss'

interface SomeTypeInterface {

}


export default defineComponent({
  name: '',
  components: {
    UserProfile
  },
  props: {
    userProfile: {
        type: Object as () => UserProfileModel | null
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
.document-info {
    &__text {
        margin-top: 9px;
        p {
            font-size: 14px;
            line-height: 17px;
            color: #9E9E9E;
            margin: 0;
            letter-spacing: 0.1px;

            span {
                color: #6D6D72;
            }
        }

        p + p {
            margin-top: 8px;
        }
    }
}
</style>