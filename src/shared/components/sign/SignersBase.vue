<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { DocumentUserProfileModel } from "@/types/HrLinkDocument/DocumentUserProfileModel";
  import SignerProfile from "@/shared/components/documents/document-status/SignerProfile.vue";

  @Component({ components: { SignerProfile }})
  export default class DocumentSigners<T> extends Vue {
    @Prop({ required: true }) source: T;

    openProfile(userProfile?: DocumentUserProfileModel) {
      const link = this.getLink(userProfile?.id);
      if(link) {
        document.location.href = link;
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