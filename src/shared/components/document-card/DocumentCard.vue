<template>
    <div class="document-card">
        <user-profile v-if="userProfile" :userProfile="userProfile" />

        <div class="document-card__title">
          <p>Служебная записка об использовании личного транспорта</p>
        </div>

        <document-status v-if="true" class="document-card__status" />

        <div v-if="true" class="document-card__comment">
          <p>Комментарий</p>
          <p>Неудовлетворили условия Неудовлетворили условия Неудовлетворили условия Неудовлет Неудовлетворили условия Неудовлет</p>
        </div>

        <div class="document-card__footer">
            <p>5 декабря 14:03</p>
            <button v-if="false">
              Подписать
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" fill="none">
                <path fill="#fff" fill-rule="evenodd" d="M.793.5 5 4.5l-4.207 4L0 7.746 3.414 4.5 0 1.254.793.5Z" clip-rule="evenodd"/>
              </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import UserProfile from '../user-profile/UserProfile.vue';
import DocumentStatus from './status/DocumentStatus.vue';


export default defineComponent({
  name: '',
  components: {
    UserProfile,
    DocumentStatus
  },
//   props: {
//     simplePror: {
//       required: true,
//       type: Array as () => SomeTypeInterface[]
//     }
//   },
  data() {
    return {
      // userProfile: this.$store.state.profile
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.profile;
    }
  }
})

</script>

<style lang="scss">
body {
  background-color: #f4f4f4 !important;
}
.document-card {
  background-color: #ffffff;
  padding-top: 9px;
  padding-left: 16px;
  padding-bottom: 11px;
  padding-right: 15px;

  &__title {
    margin-top: 17px;




    p {
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0.34px;
      margin: 0;
    }
  }

  &__comment {
    margin-top: 13px;
    p {
      margin: 0;
    }

    p:first-child {
      letter-spacing: -0.3px;
    }

    p:last-child {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 17px;
      letter-spacing: -0.8px;
      padding-right: 10px;
      margin-top: 4px;
    }
  }

  &__title + &__footer {
    margin-top: 17px;
  }

  &__title + &__status {
    margin-top: 16px;
  }

  &__comment + &__footer {
    margin-top: 16px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-top: 6px;

    p {
      color: #9E9E9E;
      font-size: 12px;
      margin: 0;
    }

    button {
      background-color: #F39420;
      border-radius: 4px;
      font-size: 12px;
      color: #FFFFFF;
      border: 0;
      padding: 7px 14px;

      svg {
        margin-left: 10px;
      }
    }
  }
}
</style>