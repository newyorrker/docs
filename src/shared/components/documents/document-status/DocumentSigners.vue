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
import { Component } from "vue-property-decorator";
import SignersBase from "@/shared/components/sign/SignersBase.vue";
import { HrLinkDocumentModel } from "@/types/HrLinkDocument/HrLinkDocumentModel";
import SignerProfile from "@/shared/components/documents/document-status/SignerProfile.vue";
import { Signer } from "./types";

@Component({ components: { SignerProfile }})
export default class DocumentSigners extends SignersBase<HrLinkDocumentModel> {

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

  private get currentUserIsHeadManager() {
    //текущий пользователь может быть руководителем
    //если текущий пользователь явяляется руководителем то не показываем
    return this.currentUserProfile.id === this.headProfile?.id
  }

  private get waitingForCurrentUser() {
    return !this.source.signed;
  }

  private get waitingForHead() {
    const rejected = !!this.headProfile?.rejectedAt;
    const signed = !!this.headProfile?.signedAt;

    return !rejected && !signed;
  }

  private get waitingForEmployees() {
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
</style>