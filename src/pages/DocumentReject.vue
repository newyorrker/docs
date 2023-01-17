<template>
    <div class="document-reject">
        <div class="document-reject__title">
            <p>Вы действительно хотите отказаться подписывать документ: “Служебная записка об использовании личного транспорта?</p>
        </div>
        <document-info :userProfile="userProfile" />

        <div class="document-reject__reason">
          <p>Укажите причину:</p>
          <textarea v-model="reason" placeholder="Введите сообщение" rows="11" ></textarea>
        </div>

    </div>
    <footer>
        <button-1>Отказаться</button-1>
    </footer>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
import DocumentInfo from "@/shared/components/document-info/DocumentInfo.vue";


export default defineComponent({
  name: 'DocumentSign',
  components: {
    Button1, DocumentInfo
  },
  data() {
    return {
      reason: "Не удовлетворили условия"
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
.document-reject {
    &__title {
        p {
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: #373737;
        }
    }

    &__reason {
      margin-top: 15px;
      p {
        margin: 0;
      }

      textarea {
        width: 100%;
        background-color: transparent;
        border: 1px solid #C8C7CC;
        border-radius: 4px;
        resize: none;
        color: #373737;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        margin-top: 8px;
        padding: 14px;
      }
    }

}
</style>