<template>
  <div class="user__icon" :style="cssStyle">
      <img v-if="profilePhotoLink" :src="profilePhotoLink" />
      <template v-else>
      {{ userProfile.initials }}
      </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { UserProfile } from '../../../../../../common/api/models/UserProfile';

@Component({ components: {  }})

export default class UserIcon extends Vue {
  @Prop({ default: 44 }) size!: number;
  @Prop() fontSize!: number;
  @Prop({ default: 32 }) iconSize!: number;
  @Prop({ required: true }) userProfile!: UserProfile;

  get sideSize(): string {
    return this.size + 'px';
  }

  get localFontSize(): string {
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
  }

  get cssStyle(): Record<string, any> {
    return {
      background: this.profileColor,
      width: this.sideSize,
      height: this.sideSize,
      flex: '0 0 ' + this.sideSize,
      lineHeight: this.sideSize,
      fontSize: this.localFontSize,
    };
  }

  get profileColor() {
    return this.userProfile?.profileColor;
  }

  get profilePhotoLink(): string {
    const backend = this.$store.state.session?.projectName;
    const baseUrl = this.$store.state.session?.baseUrl;
    const backendUrl = this.$store.state.session?.backendUrl || (baseUrl || "" + backend || "");

    if(!backendUrl) {
      return "";
    }

    const photoFileId = this.userProfile.photoFileId;

    const f = (backendUrl: string, iconSize: number = 88): string => {
      return photoFileId
      ? `${backendUrl}/images/${photoFileId}/download?width=${iconSize}` : "";
    }

    return this.iconSize < 88
      ? f(backendUrl)
      : f(backendUrl, this.iconSize);
  }
}

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