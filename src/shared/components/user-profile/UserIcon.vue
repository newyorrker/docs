<template>
    <div class="user__icon" :style="cssStyle">
        <img v-if="profilePhotoLink" :src="profilePhotoLink" />
        <template v-else>
        {{ userProfile.initials }}
        </template>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { UserProfile } from '../../../../../../common/api/models/UserProfile';

export default defineComponent({
  name: '',
  components: {

  },
  props: {
    size: {
        type: Number,
        default: 44
    },
    fontSize: {
        type: Number
    },
    iconSize: {
        default: 32,
        type: Number
    },
    userProfile: {
        type: Object as () => UserProfile,
        required: true
    }
  },
  data() {
    return {
    //   s,
    }
  },
  computed: {
    sideSize(): string {
      return this.size + 'px';
    },

    localFontSize(): string {
      if (this.fontSize) {
        return this.fontSize + 'px';
      }

      switch (this.size) {
        case 24:
          return '8px';
        case 28:
          return '10px';
        case 32:
          return '11px';
        case 138:
          return '25px';
        default:
          return '14px';
      }
    },

    cssStyle(): Record<string, any> {
      return {
        background: this.profileColor,
        width: this.sideSize,
        height: this.sideSize,
        flex: '0 0 ' + this.sideSize,
        lineHeight: this.sideSize,
        fontSize: this.localFontSize,
      };
    },

    profileColor() {
      return this.userProfile?.profileColor;
    },

    profilePhotoLink() {
      const backend = this.$store.state.session?.projectName;
      const baseUrl = this.$store.state.session?.baseUrl;
      const backendUrl = this.$store.state.session?.backendUrl || (baseUrl || "" + backend || "");

      if(!backendUrl) {
        return "";
      }

      const photoFileId = this.userProfile.photoFileId;

      const f = (backendUrl: string, iconSize: number = 88) => {
        return photoFileId
        ? `${backendUrl}/images/${photoFileId}/download?width=${iconSize}` : "";
      }

      return this.iconSize < 88
        ? f(backendUrl)
        : f(backendUrl, this.iconSize);
    },
  }
})

</script>






  <style lang="scss">
  .user__icon {
    border-radius: 100%;
    text-align: center;
    font-weight: 600;
    letter-spacing: -0.011em;
    text-transform: uppercase;
    color: #ffffff;
    flex-shrink: 0;
    position: relative;
    user-select: none;
  }

  .user__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
  </style>
