<template>
    <div class="document-signers">
      <div v-if="approver" class="document-signers__list">
        <span>Кому:</span>
        <div class="document-signers__list-item">
          <signer-profile @click.native="openProfile(approver.profile)" :source="approver" />
        </div>
      </div>
    </div>
  </template>

  <script lang="ts">
  import { Component } from "vue-property-decorator";
  import SignersBase from "@/shared/components/sign/SignersBase.vue";
  import SignerProfile from "@/shared/components/document-status/SignerProfile.vue";
  import { HrLinkApplicationModel } from "@/types/HRLinkApplication/HrLinkApplicationModel";
import { Signer } from "../../document-status/types";

  @Component({ components: { SignerProfile }})
  export default class DocumentSigners extends SignersBase<HrLinkApplicationModel> {

    get approver(): Signer {
      return {
        name: this.source.approver.fullName,
        profile: this.source.approver
      };
    }

  }
  </script>