<template>
  <div class="document-signers">
    <div v-if="waitingList.length" class="document-signers__list">
      <span>Ожидает подписи:</span>
      <div class="document-signers__list-item" v-for="signer in waitingList" >
        <signer-profile @click.native="openProfile(signer.profile)" :source="signer" />
      </div>
    </div>

    <div v-if="signedList.length" class="document-signers__list">
      <span>Подписа{{ signedList.length > 1 ? 'ли' : 'л' }}</span>
      <div class="document-signers__list-item" v-for="signer in signedList" >
        <signer-profile @click.native="openProfile(signer.profile)" :source="signer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import SignerProfile from "./SignerProfile.vue";
import { Signer } from "./types";
import { DocumentUserProfileModel } from "@/types/HrLinkDocument/DocumentUserProfileModel";

@Component({ components: { SignerProfile }})
export default class DocumentSigners extends Vue {
  @Prop({ required: true }) source: HrLinkDocumentModel;

  openProfile(userProfile?: DocumentUserProfileModel) {
    if(userProfile) {
      document.location.href = this.getLink(userProfile.id);
    }
  }

  private getLink(profileId?: string) {
    if (profileId) {
      let params = {
        schemaId: 'UserProfiles',
        objectId: profileId
      };

      return 'actor:ContactsPageActor?params=' + encodeURIComponent(JSON.stringify(params));
    }
    return '';
  }

  get waitingList(): Signer[] {
    const result: Signer[] = [];

    if(this.waitingForCurrentUser) {
      result.push({
        name: "Вы"
      })
    }

    if(this.waitingForHead && this.headProfile && !this.currentUserIsHeadManager) {
      result.push({
        name: this.headProfile.fullName || "",
        profile: this.headProfile
      });
    }

    //add employers

    if(this.waitingForEmployees) {
      result.push(...this.waitingForEmployees.map(employer => {
        return {
          name: employer.fullName || "",
          profile: employer
        }
      }))
    }

    if(result.length > 1) {
      result.forEach((item, i) => {
        if(i < result.length - 1) {
          item.name += ","
        }
      })
    }

    return result;
  }

  get signedList(): Signer[] {
    const result: Signer[] = [];

    if(!!this.headProfile?.signedAt) {
      result.push({
        name: this.headProfile.fullName || "",
        profile: this.headProfile
      })
    }

    const employees = this.employeesSigned.map((employer) => {
      return {
        name: employer.fullName || "",
        profile: employer
      }
    })

    result.push(...employees);

    return result;
  }

  get currentUserIsHeadManager() {
    //текущий пользователь может быть руководителем
    //если текущий пользователь явяляется руководителем то не показываем
    return this.currentUserProfile.id === this.headProfile?.id
  }

  get waitingForCurrentUser() {
    return !this.source.signed;
  }

  get waitingForHead() {
    const rejected = !!this.headProfile?.rejectedAt;
    const signed = !!this.headProfile?.signedAt;

    return !rejected && !signed;
  }

  get waitingForEmployees() {
    return this.employees.filter((employer) => !employer.signedAt && !employer.rejectedAt);
  }

  get employeesSigned() {
    return this.employees.filter((employee) => !!employee.signedAt);
  }

  get employees() {
    return this.source.employees;
  }

  get headProfile() {
    return this.source.headManager;
  }

  get currentUserProfile() {
    return this.$store.state.userProfile;
  }
}

</script>
<style lang="scss">

.document-signers {
  color: #6D6D72;

  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -8px;
    line-height: 1.35;

    & > span {
      margin-left: 8px;
    }
  }

  &__list-item {
    display: inline-block;
    content: ", ";
    margin-left: 8px;
  }
}
</style>