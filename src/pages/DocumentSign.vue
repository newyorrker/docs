<template>
    <div class="document-sign">
        <div class="document-sign__title">
            <p>Вы подписываете документ “Служебная записка об использовании личного транспорта</p>
        </div>
        <document-info :userProfile="userProfile" />

        <sms-sign />
    </div>
    <footer>
        <button-1>
            Подтвердить
        </button-1>
    </footer>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import SmsSign from '@/shared/components/sms-sign/SmsSign.vue';
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentInfo from "@/shared/components/document-info/DocumentInfo.vue";
// import s from './style.module.scss'


export default defineComponent({
  name: 'DocumentSign',
  components: {
    DocumentInfo, SmsSign, Button1
  },
  data() {
    return {
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
.document-sign {
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